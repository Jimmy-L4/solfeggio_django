(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user","chunk-12f3d236","chunk-2d0aa1b9"],{"072b":function(e,t,r){},1037:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-result",{attrs:{isSuccess:!0,content:!1,title:e.email,"sub-title":e.description},scopedSlots:e._u([{key:"extra",fn:function(){return[r("a-button",{attrs:{size:"large",type:"primary"}},[e._v("查看邮箱")]),r("a-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"large"},on:{click:e.goHomeHandle}},[e._v("返回首页")])]},proxy:!0}])})},a=[],i={name:"RegisterResult",data:function(){return{description:"激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。",form:{}}},computed:{email:function(){var e=this.form&&this.form.email||"xxx";return"你的账户：".concat(e," 注册成功")}},created:function(){this.form=this.$route.params},methods:{goHomeHandle:function(){this.$router.push({name:"login"})}}},o=i,n=r("2877"),l=Object(n["a"])(o,s,a,!1,null,"4a6c53ae",null);t["default"]=l.exports},1348:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main user-layout-register"},[r("h3",[r("span",[e._v(e._s(e.$t("user.register.register")))])]),r("a-form",{ref:"formRegister",attrs:{form:e.form,id:"formRegister"}},[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{required:!0,type:"email",message:e.$t("user.email.required")}],validateTrigger:["change","blur"]}],expression:"['email', {rules: [{ required: true, type: 'email', message: $t('user.email.required') }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.register.email.placeholder")}})],1),r("a-popover",{attrs:{placement:"rightTop",trigger:["focus"],getPopupContainer:function(e){return e.parentElement}},model:{value:e.state.passwordLevelChecked,callback:function(t){e.$set(e.state,"passwordLevelChecked",t)},expression:"state.passwordLevelChecked"}},[r("template",{slot:"content"},[r("div",{style:{width:"240px"}},[r("div",{class:["user-register",e.passwordLevelClass]},[e._v(e._s(e.$t(e.passwordLevelName)))]),r("a-progress",{attrs:{percent:e.state.percent,showInfo:!1,strokeColor:e.passwordLevelColor}}),r("div",{staticStyle:{"margin-top":"10px"}},[r("span",[e._v(e._s(e.$t("user.register.password.popover-message"))+" ")])])],1)]),r("a-form-item",[r("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:e.$t("user.password.required")},{validator:this.handlePasswordLevel}],validateTrigger:["change","blur"]}],expression:"['password', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",placeholder:e.$t("user.register.password.placeholder")},on:{click:e.handlePasswordInputClick}})],1)],2),r("a-form-item",[r("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["password2",{rules:[{required:!0,message:e.$t("user.password.required")},{validator:this.handlePasswordCheck}],validateTrigger:["change","blur"]}],expression:"['password2', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",placeholder:e.$t("user.register.confirm-password.placeholder")}})],1),r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{required:!0,message:e.$t("user.phone-number.required"),pattern:/^1[3456789]\d{9}$/},{validator:this.handlePhoneCheck}],validateTrigger:["change","blur"]}],expression:"['mobile', {rules: [{ required: true, message: $t('user.phone-number.required'), pattern: /^1[3456789]\\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"}],attrs:{size:"large",placeholder:e.$t("user.login.mobile.placeholder")}},[r("a-select",{attrs:{slot:"addonBefore",size:"large",defaultValue:"+86"},slot:"addonBefore"},[r("a-select-option",{attrs:{value:"+86"}},[e._v("+86")]),r("a-select-option",{attrs:{value:"+87"}},[e._v("+87")])],1)],1)],1),r("a-row",{attrs:{gutter:16}},[r("a-col",{staticClass:"gutter-row",attrs:{span:16}},[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["captcha",{rules:[{required:!0,message:"请输入验证码"}],validateTrigger:"blur"}],expression:"['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.login.mobile.verification-code.placeholder")}},[r("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"mail"},slot:"prefix"})],1)],1)],1),r("a-col",{staticClass:"gutter-row",attrs:{span:8}},[r("a-button",{staticClass:"getCaptcha",attrs:{size:"large",disabled:e.state.smsSendBtn},domProps:{textContent:e._s(!e.state.smsSendBtn&&e.$t("user.register.get-verification-code")||e.state.time+" s")},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getCaptcha.apply(null,arguments)}}})],1)],1),r("a-form-item",[r("a-button",{staticClass:"register-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.registerBtn,disabled:e.registerBtn},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[e._v(e._s(e.$t("user.register.register"))+" ")]),r("router-link",{staticClass:"login",attrs:{to:{name:"login"}}},[e._v(e._s(e.$t("user.register.sign-in")))])],1)],1)],1)},a=[],i=r("5530"),o=(r("498a"),r("7ded")),n=r("705f"),l=r("ca00"),d={0:"user.password.strength.short",1:"user.password.strength.low",2:"user.password.strength.medium",3:"user.password.strength.strong"},u={0:"error",1:"error",2:"warning",3:"success"},c={0:"#ff0000",1:"#ff0000",2:"#ff7e05",3:"#52c41a"},p={name:"Register",components:{},mixins:[n["a"]],data:function(){return{form:this.$form.createForm(this),state:{time:60,level:0,smsSendBtn:!1,passwordLevel:0,passwordLevelChecked:!1,percent:10,progressColor:"#FF0000"},registerBtn:!1}},computed:{passwordLevelClass:function(){return u[this.state.passwordLevel]},passwordLevelName:function(){return d[this.state.passwordLevel]},passwordLevelColor:function(){return c[this.state.passwordLevel]}},methods:{handlePasswordLevel:function(e,t,r){if(""===t)return r();t.length>=6?(Object(l["a"])(t)>=30&&(this.state.level=1),Object(l["a"])(t)>=60&&(this.state.level=2),Object(l["a"])(t)>=80&&(this.state.level=3)):(this.state.level=0,r(new Error(this.$t("user.password.strength.msg")))),this.state.passwordLevel=this.state.level,this.state.percent=33*this.state.level,r()},handlePasswordCheck:function(e,t,r){var s=this.form.getFieldValue("password");void 0===t&&r(new Error(this.$t("user.password.required"))),t&&s&&t.trim()!==s.trim()&&r(new Error(this.$t("user.password.twice.msg"))),r()},handlePhoneCheck:function(e,t,r){r()},handlePasswordInputClick:function(){this.isMobile?this.state.passwordLevelChecked=!1:this.state.passwordLevelChecked=!0},handleSubmit:function(){var e=this.form.validateFields,t=this.state,r=this.$router;e({force:!0},(function(e,s){e||(t.passwordLevelChecked=!1,r.push({name:"registerResult",params:Object(i["a"])({},s)}))}))},getCaptcha:function(e){var t=this;e.preventDefault();var r=this.form.validateFields,s=this.state,a=this.$message,i=this.$notification;r(["mobile"],{force:!0},(function(e,r){if(!e){s.smsSendBtn=!0;var n=window.setInterval((function(){s.time--<=0&&(s.time=60,s.smsSendBtn=!1,window.clearInterval(n))}),1e3),l=a.loading("验证码发送中..",0);Object(o["c"])({mobile:r.mobile}).then((function(e){setTimeout(l,2500),i["success"]({message:"提示",description:"验证码获取成功，您的验证码为："+e.result.captcha,duration:8})})).catch((function(e){setTimeout(l,1),clearInterval(n),s.time=60,s.smsSendBtn=!1,t.requestFailed(e)}))}}))},requestFailed:function(e){this.$notification["error"]({message:"错误",description:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",duration:4}),this.registerBtn=!1}},watch:{"state.passwordLevel":function(e){}}},m=p,h=(r("6e68"),r("2568"),r("2877")),g=Object(h["a"])(m,s,a,!1,null,"3f0943cc",null);t["default"]=g.exports},2568:function(e,t,r){"use strict";r("072b")},"6e68":function(e,t,r){"use strict";r("eda3")},eda3:function(e,t,r){}}]);