
var Montage = require("montage").Montage;
var MontageVisitor = require("montage/core/serialization/serializer/montage-visitor").MontageVisitor;

var SnapshotVisitor = exports.SnapshotVisitor = MontageVisitor.specialize({
    constructor: {
        value: function SnapshotVisitor() {}
    },

    setSerializableObjectProperties: {
        value: function (malker, object, builderObject) {
            var type,
                propertyName,
                propertyNames = Montage.getSerializablePropertyNames(object),
                propertyNamesCount = propertyNames.length;

            propertyNames.push("childComponents");
            propertyNamesCount = propertyNames.length;

            for (var i = 0; i < propertyNamesCount; i++) {
                propertyName = propertyNames[i];
                type = Montage.getPropertyAttribute(object, propertyName, "serializable");
                this.setProperty(malker, propertyName, object[propertyName], !!type);
            }
        }
    }
}, {

    

});

