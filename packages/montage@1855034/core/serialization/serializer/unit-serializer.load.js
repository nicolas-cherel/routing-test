montageDefine("1855034","core/serialization/serializer/unit-serializer",{dependencies:["../../core"],factory:function(e,t){function n(e,t,n){this._visitor=e,this._malker=t,this._object=n}var r=e("../../core").Montage,n=r.specialize.call(Object,{_malker:{value:null},_visitor:{value:null},_object:{value:null},constructor:{value:function n(){}},initWithMalkerAndVisitorAndObject:{value:function(e,t,n){return this._malker=e,this._visitor=t,this._object=n,this}},getObjectLabel:{value:function(e){return this.addObjectReference(e),this._visitor.labeler.getObjectLabel(e)}},addObject:{value:function(e){return"object"==typeof e?(this._malker.visit(e),e):void 0}},addObjectReference:{value:function(e){var t=this._visitor.builder,n=this._visitor.labeler,r=n.getObjectLabel(e);return{thisIsAReferenceCreatedByMontageSerializer:!0,reference:t.createObjectReference(r)}}}});t.UnitSerializer=n}});