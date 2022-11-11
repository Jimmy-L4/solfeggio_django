(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c9fa23c0","chunk-4e8584ec","chunk-74667e5b"],{"011d":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("page-header-wrapper",{attrs:{content:"作业空间界面主要用于批改学生作业及查询题目内容"}},[r("a-card",{staticClass:"card",attrs:{title:"题目选择",bordered:!1}},[r("selection-box",{ref:"selection",attrs:{showSubmit:!0},on:{info:t.getUpload}})],1),r("a-card",{staticClass:"card",attrs:{bordered:!1,title:"题目信息"}},[t.questionDetail.audio_detail?r("div",[r("a-descriptions",{attrs:{title:"基础信息"}},[r("a-descriptions-item",{attrs:{label:"歌曲名称"}},[t._v(t._s(t.questionDetail.audio_detail.audio_name))]),r("a-descriptions-item",{attrs:{label:"演奏者"}},[t._v(t._s(t.questionDetail.audio_detail.audio_player))]),r("a-descriptions-item"),r("a-descriptions-item",{attrs:{label:"乐器"}},[t._v(t._s(t.questionDetail.audio_detail.audio_instrument))]),r("a-descriptions-item",{attrs:{label:"名族"}},[t._v(t._s(t.questionDetail.audio_detail.audio_nation))]),r("a-descriptions-item")],1),r("div",{staticStyle:{"font-size":"14px",color:"rgba(0, 0, 0, 0.85)","margin-bottom":"16px","font-weight":"500"}},[r("div",[t._v("范例音: "),r("audio-player",{staticStyle:{"margin-top":"12px"},attrs:{src:t.questionDetail.audio_path}})],1)]),r("a-card",{staticStyle:{"margin-top":"24px"},attrs:{type:"inner",title:"曲谱信息"}},[r("img",{staticStyle:{"text-align":"center"},attrs:{width:"97%",src:t.questionDetail.pic_path}})])],1):r("a-empty",{attrs:{description:"暂无题目, 请先点击查询"}})],1),r("a-card",{staticClass:"card",attrs:{bordered:!1,title:"作业提交概况"}},[t.jobInfo.total_len?r("a-row",[r("a-col",{attrs:{sm:8,xs:24}},[r("info",{attrs:{title:"应提交",value:t.jobInfo.total_len+"份",bordered:!0}})],1),r("a-col",{attrs:{sm:8,xs:24}},[r("info",{attrs:{title:"未提交",value:t.jobInfo.uncommitted_len+"份",bordered:!0}})],1),r("a-col",{attrs:{sm:8,xs:24}},[r("info",{attrs:{title:"已批改",value:t.jobInfo.marked_len+"份"}})],1)],1):r("a-empty",{attrs:{description:"暂无提交概况, 请先点击查询"}})],1),r("a-card",{attrs:{title:"学生提交"}},[r("s-table",{ref:"commit",attrs:{size:"default",rowKey:"key",columns:t.columns,data:t.loadData,showPagination:"auto"},scopedSlots:t._u([{key:"AIscore",fn:function(e){return r("span",{},[[t._v(" "+t._s(null==e?0:e)+" ")]],2)}},{key:"score",fn:function(e){return r("span",{},[[t._v(" "+t._s(null==e?0:e)+" ")]],2)}},{key:"action",fn:function(e,n,a){return r("span",{},[["未提交"==n.updatedAt?r("a-badge",{attrs:{status:"error",text:"未提交"}}):null==n.score?r("a",{staticStyle:{color:"red"},on:{click:function(e){return t.handleEdit(n,a)}}},[t._v("批阅分数")]):r("a",{staticStyle:{color:"green"},on:{click:function(e){return t.handleEdit(n,a)}}},[t._v("修改分数")])]],2)}}])})],1)],1)},a=[],o=(r("4de4"),r("d3b7"),r("d81d"),r("baab")),i=r("2af9"),u=r("432b"),s=r("2ddd"),c=r("0fea"),d=(r("3e8f"),[{title:"学号",dataIndex:"studentId"},{title:"姓名",dataIndex:"studentName"},{title:"提交时间",dataIndex:"updatedAt"},{title:"机器评分",dataIndex:"AIscore",scopedSlots:{customRender:"AIscore"}},{title:"分数",dataIndex:"score",scopedSlots:{customRender:"score"}},{title:"操作",dataIndex:"action",width:"150px",scopedSlots:{customRender:"action"}}]),l={name:"Workbench",mixins:[u["a"]],components:{SelectionBox:o["default"],Info:s["default"],STable:i["k"]},data:function(){var t=this;return this.columns=d,{part_id:"",grade:"",questionDetail:{},userInfo:this.$store.getters.userInfo,jobInfo:{},commitList:[],loadData:function(e){var r={course_list:t.getRealCourse,part_id:t.part_id},n=Object.assign({},e,r);return Object(c["f"])(n).then((function(e){return t.commitList=e.data.filter((function(t){return"未提交"!=t.updatedAt})),t.jobInfo={total_len:e.total_len,uncommitted_len:e.uncommitted_len,marked_len:e.marked_len},e}))}}},computed:{getRealCourse:function(){var t=this,e=this.userInfo.course_list.filter((function(e){return e.grade==t.grade})),r=e.map((function(t){return t.id}));return r}},mounted:function(){this.$route.params.part_id&&this.$refs.selection.handlePartId(this.$route.params.part_id)},methods:{handleEdit:function(t,e){var r={questionDetail:this.questionDetail,index:e,part_id:this.part_id,commitList:this.commitList};this.$router.push({name:"correcting",params:r})},getUpload:function(t,e,r){this.questionDetail=t,this.part_id=e,this.grade=r,this.$refs.commit.refresh()}}},m=l,f=(r("1d69"),r("2877")),p=Object(f["a"])(m,n,a,!1,null,"af40f704",null);e["default"]=p.exports},"078d":function(t,e,r){},"0fea":function(t,e,r){"use strict";r.d(e,"k",(function(){return o})),r.d(e,"l",(function(){return i})),r.d(e,"r",(function(){return u})),r.d(e,"q",(function(){return s})),r.d(e,"b",(function(){return c})),r.d(e,"i",(function(){return d})),r.d(e,"t",(function(){return l})),r.d(e,"a",(function(){return m})),r.d(e,"c",(function(){return f})),r.d(e,"e",(function(){return p})),r.d(e,"h",(function(){return h})),r.d(e,"n",(function(){return b})),r.d(e,"m",(function(){return g})),r.d(e,"d",(function(){return _})),r.d(e,"g",(function(){return v})),r.d(e,"j",(function(){return y})),r.d(e,"v",(function(){return q})),r.d(e,"z",(function(){return j})),r.d(e,"w",(function(){return k})),r.d(e,"u",(function(){return S})),r.d(e,"x",(function(){return O})),r.d(e,"y",(function(){return P})),r.d(e,"o",(function(){return x})),r.d(e,"f",(function(){return w})),r.d(e,"p",(function(){return I})),r.d(e,"s",(function(){return L}));var n=r("b775"),a={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/",changePass:"/user/change_pass/",studentList:"/user/student_list/",SingDetail:"/workbench/sing_detail/",CommitInfo:"/workbench/commit_info/",SingRecord:"/workbench/sing_record/"};function o(t){return Object(n["b"])({url:a.role,method:"get",params:t})}function i(t){return Object(n["b"])({url:a.service,method:"get",params:t})}function u(t){return Object(n["b"])({url:a.studentList,method:"get",params:t})}function s(t){return Object(n["b"])({url:a.studentInfo,method:"get",params:t})}function c(t){return Object(n["b"])({url:a.changePass,method:"post",data:t})}function d(t){return Object(n["b"])({url:a.noticeList,method:"get",params:t})}function l(t){return Object(n["b"])({url:a.noticeList,method:"put",data:t})}function m(t){return Object(n["b"])({url:a.noticeList,method:"post",data:t})}function f(t){return Object(n["b"])({url:a.noticeList,method:"delete",data:t})}function p(t){return Object(n["b"])({url:a.ChoiceQuesList,method:"get",params:t})}function h(t){return Object(n["b"])({url:a.DictationQuesList,method:"get",params:t})}function b(t){return Object(n["b"])({url:a.SightsingingQuesList,method:"get",params:t})}function g(t){return Object(n["b"])({url:a.SightsingingList,method:"get",params:t})}function _(t){return Object(n["b"])({url:a.ChoiceList,method:"get",params:t})}function v(t){return Object(n["b"])({url:a.DictationList,method:"get",params:t})}function y(t){return Object(n["b"])({url:a.QuesGroupList,method:"get",params:t})}function q(t){return Object(n["b"])({url:a.ChoiceRecord,method:"post",data:t})}function j(t){return Object(n["b"])({url:a.SightsingingRecord,method:"post",data:t})}function k(t){return Object(n["b"])({url:a.DictationRecord,method:"post",data:t})}function S(t){return Object(n["b"])({url:a.UploadAudio,method:"post",data:t})}function O(t){return Object(n["b"])({url:a.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function P(t){return Object(n["b"])({url:a.UploadPNG,method:"post",data:t})}function x(t){return Object(n["b"])({url:a.SingDetail,method:"get",params:t})}function w(t){return Object(n["b"])({url:a.CommitInfo,method:"get",params:t})}function I(t){return Object(n["b"])({url:a.SingRecord,method:"get",params:t})}function L(t){return Object(n["b"])({url:a.SingRecord,method:"put",data:t})}},"1d69":function(t,e,r){"use strict";r("078d")},"2ddd":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"header-info"},[r("span",[t._v(t._s(t.title))]),r("p",[t._v(t._s(t.value))]),t.bordered?r("em"):t._e()])},a=[],o={name:"Info",props:{title:{type:String,default:""},value:{type:String,default:""},bordered:{type:Boolean,default:!1}}},i=o,u=(r("d24f"),r("2877")),s=Object(u["a"])(i,n,a,!1,null,"151ee326",null);e["default"]=s.exports},"3e8f":function(t,e){},"432b":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r("5530"),a=r("5880"),o={computed:Object(n["a"])(Object(n["a"])({},Object(a["mapState"])({layout:function(t){return t.app.layout},navTheme:function(t){return t.app.theme},primaryColor:function(t){return t.app.color},colorWeak:function(t){return t.app.weak},fixedHeader:function(t){return t.app.fixedHeader},fixedSidebar:function(t){return t.app.fixedSidebar},contentWidth:function(t){return t.app.contentWidth},autoHideHeader:function(t){return t.app.autoHideHeader},isMobile:function(t){return t.app.isMobile},sideCollapsed:function(t){return t.app.sideCollapsed},multiTab:function(t){return t.app.multiTab}})),{},{isTopMenu:function(){return"topmenu"===this.layout}}),methods:{isSideMenu:function(){return!this.isTopMenu}}}},a4ce:function(t,e,r){},baab:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a-form",{staticClass:"form"},[r("a-row",{staticClass:"form-row",attrs:{gutter:16}},[r("a-col",{attrs:{lg:3,md:12,sm:24}},[r("a-form-item",{attrs:{label:"学习模式"}},[r("a-radio-group",{model:{value:t.queryParam.learningMode,callback:function(e){t.$set(t.queryParam,"learningMode",e)},expression:"queryParam.learningMode"}},[r("a-radio-button",{attrs:{value:"0"}},[t._v("视唱")])],1)],1)],1)],1),r("a-row",{staticClass:"form-row",attrs:{gutter:16}},[r("a-col",{attrs:{lg:15,md:12,sm:24}},[r("a-form-item",{attrs:{label:"课次选择"}},[r("a-radio-group",{model:{value:t.queryParam.lesson_No,callback:function(e){t.$set(t.queryParam,"lesson_No",e)},expression:"queryParam.lesson_No"}},[r("a-radio-button",{attrs:{value:"1"}},[t._v("课次一")]),r("a-radio-button",{attrs:{value:"2"}},[t._v("课次二")]),r("a-radio-button",{attrs:{value:"3"}},[t._v("课次三")]),r("a-radio-button",{attrs:{value:"4"}},[t._v("课次四")]),r("a-radio-button",{attrs:{value:"5"}},[t._v("课次五")]),r("a-radio-button",{attrs:{value:"6"}},[t._v("课次六")]),r("a-radio-button",{attrs:{value:"7"}},[t._v("课次七")]),r("a-radio-button",{attrs:{value:"8"}},[t._v("课次八")])],1)],1)],1)],1),r("a-row",{staticClass:"form-row",attrs:{gutter:16}},[r("a-col",{attrs:{lg:6,md:12,sm:24}},[r("a-form-item",{attrs:{label:"题目等级"}},[r("a-select",{model:{value:t.queryParam.grade,callback:function(e){t.$set(t.queryParam,"grade",e)},expression:"queryParam.grade"}},[r("a-select-option",{attrs:{value:"01"}},[t._v("基础级")]),r("a-select-option",{attrs:{value:"02"}},[t._v("一级")]),r("a-select-option",{attrs:{value:"03"}},[t._v("二级")]),r("a-select-option",{attrs:{value:"04"}},[t._v("三级")]),r("a-select-option",{attrs:{value:"05"}},[t._v("四级")])],1)],1)],1),r("a-col",{attrs:{lg:6,md:12,sm:24}},[r("a-form-item",{attrs:{label:"题目序号"}},[r("a-select",{attrs:{placeholder:"请选择题目序号"},model:{value:t.queryParam.questionNum,callback:function(e){t.$set(t.queryParam,"questionNum",e)},expression:"queryParam.questionNum"}},t._l(t.projects[t.queryParam.learningMode],(function(e){return r("a-select-option",{key:e.key,attrs:{value:e.key}},[t._v(t._s(e.value)+" ")])})),1)],1)],1)],1),t.showSubmit?r("a-form-item",[r("a-button",{on:{click:t.handleSubmit}},[t._v("查询")])],1):t._e()],1)},a=[],o=r("ca00"),i=r("0fea"),u=r("56cd"),s={0:[{key:"01",value:"单声部视谱即唱"},{key:"02",value:"单声部精唱"},{key:"03",value:"双声部"}],3:[{key:"01",value:"音阶"},{key:"02",value:"音组"},{key:"03",value:"音程"},{key:"04",value:"和弦"},{key:"05",value:"节奏"},{key:"06",value:"单声部旋律"},{key:"07",value:"双声部旋律"}]},c={name:"SelectionBox",props:{showSubmit:{type:Boolean,default:!1}},data:function(){return{projects:s,queryParam:{learningMode:"0",lesson_No:"1",grade:"02",questionNum:"01"},questionDetail:{}}},methods:{handleSubmit:function(){var t,e=this;t="0"==this.queryParam.learningMode?this.getSingPartId():this.getEarPartId();var r={part_id:t};Object(i["o"])(r).then((function(r){e.questionDetail=r.result,e.$emit("info",r.result,t,e.queryParam.grade)})).catch((function(t){u["a"].error({message:"获取题目信息失败",description:""})}))},getSingPartId:function(){var t=Object(o["a"])(this.queryParam.learningMode,this.queryParam.questionNum,"00",this.queryParam.grade,this.queryParam.lesson_No,"01");return t},getEarPartId:function(){},handlePartId:function(t){this.queryParam.learningMode=t.charAt(0),this.queryParam.questionNum="0"+t.charAt(2),this.queryParam.grade="0"+t.charAt(16),this.queryParam.lesson_No=t.charAt(18),this.handleSubmit()}}},d=c,l=r("2877"),m=Object(l["a"])(d,n,a,!1,null,"f862a240",null);e["default"]=m.exports},d24f:function(t,e,r){"use strict";r("a4ce")}}]);