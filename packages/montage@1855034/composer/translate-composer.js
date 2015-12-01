var Composer=require("./composer").Composer,defaultEventManager=require("../core/event/event-manager").defaultEventManager,TranslateComposer=exports.TranslateComposer=Composer.specialize({constructor:{value:function TranslateComposer(){this.super()}},_NATIVE_ELEMENTS:{value:["A","IFRAME","EMBED","OBJECT","VIDEO","AUDIO","CANVAS","LABEL","INPUT","BUTTON","SELECT","TEXTAREA","KEYGEN","DETAILS","COMMAND"]},_WHEEL_POINTER:{value:"wheel",writable:!1},enabled:{value:!0},_externalUpdate:{value:!0},isAnimating:{value:!1},isMoving:{value:!1},frame:{value:function(){this.isAnimating&&this._animationInterval(),this._externalUpdate=!1}},_pointerSpeedMultiplier:{value:1},pointerSpeedMultiplier:{get:function(){return this._pointerSpeedMultiplier},set:function(e){this._pointerSpeedMultiplier=e}},pointerStartEventPosition:{value:null},_shouldDispatchTranslate:{value:!1},_isSelfUpdate:{value:!1},_allowFloats:{value:!1},allowFloats:{get:function(){return this._allowFloats},set:function(e){this._allowFloats!==e&&(this._allowFloats=e,this.translateX=this._translateX,this.translateY=this._translateY)}},allowTranslateOuterExtreme:{value:!1},_translateX:{value:0},translateX:{get:function(){return this._translateX},set:function(e){if("vertical"===this._axis)this._translateX=this._minTranslateX||0;else{var t=isNaN(e)?0:this._allowFloats?parseFloat(e):e>>0;null!==this._minTranslateX&&this._minTranslateX>t&&(t=this._minTranslateX),null!==this._maxTranslateX&&t>this._maxTranslateX&&(t=this._maxTranslateX),this._isSelfUpdate||(this.isAnimating=!1),this._translateX=t}}},_translateY:{value:0},translateY:{get:function(){return this._translateY},set:function(e){if("horizontal"===this._axis)this._translateY=this._minTranslateY||0;else{var t=isNaN(e)?0:this._allowFloats?parseFloat(e):e>>0;null!==this._minTranslateY&&this._minTranslateY>t&&(t=this._minTranslateY),null!==this._maxTranslateY&&t>this._maxTranslateY&&(t=this._maxTranslateY),this._isSelfUpdate||(this.isAnimating=!1),this._translateY=t}}},_minTranslateX:{value:null},minTranslateX:{get:function(){return this._minTranslateX},set:function(e){null!==e&&(e=parseFloat(e)),this._minTranslateX!==e&&(null!==e&&e>this._translateX&&(this.translateX=e),this._minTranslateX=e)}},_maxTranslateX:{value:null},maxTranslateX:{get:function(){return this._maxTranslateX},set:function(e){null!==e&&(e=parseFloat(e)),this._maxTranslateX!==e&&(null!==e&&this._translateX>e&&(this.translateX=e),this._maxTranslateX=e)}},_minTranslateY:{value:null},minTranslateY:{get:function(){return this._minTranslateY},set:function(e){null!==e&&(e=parseFloat(e)),this._minTranslateY!==e&&(null!==e&&e>this._translateY&&(this.translateY=e),this._minTranslateY=e)}},_maxTranslateY:{value:null},maxTranslateY:{get:function(){return this._maxTranslateY},set:function(e){null!==e&&(e=parseFloat(e)),this._maxTranslateY!==e&&(null!==e&&this._translateY>e&&(this.translateY=e),this._maxTranslateY=e)}},_axis:{value:"both"},axis:{get:function(){return this._axis},set:function(e){switch(e){case"vertical":case"horizontal":this._axis=e,this.translateX=this._translateX,this.translateY=this._translateY;break;default:this._axis="both"}}},invertAxis:{depends:["invertXAxis","invertYAxis"],get:function(){return this._invertXAxis===this._invertYAxis?this._invertXAxis:null},set:function(e){this.invertXAxis=e,this.invertYAxis=e}},_invertXAxis:{value:!1},invertXAxis:{get:function(){return this._invertXAxis},set:function(e){this._invertXAxis=!!e}},_invertYAxis:{value:!1},invertYAxis:{get:function(){return this._invertYAxis},set:function(e){this._invertYAxis=!!e}},_hasMomentum:{value:!0},hasMomentum:{get:function(){return this._hasMomentum},set:function(e){this._hasMomentum=e?!0:!1}},__momentumDuration:{value:650},_momentumDuration:{get:function(){return this.__momentumDuration},set:function(e){this.__momentumDuration=isNaN(e)?1:e>>0,1>this.__momentumDuration&&(this.__momentumDuration=1)}},_pointerX:{value:null},_pointerY:{value:null},_touchIdentifier:{value:null},_isFirstMove:{value:!1},_observedPointer:{value:null},eventManager:{get:function(){return defaultEventManager}},_mouseRadiusThreshold:{value:5},_touchRadiusThreshold:{value:12},_listenToWheelEvent:{value:!1},listenToWheelEvent:{set:function(e){e=!!e,this._listenToWheelEvent!==e&&(this._listenToWheelEvent=e,this._isLoaded&&(e?this._addWheelEventListener():this._removeWheelEventListener()))},get:function(){return this._listenToWheelEvent}},_claimPointerPolicy:{value:null},claimPointerPolicy:{set:function(e){(e===TranslateComposer.CLAIM_POINTER_POLICIES.DEFAULT||e===TranslateComposer.CLAIM_POINTER_POLICIES.MOVE)&&(this._claimPointerPolicy=e)},get:function(){return this._claimPointerPolicy||(this._claimPointerPolicy=TranslateComposer.CLAIM_POINTER_POLICIES.DEFAULT),this._claimPointerPolicy}},load:{value:function(){window.PointerEvent?this._element.addEventListener("pointerdown",this,!0):window.MSPointerEvent&&window.navigator.msPointerEnabled?this._element.addEventListener("MSPointerDown",this,!0):(this._element.addEventListener("touchstart",this,!0),this._element.addEventListener("mousedown",this,!0)),this._listenToWheelEvent&&this._addWheelEventListener(),this.eventManager.isStoringPointerEvents=!0}},unload:{value:function(){window.PointerEvent?this._element.removeEventListener("pointerdown",this,!0):window.MSPointerEvent&&window.navigator.msPointerEnabled?this._element.removeEventListener("MSPointerDown",this,!0):(this._element.removeEventListener("touchstart",this,!0),this._element.removeEventListener("mousedown",this,!0)),this._listenToWheelEvent&&this._removeWheelEventListener()}},surrenderPointer:{value:function(){var e=!0;return e&&this.isMoving&&this._releaseInterest(),e}},addEventListener:{value:function(e,t,n){Composer.addEventListener.call(this,e,t,n),"translate"===e&&(this._shouldDispatchTranslate=!0)}},capturePointerdown:{value:function(e){"mouse"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_MOUSE?this.captureMousedown(e):("touch"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_TOUCH)&&this.captureTouchstart(e)}},capturePointermove:{value:function(e){"mouse"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_MOUSE?this.captureMousemove(e):("touch"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_TOUCH)&&this.captureTouchmove(e)}},handlePointerup:{value:function(e){"mouse"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_MOUSE?this.handleMouseup(e):("touch"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_TOUCH)&&this.handleTouchend(e)}},handlePointercancel:{value:function(e){("touch"===e.pointerType||window.MSPointerEvent&&e.pointerType===window.MSPointerEvent.MSPOINTER_TYPE_TOUCH)&&this.handleTouchcancel(e)}},captureMousedown:{value:function(e){this.enabled&&0===e.button&&(this._observedPointer="mouse",this._start(e.clientX,e.clientY,e.target,e.timeStamp))}},captureMousemove:{value:function(e){this.enabled&&this._handleMove(e)}},handleMouseup:{value:function(e){this.enabled&&this._end(e)}},captureTouchstart:{value:function(e){if(this.enabled&&null===this._observedPointer)if(void 0!==e.pointerId)this._observedPointer=e.pointerId,this._start(e.clientX,e.clientY,e.target,e.timeStamp),this._preventDefaultIfNeeded(e);else{var t=e.targetTouches;if(t&&1===t.length){var n=t[0];this._preventDefaultIfNeeded(e),this._observedPointer=n.identifier,this._start(n.clientX,n.clientY,n.target,e.timeStamp)}}}},captureTouchmove:{value:function(e){if(this.enabled)if(void 0!==e.pointerId)this._handleMove(e);else{var t=this._findObservedTouch(e.changedTouches);t&&this._handleMove(e,t)}}},handleTouchend:{value:function(e){if(this.enabled)if(void 0!==e.pointerId)this._end(e);else{var t=this._findObservedTouch(e.changedTouches);t&&this._end(t)}}},handleTouchcancel:{value:function(e){if(this.enabled)if(void 0!==e.pointerId)this._cancel(e);else{var t=this._findObservedTouch(e.changedTouches);t&&this._cancel(t)}}},captureScroll:{value:function(e){e.target.contains(this.element)&&this._cancel(e)}},_shouldPreventDefault:{value:function(e){return!!e.target.tagName&&-1===TranslateComposer._NATIVE_ELEMENTS.indexOf(e.target.tagName)&&!e.target.isContentEditable}},_preventDefaultIfNeeded:{value:function(e){!e.defaultPrevented&&this._shouldPreventDefault(e)&&e.preventDefault()}},_addWheelEventListener:{value:function(){if(this._element){var e=window.onwheel!==void 0||window.WheelEvent!==void 0?"wheel":"mousewheel";this._element.addEventListener(e,this,!1),this._element.addEventListener(e,this,!0)}}},_removeWheelEventListener:{value:function(){if(this._element){var e=window.onwheel!==void 0||window.WheelEvent!==void 0?"wheel":"mousewheel";this._element.removeEventListener(e,this,!1),this._element.removeEventListener(e,this,!0)}}},_start:{value:function(e,t,n,i){this.pointerStartEventPosition={pageX:e,pageY:t,target:n,timeStamp:i},this._pointerX=e,this._pointerY=t,window.PointerEvent?(document.addEventListener("pointermove",this,!0),document.addEventListener("pointerup",this,!1),document.addEventListener("pointercancel",this,!1)):window.MSPointerEvent&&window.navigator.msPointerEnabled?(document.addEventListener("MSPointerMove",this,!0),document.addEventListener("MSPointerUp",this,!1),document.addEventListener("MSPointerCancel",this,!1)):"mouse"===this._observedPointer?(document.addEventListener("mousemove",this,!0),document.addEventListener("mouseup",this,!1)):(this._element.addEventListener("touchmove",this,!0),this._element.addEventListener("touchend",this,!1),this._element.addEventListener("touchcancel",this,!1)),document.addEventListener("scroll",this,!0),this.isAnimating&&(this.isAnimating=!1,this._dispatchTranslateEnd()),this._isFirstMove=!0}},_findObservedTouch:{value:function(e){for(var t,n=null,i=0,o=e.length;o>i&&null===n;i++)t=e[i],t.identifier===this._observedPointer&&(n=t);return n}},_handleMove:{value:function(e,t){if(t||(t=e),this._isFirstMove){var n=this.eventManager.componentClaimingPointer(this._observedPointer);if(n){var i=!0;if(this.claimPointerPolicy===TranslateComposer.CLAIM_POINTER_POLICIES.MOVE){var o="mouse"===this._observedPointer?this._mouseRadiusThreshold:this._touchRadiusThreshold,s=this.pointerStartEventPosition.pageX-t.clientX,r=this.pointerStartEventPosition.pageY-t.clientY;i=Composer.isCoordinateOutsideRadius(s,r,o)}if(!i)return e.preventDefault(),void 0}this.eventManager.claimPointer(this._observedPointer,this)}this.eventManager.isPointerClaimedByComponent(this._observedPointer,this)?(e.preventDefault(),(this.allowTranslateOuterExtreme||this._shouldMove(e,t.clientX,t.clientY))&&(this._isFirstMove?this._firstMove():this._move(t.clientX,t.clientY))):this._releaseInterest()}},_shouldMove:{value:function(e,t,n){var i,o,s,r,a=this._translateY,l=this._translateX,u=!0;return"wheel"===e.type?("vertical"!==this._axis&&(s=20*(e.wheelDeltaY||-e.deltaY||0)/120),"horizontal"!==this._axis&&(r=20*(e.wheelDeltaY||-e.deltaY||0)/120)):("vertical"!==this._axis&&(s=-(this._invertXAxis?this._pointerX-t:t-this._pointerX)),"horizontal"!==this._axis&&(r=-(this._invertYAxis?this._pointerY-n:n-this._pointerY))),r&&(i=this._isNegativeNumber(r),null!==this.minTranslateY&&(u=a!==this.minTranslateY||a===this.minTranslateY&&i),null!==this.maxTranslateY&&u&&(u=a!==this.maxTranslateY||a===this.maxTranslateY&&!i)),s&&(o=this._isNegativeNumber(s),null!==this.minTranslateX&&u&&(u=l!==this.minTranslateX||l===this.minTranslateX&&o),null!==this.maxTranslateX&&u&&(u=l!==this.maxTranslateX||l===this.maxTranslateX&&!o)),u}},_firstMove:{value:function(){this._isFirstMove&&(this._dispatchTranslateStart(this._translateX,this._translateY),this._isFirstMove=!1,this.isMoving=!0)}},_move:{value:function(e,t){var n;this._isSelfUpdate=!0,"vertical"!==this._axis&&(n=this._invertXAxis?this._pointerX-e:e-this._pointerX,this.translateX+=n*this._pointerSpeedMultiplier),"horizontal"!==this._axis&&(n=this._invertYAxis?this._pointerY-t:t-this._pointerY,this.translateY+=n*this._pointerSpeedMultiplier),this._isSelfUpdate=!1,this._pointerX=e,this._pointerY=t,this._shouldDispatchTranslate&&this._dispatchTranslate()}},_end:{value:function(e){this.startTime=Date.now(),this.endX=this.posX=this.startX=this._translateX,this.endY=this.posY=this.startY=this._translateY;var t=e.velocity;this._hasMomentum&&(t.speed>40||this.translateStrideX||this.translateStrideY)?(this.momentumX="vertical"!==this._axis?t.x*this._pointerSpeedMultiplier*(this._invertXAxis?1:-1):0,this.momentumY="horizontal"!==this._axis?t.y*this._pointerSpeedMultiplier*(this._invertYAxis?1:-1):0,this.endX=this.startX-this.momentumX*this.__momentumDuration/2e3,this.endY=this.startY-this.momentumY*this.__momentumDuration/2e3,this.startStrideXTime=null,this.startStrideYTime=null,this.animateMomentum=!0):this.animateMomentum=!1,this.animateMomentum?this._animationInterval():this._isFirstMove||(this.isMoving=!1,this._dispatchTranslateEnd()),this._releaseInterest()}},_cancel:{value:function(){this.startTime=Date.now(),this.endX=this.posX=this.startX=this._translateX,this.endY=this.posY=this.startY=this._translateY,this.animateMomentum=!1,this._isFirstMove||(this.isMoving=!1,this._dispatchTranslateCancel()),this._releaseInterest()}},_releaseInterest:{value:function(){window.PointerEvent?(document.removeEventListener("pointermove",this,!0),document.removeEventListener("pointerup",this,!1),document.removeEventListener("pointercancel",this,!1)):window.MSPointerEvent&&window.navigator.msPointerEnabled?(document.removeEventListener("MSPointerMove",this,!0),document.removeEventListener("MSPointerUp",this,!1),document.removeEventListener("MSPointerCancel",this,!1)):"mouse"===this._observedPointer?(document.removeEventListener("mousemove",this,!0),document.removeEventListener("mouseup",this,!1)):(this._element.removeEventListener("touchmove",this,!0),this._element.removeEventListener("touchend",this,!1),this._element.removeEventListener("touchcancel",this,!1)),document.removeEventListener("scroll",this,!0),this.eventManager.isPointerClaimedByComponent(this._observedPointer,this)&&this.eventManager.forfeitPointer(this._observedPointer,this),this._observedPointer=null,this._isFirstMove=!1,this.isMoving=!1}},_isAxisMovement:{value:function(e){var t,n,i,o,s,r,a,l=e.velocity,u=.7853981633974483,h=2.356194490192345,c=-2.356194490192345,d=-.7853981633974483;if("both"===this.axis)return!0;if(!l||0===l.speed||isNaN(l.speed)?(r=this.pointerStartEventPosition.pageX-e.clientX,a=this.pointerStartEventPosition.pageY-e.clientY,s=Math.atan2(a,r)):s=l.angle,"horizontal"===this.axis){if(i=u>=s&&s>=d,o=s>=h||c>=s,i||o)return!0}else if("vertical"===this.axis&&(t=d>=s&&s>=c,n=s>=u&&h>=s,t||n))return!0;return!1}},_translateEndTimeout:{value:null},_handleWheelTimeout:{value:null},_isNegativeNumber:{value:function(e){return e=+e,isNaN(e)||(e=1/e),0>e}},captureWheel:{value:function(e){this._shouldMove(e)?this.eventManager.isPointerClaimedByComponent(this._WHEEL_POINTER,this)||this.eventManager.claimPointer(this._WHEEL_POINTER,this):this.eventManager.isPointerClaimedByComponent(this._WHEEL_POINTER,this)&&this.eventManager.forfeitPointer(this._WHEEL_POINTER,this)}},handleWheel:{value:function(e){if(this.enabled&&this.eventManager.isPointerClaimedByComponent(this._WHEEL_POINTER,this)){if(this._translateEndTimeout?window.clearTimeout(this._translateEndTimeout):this._dispatchTranslateStart(),this.translateY=this._translateY-20*(e.wheelDeltaY||-e.deltaY||0)/120,this.isMoving=!0,this._dispatchTranslate(),"function"!=typeof this._handleWheelTimeout){var t=function(){this._translateEndTimeout=null,this._dispatchTranslateEnd(),this.isMoving=!1,this.eventManager.isPointerClaimedByComponent(this._WHEEL_POINTER,this)&&this.eventManager.forfeitPointer(this._WHEEL_POINTER,this)};this._handleWheelTimeout=t.bind(this)}this._translateEndTimeout=window.setTimeout(this._handleWheelTimeout,400),e.preventDefault()}}},_bezierTValue:{value:function(e,t,n,i,o){var s,r,a,l,u=1-3*i+3*t,h=3*i-6*t,c=3*t,d=.5;for(r=0;10>r;r++)l=d*d,s=3*u*l+2*h*d+c,a=1-d,d-=(3*(a*a*d*t+a*l*i)+l*d-e)/s;return l=d*d,a=1-d,3*(a*a*d*n+a*l*o)+l*d}},_dispatchTranslateStart:{value:function(e,t){var n=document.createEvent("CustomEvent");n.initCustomEvent("translateStart",!0,!0,null),n.translateX=e,n.translateY=t,n.scroll=0,n.pointer=this._observedPointer,this.dispatchEvent(n)}},_dispatchTranslateEnd:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("translateEnd",!0,!0,null),e.translateX=this._translateX,e.translateY=this._translateY,e.scroll=0,this.dispatchEvent(e)}},_dispatchTranslateCancel:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("translateCancel",!0,!0,null),e.translateX=this._translateX,e.translateY=this._translateY,e.scroll=0,this.dispatchEvent(e)}},_dispatchTranslate:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("translate",!0,!0,null),e.translateX=this._translateX,e.translateY=this._translateY,e.scroll=0,e.pointer=this._observedPointer,this.dispatchEvent(e)}},animateBouncingX:{value:!1,enumerable:!1},startTimeBounceX:{value:!1,enumerable:!1},animateBouncingY:{value:!1,enumerable:!1},startTimeBounceY:{value:!1,enumerable:!1},animateMomentum:{value:!1,enumerable:!1},startTime:{value:null,enumerable:!1},startX:{value:null,enumerable:!1},posX:{value:null,enumerable:!1},endX:{value:null,enumerable:!1},startY:{value:null,enumerable:!1},posY:{value:null,enumerable:!1},endY:{value:null,enumerable:!1},translateStrideX:{value:null},translateStrideY:{value:null},translateStrideDuration:{value:330},_animationInterval:{value:function(){var e,t,n,i,o=Date.now(),s=!1;this.animateMomentum&&(e=o-this.startTime,this.__momentumDuration>e?(this.posX=this.startX-(this.momentumX+this.momentumX*(this.__momentumDuration-e)/this.__momentumDuration)*e/1e3/2,this.posY=this.startY-(this.momentumY+this.momentumY*(this.__momentumDuration-e)/this.__momentumDuration)*e/1e3/2,this.translateStrideX&&null===this.startStrideXTime&&(this.__momentumDuration-e<this.translateStrideDuration||Math.abs(this.posX-this.endX)<.75*this.translateStrideX)&&(this.startStrideXTime=o),this.translateStrideY&&null===this.startStrideYTime&&(this.__momentumDuration-e<this.translateStrideDuration||Math.abs(this.posY-this.endY)<.75*this.translateStrideY)&&(this.startStrideYTime=o)):this.animateMomentum=!1),t=Math.round(this.endX/this.translateStrideX),this.startStrideXTime&&o-this.startStrideXTime>0&&(o-this.startStrideXTime<this.translateStrideDuration?(e=this._bezierTValue((o-this.startStrideXTime)/this.translateStrideDuration,.275,0,.275,1),this.posX=this.posX*(1-e)+t*this.translateStrideX*e,s=!0):this.posX=t*this.translateStrideX),t=Math.round(this.endY/this.translateStrideY),this.startStrideYTime&&o-this.startStrideYTime>0&&(o-this.startStrideYTime<this.translateStrideDuration?(e=this._bezierTValue((o-this.startStrideYTime)/this.translateStrideDuration,.275,0,.275,1),this.posY=this.posY*(1-e)+t*this.translateStrideY*e,s=!0):this.posY=t*this.translateStrideY),n=this.posX,i=this.posY,this._isSelfUpdate=!0,this.translateX=n,this.translateY=i,this._shouldDispatchTranslate&&this._dispatchTranslate(),this._isSelfUpdate=!1,this.isAnimating=this.animateMomentum||s,this.isAnimating?this.needsFrame=!0:this._dispatchTranslateEnd()}}},{CLAIM_POINTER_POLICIES:{value:{DEFAULT:"default",MOVE:"move"}}});TranslateComposer.prototype.captureMSPointerDown=TranslateComposer.prototype.capturePointerdown,TranslateComposer.prototype.captureMSPointerMove=TranslateComposer.prototype.capturePointermove,TranslateComposer.prototype.handleMSPointerUp=TranslateComposer.prototype.handlePointerup,TranslateComposer.prototype.handleMSPointerCancel=TranslateComposer.prototype.handlePointercancel,TranslateComposer.prototype.handleMousewheel=TranslateComposer.prototype.handleWheel;