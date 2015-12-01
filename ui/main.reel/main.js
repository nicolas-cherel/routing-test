/**
 * @module ui/main.reel
 */
var Component = require("montage/ui/component").Component;

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
        value: 0
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
