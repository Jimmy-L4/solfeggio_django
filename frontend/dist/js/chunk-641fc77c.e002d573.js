(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-641fc77c"],{"0fea":function(t,e,i){"use strict";i.d(e,"j",(function(){return s})),i.d(e,"k",(function(){return o})),i.d(e,"o",(function(){return a})),i.d(e,"n",(function(){return u})),i.d(e,"e",(function(){return c})),i.d(e,"h",(function(){return d})),i.d(e,"p",(function(){return h})),i.d(e,"a",(function(){return p})),i.d(e,"b",(function(){return l})),i.d(e,"d",(function(){return f})),i.d(e,"g",(function(){return m})),i.d(e,"m",(function(){return g})),i.d(e,"l",(function(){return b})),i.d(e,"c",(function(){return _})),i.d(e,"f",(function(){return v})),i.d(e,"i",(function(){return w})),i.d(e,"r",(function(){return L})),i.d(e,"v",(function(){return O})),i.d(e,"s",(function(){return j})),i.d(e,"q",(function(){return S})),i.d(e,"t",(function(){return y})),i.d(e,"u",(function(){return q}));var n=i("b775"),r={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/"};function s(t){return Object(n["b"])({url:r.role,method:"get",params:t})}function o(t){return Object(n["b"])({url:r.service,method:"get",params:t})}function a(t){return Object(n["b"])({url:r.studentList,method:"get",params:t})}function u(t){return Object(n["b"])({url:r.studentInfo,method:"get",params:t})}function c(t){return Object(n["b"])({url:r.commitList,method:"get",params:t})}function d(t){return Object(n["b"])({url:r.noticeList,method:"get",params:t})}function h(t){return Object(n["b"])({url:r.noticeList,method:"put",data:t})}function p(t){return Object(n["b"])({url:r.noticeList,method:"post",data:t})}function l(t){return Object(n["b"])({url:r.noticeList,method:"delete",data:t})}function f(t){return Object(n["b"])({url:r.ChoiceQuesList,method:"get",params:t})}function m(t){return Object(n["b"])({url:r.DictationQuesList,method:"get",params:t})}function g(t){return Object(n["b"])({url:r.SightsingingQuesList,method:"get",params:t})}function b(t){return Object(n["b"])({url:r.SightsingingList,method:"get",params:t})}function _(t){return Object(n["b"])({url:r.ChoiceList,method:"get",params:t})}function v(t){return Object(n["b"])({url:r.DictationList,method:"get",params:t})}function w(t){return Object(n["b"])({url:r.QuesGroupList,method:"get",params:t})}function L(t){return Object(n["b"])({url:r.ChoiceRecord,method:"post",data:t})}function O(t){return Object(n["b"])({url:r.SightsingingRecord,method:"post",data:t})}function j(t){return Object(n["b"])({url:r.DictationRecord,method:"post",data:t})}function S(t){return Object(n["b"])({url:r.UploadAudio,method:"post",data:t})}function y(t){return Object(n["b"])({url:r.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function q(t){return Object(n["b"])({url:r.UploadPNG,method:"post",data:t})}},5843:function(t,e,i){},"97e4":function(t,e,i){"use strict";i("5843")},bf54:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("page-header-wrapper",{attrs:{title:"听写题答题卡",content:"听写题答题卡"}},[i("a-card",{attrs:{title:t.groupTitle,bordered:!1}},t._l(t.questionList.slice(t.current-1,t.current),(function(e,n){return i("a-card",{key:0+n,attrs:{"body-style":{padding:"24px 32px",height:"700px"}}},[i("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.ques_txt)+" "),i("a-divider",{staticStyle:{margin:"16px 0"}}),e.ques_pic_path?i("img",{attrs:{width:800,src:e.ques_pic_path}}):t._e(),e.ques_pic_path?i("a-divider",{staticStyle:{margin:"16px 0"}}):t._e(),i("my-player",{attrs:{src:e.ques_audio_path,metroSrc:t.metroSrc(e)}}),i("a-divider",{staticStyle:{margin:"16px 0"}}),i("a-steps",{attrs:{current:t.current-1}},t._l(t.questionList,(function(t,e){return i("a-step",{key:1+e,attrs:{title:"第"+(e+1)+"题"}})})),1)],1),t.fresh?i("iframe",{staticClass:"iframe_box",attrs:{name:"myLeadsheet",src:"/leadsheet/samples/simpleInterface/interface.html",frameborder:"0",scrolling:"auto"}}):t._e()])})),1),i("footer-tool-bar",[t.statusMap[t.state].disabled?i("a-tooltip",{attrs:{placement:"topRight"},scopedSlots:t._u([{key:"title",fn:function(){return[i("span",[t._v(t._s(t.statusMap[t.state].text))])]},proxy:!0}],null,!1,3007124065)},[i("a-button",{staticStyle:{"margin-left":"20px"},attrs:{disabled:!0,type:"primary",loading:t.loading}},[t._v("提交")])],1):i("a-popconfirm",{attrs:{title:"确认切换下一题吗？切换后本题将提交！"},on:{confirm:t.handleSubmit,cancel:t.cancelSubmit}},[i("a-button",{attrs:{type:"primary",loading:t.loading}},[t._v(t._s(t.buttonText))])],1)],1)],1)},r=[],s=(i("ac1f"),i("5319"),i("d3b7"),i("25f0"),i("1276"),i("ace4"),i("5cc6"),i("9a8c"),i("a975"),i("735e"),i("c1ac"),i("d139"),i("3a7b"),i("d5d6"),i("82f8"),i("e91f"),i("60bd"),i("5f96"),i("3280"),i("3fcc"),i("ca91"),i("25a1"),i("cd26"),i("3c5d"),i("2954"),i("649e"),i("219c"),i("170b"),i("b39a"),i("72f7"),i("5a70")),o=i("0fea"),a=(i("ca00"),i("56cd")),u={0:{disabled:!1,text:"待完成"},1:{disabled:!0,text:"作业已完成，无法再次提交！"},2:{disabled:!0,text:"作业已逾期，无法再进行提交！"}},c={name:"DictationLayout",components:{FooterToolBar:s["a"]},data:function(){return{global_url:"https://musicmuc.chimusic.net/solfeggio/",userInfo:this.$store.getters.userInfo,metronome:this.$store.getters.metronome,loading:!1,questionList:[],current:1,part_id:"",state:0,JSONSong:"",viewer:"",songModel:"",songList:[],fresh:!0,statusMap:u}},beforeMount:function(){this.$route.params.part_id?(this.part_id=this.$route.params.part_id,this.state=this.$route.params.state):this.$router.push({name:"home",replace:!0}),this.getQuestion()},computed:{groupTitle:function(){return this.questionList.length?this.questionList[0]["L_ques_txt"]:""},buttonText:function(){return this.questionList.length==this.current?"提交":"下一题"},metroSrc:function(){var t=this;return function(e){return t.metronome?"/library/metronome/"+e.note+"_"+e.beat+"_"+e.bpm+".mp3":""}}},methods:{handleSubmit:function(){""!=this.JSONSong?this.uploadField():a["a"].error({message:"请先输入曲谱再提交!",description:""})},uploadField:function(){var t=this,e=this.uploadPNGField(),i=this.uploadJsonField();this.loading=!0,Object(o["u"])(e).then((function(e){Object(o["t"])(i).then((function(i){t.loading=!1,t.songList.push({part_id:t.part_id.substring(0,20)+t.current,json:i.content.replace("http://127.0.0.1:8000/media/",""),png:e.content.replace("http://127.0.0.1:8000/media/","")}),t.questionList.length==t.current?t.submitHomework():(t.current+=1,t.JSONSong="",t.reloadIframe())})).catch((function(e){a["a"].error({message:"JSON上传失败"}),t.loading=!1}))})).catch((function(t){a["a"].error({message:"图片上传失败"})}))},uploadJsonField:function(){var t=new FormData,e=new Blob([JSON.stringify(this.JSONSong)],{type:"text/json"});return t.append("content",e,this.part_id.substring(0,20)+this.current+"-"+this.userInfo.user.toString()+".json"),t.append("part_id",this.part_id.substring(0,20)+this.current),t.append("user",this.userInfo.user),t},DataURIToBlob:function(t){for(var e=t.split(","),i=e[0].indexOf("base64")>=0?atob(e[1]):decodeURI(e[1]),n=e[0].split(":")[1].split(";")[0],r=new Uint8Array(i.length),s=0;s<i.length;s++)r[s]=i.charCodeAt(s);return new Blob([r],{type:n})},uploadPNGField:function(){var t=3;this.viewer.canvas.width=this.viewer.canvas.width*t,this.viewer.typeResize="scale",this.viewer._resize(this.viewer.canvas.width),this.viewer.draw(this.songModel);var e=this.viewer.canvas.toDataURL("image/png","1"),i=new FormData,n=this.DataURIToBlob(e);return i.append("content",n,this.part_id.substring(0,20)+this.current+"-"+this.userInfo.user.toString()+".png"),i.append("part_id",this.part_id.substring(0,20)+this.current),i.append("user",this.userInfo.user),this.viewer.typeResize="fluid",this.viewer.canvas.width=Math.ceil(this.viewer.canvas.width/t),this.viewer._resize(this.viewer.canvas.width),this.viewer.draw(this.songModel),i},submitHomework:function(){var t=this,e={groupPart_id:this.part_id.substring(0,19),field:this.songList,user:this.userInfo.user,lesson_No:this.part_id.charAt(18)};Object(o["s"])(e).then((function(e){a["a"].success({message:"音频上传成功",description:"在个人中心中查看提交详情！"}),t.loading=!1,t.$router.push({name:"dictation-list",replace:!0,params:{lesson_No:t.part_id.charAt(18)}})})).catch((function(e){a["a"].error({message:"音频上传失败",description:e.response.data}),t.loading=!1}))},cancelSubmit:function(){},reloadIframe:function(){var t=this;this.fresh=!1,this.$nextTick((function(){t.fresh=!0}))},handleMessage:function(t){var e=this,i=t.data;"submitWork"==i.cmd&&(this.loading=!0,setTimeout((function(){e.loading=!1,e.$message.info("作业提交成功!"),e.$router.push({name:"dictation-list",params:{}})}),1e3))},getQuestion:function(){var t=this,e={part_id:this.part_id,withAnswer:0};Object(o["g"])(e).then((function(e){t.questionList=e})).catch((function(t){a["a"].error({message:"获取听写题信息失败",description:t.response.data})}))},getModle:function(t,e,i,n){this.JSONSong=t,this.viewer=i,this.songModel=n}},mounted:function(){this.getQuestion(),window.updateModel=this.getModle}},d=c,h=(i("97e4"),i("2877")),p=Object(h["a"])(d,n,r,!1,null,"dc637a78",null);e["default"]=p.exports}}]);