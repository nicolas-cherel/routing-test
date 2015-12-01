var Montage=require("../../core").Montage,Reviver=require("mousse/deserialization/reviver").Reviver,PropertiesDeserializer=require("./properties-deserializer").PropertiesDeserializer,SelfDeserializer=require("./self-deserializer").SelfDeserializer,UnitDeserializer=require("./unit-deserializer").UnitDeserializer,ModuleReference=require("../../module-reference").ModuleReference,Alias=require("../alias").Alias,Promise=require("../../promise").Promise,ModuleLoader=Montage.specialize({_require:{value:null},_objectRequires:{value:null},init:{value:function(e,t){if("function"!=typeof e)throw Error("Function 'require' missing.");if("string"!=typeof e.location)throw Error("Function 'require' location is missing");if("object"!=typeof t&&t!==void 0)throw Error("Parameter 'objectRequires' should be an object.");return this._require=e,this._objectRequires=t,this}},getExports:{value:function(e,t){var n;for(t=e.resolve(t),n=e.getModuleDescriptor(t);void 0!==n.redirect;)n=e.getModuleDescriptor(n.redirect);return void 0!==n.mappingRedirect?this.getExports(n.mappingRequire,n.mappingRedirect):n.exports}},getModule:{value:function(e,t){var n,r,i=this._objectRequires;return n=i&&t in i?i[t]:this._require,r=this.getExports(n,e),r||(r=n.async(e)),r}}}),MontageReviver=exports.MontageReviver=Montage.specialize.call(Reviver,{moduleLoader:{value:null},init:{value:function(e,t){return this.moduleLoader=(new ModuleLoader).init(e,t),this}},getTypeOf:{value:function(e){if(null!==e&&"object"==typeof e&&1===Object.keys(e).length){if("#"in e)return"Element";if("%"in e)return"Module"}return Reviver.prototype.getTypeOf.call(this,e)}},_checkLabel:{value:function(e,t){return t&&":"!==e[0]?Error('Aliases can only be defined in template properties (start with a colon (:)), "'+e+'".'):t||":"!==e[0]?void 0:Error('Only aliases are allowed as template properties (start with a colon (:), "'+e+'".')}},reviveRootObject:{value:function(e,t,n){var r,i="alias"in e;return r=this._checkLabel(n,i),r?Promise.reject(r):Reviver.prototype.reviveRootObject.apply(this,arguments)}},reviveElement:{value:function(e,t,n){var r=e["#"],i=t.getElementById(r);return i?(n&&t.setObjectLabel(i,n),i):Promise.reject(Error("Element with id '"+r+"' was not found."))}},reviveModule:{value:function(e,t){var n=e["%"],r=t.getRequire();n=r.resolve(n);var i=r.getModuleDescriptor(n);return(new ModuleReference).initWithIdAndRequire(i.id,i.require)}},reviveCustomObject:{value:function(e,t,n){return"alias"in e?this.reviveAlias(e,t,n):this.reviveMontageObject(e,t,n)}},reviveMontageObject:{value:function(e,t,n){var r,i,o,a=this,s=e.prototype||e.object;return s&&(i=MontageReviver.parseObjectLocationId(s),r=this.moduleLoader.getModule(i.moduleId,n),o=i.objectName),Promise.isPromise(r)?r.then(function(r){return a.instantiateMontageObject(e,r,o,t,n)},function(t){throw t.stack&&console.error(t.stack),Error('Error deserializing "'+n+'" when loading module "'+i.moduleId+"' from '"+e.prototype+"'")}):this.instantiateMontageObject(e,r,o,t,n)}},instantiateMontageObject:{value:function(e,t,n,r,i){var o,a,s=this;return o=this.getMontageObject(e,t,n,r,i),r.setObjectLabel(o,i),o.isDeserializing=!0,a=this.reviveObjectLiteral(e,r),Promise.isPromise(a)?a.then(function(e){return s.deserializeMontageObject(e,o,r,i)}):this.deserializeMontageObject(a,o,r,i)}},deserializeMontageObject:{value:function(e,t,n,r){var i;return"function"==typeof t.deserializeSelf?this.deserializeCustomMontageObject(t,e,n,r):(n.setUnitsToDeserialize(t,e,MontageReviver._unitNames),i=this.deserializeMontageObjectProperties(t,e.properties,n),Promise.isPromise(i)?i.then(function(){return t}):t)}},deserializeMontageObjectProperties:{value:function(e,t,n){var r;if("function"==typeof e.deserializeProperties){var i=(new PropertiesDeserializer).initWithReviverAndObjects(this,n);r=e.deserializeProperties(i)}else for(var o in t)e[o]=t[o];return r}},deserializeCustomMontageObject:{value:function(e,t,n,r){var i,o=(new SelfDeserializer).initWithObjectAndObjectDescriptorAndContextAndUnitNames(e,t,n,MontageReviver._unitNames);return i=e.deserializeSelf(o),Promise.isPromise(i)?i.then(function(e){return n.setObjectLabel(e,r),e}):i!==void 0?(n.setObjectLabel(i,r),i):e}},getMontageObject:{value:function(e,t,n,r,i){var o;if(r.hasUserObject(i))return r.getUserObject(i);if("prototype"in e){if(!(n in t))throw Error('Error deserializing "'+i+'": object named "'+n+'"'+' was not found in "'+e.prototype+'".'+" Available objects are: "+Object.keys(t)+".");return o=Object.create(t[n].prototype),o.isDeserializing=!0,"function"==typeof o.didCreate?o.didCreate():"function"==typeof o.constructor&&o.constructor(),o}if("object"in e){if(!(n in t))throw Error('Error deserializing "'+i+'": object named "'+o+"' was not found given '"+e.object+"'");return t[n]}throw Error("Error deserializing "+JSON.stringify(e)+', might need "prototype" or "object" on label '+JSON.stringify(i))}},reviveAlias:{value:function(e,t,n){var r=new Alias;return r.value=e.alias,t.setObjectLabel(r,n),r}},didReviveObjects:{value:function(e,t){var n,r=this;return n=this._deserializeUnits(t),Promise.isPromise(n)?n.then(function(){r._invokeDeserializedFromSerialization(e,t)}):(this._invokeDeserializedFromSerialization(e,t),void 0)}},_invokeDeserializedFromSerialization:{value:function(e,t){var n;for(var r in e)n=e[r],null!=n&&delete n.isDeserializing,t.hasUserObject(r)||n&&"function"==typeof n.deserializedFromSerialization&&n.deserializedFromSerialization(r)}},_deserializeUnits:{value:function(e){var t,n,r=e.getUnitsToDeserialize(),i=MontageReviver._unitRevivers;try{for(var o,a=0;o=r[a];a++){t=o.unitNames;for(var s,l=0;s=t[l];l++)s in o.objectDesc&&(n=(new UnitDeserializer).initWithContext(e),i[s](n,o.object,o.objectDesc[s]))}}catch(u){return Promise.reject(u)}}}},{_unitRevivers:{value:Object.create(null)},_unitNames:{value:[]},_findObjectNameRegExp:{value:/([^\/]+?)(\.reel)?$/},_toCamelCaseRegExp:{value:/(?:^|-)([^-])/g},_replaceToCamelCase:{value:function(e,t){return t.toUpperCase()}},_locationDescCache:{value:Object.create(null)},parseObjectLocationId:{value:function(e){var t,n,r,i,o=this._locationDescCache;return e in o?t=o[e]:(n=e.indexOf("["),n>0?(r=e.substr(0,n),i=e.slice(n+1,-1)):(r=e,this._findObjectNameRegExp.test(e),i=RegExp.$1.replace(this._toCamelCaseRegExp,this._replaceToCamelCase)),t={moduleId:r,objectName:i},o[e]=t),t}},defineUnitReviver:{value:function(e,t){this._unitRevivers[e]=t,this._unitNames.push(e)}},getTypeOf:{value:function(e){return this.prototype.getTypeOf.call(this,e)}}});"undefined"!=typeof exports&&(exports.MontageReviver=MontageReviver);