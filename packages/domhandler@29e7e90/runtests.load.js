montageDefine("29e7e90","runtests",{dependencies:["fs","path","assert","htmlparser2","./"],factory:function(e){function t(e,n){if(i.equal(typeof e,typeof n,"types didn't match"),"object"!=typeof e||null===e)i.strictEqual(e,n,"result doesn't equal expected");else for(var r in e)i.ok(r in n,"result didn't contain property "+r),t(e[r],n[r])}var n=e("fs"),r=e("path"),i=e("assert"),a=e("htmlparser2").Parser,s=e("./"),o=r.resolve(__dirname,"tests"),l=5;n.readdirSync(o).filter(RegExp.prototype.test,/\.json$/).map(function(e){return r.resolve(o,e)}).map(e).forEach(function(e){console.log("Testing:",e.name);for(var n=new s(function(n,r){i.ifError(n),t(e.expected,r)},e.options.handler),r=e.html,o=new a(n,e.options.parser),c=0;r.length>c;c+=l)o.write(r.substring(c,c+l));o.done(),o.parseComplete(r)}),console.log("\nAll tests passed!")}});