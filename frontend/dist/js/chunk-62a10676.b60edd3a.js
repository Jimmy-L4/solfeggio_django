(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62a10676"],{"00d8":function(e,t){(function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(e,t){return e<<t|e>>>32-t},rotr:function(e,t){return e<<32-t|e>>>t},endian:function(e){if(e.constructor==Number)return 16711935&n.rotl(e,8)|4278255360&n.rotl(e,24);for(var t=0;t<e.length;t++)e[t]=n.endian(e[t]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],n=0,r=0;n<e.length;n++,r+=8)t[r>>>5]|=e[n]<<24-r%32;return t},wordsToBytes:function(e){for(var t=[],n=0;n<32*e.length;n+=8)t.push(e[n>>>5]>>>24-n%32&255);return t},bytesToHex:function(e){for(var t=[],n=0;n<e.length;n++)t.push((e[n]>>>4).toString(16)),t.push((15&e[n]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],n=0;n<e.length;n+=2)t.push(parseInt(e.substr(n,2),16));return t},bytesToBase64:function(e){for(var n=[],r=0;r<e.length;r+=3)for(var a=e[r]<<16|e[r+1]<<8|e[r+2],i=0;i<4;i++)8*r+6*i<=8*e.length?n.push(t.charAt(a>>>6*(3-i)&63)):n.push("=");return n.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],r=0,a=0;r<e.length;a=++r%4)0!=a&&n.push((t.indexOf(e.charAt(r-1))&Math.pow(2,-2*a+8)-1)<<2*a|t.indexOf(e.charAt(r))>>>6-2*a);return n}};e.exports=n})()},"044b":function(e,t){function n(e){return!!e.constructor&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"===typeof e.readFloatLE&&"function"===typeof e.slice&&n(e.slice(0,0))}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},6821:function(e,t,n){(function(){var t=n("00d8"),r=n("9a634").utf8,a=n("044b"),i=n("9a634").bin,o=function(e,n){e.constructor==String?e=n&&"binary"===n.encoding?i.stringToBytes(e):r.stringToBytes(e):a(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||e.constructor===Uint8Array||(e=e.toString());for(var s=t.bytesToWords(e),c=8*e.length,u=1732584193,l=-271733879,d=-1732584194,f=271733878,p=0;p<s.length;p++)s[p]=16711935&(s[p]<<8|s[p]>>>24)|4278255360&(s[p]<<24|s[p]>>>8);s[c>>>5]|=128<<c%32,s[14+(c+64>>>9<<4)]=c;var g=o._ff,m=o._gg,h=o._hh,v=o._ii;for(p=0;p<s.length;p+=16){var b=u,y=l,T=d,S=f;u=g(u,l,d,f,s[p+0],7,-680876936),f=g(f,u,l,d,s[p+1],12,-389564586),d=g(d,f,u,l,s[p+2],17,606105819),l=g(l,d,f,u,s[p+3],22,-1044525330),u=g(u,l,d,f,s[p+4],7,-176418897),f=g(f,u,l,d,s[p+5],12,1200080426),d=g(d,f,u,l,s[p+6],17,-1473231341),l=g(l,d,f,u,s[p+7],22,-45705983),u=g(u,l,d,f,s[p+8],7,1770035416),f=g(f,u,l,d,s[p+9],12,-1958414417),d=g(d,f,u,l,s[p+10],17,-42063),l=g(l,d,f,u,s[p+11],22,-1990404162),u=g(u,l,d,f,s[p+12],7,1804603682),f=g(f,u,l,d,s[p+13],12,-40341101),d=g(d,f,u,l,s[p+14],17,-1502002290),l=g(l,d,f,u,s[p+15],22,1236535329),u=m(u,l,d,f,s[p+1],5,-165796510),f=m(f,u,l,d,s[p+6],9,-1069501632),d=m(d,f,u,l,s[p+11],14,643717713),l=m(l,d,f,u,s[p+0],20,-373897302),u=m(u,l,d,f,s[p+5],5,-701558691),f=m(f,u,l,d,s[p+10],9,38016083),d=m(d,f,u,l,s[p+15],14,-660478335),l=m(l,d,f,u,s[p+4],20,-405537848),u=m(u,l,d,f,s[p+9],5,568446438),f=m(f,u,l,d,s[p+14],9,-1019803690),d=m(d,f,u,l,s[p+3],14,-187363961),l=m(l,d,f,u,s[p+8],20,1163531501),u=m(u,l,d,f,s[p+13],5,-1444681467),f=m(f,u,l,d,s[p+2],9,-51403784),d=m(d,f,u,l,s[p+7],14,1735328473),l=m(l,d,f,u,s[p+12],20,-1926607734),u=h(u,l,d,f,s[p+5],4,-378558),f=h(f,u,l,d,s[p+8],11,-2022574463),d=h(d,f,u,l,s[p+11],16,1839030562),l=h(l,d,f,u,s[p+14],23,-35309556),u=h(u,l,d,f,s[p+1],4,-1530992060),f=h(f,u,l,d,s[p+4],11,1272893353),d=h(d,f,u,l,s[p+7],16,-155497632),l=h(l,d,f,u,s[p+10],23,-1094730640),u=h(u,l,d,f,s[p+13],4,681279174),f=h(f,u,l,d,s[p+0],11,-358537222),d=h(d,f,u,l,s[p+3],16,-722521979),l=h(l,d,f,u,s[p+6],23,76029189),u=h(u,l,d,f,s[p+9],4,-640364487),f=h(f,u,l,d,s[p+12],11,-421815835),d=h(d,f,u,l,s[p+15],16,530742520),l=h(l,d,f,u,s[p+2],23,-995338651),u=v(u,l,d,f,s[p+0],6,-198630844),f=v(f,u,l,d,s[p+7],10,1126891415),d=v(d,f,u,l,s[p+14],15,-1416354905),l=v(l,d,f,u,s[p+5],21,-57434055),u=v(u,l,d,f,s[p+12],6,1700485571),f=v(f,u,l,d,s[p+3],10,-1894986606),d=v(d,f,u,l,s[p+10],15,-1051523),l=v(l,d,f,u,s[p+1],21,-2054922799),u=v(u,l,d,f,s[p+8],6,1873313359),f=v(f,u,l,d,s[p+15],10,-30611744),d=v(d,f,u,l,s[p+6],15,-1560198380),l=v(l,d,f,u,s[p+13],21,1309151649),u=v(u,l,d,f,s[p+4],6,-145523070),f=v(f,u,l,d,s[p+11],10,-1120210379),d=v(d,f,u,l,s[p+2],15,718787259),l=v(l,d,f,u,s[p+9],21,-343485551),u=u+b>>>0,l=l+y>>>0,d=d+T>>>0,f=f+S>>>0}return t.endian([u,l,d,f])};o._ff=function(e,t,n,r,a,i,o){var s=e+(t&n|~t&r)+(a>>>0)+o;return(s<<i|s>>>32-i)+t},o._gg=function(e,t,n,r,a,i,o){var s=e+(t&r|n&~r)+(a>>>0)+o;return(s<<i|s>>>32-i)+t},o._hh=function(e,t,n,r,a,i,o){var s=e+(t^n^r)+(a>>>0)+o;return(s<<i|s>>>32-i)+t},o._ii=function(e,t,n,r,a,i,o){var s=e+(n^(t|~r))+(a>>>0)+o;return(s<<i|s>>>32-i)+t},o._blocksize=16,o._digestsize=16,e.exports=function(e,n){if(void 0===e||null===e)throw new Error("Illegal argument "+e);var r=t.wordsToBytes(o(e,n));return n&&n.asBytes?r:n&&n.asString?i.bytesToString(r):t.bytesToHex(r)}})()},"78ca":function(e,t,n){},"90b4":function(e,t,n){},"9a634":function(e,t){var n={utf8:{stringToBytes:function(e){return n.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(n.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t},bytesToString:function(e){for(var t=[],n=0;n<e.length;n++)t.push(String.fromCharCode(e[n]));return t.join("")}}};e.exports=n},ac2a:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main"},[n("a-form",{ref:"formLogin",staticClass:"user-layout-login",attrs:{id:"formLogin",form:e.form},on:{submit:e.handleSubmit}},[n("a-tabs",{attrs:{activeKey:e.customActiveKey,tabBarStyle:{textAlign:"center",borderBottom:"unset"}},on:{change:e.handleTabClick}},[n("a-tab-pane",{key:"tab1",attrs:{tab:e.$t("user.login.tab-login-credentials")}},[e.isLoginError?n("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{type:"error",showIcon:"",message:e.$t("user.login.message-invalid-credentials")}}):e._e(),n("a-form-item",[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:e.$t("user.userName.required")},{validator:e.handleUsernameOrEmail}],validateTrigger:"change"}],expression:"[\n              'username',\n              {\n                rules: [\n                  { required: true, message: $t('user.userName.required') },\n                  { validator: handleUsernameOrEmail },\n                ],\n                validateTrigger: 'change',\n              },\n            ]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.login.username.placeholder")}},[n("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),n("a-form-item",[n("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:e.$t("user.password.required")}],validateTrigger:"blur"}],expression:"[\n              'password',\n              { rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'blur' },\n            ]"}],attrs:{size:"large",placeholder:e.$t("user.login.password.placeholder")}},[n("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1)],1)],1),n("a-form-item",[n("a-checkbox",{directives:[{name:"decorator",rawName:"v-decorator",value:["rememberMe",{valuePropName:"checked"}],expression:"['rememberMe', { valuePropName: 'checked' }]"}]},[e._v(e._s(e.$t("user.login.remember-me")))])],1),n("a-form-item",{staticStyle:{"margin-top":"24px"}},[n("a-button",{staticClass:"login-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.state.loginBtn,disabled:e.state.loginBtn}},[e._v(e._s(e.$t("user.login.login")))])],1)],1),e.requiredTwoStepCaptcha?n("two-step-captcha",{attrs:{visible:e.stepCaptchaVisible},on:{success:e.stepCaptchaSuccess,cancel:e.stepCaptchaCancel}}):e._e()],1)},a=[],i=n("5530"),o=(n("ac1f"),n("d3b7"),n("6821"),function(){var e=this,t=this,n=t.$createElement,r=t._self._c||n;return r("a-modal",{attrs:{centered:"",maskClosable:!1},on:{cancel:t.handleCancel},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[r("div",{style:{textAlign:"center"},attrs:{slot:"title"},slot:"title"},[t._v("两步验证")]),r("template",{slot:"footer"},[r("div",{style:{textAlign:"center"}},[r("a-button",{key:"back",on:{click:t.handleCancel}},[t._v("返回")]),r("a-button",{key:"submit",attrs:{type:"primary",loading:t.stepLoading},on:{click:t.handleStepOk}},[t._v(" 继续 ")])],1)]),r("a-spin",{attrs:{spinning:t.stepLoading}},[r("a-form",{attrs:{layout:"vertical","auto-form-create":function(t){e.form=t}}},[r("div",{staticClass:"step-form-wrapper"},[t.stepLoading?r("p",{staticStyle:{"text-align":"center"}},[t._v("正在验证.."),r("br"),t._v("请稍后")]):r("p",{staticStyle:{"text-align":"center"}},[t._v("请在手机中打开 Google Authenticator 或两步验证 APP"),r("br"),t._v("输入 6 位动态码")]),r("a-form-item",{style:{textAlign:"center"},attrs:{hasFeedback:"",fieldDecoratorId:"stepCode",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入 6 位动态码!",pattern:/^\d{6}$/,len:6}]}}},[r("a-input",{style:{textAlign:"center"},attrs:{placeholder:"000000"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleStepOk.apply(null,arguments)}}})],1),r("p",{staticStyle:{"text-align":"center"}},[r("a",{on:{click:t.onForgeStepCode}},[t._v("遗失手机?")])])],1)])],1)],2)}),s=[],c={props:{visible:{type:Boolean,default:!1}},data:function(){return{stepLoading:!1,form:null}},methods:{handleStepOk:function(){var e=this,t=this;this.stepLoading=!0,this.form.validateFields((function(n,r){n?(e.stepLoading=!1,e.$emit("error",{err:n})):setTimeout((function(){t.stepLoading=!1,t.$emit("success",{values:r})}),2e3)}))},handleCancel:function(){this.visible=!1,this.$emit("cancel")},onForgeStepCode:function(){}}},u=c,l=(n("edd4"),n("2877")),d=Object(l["a"])(u,o,s,!1,null,"4a462ef6",null),f=d.exports,p=n("5880"),g=n("ca00"),m=n("7ded"),h={components:{TwoStepCaptcha:f},data:function(){return{customActiveKey:"tab1",loginBtn:!1,loginType:0,isLoginError:!1,requiredTwoStepCaptcha:!1,stepCaptchaVisible:!1,form:this.$form.createForm(this),state:{time:60,loginBtn:!1,loginType:0,smsSendBtn:!1}}},created:function(){},methods:Object(i["a"])(Object(i["a"])({},Object(p["mapActions"])(["Login","Logout"])),{},{handleUsernameOrEmail:function(e,t,n){var r=this.state,a=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;a.test(t)?r.loginType=0:r.loginType=1,n()},handleTabClick:function(e){this.customActiveKey=e},handleSubmit:function(e){var t=this;e.preventDefault();var n=this.form.validateFields,r=this.state,a=this.customActiveKey,o=this.Login;r.loginBtn=!0;var s="tab1"===a?["username","password"]:["mobile","captcha"];n(s,{force:!0},(function(e,n){if(e)setTimeout((function(){r.loginBtn=!1}),600);else{var a=Object(i["a"])({},n);delete a.username,a[r.loginType?"username":"email"]=n.username,a.password=n.password,o(a).then((function(e){return t.loginSuccess(e)})).catch((function(e){return t.requestFailed(e)})).finally((function(){r.loginBtn=!1}))}}))},getCaptcha:function(e){var t=this;e.preventDefault();var n=this.form.validateFields,r=this.state;n(["mobile"],{force:!0},(function(e,n){if(!e){r.smsSendBtn=!0;var a=window.setInterval((function(){r.time--<=0&&(r.time=60,r.smsSendBtn=!1,window.clearInterval(a))}),1e3),i=t.$message.loading("验证码发送中..",0);Object(m["c"])({mobile:n.mobile}).then((function(e){setTimeout(i,2500),t.$notification["success"]({message:"提示",description:"验证码获取成功，您的验证码为："+e.result.captcha,duration:8})})).catch((function(e){setTimeout(i,1),clearInterval(a),r.time=60,r.smsSendBtn=!1,t.requestFailed(e)}))}}))},stepCaptchaSuccess:function(){this.loginSuccess()},stepCaptchaCancel:function(){var e=this;this.Logout().then((function(){e.loginBtn=!1,e.stepCaptchaVisible=!1}))},loginSuccess:function(e){var t=this;this.$router.push({path:"/"}),setTimeout((function(){t.$notification.success({message:"欢迎",description:"".concat(Object(g["b"])(),"，欢迎回来")})}),1e3),this.isLoginError=!1},requestFailed:function(e){this.isLoginError=!0,this.$notification["error"]({message:"错误",description:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",duration:4})}})},v=h,b=(n("f845"),Object(l["a"])(v,r,a,!1,null,"2a450d12",null));t["default"]=b.exports},edd4:function(e,t,n){"use strict";n("90b4")},f845:function(e,t,n){"use strict";n("78ca")}}]);