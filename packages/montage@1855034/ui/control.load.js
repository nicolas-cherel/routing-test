montageDefine("1855034","ui/control",{dependencies:["ui/component","collections/dict"],factory:function(e,t){var n=e("ui/component").Component,i=e("collections/dict"),r=t.Control=n.specialize({constructor:{value:function(){this.defineBindings({"classList.has('montage--disabled')":{"<-":"!enabled"},"classList.has('montage--active')":{"<-":"active"}})}},dispatchActionEvent:{value:function(){return this.dispatchEvent(this.createActionEvent())}},_detail:{value:null},detail:{get:function(){return null==this._detail&&(this._detail=new i),this._detail}},createActionEvent:{value:function(){var e,t=document.createEvent("CustomEvent");return e=this._detail,t.initCustomEvent("action",!0,!0,e),t}},hasTemplate:{value:!1},willPrepareForDraw:{value:function(){}},standardElementTagName:{value:"INPUT"},hasStandardElement:{get:function(){return this.element.tagName===this.standardElementTagName}},active:{value:!1},enabled:{get:function(){return!this._disabled},set:function(e){this.disabled=!e}}});r.addAttributes({autofocus:{value:!1,dataType:"boolean"},disabled:{value:!1,dataType:"boolean"},form:null,name:null,readonly:{value:!1,dataType:"boolean"},value:{value:"on"}})}});