(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-758f1ca7"],{"0fea":function(t,e,n){"use strict";n.d(e,"k",(function(){return o})),n.d(e,"l",(function(){return s})),n.d(e,"p",(function(){return u})),n.d(e,"o",(function(){return a})),n.d(e,"b",(function(){return c})),n.d(e,"f",(function(){return d})),n.d(e,"i",(function(){return l})),n.d(e,"q",(function(){return h})),n.d(e,"a",(function(){return p})),n.d(e,"c",(function(){return m})),n.d(e,"e",(function(){return f})),n.d(e,"h",(function(){return g})),n.d(e,"n",(function(){return b})),n.d(e,"m",(function(){return _})),n.d(e,"d",(function(){return L})),n.d(e,"g",(function(){return j})),n.d(e,"j",(function(){return v})),n.d(e,"s",(function(){return w})),n.d(e,"w",(function(){return O})),n.d(e,"t",(function(){return y})),n.d(e,"r",(function(){return q})),n.d(e,"u",(function(){return S})),n.d(e,"v",(function(){return x}));var r=n("b775"),i={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/",changePass:"/user/change_pass/"};function o(t){return Object(r["b"])({url:i.role,method:"get",params:t})}function s(t){return Object(r["b"])({url:i.service,method:"get",params:t})}function u(t){return Object(r["b"])({url:i.studentList,method:"get",params:t})}function a(t){return Object(r["b"])({url:i.studentInfo,method:"get",params:t})}function c(t){return Object(r["b"])({url:i.changePass,method:"post",data:t})}function d(t){return Object(r["b"])({url:i.commitList,method:"get",params:t})}function l(t){return Object(r["b"])({url:i.noticeList,method:"get",params:t})}function h(t){return Object(r["b"])({url:i.noticeList,method:"put",data:t})}function p(t){return Object(r["b"])({url:i.noticeList,method:"post",data:t})}function m(t){return Object(r["b"])({url:i.noticeList,method:"delete",data:t})}function f(t){return Object(r["b"])({url:i.ChoiceQuesList,method:"get",params:t})}function g(t){return Object(r["b"])({url:i.DictationQuesList,method:"get",params:t})}function b(t){return Object(r["b"])({url:i.SightsingingQuesList,method:"get",params:t})}function _(t){return Object(r["b"])({url:i.SightsingingList,method:"get",params:t})}function L(t){return Object(r["b"])({url:i.ChoiceList,method:"get",params:t})}function j(t){return Object(r["b"])({url:i.DictationList,method:"get",params:t})}function v(t){return Object(r["b"])({url:i.QuesGroupList,method:"get",params:t})}function w(t){return Object(r["b"])({url:i.ChoiceRecord,method:"post",data:t})}function O(t){return Object(r["b"])({url:i.SightsingingRecord,method:"post",data:t})}function y(t){return Object(r["b"])({url:i.DictationRecord,method:"post",data:t})}function q(t){return Object(r["b"])({url:i.UploadAudio,method:"post",data:t})}function S(t){return Object(r["b"])({url:i.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function x(t){return Object(r["b"])({url:i.UploadPNG,method:"post",data:t})}},5935:function(t,e,n){},"60ec":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("page-header-wrapper",{attrs:{title:"选择题页面",content:"选择题页面"}},[n("a-card",{attrs:{"body-style":{padding:"24px 32px"},bordered:!1}},[n("a-card",{attrs:{title:t.groupTitle,bordered:!1}},t._l(t.questionList,(function(e,r){return n("a-card",{key:0+r,staticClass:"questionCard"},[n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.ques_txt)+" "),n("a-divider",{staticStyle:{margin:"16px 0"}}),e.ques_pic_path?n("img",{attrs:{width:500,src:e.ques_pic_path}}):t._e(),e.ques_pic_path?n("a-divider",{staticStyle:{margin:"16px 0"}}):t._e(),n("my-player",{attrs:{src:e.ques_audio_path,metroSrc:t.metroSrc(e)}})],1),n("a-radio-group",{attrs:{buttonStyle:"solid"},on:{change:function(e){return t.handleChange()}},model:{value:e.userAnswer,callback:function(n){t.$set(e,"userAnswer",n)},expression:"item.userAnswer"}},t._l(e.answer,(function(e,r){return n("a-radio-button",{key:r,staticClass:"radioStyle",staticStyle:{height:"auto"},attrs:{value:r,hoverable:""}},[n("a-card",{attrs:{hoverable:""},scopedSlots:t._u([{key:"cover",fn:function(){return[n("img",{staticStyle:{margin:"0 auto","text-align":"center"},attrs:{alt:"练耳选择题题目",src:e.pic_path}})]},proxy:!0}],null,!0)})],1)})),1)],1)})),1)],1),n("footer-tool-bar",[t.statusMap[t.state].disabled?n("a-tooltip",{attrs:{placement:"topRight"},scopedSlots:t._u([{key:"title",fn:function(){return[n("span",[t._v(t._s(t.statusMap[t.state].text))])]},proxy:!0}],null,!1,3007124065)},[n("a-button",{staticStyle:{"margin-left":"20px"},attrs:{disabled:!0,type:"primary",loading:t.loading}},[t._v("提交")])],1):n("a-popconfirm",{attrs:{title:"确认提交作业吗？提交后将无法修改！"},on:{confirm:t.handleSubmit,cancel:t.cancelSubmit}},[n("a-button",{attrs:{type:"primary",loading:t.loading}},[t._v("提交")])],1)],1)],1)},i=[],o=(n("d3b7"),n("159b"),n("5a70")),s=n("0fea"),u=n("56cd"),a={0:{disabled:!1,text:"待完成"},1:{disabled:!0,text:"作业已完成，无法再次提交！"},2:{disabled:!0,text:"作业已逾期，无法再进行提交！"}},c={name:"ChoiceLayout",components:{FooterToolBar:o["a"]},data:function(){return{statusMap:a,global_url:"https://musicmuc.chimusic.net/solfeggio/",questionList:[],loading:!1,part_id:"",state:0,userInfo:this.$store.getters.userInfo,metronome:this.$store.getters.metronome}},beforeCreate:function(){this.$route.params.part_id||this.$router.push({name:"home",replace:!0})},beforeMount:function(){this.$route.params.part_id?(this.part_id=this.$route.params.part_id,this.state=this.$route.params.state):this.$router.push({name:"home",replace:!0}),this.getQuestion()},mounted:function(){},computed:{groupTitle:function(){return this.questionList.length?this.questionList[0]["L_ques_txt"]:""},metroSrc:function(){var t=this;return function(e){return t.metronome?"/library/metronome/"+e.note+"_"+e.beat+"_"+e.bpm+".mp3":""}}},methods:{handleSubmit:function(t){this.loading=!0;var e=this.checkAnswer();if(""!=e)return u["a"].error({message:"第"+e.substring(0,e.length-1)+"题没有选择答案，请选择答案后再提交！"}),void(this.loading=!1);this.uploadAnswer()},checkAnswer:function(){var t=0,e="";for(t=0;t<this.questionList.length;t++)-1==this.questionList[t].userAnswer&&(e+=t+1+"、");return e},uploadAnswer:function(){var t=this,e=[];this.questionList.forEach((function(t){var n={part_id:t.part_id,userAnswer:t.userAnswer};e.push(n)}));var n={answerInfo:e,lesson_No:this.part_id.charAt(18),groupPart_id:this.part_id.substring(0,this.part_id.length-2)};Object(s["s"])(n).then((function(e){u["a"].success({message:"上传作业成功",description:"在个人中心中查看提交详情！"}),t.loading=!1,t.$router.push({name:"choice-list",replace:!0,params:{lesson_No:t.part_id.charAt(18)}})})).catch((function(t){u["a"].error({message:"上传答案失败",description:""})}))},cancelSubmit:function(){},handleChange:function(t){},getQuestion:function(){var t=this,e={part_id:this.part_id,withAnswer:0};Object(s["e"])(e).then((function(e){t.questionList=e})).catch((function(t){u["a"].error({message:"获取选择题信息失败",description:""})}))}}},d=c,l=(n("f0c4"),n("2877")),h=Object(l["a"])(d,r,i,!1,null,"0bd2022d",null);e["default"]=h.exports},f0c4:function(t,e,n){"use strict";n("5935")}}]);