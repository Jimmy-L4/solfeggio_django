(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-967edce6"],{"0fea":function(t,e,r){"use strict";r.d(e,"j",(function(){return o})),r.d(e,"k",(function(){return u})),r.d(e,"o",(function(){return s})),r.d(e,"n",(function(){return c})),r.d(e,"e",(function(){return a})),r.d(e,"h",(function(){return d})),r.d(e,"p",(function(){return p})),r.d(e,"a",(function(){return m})),r.d(e,"b",(function(){return h})),r.d(e,"d",(function(){return l})),r.d(e,"g",(function(){return f})),r.d(e,"m",(function(){return b})),r.d(e,"l",(function(){return g})),r.d(e,"c",(function(){return _})),r.d(e,"f",(function(){return L})),r.d(e,"i",(function(){return j})),r.d(e,"r",(function(){return O})),r.d(e,"v",(function(){return S})),r.d(e,"s",(function(){return q})),r.d(e,"q",(function(){return v})),r.d(e,"t",(function(){return w})),r.d(e,"u",(function(){return y}));var n=r("b775"),i={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/"};function o(t){return Object(n["b"])({url:i.role,method:"get",params:t})}function u(t){return Object(n["b"])({url:i.service,method:"get",params:t})}function s(t){return Object(n["b"])({url:i.studentList,method:"get",params:t})}function c(t){return Object(n["b"])({url:i.studentInfo,method:"get",params:t})}function a(t){return Object(n["b"])({url:i.commitList,method:"get",params:t})}function d(t){return Object(n["b"])({url:i.noticeList,method:"get",params:t})}function p(t){return Object(n["b"])({url:i.noticeList,method:"put",data:t})}function m(t){return Object(n["b"])({url:i.noticeList,method:"post",data:t})}function h(t){return Object(n["b"])({url:i.noticeList,method:"delete",data:t})}function l(t){return Object(n["b"])({url:i.ChoiceQuesList,method:"get",params:t})}function f(t){return Object(n["b"])({url:i.DictationQuesList,method:"get",params:t})}function b(t){return Object(n["b"])({url:i.SightsingingQuesList,method:"get",params:t})}function g(t){return Object(n["b"])({url:i.SightsingingList,method:"get",params:t})}function _(t){return Object(n["b"])({url:i.ChoiceList,method:"get",params:t})}function L(t){return Object(n["b"])({url:i.DictationList,method:"get",params:t})}function j(t){return Object(n["b"])({url:i.QuesGroupList,method:"get",params:t})}function O(t){return Object(n["b"])({url:i.ChoiceRecord,method:"post",data:t})}function S(t){return Object(n["b"])({url:i.SightsingingRecord,method:"post",data:t})}function q(t){return Object(n["b"])({url:i.DictationRecord,method:"post",data:t})}function v(t){return Object(n["b"])({url:i.UploadAudio,method:"post",data:t})}function w(t){return Object(n["b"])({url:i.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function y(t){return Object(n["b"])({url:i.UploadPNG,method:"post",data:t})}},"46d7":function(t,e,r){"use strict";r("865d")},"865d":function(t,e,r){},a5eb:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("page-header-wrapper",{attrs:{title:"选择题作业详情",content:"选择题作业详情页面"}},[r("a-card",{attrs:{"body-style":{padding:"24px 32px"},bordered:!1}},[r("a-card",{attrs:{title:t.groupTitle,bordered:!1}},t._l(t.questionList,(function(e,n){return r("a-card",{key:0+n,staticClass:"questionCard"},[r("div",{attrs:{slot:"title"},slot:"title"},[r("p",[t._v(t._s(e.ques_txt)+" "+t._s(e.choice_ans))]),r("p",[t._v("提交的答案为："+t._s(e.userAnswer.toUpperCase()))]),r("a-divider",{staticStyle:{margin:"16px 0"}}),e.ques_pic_path?r("img",{attrs:{width:500,src:e.ques_pic_path}}):t._e(),e.ques_pic_path?r("a-divider",{staticStyle:{margin:"16px 0"}}):t._e(),r("my-player",{attrs:{src:e.ques_audio_path,metroSrc:t.metroSrc(e)}})],1),r("a-radio-group",{attrs:{buttonStyle:"solid",disabled:!0},model:{value:e.userAnswer,callback:function(r){t.$set(e,"userAnswer",r)},expression:"item.userAnswer"}},t._l(e.answer,(function(e,n){return r("a-radio-button",{key:n,staticClass:"radioStyle",staticStyle:{height:"auto"},attrs:{value:n,hoverable:""}},[r("a-card",{staticStyle:{width:"100%"},attrs:{hoverable:""},scopedSlots:t._u([{key:"cover",fn:function(){return[r("img",{attrs:{alt:"练耳选择题题目",src:e.pic_path}})]},proxy:!0}],null,!0)},[r("a-card-meta",{attrs:{title:e.txt?n.toUpperCase()+":   "+e.txt:n.toUpperCase()+":   "}})],1)],1)})),1)],1)})),1)],1),r("footer-tool-bar",[r("p",{staticStyle:{"font-size":"10"}},[t._v("本题组总得分为："+t._s(t.sumScore))])])],1)},i=[],o=r("5a70"),u=r("0fea"),s=r("56cd"),c={name:"ChoiceResult",components:{FooterToolBar:o["a"]},data:function(){return{global_url:"https://musicmuc.chimusic.net/solfeggio/",metronome:this.$store.getters.metronome,questionList:[],part_id:"",sumScore:0}},beforeCreate:function(){this.$route.params.part_id||this.$router.push({name:"home",replace:!0})},beforeMount:function(){this.$route.params.part_id?(this.part_id=this.$route.params.part_id,this.sumScore=this.$route.params.sumScore):this.$router.push({name:"home",replace:!0})},mounted:function(){this.getQuestion()},computed:{groupTitle:function(){return this.questionList.length?this.questionList[0]["L_ques_txt"]:""},metroSrc:function(){var t=this;return function(e){return t.metronome?"/library/metronome/"+e.note+"_"+e.beat+"_"+e.bpm+".mp3":""}}},methods:{getQuestion:function(){var t=this,e={part_id:this.part_id,withAnswer:1};Object(u["d"])(e).then((function(e){t.questionList=e})).catch((function(t){s["a"].error({message:"获取选择题信息失败",description:t.response.data})}))}}},a=c,d=(r("46d7"),r("2877")),p=Object(d["a"])(a,n,i,!1,null,"394ccc01",null);e["default"]=p.exports}}]);