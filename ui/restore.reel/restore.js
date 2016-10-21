/**
 * @module ui/restore.reel
 */
var Montage = require("montage").Montage;
var Component = require("montage/ui/component").Component;
var MontageDeserializer = require("montage/core/serialization/deserializer/montage-deserializer").MontageDeserializer;

var MontageSerializer = require("montage/core/serialization/serializer/montage-serializer").MontageSerializer;

// new MontageSerializer().initWithRequire(require).serialize(args);

/**
 * @class Restore
 * @extends Component
 */
exports.Restore = Component.specialize(/** @lends Restore# */ {
    constructor: {
        value: function Restore() {
            this.super();
        }
    },

    enterDocument: {
      value: function() {
        debugger;
        var info = Montage.getInfoForObject(this);
        new MontageDeserializer().init(localStorage.getItem("snapshot"), info.require).deserialize(null, document).then(function(treeRoot) {
            this.childComponents.push(treeRoot);

            insertionElement = this.element === document.documentElement ? document.body : this.element;

            insertionElement.appendChild(treeRoot.element);
        });

      }
    }
});
