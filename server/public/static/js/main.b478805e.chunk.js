(this["webpackJsonpsuccess-client"]=this["webpackJsonpsuccess-client"]||[]).push([[0],{24:function(e,t,a){e.exports=a(34)},29:function(e,t,a){},34:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(20),c=a.n(o),r=a(1),i=(a(29),a(9)),s=a(2),u=function(){var e=Object(n.useContext)(O),t=e.state,a=e.dispatch,o=Object(i.e)();return l.a.createElement("div",null,l.a.createElement("nav",{style:{background:"#1f1f2e"}},l.a.createElement("div",{className:"nav-wrapper"},l.a.createElement(s.b,{to:t?"/":"/signin",className:"left brand-logo",style:{paddingLeft:"11px",fontFamily:"Galada"}},"Cw!"),l.a.createElement("ul",{id:"nav-mobile",className:"right",style:{paddingRight:"8px"}},t?[l.a.createElement("li",null,l.a.createElement(s.b,{to:"/createPost"},l.a.createElement("i",{className:"material-icons"},"add_a_photo"))),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/profile"},l.a.createElement("i",{className:"material-icons"},"person"))),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/followingPost"},l.a.createElement("i",{className:"material-icons"},"person_add"))),l.a.createElement("button",{className:"waves-effect waves-light btn",onClick:function(){localStorage.clear(),a({type:"CLEAR"}),o.push("/signin")}},"Logout")]:[l.a.createElement("li",null,l.a.createElement(s.b,{to:"/signin"},"LOGIN")),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/signup"},"SIGNUP"))]))))},m=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useContext)(O),i=c.state;c.dispatch;Object(n.useEffect)((function(){fetch("/allpost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e),o(e.posts)}))}),[]);return l.a.createElement("div",{className:"home"},a.map((function(e){return l.a.createElement("div",{className:"card home-card",key:e._id},l.a.createElement("h5",{style:{padding:"15px",fontFamily:"Permanent Marker"}},l.a.createElement(s.b,{style:{color:"black"},to:e.postedBy._id!==i._id?"/profile/"+e.postedBy._id:"/profile"},e.postedBy.name.toUpperCase())," ",e.postedBy._id===i._id&&l.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:function(){return t=e._id,void fetch("/deletepost/".concat(t),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=a.filter((function(t){return t._id!==e._id}));o(t)}));var t}},"delete")),l.a.createElement("div",{className:"card-image"},l.a.createElement("img",{src:e.photo,alt:"image here"})),l.a.createElement("div",{className:"card-content"},e.likes.includes(i._id)?l.a.createElement("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/unlike",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){var t=a.map((function(t){return t._id===e._id?e:t}));o(t)})).catch((function(e){console.log(e)})),window.location.reload()},style:{color:"red"}},"favorite"):l.a.createElement("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/like",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){var t=a.map((function(t){return t._id===e._id?e:t}));o(t)})).catch((function(e){console.log(e)})),window.location.reload()},style:{color:"#bfbfbf"}},"favorite"),l.a.createElement("h6",null,e.likes.length," likes"),l.a.createElement("h6",null,e.title),l.a.createElement("p",null,e.body),e.comments.map((function(e){return l.a.createElement("h6",{key:e._id},l.a.createElement("span",{style:{fontWeight:"500"}},e.postedBy.name)," ",e.text)})),l.a.createElement("form",{onSubmit:function(t){var n,l;t.preventDefault(),n=t.target[0].value,l=e._id,fetch("/comment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:l,text:n})}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=a.map((function(t){return t._id===e._id?e:t}));o(t)})).catch((function(e){console.log(e)}))}},l.a.createElement("input",{type:"text",placeholder:"add a comment"}))))})))},d=a(4),p=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useContext)(O),i=c.state,s=c.dispatch,u=Object(n.useState)(void 0),m=Object(r.a)(u,2),p=m[0],f=m[1];Object(n.useEffect)((function(){fetch("/mypost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e),o(e.posts)}))}),[]),Object(n.useEffect)((function(){if(p){var e=new FormData;e.append("file",p),e.append("upload_preset","chatWow"),e.append("cloud_name","jackent2b"),fetch("https://api.cloudinary.com/v1_1/jackent2b/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){fetch("/updatepic",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({pic:e.url})}).then((function(e){return e.json()})).then((function(e){console.log(e),localStorage.setItem("user",JSON.stringify(Object(d.a)(Object(d.a)({},i),{},{pic:e.pic}))),s({type:"UPDATEPIC",payload:e.pic})}))})).catch((function(e){console.log(e)}))}}),[p]);return l.a.createElement("div",{style:{maxWidth:"550px",margin:"0px auto"}},l.a.createElement("div",{style:{margin:"18px 0px",borderBottom:"1px solid grey"}},l.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},l.a.createElement("div",null,l.a.createElement("img",{style:{width:"160px",height:"160px",borderRadius:"80px"},src:i?i.pic:"loading"})),l.a.createElement("div",null,l.a.createElement("h4",{style:{paddingLeft:"10px",fontFamily:"Permanent Marker"}},i?i.name.toUpperCase():"loading"),l.a.createElement("h5",{style:{paddingLeft:"10px"}},i?i.email:"loading"),l.a.createElement("div",{style:{paddingLeft:"10px",display:"flex",justifyContent:"space-between",width:"108%"}},l.a.createElement("h6",null,a.length," posts"),l.a.createElement("h6",null,i?i.followers.length:0," Followers"),l.a.createElement("h6",null,i?i.following.length:0," Following")))),l.a.createElement("div",{className:"file-field input-field",style:{margin:"10px"}},l.a.createElement("div",{className:"waves-effect waves-light btn"},l.a.createElement("span",null,"Update pic"),l.a.createElement("input",{type:"file",onChange:function(e){return t=e.target.files[0],void f(t);var t}})),l.a.createElement("div",{className:"file-path-wrapper"},l.a.createElement("input",{className:"file-path validate",type:"text"})))),l.a.createElement("div",{className:"gallery"},a.map((function(e){return l.a.createElement("img",{key:e._id,className:"item",src:e.photo,alt:e.title})}))))},f=a(7),h=a.n(f),g=function(){var e=Object(n.useContext)(O),t=(e.state,e.dispatch),a=Object(i.e)(),o=l.a.useState(""),c=Object(r.a)(o,2),u=c[0],m=c[1],d=l.a.useState(""),p=Object(r.a)(d,2),f=p[0],g=p[1];return l.a.createElement("div",null,l.a.createElement("div",{className:"card auth-card"},l.a.createElement("h4",{style:{fontFamily:"Galada"}},"Welcome to ChatWow"),l.a.createElement("h2",{style:{fontFamily:"Galada"}},"Login"),l.a.createElement("input",{type:"text",placeholder:"Email",value:u,onChange:function(e){return m(e.target.value)}}),l.a.createElement("input",{type:"password",placeholder:"Password",value:f,onChange:function(e){return g(e.target.value)}}),l.a.createElement("button",{className:"waves-effect waves-light btn",onClick:function(){fetch("/signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,password:f})}).then((function(e){return e.json()})).then((function(e){console.log(e),e.message?h.a.toast({html:e.message,classes:"#c62828 red darken-3"}):e.error?h.a.toast({html:e.error,classes:"#c62828 red darken-3"}):(localStorage.setItem("jwt",e.token),localStorage.setItem("user",JSON.stringify(e.user)),t({type:"USER",payload:e.user}),h.a.toast({html:"Successfully SignedIn!",classes:"#43a047 green darken-1"}),a.push("/"))})).catch((function(e){console.log(e)}))}},"Login"),l.a.createElement("div",{style:{paddingTop:"10px",fontFamily:"Galada"}},"Don't have an account? ",l.a.createElement(s.b,{to:"/signup"},"Sign up"))))},y=function(){var e=Object(i.e)(),t=Object(n.useState)(""),a=Object(r.a)(t,2),o=a[0],c=a[1],u=Object(n.useState)(""),m=Object(r.a)(u,2),d=m[0],p=m[1],f=Object(n.useState)(""),g=Object(r.a)(f,2),y=g[0],E=g[1],b=Object(n.useState)(""),v=Object(r.a)(b,2),j=v[0],w=v[1],O=Object(n.useState)(void 0),S=Object(r.a)(O,2),N=S[0],x=S[1];Object(n.useEffect)((function(){N&&C()}),[N]);var C=function(){/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(y)?fetch("/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:o,password:d,email:y,pic:N})}).then((function(e){return e.json()})).then((function(t){t.error?h.a.toast({html:t.error,classes:"#c62828 red darken-3"}):(h.a.toast({html:t.message,classes:"#43a047 green darken-1"}),e.push("/signin"))})).catch((function(e){console.log(e)})):h.a.toast({html:"invalid email",classes:"#c62828 red darken-3"})},_=function(){j?function(){var e=new FormData;e.append("file",j),e.append("upload_preset","new-insta"),e.append("cloud_name","cnq"),fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){x(e.url)})).catch((function(e){console.log(e)}))}():C()};return l.a.createElement("div",{className:"mycard"},l.a.createElement("div",{className:"card auth-card input-field"},l.a.createElement("h4",{style:{fontFamily:"Galada"}},"Welcome to ChatWow"),l.a.createElement("h2",{style:{fontFamily:"Galada"}},"Signup"),l.a.createElement("input",{type:"text",placeholder:"name",value:o,onChange:function(e){return c(e.target.value)}}),l.a.createElement("input",{type:"text",placeholder:"email",value:y,onChange:function(e){return E(e.target.value)}}),l.a.createElement("input",{type:"password",placeholder:"password",value:d,onChange:function(e){return p(e.target.value)}}),l.a.createElement("div",{className:"file-field input-field"},l.a.createElement("div",{className:"waves-effect waves-light btn"},l.a.createElement("span",null,"Upload pic"),l.a.createElement("input",{type:"file",onChange:function(e){return w(e.target.files[0])}})),l.a.createElement("div",{className:"file-path-wrapper"},l.a.createElement("input",{className:"file-path validate",type:"text"}))),l.a.createElement("button",{className:"waves-effect waves-light btn",onClick:function(){return _()}},"SignUP"),l.a.createElement("div",{style:{paddingTop:"10px",fontFamily:"Galada"}},"Already have an Account? ",l.a.createElement(s.b,{to:"/signin"},"Login"))))},E=a(23),b=function(){var e=Object(n.useState)(null),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(!0),s=Object(r.a)(c,2),u=s[0],m=s[1],p=Object(n.useContext)(O),f=(p.state,p.dispatch),h=Object(i.f)().userid;Object(n.useEffect)((function(){fetch("/profile/".concat(h),{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e),o(e)}))}),[]);return l.a.createElement(l.a.Fragment,null,a?l.a.createElement("div",{style:{maxWidth:"550px",margin:"0px auto"}},l.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}},l.a.createElement("div",null,l.a.createElement("img",{style:{width:"150px",height:"150px",borderRadius:"80px"},alt:"avatar",src:a.user.pic})),l.a.createElement("div",null,l.a.createElement("h4",{style:{paddingLeft:"10px",fontFamily:"Permanent Marker"}},a.user.name),l.a.createElement("h5",null,a.user.email),l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",width:"90%"}},l.a.createElement("h6",null,a.posts.length," posts"),l.a.createElement("h6",null,a.user.followers.length," followers"),l.a.createElement("h6",null,a.user.following.length," following")),u?l.a.createElement("button",{style:{margin:"10px"},className:"waves-effect waves-light btn",onClick:function(){fetch("/follow",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({followId:h})}).then((function(e){return e.json()})).then((function(e){f({type:"UPDATE",payload:{following:e.following,followers:e.followers}}),localStorage.setItem("user",JSON.stringify(e)),o((function(t){return Object(d.a)(Object(d.a)({},t),{},{user:Object(d.a)(Object(d.a)({},t.user),{},{followers:[].concat(Object(E.a)(t.user.followers),[e._id])})})})),m(!1)}))}},"Follow"):l.a.createElement("button",{style:{margin:"10px"},className:"waves-effect waves-light btn",onClick:function(){fetch("/unfollow",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({unfollowId:h})}).then((function(e){return e.json()})).then((function(e){f({type:"UPDATE",payload:{following:e.following,followers:e.followers}}),localStorage.setItem("user",JSON.stringify(e)),o((function(t){var a=t.user.followers.filter((function(t){return t!==e._id}));return Object(d.a)(Object(d.a)({},t),{},{user:Object(d.a)(Object(d.a)({},t.user),{},{followers:a})})})),m(!0)}))}},"UnFollow"))),l.a.createElement("div",{className:"gallery"},a.posts.map((function(e){return l.a.createElement("img",{key:e._id,className:"item",src:e.photo,alt:e.title})})))):l.a.createElement("h2",{style:{textAlign:"center",fontFamily:"Galada"}},"loading...!"))},v=function(){var e=Object(i.e)(),t=l.a.useState(""),a=Object(r.a)(t,2),o=a[0],c=a[1],s=l.a.useState(""),u=Object(r.a)(s,2),m=u[0],d=u[1],p=l.a.useState(""),f=Object(r.a)(p,2),g=f[0],y=f[1],E=l.a.useState(""),b=Object(r.a)(E,2),v=b[0],j=b[1];Object(n.useEffect)((function(){v&&fetch("/createpost",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({title:o,body:m,photo:v})}).then((function(e){return e.json()})).then((function(t){console.log(t),t.error?h.a.toast({html:t.error,classes:"#c62828 red darken-3"}):(h.a.toast({html:"Post Created Successfully!",classes:"#43a047 green darken-1"}),e.push("/"))})).catch((function(e){console.log(e)}))}),[v]);return l.a.createElement("div",null,l.a.createElement("div",{className:"card auth-card"},l.a.createElement("h2",{style:{fontFamily:"Galada"}},"Create Post"),l.a.createElement("input",{type:"text",placeholder:"Title",value:o,onChange:function(e){return c(e.target.value)}}),l.a.createElement("input",{type:"text",placeholder:"Content",value:m,onChange:function(e){return d(e.target.value)}}),l.a.createElement("div",{className:"file-field input-field"},l.a.createElement("div",{className:"btn"},l.a.createElement("span",null,"Add Images"),l.a.createElement("input",{type:"file",multiple:!0,onChange:function(e){return y(e.target.files[0])}})),l.a.createElement("div",{className:"file-path-wrapper"},l.a.createElement("input",{className:"file-path validate",type:"text",placeholder:"Upload one or more files"}))),l.a.createElement("button",{className:"waves-effect waves-light btn",onClick:function(){return function(){var e=new FormData;e.append("file",g),e.append("upload_preset","chatWow"),e.append("cloud_name","jackent2b"),fetch("https://api.cloudinary.com/v1_1/jackent2b/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){return j(e.secure_url)})).catch((function(e){return console.log(e)}))}()}},"Post")))},j=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),a=t[0],o=t[1],c=Object(n.useContext)(O),i=c.state;c.dispatch;Object(n.useEffect)((function(){fetch("/getsubpost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e),o(e.posts)}))}),[]);return l.a.createElement("div",{className:"home"},a.map((function(e){return l.a.createElement("div",{className:"card home-card",key:e._id},l.a.createElement("h5",{style:{padding:"15px",fontFamily:"Permanent Marker"}},l.a.createElement(s.b,{style:{color:"black"},to:e.postedBy._id!==i._id?"/profile/"+e.postedBy._id:"/profile"},e.postedBy.name.toUpperCase())," ",e.postedBy._id===i._id&&l.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:function(){return t=e._id,void fetch("/deletepost/".concat(t),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=a.filter((function(t){return t._id!==e._id}));o(t)}));var t}},"delete")),l.a.createElement("div",{className:"card-image"},l.a.createElement("img",{src:e.photo,alt:"avatar"})),l.a.createElement("div",{className:"card-content"},l.a.createElement("i",{className:"material-icons",style:{color:"red"}},"favorite"),e.likes.includes(i._id)?l.a.createElement("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/unlike",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){var t=a.map((function(t){return t._id===e._id?e:t}));o(t)})).catch((function(e){console.log(e)})),window.location.reload()}},"thumb_down"):l.a.createElement("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/like",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){var t=a.map((function(t){return t._id===e._id?e:t}));o(t)})).catch((function(e){console.log(e)})),window.location.reload()}},"thumb_up"),l.a.createElement("h6",null,e.likes.length," likes"),l.a.createElement("h6",null,e.title),l.a.createElement("p",null,e.body),e.comments.map((function(e){return l.a.createElement("h6",{key:e._id},l.a.createElement("span",{style:{fontWeight:"500"}},e.postedBy.name)," ",e.text)})),l.a.createElement("form",{onSubmit:function(t){var n,l;t.preventDefault(),n=t.target[0].value,l=e._id,fetch("/comment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:l,text:n})}).then((function(e){return e.json()})).then((function(e){console.log(e);var t=a.map((function(t){return t._id===e._id?e:t}));o(t)})).catch((function(e){console.log(e)}))}},l.a.createElement("input",{type:"text",placeholder:"add a comment"}))))})))},w=function(e,t){return"USER"===t.type?t.payload:"CLEAR"===t.type?null:"UPDATEPIC"===t.type?Object(d.a)(Object(d.a)({},e),{},{pic:t.payload}):"UPDATE"===t.type?Object(d.a)(Object(d.a)({},e),{},{followers:t.payload.followers,following:t.payload.following}):e},O=Object(n.createContext)(),S=function(){var e=Object(i.e)(),t=Object(n.useContext)(O),a=(t.state,t.dispatch);return Object(n.useEffect)((function(){var t=JSON.parse(localStorage.getItem("user"));t?a({type:"USER",payload:t}):e.push("/signin")}),[]),l.a.createElement("div",null,l.a.createElement(i.a,{exact:!0,path:"/"},l.a.createElement(m,null)),l.a.createElement(i.a,{path:"/createPost"},l.a.createElement(v,null)),l.a.createElement(i.a,{exact:!0,path:"/profile"},l.a.createElement(p,null)),l.a.createElement(i.a,{path:"/signin"},l.a.createElement(g,null)),l.a.createElement(i.a,{path:"/signup"},l.a.createElement(y,null)),l.a.createElement(i.a,{path:"/profile/:userid"},l.a.createElement(b,null)),l.a.createElement(i.a,{path:"/followingPost"},l.a.createElement(j,null)))},N=function(){var e=Object(n.useReducer)(w,null),t=Object(r.a)(e,2),a=t[0],o=t[1];return l.a.createElement(O.Provider,{value:{state:a,dispatch:o}},l.a.createElement(s.a,null,l.a.createElement(u,null),l.a.createElement(S,null)))};c.a.render(l.a.createElement(N,null),document.querySelector("#root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.b478805e.chunk.js.map