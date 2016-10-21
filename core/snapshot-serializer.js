

var MontageSerializer = require("montage/core/serialization/serializer/montage-serializer").MontageSerializer;
var MontageWalker = require("montage/core/serialization/serializer/montage-malker").MontageWalker;
var SnapshotVisitor = require("./snapshot-visitor").SnapshotVisitor;


var SnapshotSerializer = exports.SnapshotSerializer = MontageSerializer.specialize({
    constructor: {
        value: function SnapshotSerializer() {}
    },

    initWithRequire: {
        value: function (_require) {
            this.super(_require);

            this._visitor = new SnapshotVisitor()
                .initWithBuilderAndLabelerAndRequireAndUnits(
                    this._builder,
                    this._labeler,
                    this._require,
                    this.constructor._units
                );
                
            this._malker = new MontageWalker(this._visitor);

            return this;
        }
    },
});

