(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0411c004"],{"0fea":function(t,e,n){"use strict";n.d(e,"j",(function(){return s})),n.d(e,"k",(function(){return a})),n.d(e,"o",(function(){return o})),n.d(e,"n",(function(){return c})),n.d(e,"e",(function(){return u})),n.d(e,"h",(function(){return d})),n.d(e,"p",(function(){return l})),n.d(e,"a",(function(){return g})),n.d(e,"b",(function(){return h})),n.d(e,"d",(function(){return m})),n.d(e,"g",(function(){return p})),n.d(e,"m",(function(){return f})),n.d(e,"l",(function(){return b})),n.d(e,"c",(function(){return v})),n.d(e,"f",(function(){return _})),n.d(e,"i",(function(){return j})),n.d(e,"r",(function(){return C})),n.d(e,"v",(function(){return L})),n.d(e,"s",(function(){return O})),n.d(e,"q",(function(){return k})),n.d(e,"t",(function(){return y})),n.d(e,"u",(function(){return x}));var i=n("b775"),r={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/"};function s(t){return Object(i["b"])({url:r.role,method:"get",params:t})}function a(t){return Object(i["b"])({url:r.service,method:"get",params:t})}function o(t){return Object(i["b"])({url:r.studentList,method:"get",params:t})}function c(t){return Object(i["b"])({url:r.studentInfo,method:"get",params:t})}function u(t){return Object(i["b"])({url:r.commitList,method:"get",params:t})}function d(t){return Object(i["b"])({url:r.noticeList,method:"get",params:t})}function l(t){return Object(i["b"])({url:r.noticeList,method:"put",data:t})}function g(t){return Object(i["b"])({url:r.noticeList,method:"post",data:t})}function h(t){return Object(i["b"])({url:r.noticeList,method:"delete",data:t})}function m(t){return Object(i["b"])({url:r.ChoiceQuesList,method:"get",params:t})}function p(t){return Object(i["b"])({url:r.DictationQuesList,method:"get",params:t})}function f(t){return Object(i["b"])({url:r.SightsingingQuesList,method:"get",params:t})}function b(t){return Object(i["b"])({url:r.SightsingingList,method:"get",params:t})}function v(t){return Object(i["b"])({url:r.ChoiceList,method:"get",params:t})}function _(t){return Object(i["b"])({url:r.DictationList,method:"get",params:t})}function j(t){return Object(i["b"])({url:r.QuesGroupList,method:"get",params:t})}function C(t){return Object(i["b"])({url:r.ChoiceRecord,method:"post",data:t})}function L(t){return Object(i["b"])({url:r.SightsingingRecord,method:"post",data:t})}function O(t){return Object(i["b"])({url:r.DictationRecord,method:"post",data:t})}function k(t){return Object(i["b"])({url:r.UploadAudio,method:"post",data:t})}function y(t){return Object(i["b"])({url:r.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function x(t){return Object(i["b"])({url:r.UploadPNG,method:"post",data:t})}},"58a5":function(t,e,n){},"738b":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("page-header-wrapper",{scopedSlots:t._u([{key:"content",fn:function(){return[n("div",{staticClass:"page-header-content"},[n("div",{staticClass:"avatar"},[n("a-avatar",{attrs:{size:"large",src:t.avatar}})],1),n("div",{staticClass:"content"},[n("div",{staticClass:"content-title"},[t._v(" "+t._s(t.timeFix)+"! "+t._s(t.user.name)),n("span",{staticClass:"welcome-text"},[t._v(", "+t._s(t.welcome))])]),n("div",[t._v(t._s(t.user.course.name)+" | "+t._s(t.user.className))])])])]},proxy:!0}])},[n("div",[n("a-row",{attrs:{gutter:24}},[n("a-col",{attrs:{xl:16,lg:24,md:24,sm:24,xs:24}},[n("a-card",{staticClass:"project-list",staticStyle:{"margin-bottom":"24px"},attrs:{bordered:!1,title:t.deadline,"body-style":{padding:0}}},[n("div",[n("a",t._l(t.projects,(function(e,i){return n("a-card-grid",{key:i,staticClass:"project-card-grid"},[n("a-card",{attrs:{bordered:!1,"body-style":{padding:0}},on:{click:function(e){return t.handleEdit(i)}}},[n("a-card-meta",[n("div",{staticClass:"card-title",attrs:{slot:"title"},slot:"title"},[n("a-avatar",{attrs:{size:"small",src:e.cover}}),n("a",[t._v(t._s(e.title))])],1),n("div",{staticClass:"card-description",attrs:{slot:"description"},slot:"description"},[t._v(" "+t._s(e.description)+" ")])]),n("div",{staticClass:"project-item"},[n("a",[t._v("课次"+t._s(t.lesson_text[t.lesson_No-1]))]),n("span",{staticClass:"datetime"},[t._v(t._s(t.state_text[t.lesson_state]))])])],1)],1)})),1)])]),n("a-card",{attrs:{loading:t.loading,title:"本课次动态",bordered:!1}},[n("a-list",t._l(t.activities,(function(e,i){return n("a-list-item",{key:i},[n("a-list-item-meta",[n("a-avatar",{attrs:{slot:"avatar",size:"small",src:t.avatar},slot:"avatar"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" 成功在  "),n("a",{on:{click:function(e){return t.handleTabChange(t.lesson_No)}}},[t._v("课次"+t._s(t.lesson_text[e.lesson_No-1]))]),t._v("  "),n("span",[t._v("提交了")]),t._v("  "),n("a",[t._v(t._s(e.group_title))])]),n("div",{attrs:{slot:"description"},slot:"description"},[t._v(t._s(e.record_time.replace("T"," ").substring(0,19)))])],1)],1)})),1)],1)],1),n("a-col",{staticStyle:{padding:"0 12px"},attrs:{xl:8,lg:24,md:24,sm:24,xs:24}},[n("a-card",{staticStyle:{"margin-bottom":"24px"},attrs:{title:"课次导航",bordered:!1,"body-style":{padding:0}}},[n("div",{staticClass:"item-group"},[n("a",{on:{click:function(e){return t.handleTabChange("1")}}},[t._v("课次一")]),n("a",{on:{click:function(e){return t.handleTabChange("2")}}},[t._v("课次二")]),n("a",{on:{click:function(e){return t.handleTabChange("3")}}},[t._v("课次三")]),n("a",{on:{click:function(e){return t.handleTabChange("4")}}},[t._v("课次四")]),n("a",{on:{click:function(e){return t.handleTabChange("5")}}},[t._v("课次五")]),n("a",{on:{click:function(e){return t.handleTabChange("6")}}},[t._v("课次六")]),n("a",{on:{click:function(e){return t.handleTabChange("7")}}},[t._v("课次七")]),n("a",{on:{click:function(e){return t.handleTabChange("8")}}},[t._v("课次八")])])]),n("a-card",{staticStyle:{"margin-bottom":"24px"},attrs:{title:"通知栏",loading:t.noteLoading,bordered:!1,"body-style":{padding:10}}},[n("div",[t.notices.length?t._e():n("a-empty",{attrs:{description:"暂无通知"}}),t._l(t.notices,(function(e,i){return n("a-list-item",{key:i},[n("a-list-item-meta",{attrs:{description:e.startAt.replace("T"," ").substring(0,19)}},[n("a-avatar",{attrs:{slot:"avatar",size:"large",src:e.user.avatar},slot:"avatar"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.project.title)+" ")]),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.project.content)+" ")])],1)],1)}))],2)])],1)],1)],1)])},r=[],s=n("5530"),a=(n("ac1f"),n("5319"),n("a9e3"),n("4de4"),n("d3b7"),n("ca00")),o=n("5880"),c=n("c0d2"),u=n("2af9"),d=n("0fea"),l=n("56cd"),g=[{id:1,cover:"/media/image/sightsinging.png",title:"视唱",description:"视唱作业"},{id:2,cover:"/media/image/choice.png",title:"练耳选择题",description:"练耳选择题作业"},{id:3,cover:"/media/image/dictation.png",title:"练耳听写题",description:"练耳听写题作业"}],h=["一","二","三","四","五","六","七","八"],m=["已截止","未开放","进行中"],p={name:"MyWorkplace",components:{PageHeaderWrapper:c["b"],Radar:u["i"]},data:function(){return{timeFix:Object(a["b"])(),avatar:"",user:{},projects:g,lesson_text:h,state_text:m,loading:!0,noteLoading:!0,activities:[],notices:[],lesson_No:this.$store.getters.lesson_No,userInfo:this.$store.getters.userInfo}},computed:Object(s["a"])(Object(s["a"])({},Object(o["mapState"])({welcome:function(t){return t.user.welcome}})),{},{deadline:function(){var t=this.userInfo.lesson_deadline.replace("T"," ");return"当前课次(截止时间:"+t+")"},lesson_state:function(){var t=Number(this.lesson_No),e=this.userInfo.vailLessons[t-1];return e+1}}),created:function(){this.user=this.userInfo,this.avatar=this.userInfo.avatar},mounted:function(){this.getActivity(),this.getNotices()},methods:{handleTabChange:function(t){this.$router.push({name:"sightsing-list",params:{lesson_No:t}})},handleEdit:function(t){var e=["sightsing-list","choice-list","dictation-list"];this.$router.push({name:e[t]})},getActivity:function(){var t=this,e={lesson_No:this.lesson_No,userId:this.userInfo.user};Object(d["i"])(e).then((function(e){t.activities=e.result,t.loading=!1})).catch((function(e){t.loading=!1,l["a"].error({message:"获取题组提交列表失败",description:e})}))},getNotices:function(){var t=this,e={display:"true"};Object(d["h"])(e).then((function(e){t.notices=e.filter((function(e){return e.project.class==t.user.className||"所有班级"==e.project.class})),t.noteLoading=!1}))}}},f=p,b=(n("d21f"),n("2877")),v=Object(b["a"])(f,i,r,!1,null,"137ae51c",null);e["default"]=v.exports},d21f:function(t,e,n){"use strict";n("58a5")}}]);