(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e73462d6"],{"0fea":function(t,e,n){"use strict";n.d(e,"j",(function(){return s})),n.d(e,"k",(function(){return r})),n.d(e,"o",(function(){return a})),n.d(e,"n",(function(){return u})),n.d(e,"e",(function(){return c})),n.d(e,"h",(function(){return d})),n.d(e,"p",(function(){return l})),n.d(e,"a",(function(){return h})),n.d(e,"b",(function(){return m})),n.d(e,"d",(function(){return p})),n.d(e,"g",(function(){return f})),n.d(e,"m",(function(){return g})),n.d(e,"l",(function(){return b})),n.d(e,"c",(function(){return _})),n.d(e,"f",(function(){return L})),n.d(e,"i",(function(){return v})),n.d(e,"r",(function(){return O})),n.d(e,"v",(function(){return I})),n.d(e,"s",(function(){return j})),n.d(e,"q",(function(){return S})),n.d(e,"t",(function(){return k})),n.d(e,"u",(function(){return q}));var i=n("b775"),o={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",studentList:"/manage/studentList",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/"};function s(t){return Object(i["b"])({url:o.role,method:"get",params:t})}function r(t){return Object(i["b"])({url:o.service,method:"get",params:t})}function a(t){return Object(i["b"])({url:o.studentList,method:"get",params:t})}function u(t){return Object(i["b"])({url:o.studentInfo,method:"get",params:t})}function c(t){return Object(i["b"])({url:o.commitList,method:"get",params:t})}function d(t){return Object(i["b"])({url:o.noticeList,method:"get",params:t})}function l(t){return Object(i["b"])({url:o.noticeList,method:"put",data:t})}function h(t){return Object(i["b"])({url:o.noticeList,method:"post",data:t})}function m(t){return Object(i["b"])({url:o.noticeList,method:"delete",data:t})}function p(t){return Object(i["b"])({url:o.ChoiceQuesList,method:"get",params:t})}function f(t){return Object(i["b"])({url:o.DictationQuesList,method:"get",params:t})}function g(t){return Object(i["b"])({url:o.SightsingingQuesList,method:"get",params:t})}function b(t){return Object(i["b"])({url:o.SightsingingList,method:"get",params:t})}function _(t){return Object(i["b"])({url:o.ChoiceList,method:"get",params:t})}function L(t){return Object(i["b"])({url:o.DictationList,method:"get",params:t})}function v(t){return Object(i["b"])({url:o.QuesGroupList,method:"get",params:t})}function O(t){return Object(i["b"])({url:o.ChoiceRecord,method:"post",data:t})}function I(t){return Object(i["b"])({url:o.SightsingingRecord,method:"post",data:t})}function j(t){return Object(i["b"])({url:o.DictationRecord,method:"post",data:t})}function S(t){return Object(i["b"])({url:o.UploadAudio,method:"post",data:t})}function k(t){return Object(i["b"])({url:o.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function q(t){return Object(i["b"])({url:o.UploadPNG,method:"post",data:t})}},3405:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-card",{staticStyle:{"margin-top":"24px"},attrs:{bordered:!1}},[n("a-list",{attrs:{size:"large",rowKey:"id",loading:t.loading,itemLayout:"vertical",dataSource:t.itemList},scopedSlots:t._u([{key:"renderItem",fn:function(e){return n("a-list-item",{key:e.id},[n("template",{slot:"actions"},[n("a-badge",{attrs:{status:t.statusMap[e.state].status,text:t.statusMap[e.state].text}})],1),n("a-list-item-meta",[n("a",{attrs:{slot:"title"},on:{click:function(n){return t.handleEdit(e)}},slot:"title"},[t._v(t._s(e.part_name))]),n("template",{slot:"description"},[n("span",[e.audio_detail.audio_instrument?n("a-tag",[t._v(t._s(e.audio_detail.audio_instrument))]):t._e(),e.audio_detail.audio_nation?n("a-tag",[t._v(t._s(e.audio_detail.audio_nation))]):t._e(),e.audio_detail.audio_skill?n("a-tag",[t._v(t._s(e.audio_detail.audio_skill))]):t._e()],1)])],2),n("sightsing-list-content",{attrs:{description:e.description,player:e.audio_detail.audio_player,audioName:e.audio_detail.audio_name}})],2)}}])}),n("a-modal",{attrs:{title:"双声部信息录入","confirm-loading":t.confirmLoading,destroyOnClose:!0},on:{ok:t.handleOk,cancel:t.handleCancel},model:{value:t.modelVisible,callback:function(e){t.modelVisible=e},expression:"modelVisible"}},[n("p",[t._v("请搜索输入双声部合作同学的学号")]),n("a-input-search",{attrs:{placeholder:"请输入学号后进行搜索","enter-button":"",loading:t.searchLoading},on:{search:t.onSearch},model:{value:t.studentId,callback:function(e){t.studentId=e},expression:"studentId"}}),""!=t.coopStudentInfo.id?n("a-list-item",[n("a-list-item-meta",{attrs:{description:t.coopStudentInfo.id}},[n("a-avatar",{attrs:{slot:"avatar",size:"large",src:t.coopStudentInfo.avatar},slot:"avatar"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(t.coopStudentInfo.name)+" ")])],1)],1):t._e(),n("p",{staticStyle:{"margin-top":"10px"}},[t._v("请选择你将要演唱的声部")]),n("a-space",{attrs:{direction:"vertical"}},[n("a-radio-group",{attrs:{"option-type":"button",options:t.plainOptions},model:{value:t.voicePart,callback:function(e){t.voicePart=e},expression:"voicePart"}})],1)],1)],1)],1)},o=[],s=n("2af9"),r=n("0fea"),a=n("56cd"),u={0:{status:"processing",text:"待完成"},1:{status:"success",text:"已完成"},2:{status:"error",text:"已逾期"},3:{status:"default",text:"未开放"}},c=["低声部","高声部"],d={components:{SightsingListContent:s["l"]},data:function(){return{statusMap:u,loading:!0,itemList:[],form:this.$form.createForm(this),lesson_No:"",grade:this.$store.getters.userInfo.course.grade,userInfo:this.$store.getters.userInfo,quesDetail:"",modelVisible:!1,confirmLoading:!1,searchLoading:!1,studentId:"",coopStudentInfo:{id:"",avater:"",name:""},voicePart:"低声部",plainOptions:c}},beforeMount:function(){this.$route.params.lesson_No?this.lesson_No=this.$route.params.lesson_No:this.lesson_No=this.$store.getters.lesson_No,this.getList()},methods:{handleEdit:function(t){3==t.state?a["a"].error({message:"该题目尚未开放",description:""}):"3"==t.part_id.charAt(2)?(this.quesDetail=t,this.modelVisible=!0):this.$router.push({name:"sightsing",params:{quesDetail:t}})},getList:function(t){var e=this;t&&(this.lesson_No=t),this.loading=!0;var n={lesson_No:this.lesson_No,grade:this.grade};Object(r["l"])(n).then((function(t){e.itemList=t.result,e.loading=!1})).catch((function(t){a["a"].error({message:"获取视唱题列表失败",description:""})}))},handleOk:function(){""!=this.coopStudentInfo.id?this.$router.push({name:"sightsing",params:{quesDetail:this.quesDetail,coopStudentInfo:this.coopStudentInfo,voicePart:this.voicePart}}):a["a"].error({message:"请搜索合作者后再进行作答！",description:"未选择双声部合作同学"})},handleCancel:function(){this.confirmLoading=!1,this.searchLoading=!1,this.studentId="",this.coopStudentInfo={id:"",avater:"",name:""}},onSearch:function(){var t=this;if(""==this.studentId)a["a"].error({message:"请输入学号后再进行搜索",duration:2});else if(this.studentId==this.userInfo.id)a["a"].error({message:"无法与本人进行合作，请搜索同课程其他同学",duration:2});else{this.searchLoading=!0;var e={studentId:this.studentId,courseId:this.userInfo.course.id};Object(r["n"])(e).then((function(e){t.searchLoading=!1,t.coopStudentInfo=e.result})).catch((function(e){t.searchLoading=!1,t.coopStudentInfo={id:"",avater:"",name:""},a["a"].error({message:"查询学生失败",description:"未查询到学生，请仔细核对学号！"})}))}}}},l=d,h=n("2877"),m=Object(h["a"])(l,i,o,!1,null,"a3ad27b8",null);e["default"]=m.exports}}]);