(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02cd20c0"],{"0fea":function(t,e,n){"use strict";n.d(e,"k",(function(){return i})),n.d(e,"l",(function(){return u})),n.d(e,"r",(function(){return s})),n.d(e,"q",(function(){return c})),n.d(e,"b",(function(){return a})),n.d(e,"i",(function(){return d})),n.d(e,"t",(function(){return p})),n.d(e,"a",(function(){return m})),n.d(e,"c",(function(){return h})),n.d(e,"e",(function(){return l})),n.d(e,"h",(function(){return f})),n.d(e,"n",(function(){return g})),n.d(e,"m",(function(){return b})),n.d(e,"d",(function(){return _})),n.d(e,"g",(function(){return j})),n.d(e,"j",(function(){return L})),n.d(e,"v",(function(){return O})),n.d(e,"z",(function(){return S})),n.d(e,"w",(function(){return w})),n.d(e,"u",(function(){return q})),n.d(e,"x",(function(){return v})),n.d(e,"y",(function(){return y})),n.d(e,"o",(function(){return C})),n.d(e,"f",(function(){return k})),n.d(e,"p",(function(){return x})),n.d(e,"s",(function(){return Q}));var r=n("b775"),o={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/",changePass:"/user/change_pass/",studentList:"/user/student_list/",SingDetail:"/workbench/sing_detail/",CommitInfo:"/workbench/commit_info/",SingRecord:"/workbench/sing_record/"};function i(t){return Object(r["b"])({url:o.role,method:"get",params:t})}function u(t){return Object(r["b"])({url:o.service,method:"get",params:t})}function s(t){return Object(r["b"])({url:o.studentList,method:"get",params:t})}function c(t){return Object(r["b"])({url:o.studentInfo,method:"get",params:t})}function a(t){return Object(r["b"])({url:o.changePass,method:"post",data:t})}function d(t){return Object(r["b"])({url:o.noticeList,method:"get",params:t})}function p(t){return Object(r["b"])({url:o.noticeList,method:"put",data:t})}function m(t){return Object(r["b"])({url:o.noticeList,method:"post",data:t})}function h(t){return Object(r["b"])({url:o.noticeList,method:"delete",data:t})}function l(t){return Object(r["b"])({url:o.ChoiceQuesList,method:"get",params:t})}function f(t){return Object(r["b"])({url:o.DictationQuesList,method:"get",params:t})}function g(t){return Object(r["b"])({url:o.SightsingingQuesList,method:"get",params:t})}function b(t){return Object(r["b"])({url:o.SightsingingList,method:"get",params:t})}function _(t){return Object(r["b"])({url:o.ChoiceList,method:"get",params:t})}function j(t){return Object(r["b"])({url:o.DictationList,method:"get",params:t})}function L(t){return Object(r["b"])({url:o.QuesGroupList,method:"get",params:t})}function O(t){return Object(r["b"])({url:o.ChoiceRecord,method:"post",data:t})}function S(t){return Object(r["b"])({url:o.SightsingingRecord,method:"post",data:t})}function w(t){return Object(r["b"])({url:o.DictationRecord,method:"post",data:t})}function q(t){return Object(r["b"])({url:o.UploadAudio,method:"post",data:t})}function v(t){return Object(r["b"])({url:o.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function y(t){return Object(r["b"])({url:o.UploadPNG,method:"post",data:t})}function C(t){return Object(r["b"])({url:o.SingDetail,method:"get",params:t})}function k(t){return Object(r["b"])({url:o.CommitInfo,method:"get",params:t})}function x(t){return Object(r["b"])({url:o.SingRecord,method:"get",params:t})}function Q(t){return Object(r["b"])({url:o.SingRecord,method:"put",data:t})}},a5eb:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("page-header-wrapper",{attrs:{title:"选择题作业详情",content:"选择题作业详情页面"}},[n("a-card",{attrs:{"body-style":{padding:"24px 32px"},bordered:!1}},[n("a-card",{attrs:{title:t.groupTitle,bordered:!1}},t._l(t.questionList,(function(e,r){return n("a-card",{key:0+r,staticClass:"questionCard"},[n("div",{attrs:{slot:"title"},slot:"title"},[n("p",[t._v(t._s(e.ques_txt)+" "+t._s(e.choice_ans))]),0==e.score?n("p",{staticStyle:{color:"red"}},[t._v("本题回答错误！你提交的答案是："+t._s(e.userAnswer.toUpperCase()))]):t._e(),n("a-divider",{staticStyle:{margin:"16px 0"}}),e.ques_pic_path?n("img",{attrs:{width:500,src:e.ques_pic_path}}):t._e(),e.ques_pic_path?n("a-divider",{staticStyle:{margin:"16px 0"}}):t._e(),n("my-player",{attrs:{src:e.ques_audio_path,metroSrc:t.metroSrc(e)}})],1),n("a-radio-group",{attrs:{value:e.choice_ans.toLowerCase(),buttonStyle:"solid"}},t._l(e.answer,(function(e,r){return n("a-radio-button",{key:r,staticClass:"radioStyle",attrs:{value:r,hoverable:""}},[t._v(" "+t._s(e.txt?r.toUpperCase()+": "+e.txt:r.toUpperCase()+".")+" "),n("a-card",{staticStyle:{"margin-bottom":"8px"},scopedSlots:t._u([{key:"cover",fn:function(){return[n("img",{staticStyle:{margin:"0 auto","text-align":"center"},attrs:{alt:"练耳选择题题目",src:e.pic_path}})]},proxy:!0}],null,!0)})],1)})),1)],1)})),1)],1),n("footer-tool-bar",[n("p",{staticStyle:{"font-size":"10"}},[t._v("本题组总得分为："+t._s(t.sumScore))])])],1)},o=[],i=n("5a70"),u=n("0fea"),s=n("56cd"),c={name:"ChoiceResult",components:{FooterToolBar:i["a"]},data:function(){return{global_url:"https://musicmuc.chimusic.net/solfeggio/",metronome:this.$store.getters.metronome,questionList:[],part_id:"",sumScore:0}},beforeCreate:function(){this.$route.params.part_id||this.$router.push({name:"home",replace:!0})},beforeMount:function(){this.$route.params.part_id?(this.part_id=this.$route.params.part_id,this.sumScore=this.$route.params.sumScore):this.$router.push({name:"home",replace:!0})},mounted:function(){this.getQuestion()},computed:{groupTitle:function(){return this.questionList.length?this.questionList[0]["L_ques_txt"]:""},metroSrc:function(){var t=this;return function(e){return t.metronome?"/library/metronome/"+e.note+"_"+e.beat+"_"+e.bpm+".mp3":""}}},methods:{getQuestion:function(){var t=this,e={part_id:this.part_id,withAnswer:1};Object(u["e"])(e).then((function(e){t.questionList=e})).catch((function(t){s["a"].error({message:"获取选择题信息失败",description:""})}))}}},a=c,d=(n("af89"),n("2877")),p=Object(d["a"])(a,r,o,!1,null,"0920e520",null);e["default"]=p.exports},af89:function(t,e,n){"use strict";n("c642")},c642:function(t,e,n){}}]);