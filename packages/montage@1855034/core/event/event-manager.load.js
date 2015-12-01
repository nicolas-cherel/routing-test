montageDefine("1855034","core/event/event-manager",{dependencies:["../core","../uuid","./mutable-event","core/serialization/serializer/montage-serializer","core/serialization/deserializer/montage-deserializer"],factory:function(e,t){var n,i=e("../core").Montage,r=e("../uuid"),o=e("./mutable-event").MutableEvent,a=e("core/serialization/serializer/montage-serializer").MontageSerializer,s=e("core/serialization/deserializer/montage-deserializer").MontageDeserializer;if("undefined"!=typeof window){window.Touch===void 0&&"ontouchstart"in window&&(window.Touch=function(){},function(){var e;document.addEventListener("touchstart",e=function(t){window.Touch=t.touches[0].constructor,document.nativeRemoveEventListener?document.nativeRemoveEventListener("touchstart",e,!0):document.removeEventListener("touchstart",e,!0),n&&n.isStoringPointerEvents&&(n.isStoringPointerEvents=!1,n.isStoringPointerEvents=!0)},!0)}());var u=i.specialize({constructor:{value:function(e){return this.data=Array(32),this.velocity={velocity:(new c).initWithIdentifier(e)},this}},data:{enumerable:!1,writable:!0,value:null},size:{enumerable:!1,writable:!0,value:0},pos:{enumerable:!1,writable:!0,value:0},velocity:{enumerable:!1,writable:!0,value:0}}),l=i.specialize({constructor:{value:function(e,t,n){return this.clientX=e,this.clientY=t,this.timeStamp=n,this}},clientX:{enumerable:!1,writable:!0,value:null},clientY:{enumerable:!1,writable:!0,value:0},timeStamp:{enumerable:!1,writable:!0,value:0}});i.specialize({memory:{value:{}},add:{value:function(e,t,n,i){var r;(r=this.memory[e])||(r=this.memory[e]=new u(e)),(data=r.data[r.pos])?(data.clientX=t,data.clientY=n,data.timeStamp=i):data=r.data[r.pos]=new l(t,n,i),r.size<r.data.length&&r.size++,r.pos=(r.pos+1)%r.data.length}},remove:{value:function(e){delete this.memory[e]}},clear:{value:function(e){this.memory[e]&&(this.memory[e].size=0,this.memory[e].velocity.velocity.clearCache())}},getMemory:{value:function(e){return this.memory[e]}},isStored:{value:function(e){return this.memory[e]&&this.memory[e].size>0}},pointerVelocity:{value:function(e){return this.memory[e]?this.memory[e].velocity:void 0}},storeEvent:{value:function(e){var t;switch(e.type){case"mousedown":n._isMouseDragging=!0;case"mousemove":n._isStoringMouseEventsWhileDraggingOnly?n._isMouseDragging&&(this.add("mouse",e.clientX,e.clientY,e.timeStamp),Object.defineProperty(e,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}})):(this.add("mouse",e.clientX,e.clientY,e.timeStamp),Object.defineProperty(e,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}}));break;case"mouseup":this.add("mouse",e.clientX,e.clientY,e.timeStamp),Object.defineProperty(e,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}});break;case"touchstart":case"touchmove":for(t=0;e.touches.length>t;t++)this.add(e.touches[t].identifier,e.touches[t].clientX,e.touches[t].clientY,e.timeStamp);break;case"touchend":for(t=0;e.changedTouches.length>t;t++)this.add(e.changedTouches[t].identifier,e.changedTouches[t].clientX,e.changedTouches[t].clientY,e.timeStamp)}}},removeEvent:{value:function(e){var t;switch(e.type){case"mouseup":n._isMouseDragging=!1,n._isStoringMouseEventsWhileDraggingOnly&&this.clear("mouse");break;case"touchend":for(t=0;e.changedTouches.length>t;t++)this.remove(e.changedTouches[t].identifier)}}}});var c=i.specialize({_identifier:{enumerable:!1,writable:!0,value:null},initWithIdentifier:{value:function(e){return this._identifier=e,this}},clearCache:{value:function(){return this._data=this._x=this._y=this._speed=this._angle=null,this}},_data:{enumerable:!1,writable:!0,value:null},_x:{enumerable:!1,writable:!0,value:null},_y:{enumerable:!1,writable:!0,value:null},_speed:{enumerable:!1,writable:!0,value:null},_angle:{enumerable:!1,writable:!0,value:null},x:{get:function(){return null===this._x&&(null===this._data&&(this._data=n._getPointerVelocityData(this._identifier)),this._x=n._calculatePointerVelocity(this._data.time,this._data.x)),this._x},set:function(){}},y:{get:function(){return null===this._y&&(null===this._data&&(this._data=n._getPointerVelocityData(this._identifier)),this._y=n._calculatePointerVelocity(this._data.time,this._data.y)),this._y},set:function(){}},speed:{get:function(){return null===this._speed&&(this._speed=Math.sqrt(this.x*this.x+this.y*this.y)),this._speed},set:function(){}},angle:{get:function(){return null===this._angle&&(this._angle=Math.atan2(this.y,this.x)),this._angle},set:function(){}}}),h=function(){return this.listeners={},this};h._pool=[],h.checkoutRegistration=function(){return 0===this._pool.length?new this:this._pool.pop()},h.checkinRegistration=function(e){e.target=null,this._pool.push(e)},Object.defineProperties(h.prototype,{target:{enumerable:!1,writable:!0,value:null},listeners:{enumerable:!1,writable:!0,value:null}});var d=function(){return this};d._pool=[],d.checkoutRegistration=function(){return 0===this._pool.length?new this:this._pool.pop()},d.checkinRegistration=function(e){e.listener=null,this._pool.push(e)},Object.defineProperties(d.prototype,{initWithListener:{value:function(e,t,n){return this.listener=e,this.capture=t,this.bubble=n,this}},listener:{enumerable:!1,writable:!0,value:null},capture:{enumerable:!1,writable:!0,value:!0},bubble:{enumerable:!1,writable:!0,value:!1}}),a.defineSerializationUnit("listeners",function(e,t){var i,r,o,a=n,s=t.uuid,u=[];for(var l in a.registeredEventListeners)if(i=a.registeredEventListeners[l],r=i&&i[s])for(var c in r.listeners)o=r.listeners[c],u.push({type:l,listener:e.addObjectReference(o.listener),capture:o.capture});return u.length>0?u:void 0}),s.defineDeserializationUnit("listeners",function(e,t,n){for(var i,r=0;i=n[r];r++)t.addEventListener(i.type,i.listener,i.capture)});var p=Event.NONE,v=Event.CAPTURING_PHASE,m=Event.AT_TARGET,f=Event.BUBBLING_PHASE,g="function";t.EventManager=i.specialize({constructor:{value:function(){this.super(),this._trackingTouchList={touchesStart:Object.create(null),touchesEnd:Object.create(null)}}},eventDefinitions:{value:{abort:{bubbles:!1,cancelable:!1},beforeunload:{bubbles:!1},blur:{bubbles:!1,cancelable:!1},change:{bubbles:!0,cancelable:!1},click:{bubbles:!0,cancelable:!0},close:{bubbles:!1,cancelable:!1},compositionend:{bubbles:!0,cancelable:!1},compositionstart:{bubbles:!0,cancelable:!0},compositionupdate:{bubbles:!0,cancelable:!1},contextmenu:{bubbles:!0,cancelable:!0},copy:{bubbles:!0,cancelable:!0},cut:{bubbles:!0,cancelable:!0},dblclick:{bubbles:!0,cancelable:!1},DOMActivate:{bubbles:!0,cancelable:!0,deprecated:!0},DOMMouseScroll:{bubbles:!0},drag:{bubbles:!0,cancelable:!0},dragend:{bubbles:!0,cancelable:!1},dragenter:{bubbles:!0,cancelable:!0},dragleave:{bubbles:!0,cancelable:!1},dragover:{bubbles:!0,cancelable:!0},dragstart:{bubbles:!0,cancelable:!0},drop:{bubbles:!0,cancelable:!0},error:{bubbles:function(e){return!(XMLHttpRequest.prototype.isPrototypeOf(e)||e.tagName&&"VIDEO"===e.tagName.toUpperCase()||e.tagName&&"AUDIO"===e.tagName.toUpperCase())},cancelable:!1},focus:{bubbles:!1,cancelable:!1},focusin:{bubbles:!0,cancelable:!1},focusout:{bubbles:!0,cancelable:!1},input:{bubbles:!0,cancelable:!1},keydown:{bubbles:!0,cancelable:!1},keypress:{bubbles:!0,cancelable:!1},keyup:{bubbles:!0,cancelable:!1},load:{bubbles:!1,cancelable:!1},loadend:{bubbles:!1,cancelable:!1},loadstart:{bubbles:!1,cancelable:!1},message:{bubbles:!1,cancelable:!1},mousedown:{bubbles:!0,cancelable:!0},mouseenter:{bubbles:!1,cancelable:!1},mouseleave:{bubbles:!1,cancelable:!1},mousemove:{bubbles:!0,cancelable:!0},mouseout:{bubbles:!0,cancelable:!0},mouseover:{bubbles:!0,cancelable:!0},mouseup:{bubbles:!0,cancelable:!0},mousewheel:{bubbles:!0},orientationchange:{bubbles:!1},paste:{bubbles:!0,cancelable:!0},progress:{bubbles:!1,cancelable:!1},reset:{bubbles:!0,cancelable:!1},resize:{bubbles:!1,cancelable:!1},scroll:{bubbles:function(e){return!!e.defaultView},cancelable:!1},select:{bubbles:!0,cancelable:!1},submit:{bubbles:!0,cancelable:!0},touchcancel:{bubbles:!0,cancelable:!1},touchend:{bubbles:!0,cancelable:!0},touchmove:{bubbles:!0,cancelable:!0},touchstart:{bubbles:!0,cancelable:!0},unload:{bubbles:!1,cancelable:!1},wheel:{bubbles:!0,cancelable:!0},pointerdown:{bubbles:!0,cancelable:!0},pointerup:{bubbles:!0,cancelable:!0},pointerenter:{bubbles:!1,cancelable:!0},pointercancel:{bubbles:!0,cancelable:!0},pointerout:{bubbles:!0,cancelable:!0},pointerover:{bubbles:!0,cancelable:!0},pointerleave:{bubbles:!1,cancelable:!0},pointermove:{bubbles:!0,cancelable:!0},MSPointerDown:{bubbles:!0,cancelable:!0},MSPointerMove:{bubbles:!0,cancelable:!0},MSPointerUp:{bubbles:!0,cancelable:!0},MSPointerOver:{bubbles:!0,cancelable:!0},MSPointerOut:{bubbles:!0,cancelable:!0},MSPointerHover:{bubbles:!0,cancelable:!0}}},_DOMPasteboardElement:{value:null,enumerable:!1},_delegate:{value:null,enumerable:!1},delegate:{enumerable:!1,get:function(){return this._delegate},set:function(e){this._delegate=e}},_application:{value:null,enumerable:!1},application:{enumerable:!1,get:function(){return this._application},set:function(e){this._application=e}},_registeredWindows:{value:null,enumerable:!1},_windowsAwaitingFinalRegistration:{value:{},enumerable:!1},initWithWindow:{enumerable:!1,value:function(e){if(this._registeredWindows)throw"EventManager has already been initialized";return this.registerWindow(e),this}},registerWindow:{enumerable:!1,value:function(e){if(e.defaultEventManager&&e.defaultEventManager!==this)throw"EventManager cannot register a window already registered to another EventManager";if(this._registeredWindows&&this._registeredWindows.indexOf(e)>=0)throw"EventManager cannot register a window more than once";if(this._registeredWindows||(this._registeredWindows=[]),e.uuid&&0!==e.uuid.length||(e.uuid=r.generate()),this._windowsAwaitingFinalRegistration[e.uuid]!==e){if(e.Element.prototype.nativeAddEventListener=e.Element.prototype.addEventListener,Object.defineProperty(e,"nativeAddEventListener",{configurable:!0,value:e.addEventListener}),Object.getPrototypeOf(e.document).nativeAddEventListener=e.document.addEventListener,e.XMLHttpRequest.prototype.nativeAddEventListener=e.XMLHttpRequest.prototype.addEventListener,e.Worker&&(e.Worker.prototype.nativeAddEventListener=e.Worker.prototype.addEventListener),e.MediaController&&(e.MediaController.prototype.nativeAddEventListener=e.MediaController.prototype.addEventListener),e.Element.prototype.nativeRemoveEventListener=e.Element.prototype.removeEventListener,Object.defineProperty(e,"nativeRemoveEventListener",{configurable:!0,value:e.removeEventListener}),Object.getPrototypeOf(e.document).nativeRemoveEventListener=e.document.removeEventListener,e.XMLHttpRequest.prototype.nativeRemoveEventListener=e.XMLHttpRequest.prototype.removeEventListener,e.Worker&&(e.Worker.prototype.nativeRemoveEventListener=e.Worker.prototype.removeEventListener),e.MediaController&&(e.MediaController.prototype.nativeRemoveEventListener=e.MediaController.prototype.removeEventListener),Object.defineProperty(e,"addEventListener",{configurable:!0,value:e.XMLHttpRequest.prototype.addEventListener=e.Element.prototype.addEventListener=Object.getPrototypeOf(e.document).addEventListener=function(t,n,i){return e.defaultEventManager.registerEventListener(this,t,n,!!i)}}),e.Worker&&(e.Worker.prototype.addEventListener=e.addEventListener),e.MediaController&&(e.MediaController.prototype.addEventListener=e.addEventListener),Object.defineProperty(e,"removeEventListener",{configurable:!0,value:e.XMLHttpRequest.prototype.removeEventListener=e.Element.prototype.removeEventListener=Object.getPrototypeOf(e.document).removeEventListener=function(t,n,i){return e.defaultEventManager.unregisterEventListener(this,t,n,!!i)}}),e.Worker&&(e.Worker.prototype.removeEventListener=e.removeEventListener),e.MediaController&&(e.MediaController.prototype.removeEventListener=e.removeEventListener),e.HTMLDivElement.prototype.addEventListener!==e.Element.prototype.nativeAddEventListener&&e.HTMLElement&&"addEventListener"in e.HTMLElement.prototype){var o,a,s=Object.getOwnPropertyNames(e),u=0,l=s.length;for(u;l>u;u++)o=s[u],o.match(/^HTML\w*Element$/)&&"function"==typeof o&&(a=o.prototype,a.nativeAddEventListener=a.addEventListener,a.addEventListener=e.Element.prototype.addEventListener,a.nativeRemoveEventListener=a.removeEventListener,a.removeEventListener=e.Element.prototype.removeEventListener)}i.defineProperty(e.Element.prototype,"eventHandlerUUID",{value:void 0,enumerable:!1}),i.defineProperty(e.Element.prototype,"component",{get:function(){return n._elementEventHandlerByUUID[this.eventHandlerUUID]},enumerable:!1}),n=e.defaultEventManager=t.defaultEventManager=this,this._registeredWindows.push(e),this._windowsAwaitingFinalRegistration[e.uuid]=e,/loaded|complete|interactive/.test(e.document.readyState)?this._finalizeWindowRegistration(e):e.document.addEventListener("DOMContentLoaded",this,!0)}}},_finalizeWindowRegistration:{enumerable:!1,value:function(e){if(this._windowsAwaitingFinalRegistration[e.uuid]!==e)throw"EventManager wasn't expecting to register this window";delete this._windowsAwaitingFinalRegistration[e.uuid],this._listenToWindow(e)}},unregisterWindow:{enumerable:!1,value:function(e){if(0>this._registeredWindows.indexOf(e))throw"EventManager cannot unregister an unregistered window";if(this._registeredWindows=this._registeredWindows.filter(function(t){return e!==t}),delete e.defaultEventManager,e.Element.prototype.addEventListener=e.Element.prototype.nativeAddEventListener,Object.defineProperty(e,"addEventListener",{configurable:!0,value:e.nativeAddEventListener}),Object.getPrototypeOf(e.document).addEventListener=e.document.nativeAddEventListener,e.XMLHttpRequest.prototype.addEventListener=e.XMLHttpRequest.prototype.nativeAddEventListener,e.Worker&&(e.Worker.prototype.addEventListener=e.Worker.prototype.nativeAddEventListener),e.Element.prototype.removeEventListener=e.Element.prototype.nativeRemoveEventListener,Object.defineProperty(e,"removeEventListener",{configurable:!0,value:e.nativeRemoveEventListener}),Object.getPrototypeOf(e.document).removeEventListener=e.document.nativeRemoveEventListener,e.XMLHttpRequest.prototype.removeEventListener=e.XMLHttpRequest.prototype.nativeRemoveEventListener,e.Worker&&(e.Worker.prototype.removeEventListener=e.Worker.prototype.nativeRemoveEventListener),e.HTMLDivElement.prototype.nativeAddEventListener!==e.Element.prototype.addEventListener&&e.HTMLElement&&"addEventListener"in e.HTMLElement.prototype&&e.Components&&e.Components.interfaces){var t,n;for(t in Components.interfaces)t.match(/^nsIDOMHTML\w*Element$/)&&(t=t.replace(/^nsIDOM/,""),(t=window[t])&&(n=t.prototype,n.addEventListener=n.nativeAddEventListener,delete n.nativeAddEventListener,n.removeEventListener=n.nativeRemoveEventListener,delete n.nativeRemoveEventListener))}delete e.Element.prototype.nativeAddEventListener,delete e.nativeAddEventListener,delete Object.getPrototypeOf(e.document).nativeAddEventListener,delete e.XMLHttpRequest.prototype.nativeAddEventListener,e.Worker&&delete e.Worker.prototype.nativeAddEventListener,delete e.Element.prototype.nativeRemoveEventListener,delete e.nativeRemoveEventListener,delete Object.getPrototypeOf(e.document).nativeRemoveEventListener,delete e.XMLHttpRequest.prototype.nativeRemoveEventListener,e.Worker&&delete e.Worker.prototype.nativeRemoveEventListener,delete e.Element.prototype.eventHandlerUUID,delete e.Element.prototype.component,this._stopListeningToWindow(e)}},unregisterWindows:{enumerable:!1,value:function(){this._registeredWindows.forEach(this.unregisterWindow)}},registeredEventListeners:{enumerable:!1,value:{}},registeredEventListenersForEventType_:{value:function(e){var t,n,i,r,o=this.registeredEventListeners[e];if(!o)return null;r={};for(t in o){n=o[t].listeners;for(i in n)r[i]=n[i]}return r}},registeredEventListenersForEventType_onTarget_:{enumerable:!1,value:function(e,t,n){var i,r;return i=t===n?n.eventManager.registeredEventListeners[e]:this.registeredEventListeners[e],i&&t?(r=i[t.uuid],r?r.listeners:null):null}},registeredEventListenersOnTarget_:{value:function(e){var t,n,i=[];for(t in this.registeredEventListeners)n=this.registeredEventListeners[t],e.uuid in n&&i.push(n);return i}},registerEventListener:{enumerable:!1,value:function(e,t,n,i){var r,o,a,s=this.registeredEventListeners[t],u=!1,l=!1;if(e.uuid===void 0)throw Error("EventManager cannot observe a target without a uuid: "+(e.outerHTML||e));return s?((r=s[e.uuid])||((r=s[e.uuid]=h.checkoutRegistration()).target=e,u=!0),o=r.listeners[n.uuid],a=i?"capture":"bubble",o?(o[a]=!0,l=!0):(r.listeners[n.uuid]=d.checkoutRegistration().initWithListener(n,i,!i),l=!0)):(s=this.registeredEventListeners[t]={},(s[e.uuid]=h.checkoutRegistration()).target=e,s[e.uuid].listeners[n.uuid]=d.checkoutRegistration().initWithListener(n,i,!i),u=!0,l=!0),u&&"function"==typeof e.nativeAddEventListener&&this._observeTarget_forEventType_(e,t),l}},unregisterEventListener:{enumerable:!1,value:function(e,t,n,i){var r,o,a,s,u,l=this.registeredEventListeners[t];if(l&&(r=l[e.uuid])){if(o=r.listeners[n.uuid],!o){for(s in r.listeners)if(u=r.listeners[s].listener,u.originalListener&&u.originalListener.uuid===n.uuid){o=r.listeners[s],n=u;break}if(!o)return}a=i?"capture":"bubble",o[a]=!1,o.bubble||o.capture||(d.checkinRegistration(r.listeners[n.uuid]),delete r.listeners[n.uuid],0===Object.keys(r.listeners).length&&(delete l[e.uuid],h.checkinRegistration(r),0===Object.keys(l).length&&(delete this.registeredEventListeners[t],this._stopObservingTarget_forEventType_(e,t))))}}},actualDOMTargetForEventTypeOnTarget:{value:function(e,t){if(t.nativeAddEventListener){if(t.defaultView)return t;var n,i=this.eventDefinitions[e];return i?(n=typeof i.bubbles===g?i.bubbles(t):i.bubbles,n?t.screen?t.document:t.ownerDocument:t):t}return null}},_observedTarget_byEventType_:{value:{}},_observeTarget_forEventType_:{enumerable:!1,value:function(e,t){var n;!(n=this.actualDOMTargetForEventTypeOnTarget(t,e))||this._observedTarget_byEventType_[t]&&this._observedTarget_byEventType_[t][n.uuid]||(this._observedTarget_byEventType_[t]||(this._observedTarget_byEventType_[t]={}),this._observedTarget_byEventType_[t][n.uuid]=this,n.nativeAddEventListener(t,this,!0))}},_stopObservingTarget_forEventType_:{enumerable:!1,value:function(e,t){var n;n=this.actualDOMTargetForEventTypeOnTarget(t,e),n&&(delete this._observedTarget_byEventType_[t][n.uuid],n.nativeRemoveEventListener(t,this,!0))}},_activationHandler:{enumerable:!0,value:null},_listenToWindow:{enumerable:!1,value:function(e){if(!this._activationHandler){var t=this;this._activationHandler=function(e){var n;if(e.changedTouches){n=e.changedTouches.length;for(var i=0;n>i;i++)t._prepareComponentsForActivation(e.changedTouches[i].target)}else t._prepareComponentsForActivation(e.target)}}if(window.PointerEvent?(e.nativeAddEventListener("pointerdown",this._activationHandler,!0),e.nativeAddEventListener("pointerenter",this._activationHandler,!0)):window.MSPointerEvent&&window.navigator.msPointerEnabled?(e.nativeAddEventListener("MSPointerDown",this._activationHandler,!0),e.document.nativeAddEventListener("mouseenter",this._activationHandler,!0)):(e.nativeAddEventListener("touchstart",this._activationHandler,!0),e.nativeAddEventListener("mousedown",this._activationHandler,!0),e.document.nativeAddEventListener("mouseenter",this._activationHandler,!0)),e.nativeAddEventListener("focus",this._activationHandler,!0),this.application){var n,i=this.registeredEventListenersOnTarget_(this.application);for(n in i)this._observeTarget_forEventType_(e,n)}}},_stopListeningToWindow:{enumerable:!1,value:function(e){var t,n,i=this.registeredEventListenersOnTarget_(this.application),r=this.registeredEventListenersOnTarget_(e);for(t in i)this._stopObservingTarget_forEventType_(e,t);for(t in r)this._stopObservingTarget_forEventType_(e,t);(n=this._listeningWindowOnTouchCancel.indexOf(e))>-1&&this._listeningWindowOnTouchCancel.splice(n,1)}},reset:{enumerable:!1,value:function(){var e,t,n,i;for(e in this.registeredEventListeners){t=this.registeredEventListeners[e];for(n in t.targets)i=t.targets[n],this._stopObservingTarget_forEventType_(i.target,e)}this.registeredEventListeners={},this._claimedPointers={}}},unload:{enumerable:!1,value:function(){this._stopListening()}},methodNameForBubblePhaseOfEventType:{enumerable:!1,value:function(e,t){return function(n,i){var r;return i?(r=t[n]||(t[n]=Object.create(null)),r[i]||(r[i]="handle"+i.toCapitalized()+n.toCapitalized())):e[n]||(e[n]="handle"+n.toCapitalized())}}(Object.create(null),Object.create(null))},_methodNameForCapturePhaseByEventType_:{value:{}},methodNameForCapturePhaseOfEventType:{enumerable:!1,value:function(e,t){return function(n,i){var r;return i?(r=t[n]||(t[n]=Object.create(null)),r[i]||(r[i]="capture"+i.toCapitalized()+n.toCapitalized())):e[n]||(e[n]="capture"+n.toCapitalized())}}(Object.create(null),Object.create(null))},_claimedPointers:{enumerable:!1,distinct:!0,value:{}},componentClaimingPointer:{value:function(e){return this._claimedPointers[e]}},isPointerClaimedByComponent:{value:function(e,t){if(!t)throw"Must specify a valid component to see if it claims the specified pointer, '"+t+"' is not valid.";return this._claimedPointers[e]===t}},claimPointer:{value:function(e,t){if(!e&&0!==e)throw"Must specify a valid pointer to claim, '"+e+"' is not valid.";if(!t)throw"Must specify a valid component to claim a pointer, '"+t+"' is not valid.";var n=this._claimedPointers[e];return n===t?!0:n?n.surrenderPointer(e,t)?(this._claimedPointers[e]=t,!0):!1:(this._claimedPointers[e]=t,!0)}},forfeitPointer:{value:function(e,t){if(t!==this._claimedPointers[e])throw"Not allowed to forfeit pointer '"+e+"' claimed by another component";delete this._claimedPointers[e]}},forfeitAllPointers:{value:function(e){var t,n;for(t in this._claimedPointers)n=this._claimedPointers[t],e===n&&delete this._claimedPointers[t]}},_isStoringPointerEvents:{enumerable:!1,value:!1},isStoringPointerEvents:{enumerable:!0,get:function(){return this._isStoringPointerEvents},set:function(e){e===!0?this._isStoringPointerEvents||(this._isStoringPointerEvents=!0,window.PointerEvent||window.MSPointerEvent&&window.navigator.msPointerEnabled?Object.defineProperty(o.prototype,"velocity",{get:function(){return n.pointerMotion(this.pointerId).velocity}}):window.Touch&&Object.defineProperty(Touch.prototype,"velocity",{get:function(){return n.pointerMotion(this.identifier).velocity}})):(this._isStoringPointerEvents=!1,this._pointerStorage.memory={},this._isMouseDragging=!1)}},_isStoringMouseEventsWhileDraggingOnly:{enumerable:!1,value:!0},isStoringMouseEventsWhileDraggingOnly:{enumerable:!0,get:function(){return this._isStoringMouseEventsWhileDraggingOnly},set:function(e){this._isStoringMouseEventsWhileDraggingOnly=e===!0?!0:!1}},_isMouseDragging:{enumerable:!1,value:!1},_pointerStorage:{enumerable:!1,value:{memory:{},add:function(e,t){this.memory[e]||(this.memory[e]={data:Array(32),size:0,pos:0}),this.memory[e].data[this.memory[e].pos]=t,this.memory[e].size<this.memory[e].data.length&&this.memory[e].size++,this.memory[e].pos=(this.memory[e].pos+1)%this.memory[e].data.length},remove:function(e){delete this.memory[e]},clear:function(e){this.memory[e]&&(this.memory[e].size=0)},getMemory:function(e){return this.memory[e]},isStored:function(e){return this.memory[e]&&this.memory[e].size>0},storeEvent:function(e){var t=!!(window.PointerEvent||window.MSPointerEvent&&window.navigator.msPointerEnabled),i=e instanceof o?e._event:e;if(t&&("mouse"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_MOUSE)||!t&&i instanceof MouseEvent)switch(e.type){case"pointerdown":case"MSPointerDown":case"mousedown":n._isMouseDragging=!0;case"pointermove":case"MSPointerMove":case"mousemove":n._isStoringMouseEventsWhileDraggingOnly?n._isMouseDragging&&this._storeMouse(e):this._storeMouse(e);break;case"pointerup":case"MSPointerUp":case"mouseup":this._storeMouse(e)}else if(t&&("touch"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_TOUCH)||void 0!==window.TouchEvent&&!t&&i instanceof TouchEvent)switch(e.type){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":this._storeTouch(e.pointerId,e.clientX,e.clientY,e.timeStamp);break;case"touchstart":case"touchmove":this._storeTouches(e.touches,e.timeStamp);break;case"touchend":this._storeTouches(e.changedTouches,e.timeStamp)}},removeEvent:function(e){var t=!!(window.PointerEvent||window.MSPointerEvent&&window.navigator.msPointerEnabled),i=e instanceof o?e._event:e;if(t&&("mouse"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_MOUSE)||!t&&i instanceof MouseEvent)("mouseup"===e.type||"pointerup"===e.type||"MSPointerUp"===e.type)&&(n._isMouseDragging=!1,n._isStoringMouseEventsWhileDraggingOnly&&this.clear("mouse"));else if((t&&("touch"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_TOUCH)||void 0!==window.TouchEvent&&!t&&i instanceof TouchEvent)&&("touchend"===e.type||"pointerup"===e.type||"MSPointerUp"===e.type))if(e.changedTouches)for(var r=0;e.changedTouches.length>r;r++)this.remove(e.changedTouches[r].identifier);else this.remove(e.pointerId)},_storeMouse:function(e){this.add("mouse",{clientX:e.clientX,clientY:e.clientY,timeStamp:e.timeStamp}),Object.defineProperty(e,"velocity",{get:function(){return n.pointerMotion("mouse").velocity}})},_storeTouches:function(e,t){for(var n,i=0;e.length>i;i++)n=e[i],this._storeTouch(n.identifier,n.clientX,n.clientY,t)},_storeTouch:function(e,t,n,i){this.add(e,{clientX:t,clientY:n,timeStamp:i})}}},_getPointerVelocityData:{enumerable:!1,value:function(e){var t,i,r,o,a,s,u,l,c,h=0,d=!0,p={x:[],y:[],time:[]};for(t=n._pointerStorage.getMemory(e),i=t.data.length,r=t.data[(t.pos-1+i)%i],o=a=s=r.timeStamp,u=r.clientX,l=r.clientY;d&&a>o-350&&t.size>h;)r=t.data[(t.pos-h-1+i)%i],a=r.timeStamp,c=u*u+l*l,c>2&&50>=s-a?(p.x.push(r.clientX),p.y.push(r.clientY),p.time.push(a),s=a,u=r.clientX,l=r.clientY,h++):d=!1;return p}},_fitPointerCurve:{enumerable:!1,value:function(e,t){var n,i,r,o,a,s,u,l,c,h,d,p,v,m,f,g,_,y,b,E,w,P,M,T,S,O,C,D,L,I,A,x,R,N,k,Y,j,z,F=1e-4,X=t.length;do{for(d=0,p=0,v=0,m=0,f=0,g=0,y=0,b=0,E=0,w=0,P=0,M=0,S=0,O=0,C=0,D=0,L=0,I=0,x=0,R=0,N=0,k=0,Y=0,j=0,h=0;X>h;h++)a=t[h],s=a.t,l=s*s,c=l*s,u=a.v,_=F*(6*(l-s)-c+2),T=6*F*(c-2*l+s),A=6*F*(l-c),z=2*F*c,g+=_*_,M+=T*T,I+=A*A,j+=z*z,d+=u*_,y+=u*T,S+=u*A,x+=u*z,v-=_,E-=T,C-=A,N-=z,p-=_*s,b-=T*s,O-=A*s,R-=z*s,m-=_*l,w-=T*l,D-=A*l,k-=z*l,f-=_*c,P-=T*c,L-=A*c,Y-=z*c;F*=2}while(0===g||0===M||0===I||0===j);for(s=F/g,d*=s,p*=3*s,v*=s,m*=3*s,f*=s,s=F/M,y*=s,b*=3*s,E*=s,w*=3*s,P*=s,s=F/I,S*=s,O*=3*s,C*=s,D*=3*s,L*=s,s=F/j,x*=s,R*=3*s,N*=s,k*=3*s,Y*=s,g=e[0],M=e[1],I=e[2],j=e[3],n=3*(M-I)+j-g,i=g+I-2*M,r=M-g,o=g,h=0;20>h;h++)s=d+o*v+r*p+i*m+n*f,g+=s,o+=s,n-=s,i+=s,r-=s,s=y+o*E+r*b+i*w+n*P,M+=s,n+=3*s,i-=s+s,r+=s,s=S+o*C+r*O+i*D+n*L,I+=s,n-=3*s,i+=s,s=x+o*N+r*R+i*k+n*Y,j+=s,n+=s;e[0]=g,e[1]=M,e[2]=I,e[3]=j}},_pointerBezierValue:{enumerable:!1,value:function(e,t){var n=1-e;return n*n*n*t[0]+3*n*n*e*t[1]+3*n*e*e*t[2]+e*e*e*t[3]}},_calculatePointerVelocity:{enumerable:!1,value:function(e,t){var n,i,r=e.length,o=e[0],a=e[0],s=0;for(i=1;r>i;i++)o>e[i]&&(o=e[i],s=i);if(n=a-o){if(r>5){var u,l,c,h=[];for(i=0;r>i;i++)h[i]={v:t[i],t:(e[i]-o)/n};return u=h[s].v,l=h[0].v,c=[u,(2*u+l)/3,(u+2*l)/3,l],this._fitPointerCurve(c,h),5e3*(this._pointerBezierValue(.8,c)-this._pointerBezierValue(.6,c))/n}return r>1?1e3*(t[0]-t[s])/n:0}return 0}},pointerMotion:{value:function(e){if(n._pointerStorage.isStored(e)){var t={};return Object.defineProperties(t,{_data:{enumerable:!1,writable:!0,value:null},_x:{enumerable:!1,writable:!0,value:null},_y:{enumerable:!1,writable:!0,value:null},_speed:{enumerable:!1,writable:!0,value:null},_angle:{enumerable:!1,writable:!0,value:null},x:{get:function(){return null===this._x&&(null===this._data&&(this._data=n._getPointerVelocityData(e)),this._x=n._calculatePointerVelocity(this._data.time,this._data.x)),this._x},set:function(){}},y:{get:function(){return null===this._y&&(null===this._data&&(this._data=n._getPointerVelocityData(e)),this._y=n._calculatePointerVelocity(this._data.time,this._data.y)),this._y},set:function(){}},speed:{get:function(){return null===this._speed&&(this._speed=Math.sqrt(this.x*this.x+this.y*this.y)),this._speed},set:function(){}},angle:{get:function(){return null===this._angle&&(this._angle=Math.atan2(this.y,this.x)),this._angle},set:function(){}}}),{velocity:t}}return void 0}},monitorDOMModificationInEventHandling:{value:!1},domModificationEventHandler:{value:i.specialize({handleEvent:{value:function(){throw"DOM Modified"}},captureDOMSubtreeModified:{value:function(){throw"DOMSubtreeModified"}},captureDOMAttrModified:{value:function(){throw"DOMAttrModified"}},captureDOMCharacterDataModified:{value:function(){throw"DOMCharacterDataModified"}}})},_touchNeedTracking:{value:["touchstart","touchend"]},_mouseEventTypeEmulatedList:{value:["mousedown","mouseup","click"]},_trackingTouchList:{value:null},_trackingTouchTimeoutIDs:{value:Object.create(null)},__isIOSPlatform:{value:null},_isIOSPlatform:{get:function(){return this.__isIOSPlatform=this.__isIOSPlatform||/iphone|ipod|ipad/gi.test(navigator.platform)}},_wouldTouchTriggerSimulatedEvent:{value:function(e){return this._touchNeedTracking.indexOf(e.type)>-1}},_couldEventBeSimulated:{value:function(e){return this._mouseEventTypeEmulatedList.indexOf(e.type)>-1}},_listeningWindowOnTouchCancel:{value:[]},_findWindowFromEvent:{value:function(e){var t,n=e.target;return n&&(t=n instanceof Window?n:n.defaultView instanceof Window?n.defaultView:n.ownerDocument&&n.ownerDocument.defaultView?n.ownerDocument.defaultView:null),t}},_isWindowListeningOnTouchCancel:{value:function(e){return this._registeredWindows.indexOf(e)>-1&&this._listeningWindowOnTouchCancel.indexOf(e)>-1}},_listenToTouchCancelIfNeeded:{value:function(e){var t=this._findWindowFromEvent(e);if(t&&!this._isWindowListeningOnTouchCancel(t)){var n=this;t.addEventListener("touchcancel",function(e){for(var t,i=e.changedTouches,r=n._trackingTouchList.touchesStart,o=0,a=i.length;a>o;o++)t=i[o].identifier,r[t]&&delete r[t]},!0),this._listeningWindowOnTouchCancel.push(t)}}},blocksEmulatedEvents:{value:!0},_shouldDispatchEvent:{value:function(e){if(!(!this.blocksEmulatedEvents||window.PointerEvent||window.MSPointerEvent&&window.navigator.msPointerEnabled)){if(this._isIOSPlatform)return!(0===e.timeStamp);if(this._wouldTouchTriggerSimulatedEvent(e)){var t=e.changedTouches;this._listenToTouchCancelIfNeeded(e);for(var n=0,i=t.length;i>n;n++)this._trackTouch(e,t[n].identifier)}else if(this._couldEventBeSimulated(e))return!this._isEmulatedEvent(e)}return!0}},_trackTouch:{value:function(e,t){var n=this._trackingTouchList,i=this._trackingTouchTimeoutIDs;if("touchstart"===e.type){var r=i[t];r&&(clearTimeout(r),delete i[t]),n.touchesStart[t]=e.target}else i[t]=setTimeout(function(){delete n.touchesEnd[t],delete i[t]},300),delete n.touchesStart[t],n.touchesEnd[t]=e.target}},_isEmulatedEvent:{value:function(e){var t,n=this._trackingTouchList.touchesStart,i=e.target,r=!1;for(t in n)if(r=n[t]===i)break;if(!r){n=this._trackingTouchList.touchesEnd;for(t in n)if(r=n[t]===i)break;if(r&&"click"===e.type){var o=this._trackingTouchTimeoutIDs,a=o[t];a&&(clearTimeout(a),delete n[t],delete o[t])}}return r}},handleEvent:{enumerable:!1,value:function(e){if(!this._shouldDispatchEvent(e))return void 0;this.monitorDOMModificationInEventHandling&&(document.body.addEventListener("DOMSubtreeModified",this.domModificationEventHandler,!0),document.body.addEventListener("DOMAttrModified",this.domModificationEventHandler,!0),document.body.addEventListener("DOMCharacterDataModified",this.domModificationEventHandler,!0));var t,n,i,r,a,s,u,l,c,h,d,_,y,b,E=e.type,w=e.bubbles;for("DOMContentLoaded"===E&&(t=e.target.defaultView,t&&this._windowsAwaitingFinalRegistration[t.uuid]&&(this._finalizeWindowRegistration(t),e.target.removeEventListener("DOMContentLoaded",this,!0))),b="boolean"!=typeof e.propagationStopped?o.fromEvent(e):e,c=Element.isElement(b.target)||b.target instanceof Document||b.target===window?this._eventPathForDomTarget(b.target):this._eventPathForTarget(b.target),_=b.target.identifier?this.methodNameForCapturePhaseOfEventType(E,b.target.identifier):null,y=b.target.identifier?this.methodNameForBubblePhaseOfEventType(E,b.target.identifier):null,h=this.methodNameForCapturePhaseOfEventType(E),d=this.methodNameForBubblePhaseOfEventType(E),this.delegate&&typeof this.delegate.willDistributeEvent===g&&this.delegate.willDistributeEvent(b),this._isStoringPointerEvents&&this._pointerStorage.storeEvent(b),b.eventPhase=v,n=c.length-1;!b.propagationStopped&&(i=c[n]);n--)if(b.currentTarget=i,r=this.registeredEventListenersForEventType_onTarget_(E,i))for(u=Object.keys(r),a=0;r&&!b.immediatePropagationStopped&&(s=r[u[a]]);a++)s.capture&&(l=s.listener,this._invokeTargetListenerForEvent(i,l,b,_,h));
if(!b.propagationStopped&&(b.eventPhase=m,b.currentTarget=i=b.target,r=this.registeredEventListenersForEventType_onTarget_(E,i)))for(u=Object.keys(r),a=0;r&&!b.immediatePropagationStopped&&(s=r[u[a]]);a++)l=s.listener,s.capture&&this._invokeTargetListenerForEvent(i,l,b,_,h),s.bubble&&this._invokeTargetListenerForEvent(i,l,b,y,d);for(b.eventPhase=f,n=0;w&&!b.propagationStopped&&(i=c[n]);n++)if(b.currentTarget=i,r=this.registeredEventListenersForEventType_onTarget_(E,i))for(u=Object.keys(r),a=0;r&&!b.immediatePropagationStopped&&(s=r[u[a]]);a++)s.bubble&&(l=s.listener,this._invokeTargetListenerForEvent(i,l,b,y,d));b.eventPhase=p,b.currentTarget=null,this._isStoringPointerEvents&&this._pointerStorage.removeEvent(e),this.monitorDOMModificationInEventHandling&&(document.body.removeEventListener("DOMSubtreeModified",this.domModificationEventHandler,!0),document.body.removeEventListener("DOMAttrModified",this.domModificationEventHandler,!0),document.body.removeEventListener("DOMCharacterDataModified",this.domModificationEventHandler,!0))}},_invokeTargetListenerForEvent:{value:function(e,t,n,i,r){var o;i&&typeof(o=t[i])===g||typeof(o=t[r])===g||typeof(o=t.handleEvent)===g?o.call(t,n):typeof t===g&&t.call(e,n)}},_prepareComponentsForActivation:{value:function(e){var t,n,i=e,r=i&&i.defaultView?i.defaultView:window,o=r.document?r.document:document,a=!1,s=null;do switch(i&&(n=this.eventHandlerForElement(i),n&&(a||(a=!0,s=this._findActiveTarget(n)),n.preparedForActivationEvents||n._prepareForActivationEvents())),t=i,i){case r:i=null;break;case o:i=r;break;case o.documentElement:i=o;break;default:i=i.parentNode}while(i&&t!==i);this.activeTarget=s}},_findActiveTarget:{value:function(e){for(var t=null,n={};!t&&e&&!(e.uuid in n);)n[e.uuid]=e,e.acceptsActiveTarget?t=e:e=e.nextTarget;return t}},_eventPathForTarget:{enumerable:!1,value:function(e){if(!e)return[];var t=e,n=this.application,i=[],r={};r[e.uuid]=e;do t.uuid in r||(i.push(t),r[t.uuid]=t),t=t.nextTarget,(!t||t.uuid in r)&&(t=n),t&&t.uuid in r&&(t=null);while(t);return i}},_eventPathForDomTarget:{enumerable:!1,value:function(e){if(!e)return[];var t,n=e,i=n&&n.defaultView?n.defaultView:window,r=i.document?i.document:document,o=this.application,a=[];do switch(n!==e&&a.push(n),t=n,n){case o:n=n.parentApplication,n&&(o=n);break;case i:n=o;break;case r:n=i;break;case r.documentElement:n=r;break;default:n=n.parentNode,n||(n=o)}while(n&&t!==n);return a}},_elementEventHandlerByUUID:{enumerable:!1,value:{}},registerEventHandlerForElement:{enumerable:!1,value:function(e,t){var n=this.eventHandlerForElement(t);n&&this.unregisterEventHandlerForElement(t),this._elementEventHandlerByUUID[t.eventHandlerUUID=e.uuid]=e}},unregisterEventHandlerForElement:{enumerable:!1,value:function(e){delete this._elementEventHandlerByUUID[e.eventHandlerUUID],delete e.eventHandlerUUID}},eventHandlerForElement:{enumerable:!1,value:function(e){return this._elementEventHandlerByUUID[e.eventHandlerUUID]}},_activeTarget:{value:null},activeTarget:{get:function(){return this._activeTarget||this.application},set:function(e){e||(e=this.application),e===this._activeTarget||this.activeTarget&&!this.activeTarget.surrendersActiveTarget(e)||(e.willBecomeActiveTarget(this.activeTarget),this._activeTarget=e,e.didBecomeActiveTarget())}}})}}});