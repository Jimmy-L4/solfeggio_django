(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d00cac0e"],{"0fea":function(t,e,r){"use strict";r.d(e,"k",(function(){return o})),r.d(e,"l",(function(){return a})),r.d(e,"r",(function(){return c})),r.d(e,"q",(function(){return s})),r.d(e,"b",(function(){return u})),r.d(e,"i",(function(){return d})),r.d(e,"t",(function(){return l})),r.d(e,"a",(function(){return h})),r.d(e,"c",(function(){return m})),r.d(e,"e",(function(){return f})),r.d(e,"h",(function(){return p})),r.d(e,"n",(function(){return g})),r.d(e,"m",(function(){return b})),r.d(e,"d",(function(){return v})),r.d(e,"g",(function(){return y})),r.d(e,"j",(function(){return _})),r.d(e,"v",(function(){return j})),r.d(e,"z",(function(){return S})),r.d(e,"w",(function(){return w})),r.d(e,"u",(function(){return O})),r.d(e,"x",(function(){return L})),r.d(e,"y",(function(){return x})),r.d(e,"o",(function(){return k})),r.d(e,"f",(function(){return q})),r.d(e,"p",(function(){return C})),r.d(e,"s",(function(){return D}));var n=r("b775"),i={user:"/user",role:"/role",service:"/service",permission:"/permission",permissionNoPager:"/permission/no-pager",orgTree:"/org/tree",commitList:"/manage/commitList",noticeList:"/notice/",ChoiceQuesList:"/question/choice/",DictationQuesList:"/question/dictation/",SightsingingQuesList:"/question/sightsinging/",SightsingingList:"/question/sightsinging_list/",ChoiceList:"/question/choice_list/",DictationList:"/question/dictation_list/",QuesGroupList:"/homework/quse_group/",ChoiceRecord:"/homework/choice/",SightsingingRecord:"/homework/sightsinging/",DictationRecord:"/homework/dictation/",UploadAudio:"/router/audio/",UploadJson:"/router/json/",UploadPNG:"/router/png/",studentInfo:"/user/student_info/",changePass:"/user/change_pass/",studentList:"/user/student_list/",SingDetail:"/workbench/sing_detail/",CommitInfo:"/workbench/commit_info/",SingRecord:"/workbench/sing_record/"};function o(t){return Object(n["b"])({url:i.role,method:"get",params:t})}function a(t){return Object(n["b"])({url:i.service,method:"get",params:t})}function c(t){return Object(n["b"])({url:i.studentList,method:"get",params:t})}function s(t){return Object(n["b"])({url:i.studentInfo,method:"get",params:t})}function u(t){return Object(n["b"])({url:i.changePass,method:"post",data:t})}function d(t){return Object(n["b"])({url:i.noticeList,method:"get",params:t})}function l(t){return Object(n["b"])({url:i.noticeList,method:"put",data:t})}function h(t){return Object(n["b"])({url:i.noticeList,method:"post",data:t})}function m(t){return Object(n["b"])({url:i.noticeList,method:"delete",data:t})}function f(t){return Object(n["b"])({url:i.ChoiceQuesList,method:"get",params:t})}function p(t){return Object(n["b"])({url:i.DictationQuesList,method:"get",params:t})}function g(t){return Object(n["b"])({url:i.SightsingingQuesList,method:"get",params:t})}function b(t){return Object(n["b"])({url:i.SightsingingList,method:"get",params:t})}function v(t){return Object(n["b"])({url:i.ChoiceList,method:"get",params:t})}function y(t){return Object(n["b"])({url:i.DictationList,method:"get",params:t})}function _(t){return Object(n["b"])({url:i.QuesGroupList,method:"get",params:t})}function j(t){return Object(n["b"])({url:i.ChoiceRecord,method:"post",data:t})}function S(t){return Object(n["b"])({url:i.SightsingingRecord,method:"post",data:t})}function w(t){return Object(n["b"])({url:i.DictationRecord,method:"post",data:t})}function O(t){return Object(n["b"])({url:i.UploadAudio,method:"post",data:t})}function L(t){return Object(n["b"])({url:i.UploadJson,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function x(t){return Object(n["b"])({url:i.UploadPNG,method:"post",data:t})}function k(t){return Object(n["b"])({url:i.SingDetail,method:"get",params:t})}function q(t){return Object(n["b"])({url:i.CommitInfo,method:"get",params:t})}function C(t){return Object(n["b"])({url:i.SingRecord,method:"get",params:t})}function D(t){return Object(n["b"])({url:i.SingRecord,method:"put",data:t})}},"1a59":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("page-header-wrapper",{attrs:{title:!1,content:"批改页面用于批改学生作业"}},[r("a-card",{attrs:{"body-style":{padding:"24px 32px"},bordered:!1}},[r("a-card",{attrs:{type:"inner",title:"曲谱信息"}},[r("audio-player",{staticStyle:{"margin-top":"12px"},attrs:{src:t.questionDetail.audio_path}}),r("a-divider",{staticStyle:{margin:"16px 0"}}),r("a-card",{staticStyle:{"margin-top":"24px"},attrs:{type:"inner",title:"曲谱信息"}},[r("img",{staticStyle:{"text-align":"center"},attrs:{width:"97%",src:t.questionDetail.pic_path}})])],1),t.recordCard.audio?r("a-card",{staticStyle:{"margin-top":"24px"},attrs:{type:"inner",title:"学生提交("+(t.index+1)+"/"+t.commitList.length+")",loading:t.recordLoading}},[r("a-descriptions",{attrs:{title:"学生信息"}},[r("a-descriptions-item",{attrs:{label:"姓名"}},[t._v(t._s(t.record.studentName))]),r("a-descriptions-item",{attrs:{label:"学号"}},[t._v(t._s(t.record.studentId))]),r("a-descriptions-item",{attrs:{label:"班级"}},[t._v(t._s(t.recordClass))]),0!=t.quesType?r("a-descriptions-item",{attrs:{label:"低声部"}},[t._v(t._s(t.lowPart))]):t._e(),0!=t.quesType?r("a-descriptions-item",{attrs:{label:"高声部"}},[t._v(t._s(t.highPart))]):t._e()],1),r("div",[t._v("提交音频: "),r("audio-player",{staticStyle:{"margin-top":"12px"},attrs:{src:t.recordCard.audio}})],1),r("a-form",{staticStyle:{"margin-top":"24px"},attrs:{name:"成绩",form:t.form},on:{submit:t.handleSubmit}},[r("div",{staticStyle:{"font-size":"medium","font-weight":"bold"}},[t._v("评分(百分制)")]),r("a-row",{attrs:{gutter:24}},[t._l(t.factor,(function(e,n,i){return[r("a-col",{attrs:{span:4}},[r("a-form-item",{attrs:{name:n,label:e}},[r("a-input-number",{directives:[{name:"decorator",rawName:"v-decorator",value:[n,{rules:[{required:!0,message:"请输入分数"}]}],expression:"[key, { rules: [{ required: true, message: '请输入分数' }] }]"}],attrs:{min:0,max:100},on:{blur:t.averageScore}})],1)],1)]}))],2),r("a-row",[r("a-col",{staticStyle:{"text-align":"right","font-weight":"bolder"},attrs:{span:24}},[r("a-descriptions",[r("a-descriptions-item",{attrs:{label:"最终成绩"}},[t._v(t._s(t.meanScore)+"分")])],1)],1)],1),r("a-row",[r("a-col",{staticStyle:{"text-align":"right"},attrs:{span:24}},[r("a-button",{attrs:{htmlType:"submit",type:"primary"}},[t._v("批改")]),r("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(){return t.form.resetFields()}}},[t._v("清空")]),r("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.switchCard()}}},[t._v("下一位")]),r("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.back2workbench()}}},[t._v("返回信息页")])],1)],1),r("a-row",[r("a-col",{staticStyle:{"text-align":"right"},attrs:{span:24}},[r("a-tag",{staticStyle:{margin:"12px 8px"}},[t._v(" Tips:点击批改后会自动跳转至题卡中下位同学 ")])],1)],1)],1)],1):t._e()],1)],1)},i=[],o=(r("b0c0"),r("4de4"),r("d3b7"),r("b64b"),r("56cd")),a=r("0fea"),c=r("88bc"),s=r.n(c),u={name:"Correcting",data:function(){return{quesType:0,form:this.$form.createForm(this),factor:{fluency:"流畅性",speed:"速度",pitch:"音高",rhythm:"节奏"},formState:{},meanScore:0,questionDetail:{},index:0,record:{},commitList:[],recordCard:{},part_id:"",userInfo:this.$store.getters.userInfo,recordLoading:!1}},computed:{recordClass:function(){var t=this;return this.userInfo.class_list.filter((function(e){return e.id==t.record.class_id}))[0].name},lowPart:function(){return"1"==this.quesType?this.record.studentName:this.record.coop_user},highPart:function(){return"2"==this.quesType?this.record.studentName:this.record.coop_user}},beforeMount:function(){this.$route.params.questionDetail?(this.questionDetail=this.$route.params.questionDetail,this.index=this.$route.params.index,this.commitList=this.$route.params.commitList,this.record=this.commitList[this.index],this.part_id=this.$route.params.part_id):this.$router.push({name:"workbench",replace:!0})},mounted:function(){this.getRecord()},methods:{handleSubmit:function(t){var e=this;t.preventDefault(),this.form.validateFields((function(t,r){t||e.submitScore(r)}))},submitScore:function(t){var e=this;for(var r in t)this.recordCard[r]=t[r];this.averageScore(),this.recordCard["teacher_score"]=this.meanScore,Object(a["s"])(this.recordCard).then((function(t){o["a"].success({message:"批改成功",description:e.index==e.commitList.length-1?"本组学生已批阅完成,请切换至下组学生":"正在切换至下位学生"}),e.switchCard()})).catch((function(t){}))},switchCard:function(){var t=this.commitList.length;this.index==t-1?this.back2workbench():(this.index+=1,this.record=this.commitList[this.index],this.getRecord())},back2workbench:function(){var t={part_id:this.part_id};this.$router.push({name:"workbench",params:t})},averageScore:function(){var t=this.form.getFieldsValue(),e=0,r=0;for(var n in t)"undefined"!=typeof t[n]&&(e+=1,r+=t[n]);e&&(this.meanScore=parseInt(r/e))},getRecord:function(){var t=this;this.recordLoading=!0;var e={record_id:this.record.key};Object(a["p"])(e).then((function(e){t.recordLoading=!1,t.recordCard=e.result,t.quesType=e.result.ques_type,0!=t.quesType&&(t.factor["alignment"]="对齐",t.factor["chord"]="和声"),t.setForm(e.result)})).catch((function(e){t.recordLoading=!1,o["a"].error({message:"获取视唱记录失败",description:""})}))},setForm:function(t){var e=this,r=s()(t,Object.keys(this.factor));setTimeout((function(){e.form.setFieldsValue(r),e.averageScore()}),100)}}},d=u,l=r("2877"),h=Object(l["a"])(d,n,i,!1,null,null,null);e["default"]=h.exports},"88bc":function(t,e,r){(function(e){var r=1/0,n=9007199254740991,i="[object Arguments]",o="[object Function]",a="[object GeneratorFunction]",c="[object Symbol]",s="object"==typeof e&&e&&e.Object===Object&&e,u="object"==typeof self&&self&&self.Object===Object&&self,d=s||u||Function("return this")();function l(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}function h(t,e){var r=-1,n=t?t.length:0,i=Array(n);while(++r<n)i[r]=e(t[r],r,t);return i}function m(t,e){var r=-1,n=e.length,i=t.length;while(++r<n)t[i+r]=e[r];return t}var f=Object.prototype,p=f.hasOwnProperty,g=f.toString,b=d.Symbol,v=f.propertyIsEnumerable,y=b?b.isConcatSpreadable:void 0,_=Math.max;function j(t,e,r,n,i){var o=-1,a=t.length;r||(r=L),i||(i=[]);while(++o<a){var c=t[o];e>0&&r(c)?e>1?j(c,e-1,r,n,i):m(i,c):n||(i[i.length]=c)}return i}function S(t,e){return t=Object(t),w(t,e,(function(e,r){return r in t}))}function w(t,e,r){var n=-1,i=e.length,o={};while(++n<i){var a=e[n],c=t[a];r(c,a)&&(o[a]=c)}return o}function O(t,e){return e=_(void 0===e?t.length-1:e,0),function(){var r=arguments,n=-1,i=_(r.length-e,0),o=Array(i);while(++n<i)o[n]=r[e+n];n=-1;var a=Array(e+1);while(++n<e)a[n]=r[n];return a[e]=o,l(t,this,a)}}function L(t){return q(t)||k(t)||!!(y&&t&&t[y])}function x(t){if("string"==typeof t||P(t))return t;var e=t+"";return"0"==e&&1/t==-r?"-0":e}function k(t){return D(t)&&p.call(t,"callee")&&(!v.call(t,"callee")||g.call(t)==i)}var q=Array.isArray;function C(t){return null!=t&&R(t.length)&&!T(t)}function D(t){return I(t)&&C(t)}function T(t){var e=F(t)?g.call(t):"";return e==o||e==a}function R(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=n}function F(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function I(t){return!!t&&"object"==typeof t}function P(t){return"symbol"==typeof t||I(t)&&g.call(t)==c}var $=O((function(t,e){return null==t?{}:S(t,h(j(e,1),x))}));t.exports=$}).call(this,r("c8ba"))}}]);