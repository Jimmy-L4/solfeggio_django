(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e6fbb71c"],{"004c":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("page-header-wrapper",{scopedSlots:t._u([{key:"content",fn:function(){return[i("div",{staticClass:"page-header-content"},[i("div",{staticClass:"avatar"},[i("a-avatar",{attrs:{size:"large",src:t.currentUser.avatar}})],1),i("div",{staticClass:"content"},[i("div",{staticClass:"content-title"},[t._v(" "+t._s(t.timeFix)+"，"+t._s(t.user.name)),i("span",{staticClass:"welcome-text"},[t._v("，"+t._s(t.welcome))])]),i("div",[t._v("视唱练耳基础理论 | 2021级管乐班")])])])]},proxy:!0}])},[i("div",[i("a-row",{attrs:{gutter:24}},[i("a-col",{attrs:{xl:16,lg:24,md:24,sm:24,xs:24}},[i("a-card",{staticClass:"project-list",staticStyle:{"margin-bottom":"24px"},attrs:{loading:t.loading,bordered:!1,title:"进行中的项目","body-style":{padding:0}}},[i("a",{attrs:{slot:"extra"},slot:"extra"},[t._v("全部项目")]),i("div",t._l(t.projects,(function(e,n){return i("a-card-grid",{key:n,staticClass:"project-card-grid"},[i("a-card",{attrs:{bordered:!1,"body-style":{padding:0}}},[i("a-card-meta",[i("div",{staticClass:"card-title",attrs:{slot:"title"},slot:"title"},[i("a-avatar",{attrs:{size:"small",src:e.cover}}),i("a",[t._v(t._s(e.title))])],1),i("div",{staticClass:"card-description",attrs:{slot:"description"},slot:"description"},[t._v(" "+t._s(e.description)+" ")])]),i("div",{staticClass:"project-item"},[i("a",{attrs:{href:"/#/"}},[t._v(t._s(e.lesson_No))]),i("span",{staticClass:"datetime"},[t._v("9小时前")])])],1)],1)})),1)]),i("a-card",{attrs:{loading:t.loading,title:"动态",bordered:!1}},[i("a-list",t._l(t.activities,(function(e,n){return i("a-list-item",{key:n},[i("a-list-item-meta",[i("a-avatar",{attrs:{slot:"avatar",size:"small",src:e.user.avatar},slot:"avatar"}),i("div",{attrs:{slot:"title"},slot:"title"},[t._v(" 成功在 "),i("a",{attrs:{href:"#"}},[t._v(t._s(e.project.name))]),t._v("  "),i("span",[t._v(t._s(e.project.action))]),t._v("  "),i("a",{attrs:{href:"#"}},[t._v(t._s(e.project.event))])]),i("div",{attrs:{slot:"description"},slot:"description"},[t._v(t._s(e.time))])],1)],1)})),1)],1)],1),i("a-col",{staticStyle:{padding:"0 12px"},attrs:{xl:8,lg:24,md:24,sm:24,xs:24}},[i("a-card",{staticStyle:{"margin-bottom":"24px"},attrs:{title:"快速开始 / 便捷导航",bordered:!1,"body-style":{padding:0}}},[i("div",{staticClass:"item-group"},[i("a",[t._v("课次一")]),i("a",[t._v("课次二")]),i("a",[t._v("课次三")]),i("a",[t._v("课次四")]),i("a",[t._v("课次五")]),i("a",[t._v("课次六")]),i("a",[t._v("课次七")]),i("a",[t._v("课次八")])])]),i("a-card",{staticStyle:{"margin-bottom":"24px"},attrs:{title:"通知栏",loading:t.noteLoading,bordered:!1,"body-style":{padding:10}}},[i("div",{staticStyle:{"min-height":"400px"}},t._l(t.notices,(function(e,n){return i("a-list-item",{key:n},[i("a-list-item-meta",[i("a-avatar",{attrs:{slot:"avatar",size:"small",src:e.user.avatar},slot:"avatar"}),i("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.project.content)+" ")]),i("div",{attrs:{slot:"description"},slot:"description"},[t._v(t._s(e.time))])],1)],1)})),1)])],1)],1)],1)])},r=[],a=i("5530"),s=i("ca00"),o=i("5880"),c=i("c0d2"),u=i("2af9"),d=i("0fea"),l=(i("7104"),{name:"Workplace",components:{PageHeaderWrapper:c["b"],Radar:u["i"]},data:function(){return{timeFix:Object(s["b"])(),avatar:"",user:{},projects:[],loading:!0,noteLoading:!0,activities:[],notices:[],axis1Opts:{dataKey:"item",line:null,tickLine:null,grid:{lineStyle:{lineDash:null},hideFirstLine:!1}},axis2Opts:{dataKey:"score",line:null,tickLine:null,grid:{type:"polygon",lineStyle:{lineDash:null}}},scale:[{dataKey:"score",min:0,max:80}],axisData:[{item:"引用",a:70,b:30,c:40},{item:"口碑",a:60,b:70,c:40},{item:"产量",a:50,b:60,c:40},{item:"贡献",a:40,b:50,c:40},{item:"热度",a:60,b:70,c:40},{item:"引用",a:70,b:50,c:40}]}},computed:Object(a["a"])(Object(a["a"])({},Object(o["mapState"])({nickname:function(t){return t.user.nickname},welcome:function(t){return t.user.welcome}})),{},{currentUser:function(){return{name:"Serati Ma",avatar:"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}},userInfo:function(){return this.$store.getters.userInfo}}),created:function(){this.user=this.userInfo,this.avatar=this.userInfo.avatar,Object(d["k"])().then((function(t){})),Object(d["l"])().then((function(t){}))},mounted:function(){this.getProjects(),this.getActivity(),this.getNotices()},methods:{getProjects:function(){var t=this;this.$http.get("/list/search/projects").then((function(e){t.projects=e.result&&e.result.data,t.loading=!1}))},getActivity:function(){var t=this;this.$http.get("/workplace/activity").then((function(e){t.activities=e.result}))},getNotices:function(){var t=this;this.$http.get("/workplace/notice").then((function(e){t.notices=e.result,t.noteLoading=!1}))}}}),m=l,p=(i("5225"),i("2877")),g=Object(p["a"])(m,n,r,!1,null,"080ad601",null);e["default"]=g.exports},"0fea":function(t,e,i){"use strict";i.d(e,"k",(function(){return a})),i.d(e,"l",(function(){return s})),i.d(e,"p",(function(){return o})),i.d(e,"o",(function(){return c})),i.d(e,"b",(function(){return u})),i.d(e,"f",(function(){return d})),i.d(e,"i",(function(){return l})),i.d(e,"q",(function(){return m})),i.d(e,"a",(function(){return p})),i.d(e,"c",(function(){return g})),i.d(e,"e",(function(){return f})),i.d(e,"h",(function(){return h})),i.d(e,"n",(function(){return b})),i.d(e,"m",(function(){return v})),i.d(e,"d",(function(){return _})),i.d(e,"g",(function(){return j})),i.d(e,"j",(function(){return O})),i.d(e,"s",(function(){return y})),i.d(e,"w",(function(){return L})),i.d(e,"t",(function(){return x})),i.d(e,"r",(function(){return k})),i.d(e,"u",(function(){return w})),i.d(e,"v",(function(){return C}));var n=i("b775"),r={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/",changePass:"/user/change_pass/"};function a(t){return Object(n["b"])({url:r.role,method:"get",params:t})}function s(t){return Object(n["b"])({url:r.service,method:"get",params:t})}function o(t){return Object(n["b"])({url:r.studentList,method:"get",params:t})}function c(t){return Object(n["b"])({url:r.studentInfo,method:"get",params:t})}function u(t){return Object(n["b"])({url:r.changePass,method:"post",data:t})}function d(t){return Object(n["b"])({url:r.commitList,method:"get",params:t})}function l(t){return Object(n["b"])({url:r.noticeList,method:"get",params:t})}function m(t){return Object(n["b"])({url:r.noticeList,method:"put",data:t})}function p(t){return Object(n["b"])({url:r.noticeList,method:"post",data:t})}function g(t){return Object(n["b"])({url:r.noticeList,method:"delete",data:t})}function f(t){return Object(n["b"])({url:r.ChoiceQuesList,method:"get",params:t})}function h(t){return Object(n["b"])({url:r.DictationQuesList,method:"get",params:t})}function b(t){return Object(n["b"])({url:r.SightsingingQuesList,method:"get",params:t})}function v(t){return Object(n["b"])({url:r.SightsingingList,method:"get",params:t})}function _(t){return Object(n["b"])({url:r.ChoiceList,method:"get",params:t})}function j(t){return Object(n["b"])({url:r.DictationList,method:"get",params:t})}function O(t){return Object(n["b"])({url:r.QuesGroupList,method:"get",params:t})}function y(t){return Object(n["b"])({url:r.ChoiceRecord,method:"post",data:t})}function L(t){return Object(n["b"])({url:r.SightsingingRecord,method:"post",data:t})}function x(t){return Object(n["b"])({url:r.DictationRecord,method:"post",data:t})}function k(t){return Object(n["b"])({url:r.UploadAudio,method:"post",data:t})}function w(t){return Object(n["b"])({url:r.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function C(t){return Object(n["b"])({url:r.UploadPNG,method:"post",data:t})}},5225:function(t,e,i){"use strict";i("76cc")},"76cc":function(t,e,i){}}]);