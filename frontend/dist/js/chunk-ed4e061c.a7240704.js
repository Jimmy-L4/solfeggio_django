(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ed4e061c"],{"9fb8":function(t,a,e){},ad1f:function(t,a,e){"use strict";e("9fb8")},de89:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("page-header-wrapper",{attrs:{"tab-list":t.tabList,"tab-active-key":t.tabActiveKey,"tab-change":t.handleTabChange}},[e("a-card",{staticClass:"ant-pro-components-tag-select",attrs:{bordered:!1}},[e("a-form",{attrs:{layout:"inline"}},[e("standard-form-row",{staticStyle:{"padding-bottom":"0px"},attrs:{title:"选择课次",last:!0}},[e("a-form-item",[e("a-radio-group",{attrs:{defaultValue:t.lesson_No},on:{change:t.lessonChange},model:{value:t.lesson_No,callback:function(a){t.lesson_No=a},expression:"lesson_No"}},[e("a-radio-button",{attrs:{value:"1"}},[t._v("课次一")]),e("a-radio-button",{attrs:{value:"2"}},[t._v("课次二")]),e("a-radio-button",{attrs:{value:"3"}},[t._v("课次三")]),e("a-radio-button",{attrs:{value:"4"}},[t._v("课次四")]),e("a-radio-button",{attrs:{value:"5"}},[t._v("课次五")]),e("a-radio-button",{attrs:{value:"6"}},[t._v("课次六")]),e("a-radio-button",{attrs:{value:"7"}},[t._v("课次七")]),e("a-radio-button",{attrs:{value:"8"}},[t._v("课次八")])],1)],1)],1)],1)],1),e("router-view",{ref:"Childmain"})],1)},o=[],n=e("2af9"),i=n["n"].Option,r=function(t){switch(t){case"/study/sightsing-list":return"1";case"/study/choice-list":return"2";case"/study/dictation-list":return"3";default:return"1"}},u={components:{TagSelect:n["n"],TagSelectOption:i,StandardFormRow:n["m"]},name:"SearchLayout",data:function(){return{tabList:[{key:"1",tab:"视唱题目"},{key:"2",tab:"练耳选择题"},{key:"3",tab:"练耳听写题"}],tabActiveKey:"1",search:!0,lesson_No:""}},created:function(){var t=this;this.$route.params.lesson_No?this.lesson_No=this.$route.params.lesson_No:this.lesson_No=this.$store.getters.lesson_No,this.tabActiveKey=r(this.$route.path),this.$watch("$route",(function(a){t.tabActiveKey=r(a.path)}))},methods:{handleTabChange:function(t){switch(this.tabActiveKey=t,t){case"1":this.$router.push({name:"sightsing-list",params:{lesson_No:this.lesson_No}});break;case"2":this.$router.push({name:"choice-list",params:{lesson_No:this.lesson_No}});break;case"3":this.$router.push({name:"dictation-list",params:{lesson_No:this.lesson_No}});break;default:this.$router.push("/home")}},lessonChange:function(t){this.$refs["Childmain"].getList(this.lesson_No)}}},l=u,c=(e("ad1f"),e("2877")),h=Object(c["a"])(l,s,o,!1,null,"0e19c996",null);a["default"]=h.exports}}]);