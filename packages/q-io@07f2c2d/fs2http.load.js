montageDefine("07f2c2d","fs2http",{dependencies:["q","./http","url"],factory:function(e,t){function n(e){var s=Object.create(n.prototype);return s.request=function(t){return i.when(t,function(t){t=r.normalizeRequest(t);var n=a.parse(t.url);if("file:"!==n.protocol)return{status:404,headers:{},body:["Can't access protocol "+n.protocol]};var i=n.pathname;return e.open(i,{charset:t.charset}).then(function(e){return{status:200,headers:{},body:e}})})},s.read=function(e,n){return n=n||function(e){return 200===e.status},i.when(t.request(e),function(e){if(!n(e)){var t=Error("HTTP request failed with code "+e.status);throw t.response=e,t}return i.invoke(e.body,"read")})},s}var i=e("q"),r=e("./http"),a=e("url");t.Client=n,t.request=function(t){return i.fcall(e.async||e,"./fs").then(function(e){return n(e).request(t)})},t.read=function(t){return i.fcall(e.async||e,"./fs").then(function(e){return n(e).read(t)})}}});