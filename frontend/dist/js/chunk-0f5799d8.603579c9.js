(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f5799d8"],{"0fea":function(t,e,n){"use strict";n.d(e,"k",(function(){return o})),n.d(e,"l",(function(){return u})),n.d(e,"p",(function(){return s})),n.d(e,"o",(function(){return c})),n.d(e,"b",(function(){return a})),n.d(e,"f",(function(){return d})),n.d(e,"i",(function(){return m})),n.d(e,"q",(function(){return h})),n.d(e,"a",(function(){return p})),n.d(e,"c",(function(){return f})),n.d(e,"e",(function(){return l})),n.d(e,"h",(function(){return g})),n.d(e,"n",(function(){return b})),n.d(e,"m",(function(){return _})),n.d(e,"d",(function(){return L})),n.d(e,"g",(function(){return j})),n.d(e,"j",(function(){return O})),n.d(e,"s",(function(){return q})),n.d(e,"w",(function(){return w})),n.d(e,"t",(function(){return S})),n.d(e,"r",(function(){return v})),n.d(e,"u",(function(){return y})),n.d(e,"v",(function(){return C}));var r=n("b775"),i={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/",changePass:"/user/change_pass/"};function o(t){return Object(r["b"])({url:i.role,method:"get",params:t})}function u(t){return Object(r["b"])({url:i.service,method:"get",params:t})}function s(t){return Object(r["b"])({url:i.studentList,method:"get",params:t})}function c(t){return Object(r["b"])({url:i.studentInfo,method:"get",params:t})}function a(t){return Object(r["b"])({url:i.changePass,method:"post",data:t})}function d(t){return Object(r["b"])({url:i.commitList,method:"get",params:t})}function m(t){return Object(r["b"])({url:i.noticeList,method:"get",params:t})}function h(t){return Object(r["b"])({url:i.noticeList,method:"put",data:t})}function p(t){return Object(r["b"])({url:i.noticeList,method:"post",data:t})}function f(t){return Object(r["b"])({url:i.noticeList,method:"delete",data:t})}function l(t){return Object(r["b"])({url:i.ChoiceQuesList,method:"get",params:t})}function g(t){return Object(r["b"])({url:i.DictationQuesList,method:"get",params:t})}function b(t){return Object(r["b"])({url:i.SightsingingQuesList,method:"get",params:t})}function _(t){return Object(r["b"])({url:i.SightsingingList,method:"get",params:t})}function L(t){return Object(r["b"])({url:i.ChoiceList,method:"get",params:t})}function j(t){return Object(r["b"])({url:i.DictationList,method:"get",params:t})}function O(t){return Object(r["b"])({url:i.QuesGroupList,method:"get",params:t})}function q(t){return Object(r["b"])({url:i.ChoiceRecord,method:"post",data:t})}function w(t){return Object(r["b"])({url:i.SightsingingRecord,method:"post",data:t})}function S(t){return Object(r["b"])({url:i.DictationRecord,method:"post",data:t})}function v(t){return Object(r["b"])({url:i.UploadAudio,method:"post",data:t})}function y(t){return Object(r["b"])({url:i.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function C(t){return Object(r["b"])({url:i.UploadPNG,method:"post",data:t})}},"49c0":function(t,e,n){"use strict";n("b875")},"5cae":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("page-header-wrapper",{attrs:{title:"选择题作业详情",content:"选择题作业详情页面"}},[n("a-card",{attrs:{"body-style":{padding:"24px 32px"},bordered:!1}},[n("a-card",{attrs:{title:t.groupTitle,bordered:!1}},t._l(t.questionList,(function(e,r){return n("a-card",{key:0+r,staticClass:"questionCard"},[n("div",{attrs:{slot:"title"},slot:"title"},[n("p",[t._v(t._s(e.ques_txt))]),n("a-divider",{staticStyle:{margin:"16px 0"}}),e.ques_pic_path?n("img",{attrs:{width:800,src:e.ques_pic_path}}):t._e(),e.ques_pic_path?n("a-divider",{staticStyle:{margin:"16px 0"}}):t._e(),n("my-player",{attrs:{src:e.ques_audio_path,metroSrc:t.metroSrc(e)}})],1),n("img",{attrs:{width:800,src:e.userAnswer}})])})),1)],1),n("footer-tool-bar",[n("p",{staticStyle:{"font-size":"10"}},[t._v("本题组总得分为："+t._s(t.sumScore))])])],1)},i=[],o=n("5a70"),u=n("0fea"),s=n("56cd"),c={name:"DictationResult",components:{FooterToolBar:o["a"]},data:function(){return{global_url:"https://musicmuc.chimusic.net/solfeggio/",metronome:this.$store.getters.metronome,questionList:[],part_id:"",sumScore:0,fresh:!0}},beforeCreate:function(){this.$route.params.part_id||this.$router.push({name:"home",replace:!0})},beforeMount:function(){this.$route.params.part_id?(this.part_id=this.$route.params.part_id,this.sumScore=this.$route.params.sumScore):this.$router.push({name:"home",replace:!0})},mounted:function(){this.getQuestion()},computed:{groupTitle:function(){return this.questionList.length?this.questionList[0]["L_ques_txt"]:""},metroSrc:function(){var t=this;return function(e){return t.metronome?"/library/metronome/"+e.note+"_"+e.beat+"_"+e.bpm+".mp3":""}}},methods:{getQuestion:function(){var t=this,e={part_id:this.part_id,withAnswer:1};Object(u["h"])(e).then((function(e){t.questionList=e})).catch((function(t){s["a"].error({message:"获取听写题信息失败",description:""})}))}}},a=c,d=(n("49c0"),n("2877")),m=Object(d["a"])(a,r,i,!1,null,"423c6158",null);e["default"]=m.exports},b875:function(t,e,n){}}]);