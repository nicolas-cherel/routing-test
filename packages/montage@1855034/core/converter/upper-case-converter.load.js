montageDefine("1855034","core/converter/upper-case-converter",{dependencies:["../core","./converter"],factory:function(e,t){e("../core").Montage;var n=e("./converter").Converter;t.UpperCaseConverter=n.specialize({_convert:{value:function(e){return e&&"string"==typeof e?e.toUpperCase?e.toUpperCase():e:e}},convert:{value:function(e){return this._convert(e)}},revert:{value:function(e){return this._convert(e)}}})}});