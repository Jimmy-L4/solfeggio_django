(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-157bcea4","chunk-a7d2f62a","chunk-2d0ae8e9"],{"0b23":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",[r("a-icon",{staticStyle:{"margin-right":"8px"},attrs:{type:t.type}}),t._v(" "+t._s(t.text)+" "+t._s(t.score)+" ")],1)},i=[],o=(r("a9e3"),{name:"IconText",props:{type:{type:String,required:!0},text:{type:[String,Number],required:!0},score:{type:Number,required:!1}}}),s=o,a=r("2877"),u=Object(a["a"])(s,n,i,!1,null,null,null);e["default"]=u.exports},"0fea":function(t,e,r){"use strict";r.d(e,"j",(function(){return o})),r.d(e,"k",(function(){return s})),r.d(e,"o",(function(){return a})),r.d(e,"n",(function(){return u})),r.d(e,"e",(function(){return c})),r.d(e,"h",(function(){return d})),r.d(e,"p",(function(){return l})),r.d(e,"a",(function(){return p})),r.d(e,"b",(function(){return m})),r.d(e,"d",(function(){return f})),r.d(e,"g",(function(){return h})),r.d(e,"m",(function(){return g})),r.d(e,"l",(function(){return b})),r.d(e,"c",(function(){return _})),r.d(e,"f",(function(){return v})),r.d(e,"i",(function(){return L})),r.d(e,"r",(function(){return j})),r.d(e,"v",(function(){return k})),r.d(e,"s",(function(){return y})),r.d(e,"q",(function(){return O})),r.d(e,"t",(function(){return C})),r.d(e,"u",(function(){return N}));var n=r("b775"),i={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/"};function o(t){return Object(n["b"])({url:i.role,method:"get",params:t})}function s(t){return Object(n["b"])({url:i.service,method:"get",params:t})}function a(t){return Object(n["b"])({url:i.studentList,method:"get",params:t})}function u(t){return Object(n["b"])({url:i.studentInfo,method:"get",params:t})}function c(t){return Object(n["b"])({url:i.commitList,method:"get",params:t})}function d(t){return Object(n["b"])({url:i.noticeList,method:"get",params:t})}function l(t){return Object(n["b"])({url:i.noticeList,method:"put",data:t})}function p(t){return Object(n["b"])({url:i.noticeList,method:"post",data:t})}function m(t){return Object(n["b"])({url:i.noticeList,method:"delete",data:t})}function f(t){return Object(n["b"])({url:i.ChoiceQuesList,method:"get",params:t})}function h(t){return Object(n["b"])({url:i.DictationQuesList,method:"get",params:t})}function g(t){return Object(n["b"])({url:i.SightsingingQuesList,method:"get",params:t})}function b(t){return Object(n["b"])({url:i.SightsingingList,method:"get",params:t})}function _(t){return Object(n["b"])({url:i.ChoiceList,method:"get",params:t})}function v(t){return Object(n["b"])({url:i.DictationList,method:"get",params:t})}function L(t){return Object(n["b"])({url:i.QuesGroupList,method:"get",params:t})}function j(t){return Object(n["b"])({url:i.ChoiceRecord,method:"post",data:t})}function k(t){return Object(n["b"])({url:i.SightsingingRecord,method:"post",data:t})}function y(t){return Object(n["b"])({url:i.DictationRecord,method:"post",data:t})}function O(t){return Object(n["b"])({url:i.UploadAudio,method:"post",data:t})}function C(t){return Object(n["b"])({url:i.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function N(t){return Object(n["b"])({url:i.UploadPNG,method:"post",data:t})}},"401c":function(t,e,r){},4980:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-header-index-wide page-header-wrapper-grid-content-main"},[r("a-row",{attrs:{gutter:24}},[r("a-col",{attrs:{md:24,lg:7}},[r("a-card",{attrs:{bordered:!1}},[r("div",{staticClass:"account-center-avatarHolder"},[r("div",{staticClass:"avatar"},[r("img",{attrs:{src:t.avatar}})]),r("div",{staticClass:"username"},[t._v(t._s(t.nickname))]),r("div",{staticClass:"bio"},[t._v(t._s(t.userInfo.id))])]),r("div",{staticClass:"account-center-detail"},[r("p",[r("i",{staticClass:"title"}),t._v(t._s(t.userInfo.course.name))]),r("p",[r("i",{staticClass:"group"}),t._v(t._s(t.userInfo.className))]),r("p",[r("i",{staticClass:"address"}),t._v(t._s(t.userInfo.course.classroom))])])])],1),r("a-col",{attrs:{md:24,lg:17}},[r("a-card",{staticStyle:{width:"100%"},attrs:{title:"作业提交详情",bordered:!1}},[r("a-form",{attrs:{layout:"inline"}},[r("a-form-item",[r("a-radio-group",{attrs:{defaultValue:t.lesson_No},on:{change:t.lessonChange},model:{value:t.lesson_No,callback:function(e){t.lesson_No=e},expression:"lesson_No"}},t._l(t.tabListNoTitle,(function(e,n){return r("a-radio-button",{key:n,attrs:{value:e.key}},[t._v(" "+t._s(e.tab)+" ")])})),1)],1)],1),r("a-divider"),r("ques-group-list",{ref:"Childmain",attrs:{lesson_No:t.lesson_No}})],1)],1)],1)],1)},i=[],o=r("5530"),s=r("c438"),a=r("5880"),u=[{key:"1",tab:"课次一"},{key:"2",tab:"课次二"},{key:"3",tab:"课次三"},{key:"4",tab:"课次四"},{key:"5",tab:"课次五"},{key:"6",tab:"课次六"},{key:"7",tab:"课次七"},{key:"8",tab:"课次八"}],c={components:{QuesGroupList:s["default"]},data:function(){return{tabListNoTitle:u,lesson_No:this.$store.getters.lesson_No}},computed:Object(o["a"])({},Object(a["mapGetters"])(["nickname","avatar","userInfo"])),created:function(){},methods:{lessonChange:function(){}}},d=c,l=(r("61e8"),r("2877")),p=Object(l["a"])(d,n,i,!1,null,"22721176",null);e["default"]=p.exports},"61e8":function(t,e,r){"use strict";r("401c")},c438:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("a-list",{attrs:{size:"large",rowKey:"id",loading:t.loading,itemLayout:"vertical",dataSource:t.itemList},scopedSlots:t._u([{key:"renderItem",fn:function(e){return r("a-list-item",{key:e.id,on:{click:function(r){return t.handleEdit(e)}}},[r("template",{slot:"actions"},[r("icon-text",{attrs:{type:"robot",text:"AI评分:",score:e.computer_score}}),r("icon-text",{attrs:{type:"solution",text:"教师评分:",score:e.teacher_score}}),r("icon-text",{attrs:{type:e.stateType,text:e.stateText}})],1),r("a-list-item-meta",[r("a",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.group_title))]),r("template",{slot:"description"},[r("span",[r("p",[t._v("作业题组提交时间："+t._s(e.record_time.replace("T"," ").substring(0,19)))])])])],2)],2)}}])})],1)},i=[],o=r("2af9"),s=r("0b23"),a=r("0fea"),u=r("56cd"),c={1:"正常提交",2:"补交"},d={name:"QuesGroupList",components:{SightsingListContent:o["l"],IconText:s["default"]},props:{lesson_No:{type:String,required:!0,default:""}},watch:{lesson_No:function(){this.getList()}},data:function(){return{loading:!0,itemList:[],userInfo:this.$store.getters.userInfo,stateText:c}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.loading=!0;var e={lesson_No:this.lesson_No,userId:this.userInfo.user};Object(a["i"])(e).then((function(e){t.itemList=e.result,t.loading=!1})).catch((function(t){u["a"].error({message:"获取题组提交列表失败",description:t})}))},handleEdit:function(t){switch(t.group_part_id.charAt(0)){case"3":this.$router.push({name:"choice-result",params:{part_id:t.group_part_id+"01",sumScore:t.computer_score}});break;case"0":this.$router.push({name:"sightsing-result",params:{part_id:t.group_part_id+"01",sumScore:t.teacher_score,recordId:t.record_id}});break;case"4":this.$router.push({name:"dictation-result",params:{part_id:t.group_part_id+"01",sumScore:t.teacher_score}});break}}}},l=d,p=r("2877"),m=Object(p["a"])(l,n,i,!1,null,"57c4ed7e",null);e["default"]=m.exports}}]);