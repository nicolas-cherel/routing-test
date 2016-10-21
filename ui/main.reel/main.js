/**
 * @module ui/main.reel
 */
var Component = require("montage/ui/component").Component,
    SnapshotSerializer = require("core/snapshot-serializer").SnapshotSerializer;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
        }
    },

    selectedContent: {
        value: 0,
        serializable: true
    },

    serialize: {
        value: function() {
            return new SnapshotSerializer().initWithRequire(require).serializeObject(this);
        }
    },

    saveState: {
        serializale: false,
        value: function() {
            localStorage.setItem("snapshot", this.serialize())
        }
    },

    enterDocument: {
        value: function(first) {
            if (first) {
                this.contents = this.jsonContents.map(function(scriptTag) {
                    return JSON.parse(scriptTag.innerHTML);
                });
            } 
        }
    }
});
