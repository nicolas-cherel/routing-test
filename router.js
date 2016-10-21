/**
 * @module router
 */
var Montage = require("montage/core/core").Montage,
    Component = require("montage/ui/component").Component,
    observe = require("montage/frb/observe"),
    evaluate = require("montage/frb/evaluate"),
    assign = require("montage/frb/assign"),
    logger = require("montage/core/logger").logger("component");


var Routable = exports.Routable = Montage.specialize(/** @lends Routable# */ {

    constructor: {
        value: function Routable() {
            this.super();
            this.state = {};
        }
    },

    deserializedFromSerialization: {
        value: function() {
            var router = this.target.rootComponent.router;
            router && Object.keys(this.state).forEach(function(keyName) {
                observe(this, "state."+keyName, {
                    change: function(value) {
                        router.notifyRoutableStateChange(this, keyName);
                    }.bind(this)
                });
            }, this);   
        }
    },

    // routable component for this info
    component: {
        value: null
    },

    routablePropertiesMap: {
        value: null
    },

    state: {
        value: null
    },

    applyPropertyState: {
        value: function applyPropertyState(propertyName, value)  {
            assign(this, "state."+propertyName, value);
        }
    }
});

/**
 * @class Router
 * @extends Montage
 */
var Router = exports.Router = Montage.specialize(/** @lends Router# */ {
    constructor: {
        value: function Router() {
            this.super();
            this._routingObjectsTable = {};
        }
    },

    stateKey: {
        value: "state"
    },

    _root: {value: null},
    hook: {
        set: function(v) {
            this._root = v.rootComponent;
            
            if (this._root.router){
                throw new Error("oops, root component already has a router");
            }

            this._root.router = this;
        }
    },

    deserializedFromSerialization: {
        value: function() {
            var state = null;
            if ((state = localStorage.getItem(this.stateKey))) {
                try {            
                    var parsed = JSON.parse(state);
                    this.applyAppState(this._root, parsed);
                } catch(e) {
                    logger.debug(e);
                    logger.debug("could not restore application state");
                }
            }
        }
    },

    applyStateToComponent: {
        value: function applyStateToComponent(stateObject, component) {
            Object.keys(stateObject).forEach(function(key) {
                component.routable
                    .applyPropertyState(key, stateObject[key]);
            });
        }
    },

    __isRoutingInProgress: {
        value: null
    },
    applyAppState: {
        value: function applyState(component, state) {
            this.__isRoutingInProgress = true;
            var stack = [[component, state]];
            var current = null;
            while ((current = stack.pop())) {
                var component = current[0],
                    node = current[1];
                if (node.state && component.routable) {
                    this.applyStateToComponent(node.state, component);
                }
                if (node.children) {
                    var childCount = node.children.length;
                    var self = this;
                    Object.keys(node.children).forEach(function(ident) {
                        var nodeState = node.children[ident];
                        var child = null;
                        if (ident[0] === "#") {
                            index = parseInt(ident.slice(1), 10);
                            if (index !== NaN) {
                                child = component.childComponents[index];
                            }
                        } else {
                            child = component.templateObjects[ident];
                        }
                        if (!child) {

                            var cancel = observe(component, "childComponents.length", function() {
                                component.childComponents.forEach(function(c) {
                                    if ((c.routableName || c.identifier) === ident) {
                                        self.applyAppState(c, nodeState);
                                        cancel();
                                    }
                                });

                            });
                        } else {
                            stack.push([child, nodeState]);
                        }
                    });
                }
            }

            this.__isRoutingInProgress = false;

        }
    },

    notifyRoutableStateChange: {
        value: function(routable, keyName) {
            if (! this.__isRoutingInProgress) {
                this.updateEntry(routable.target);

                // auto save for now
                this.saveRoutableState();
            }
        }
    },

    updateEntry: {
        value: function updateEntry(comp) {
            if (comp.routable) {
                var compRef  = this.getEntry(comp);
                compRef.state = comp.routable.state;
                return compRef;
            }
        }
    },

    fetchRoutableState: {
        value: function fetchRoutableState() {
            var self = this;
            var lastId = null;
            var root = {
                comp: this._root,
                routable: true,
                parent: null,
                children: []
            };

            var stack = [root];

            var current = null;
            while((current = stack.pop())) {
                var entry = self.updateEntry(current.comp);
                stack.splice.apply(stack, [0, 0].concat(
                    current.comp.childComponents.map(function(c) {
                        var node = {
                            comp: c, 
                            id: c.routableName || c.identifier, 
                            children: [],
                            routable: !!c.routable,
                            parent: current,
                        };
                        if (c.routable) {
                            var up = c;
                            while((up = up.parent) && !up.routable) {
                                up.routable = true;
                            } 
                        }
                        current.children.push(node);
                        return node;
                    })
                ));
            }

            // cleanup:
            //   remove all subtrees without anything routable
            //   // make root node for component declared as root
            //   remove children list when empty
            //   map children with their identifier
            stack = [root];
            var current = null;
            while ((current = stack.pop())) {
                var removable = current.children.reduce(function(memo, v, index) {
                    if (! v.routable) {
                        memo.push(index)
                    }
                    return memo;
                }, []);

                removable.reverse().forEach(function(index) {
                    current.children.splice(index, 1);
                });

                var component = current.comp;
                delete current.comp;
                delete current.parent;
                delete current.routable;
                delete current.id;

                // define root
                //  ## TODO : before stripping out root ancest, we need to
                //            solve the routable root resolution on app boot
                // if (!!component.routable && component.routable.root) {
                //     root = current;
                // }

                current.state = this.getEntry(component).state;
                stack.splice.apply(stack, [0, 0].concat(current.children));

                var children = current.children;
                if (children.length === 0) {
                    delete current.children;
                } else {
                    // convert children array to identifier map 
                    current.children = {};
                    children.forEach(function(c, index) {
                        var key = c.id || "#"+index.toString(10);
                        if (key in current.children) {
                            logger.debug("conflicting key ", key, "in routable children" + c.id);
                        }
                        current.children[key] = c;
                    });
                }

            }

            return root;
        }
    },

    saveRoutableState: {
        value: function() {
            var state = this.fetchRoutableState();
            localStorage.setItem("state", JSON.stringify(state));
        }
    },


    getEntry: {
        value: function(component) {
            if (component.uuid in this._routingObjectsTable) {
                return this._routingObjectsTable[component.uuid];
            } else {
                return this._routingObjectsTable[component.uuid] = {
                    component: component
                };
            }
        }
    }
});
