(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4bf7e805"],{"0fea":function(t,e,r){"use strict";r.d(e,"k",(function(){return o})),r.d(e,"l",(function(){return u})),r.d(e,"r",(function(){return s})),r.d(e,"q",(function(){return a})),r.d(e,"b",(function(){return c})),r.d(e,"i",(function(){return d})),r.d(e,"t",(function(){return l})),r.d(e,"a",(function(){return p})),r.d(e,"c",(function(){return m})),r.d(e,"e",(function(){return h})),r.d(e,"h",(function(){return g})),r.d(e,"n",(function(){return f})),r.d(e,"m",(function(){return b})),r.d(e,"d",(function(){return _})),r.d(e,"g",(function(){return j})),r.d(e,"j",(function(){return q})),r.d(e,"v",(function(){return O})),r.d(e,"z",(function(){return L})),r.d(e,"w",(function(){return y})),r.d(e,"u",(function(){return S})),r.d(e,"x",(function(){return D})),r.d(e,"y",(function(){return v})),r.d(e,"o",(function(){return w})),r.d(e,"f",(function(){return x})),r.d(e,"p",(function(){return T})),r.d(e,"s",(function(){return k}));var i=r("b775"),n={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/",changePass:"/user/change_pass/",studentList:"/user/student_list/",SingDetail:"/workbench/sing_detail/",CommitInfo:"/workbench/commit_info/",SingRecord:"/workbench/sing_record/"};function o(t){return Object(i["b"])({url:n.role,method:"get",params:t})}function u(t){return Object(i["b"])({url:n.service,method:"get",params:t})}function s(t){return Object(i["b"])({url:n.studentList,method:"get",params:t})}function a(t){return Object(i["b"])({url:n.studentInfo,method:"get",params:t})}function c(t){return Object(i["b"])({url:n.changePass,method:"post",data:t})}function d(t){return Object(i["b"])({url:n.noticeList,method:"get",params:t})}function l(t){return Object(i["b"])({url:n.noticeList,method:"put",data:t})}function p(t){return Object(i["b"])({url:n.noticeList,method:"post",data:t})}function m(t){return Object(i["b"])({url:n.noticeList,method:"delete",data:t})}function h(t){return Object(i["b"])({url:n.ChoiceQuesList,method:"get",params:t})}function g(t){return Object(i["b"])({url:n.DictationQuesList,method:"get",params:t})}function f(t){return Object(i["b"])({url:n.SightsingingQuesList,method:"get",params:t})}function b(t){return Object(i["b"])({url:n.SightsingingList,method:"get",params:t})}function _(t){return Object(i["b"])({url:n.ChoiceList,method:"get",params:t})}function j(t){return Object(i["b"])({url:n.DictationList,method:"get",params:t})}function q(t){return Object(i["b"])({url:n.QuesGroupList,method:"get",params:t})}function O(t){return Object(i["b"])({url:n.ChoiceRecord,method:"post",data:t})}function L(t){return Object(i["b"])({url:n.SightsingingRecord,method:"post",data:t})}function y(t){return Object(i["b"])({url:n.DictationRecord,method:"post",data:t})}function S(t){return Object(i["b"])({url:n.UploadAudio,method:"post",data:t})}function D(t){return Object(i["b"])({url:n.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function v(t){return Object(i["b"])({url:n.UploadPNG,method:"post",data:t})}function w(t){return Object(i["b"])({url:n.SingDetail,method:"get",params:t})}function x(t){return Object(i["b"])({url:n.CommitInfo,method:"get",params:t})}function T(t){return Object(i["b"])({url:n.SingRecord,method:"get",params:t})}function k(t){return Object(i["b"])({url:n.SingRecord,method:"put",data:t})}},"1a39":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("page-header-wrapper",{attrs:{title:"视唱题目页面",content:"请根据要求录制对应曲目"}},[t.cardLoad?t._e():r("a-card",{attrs:{"body-style":{padding:"24px 32px"},bordered:!1,loading:t.cardLoad}},[r("a-card",{attrs:{bordered:!1,title:!1}},[r("a-descriptions",{attrs:{title:"基础信息"}},[r("a-descriptions-item",{attrs:{label:"歌曲名称"}},[t._v(t._s(t.quesDetail.audio_detail.audio_name))]),r("a-descriptions-item",{attrs:{label:"演奏者"}},[t._v(t._s(t.quesDetail.audio_detail.audio_player))]),r("a-descriptions-item"),r("a-descriptions-item",{attrs:{label:"乐器"}},[t._v(t._s(t.quesDetail.audio_detail.audio_instrument))]),r("a-descriptions-item",{attrs:{label:"名族"}},[t._v(t._s(t.quesDetail.audio_detail.audio_nation))]),r("a-descriptions-item"),0!=t.quesType?r("a-descriptions-item",{attrs:{label:"低声部"}},[t._v(t._s(t.lowPart))]):t._e(),0!=t.quesType?r("a-descriptions-item",{attrs:{label:"高声部"}},[t._v(t._s(t.highPart))]):t._e()],1),r("div",{staticStyle:{"font-size":"14px",color:"rgba(0, 0, 0, 0.85)","margin-bottom":"16px","font-weight":"500"}},[r("div",[t._v("范例音: "),r("audio-player",{staticStyle:{"margin-top":"12px"},attrs:{src:t.quesDetail.audio_path}})],1),r("div",{staticStyle:{"margin-top":"16px"}},[t._v("节拍器: "),r("audio-player",{staticStyle:{"margin-top":"12px"},attrs:{src:t.metroSrc}})],1)]),r("a-card",{staticStyle:{"margin-top":"24px"},attrs:{type:"inner",title:"曲谱信息"}},[r("img",{staticStyle:{"text-align":"center"},attrs:{width:"97%",src:t.quesDetail.pic_path}})]),r("a-card",{staticStyle:{"margin-top":"24px"},attrs:{type:"inner",title:"提交内容"}},[r("audio-player",{attrs:{src:t.quesDetail.userAudio}})],1)],1)],1),r("footer-tool-bar",[r("p",{staticStyle:{"font-size":"10"}},[t._v("本题组总得分为："+t._s(t.sumScore))])])],1)},n=[],o=r("56cd"),u=r("5a70"),s=r("0fea"),a={name:"SightsingResult",components:{FooterToolBar:u["a"]},data:function(){return{dragToggle:!0,quesDetail:{},sumScore:0,cardLoad:!0,quesType:0,recordId:0}},computed:{metroSrc:function(){return"/library/metronome/"+this.quesDetail.note+"_"+this.quesDetail.beat+"_"+this.quesDetail.bpm+".mp3"},lowPart:function(){return"1"==this.quesType?this.quesDetail.user:this.quesDetail.coop_user},highPart:function(){return"2"==this.quesType?this.quesDetail.user:this.quesDetail.coop_user}},beforeMount:function(){this.$route.params.part_id?(this.part_id=this.$route.params.part_id,this.sumScore=this.$route.params.sumScore,this.recordId=this.$route.params.recordId):this.$router.push({name:"home",replace:!0})},mounted:function(){this.getQuestion()},methods:{getQuestion:function(){var t=this,e={part_id:this.part_id,recordId:this.recordId};Object(s["n"])(e).then((function(e){t.quesDetail=e.result,t.quesType=e.result["quesType"],t.cardLoad=!1})).catch((function(t){o["a"].error({message:"获取视唱信息失败",description:""})}))}}},c=a,d=r("2877"),l=Object(d["a"])(c,i,n,!1,null,"33da4af6",null);e["default"]=l.exports}}]);