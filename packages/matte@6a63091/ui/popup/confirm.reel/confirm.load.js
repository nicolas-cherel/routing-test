montageDefine("6a63091","ui/popup/confirm.reel/confirm",{dependencies:["montage/ui/component","ui/popup/popup.reel"],factory:function(e,t){var n=e("montage/ui/component").Component,i=e("ui/popup/popup.reel").Popup,r=t.Confirm=n.specialize({hasTemplate:{value:!0},title:{value:"Confirm"},msg:{value:"Are you sure?"},okLabel:{value:"OK"},cancelLabel:{value:"Cancel"},_popup:{value:null},popup:{set:function(e){this._popup=e},get:function(){return this._popup}},okCallback:{value:null},cancelCallback:{value:null},enterDocument:{value:function(e){e&&this.element.addEventListener("keyup",this,!1)}},draw:{value:function(){}},handleKeyup:{value:function(e){13==e.keyCode?this.handleOkAction(e):27==e.keyCode&&this.handleCancelAction(e)}},handleOkAction:{value:function(e){this.okCallback&&this.okCallback.call(this,e);var t=document.createEvent("CustomEvent");t.initCustomEvent("montage_confirm_ok",!0,!0,null),this.dispatchEvent(t),this.popup.hide()}},handleCancelAction:{value:function(e){this.cancelCallback&&this.cancelCallback.call(this,e);var t=document.createEvent("CustomEvent");t.initCustomEvent("montage_confirm_cancel",!0,!0,null),this.dispatchEvent(t),this.popup.hide()}},show:{value:function(e,t,n){var a,s=this.application._confirmPopup;s||(s=new i,this.popup=s,s.type="confirm",s.title="Confirmation",s.modal=!0,this.application._confirmPopup=s,a=new r,s.content=a),a=s.content,"string"==typeof e?(a.msg=e,a.okLabel="OK",a.cancelLabel="Cancel"):(a.msg=e.message,a.okLabel=e.okLabel||"OK",a.cancelLabel=e.cancelLabel||"Cancel"),a.okCallback=t||null,a.cancelCallback=n||null,s.show()}}})}});