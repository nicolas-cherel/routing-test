
var Bindings = require("montage/frb/bindings"),
    Component = require("montage/ui/component").Component,
    MontageSerializer = require("montage/core/serialization/serializer/montage-serializer").MontageSerializer;

describe("frb-stringify", function() {
    it("should serialize", function() {
        var o = new (Component.specialize({}));
        Bindings.defineBindings(o, {
            "u": {"<->": "test[ref]"}
        });

        console.log(new MontageSerializer().initWithRequire(require).serializeObject(o));


    });
});