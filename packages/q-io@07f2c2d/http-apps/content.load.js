montageDefine("07f2c2d","http-apps/content",{dependencies:["q","./negotiate","qs","url2"],factory:function(e,t){var n=e("q"),i=e("./negotiate"),r=e("qs"),a=e("url2");t.Content=function(e,n,i){return function(){return t.content(e,n,i)}},t.content=t.ok=function(e,t,n){return n=n||200,e=e||"","string"==typeof e&&(e=[e]),t=t||"text/plain",{status:n,headers:{"content-type":t},body:e}},t.ContentRequest=function(e){return function(t,i){return n.when(t.body.read(),function(n){return e(n,t,i)})}},t.Inspect=function(e){return i.Method({GET:function(t,i){return n.when(e(t,i),function(e){return{status:200,headers:{"content-type":"text/plain"},body:[inspect(e)]}})}})},t.ParseQuery=function(e){return function(t,n){return t.query=r.parse(a.parse(t.url).query||""),e(t,n)}}}});