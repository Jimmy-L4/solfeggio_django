(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ecc1a87e"],{"1fce":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"account-settings-info-view",staticStyle:{width:"50%"}},[n("a-list",[n("a-list-item",{scopedSlots:e._u([{key:"actions",fn:function(){return[n("a-switch",{attrs:{checkedChildren:"开启",unCheckedChildren:"关闭",defaultChecked:e.metronomeSwitch},on:{change:e.onChange}})]},proxy:!0}])},[n("a-list-item-meta",{scopedSlots:e._u([{key:"title",fn:function(){return[n("a",[e._v("节拍器与标准音")])]},proxy:!0},{key:"description",fn:function(){return[n("span",[e._v(" 练耳选择题播放题目前是否播放节拍器与标准音 ")])]},proxy:!0}])})],1)],1),e.userInfo.is_superuser?n("a-form",{attrs:{layout:"vertical"}},[n("a-form-item",{attrs:{label:"管理员等级"}},[n("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["grade",{rules:[{required:!0,message:"请选择管理员"}]}],expression:"['grade', { rules: [{ required: true, message: '请选择管理员' }] }]"}],attrs:{placeholder:"请选择要切换的等级"}},[n("a-select-option",{attrs:{value:"0"}},[e._v("基础级")]),n("a-select-option",{attrs:{value:"1"}},[e._v("一级")]),n("a-select-option",{attrs:{value:"2"}},[e._v("二级")]),n("a-select-option",{attrs:{value:"3"}},[e._v("三级")]),n("a-select-option",{attrs:{value:"4"}},[e._v("四级")])],1)],1),n("a-form-item",[n("a-button",{attrs:{type:"primary"},on:{click:e.validate}},[e._v("更新等级")])],1)],1):e._e()],1)},a=[],o=n("432b"),i=n("9fb0"),s=n("7ded"),u=n("56cd"),c={mixins:[o["a"]],components:{},data:function(){return{preview:{},metronomeSwitch:this.$store.getters.metronome,userInfo:this.$store.getters.userInfo}},mounted:function(){},methods:{onChange:function(e){this.$store.commit(i["l"],e);var t={metronome:e};Object(s["f"])(t).then((function(t){u["a"].success({message:"更新设置成功",description:"节拍器和标准音开关："+e})})).catch((function(e){u["a"].error({message:"更新设置失败",description:""})}))},validate:function(){}}},p=c,l=n("2877"),d=Object(l["a"])(p,r,a,!1,null,"3ce7ef1a",null);t["default"]=d.exports},"432b":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("5530"),a=n("5880"),o={computed:Object(r["a"])(Object(r["a"])({},Object(a["mapState"])({layout:function(e){return e.app.layout},navTheme:function(e){return e.app.theme},primaryColor:function(e){return e.app.color},colorWeak:function(e){return e.app.weak},fixedHeader:function(e){return e.app.fixedHeader},fixedSidebar:function(e){return e.app.fixedSidebar},contentWidth:function(e){return e.app.contentWidth},autoHideHeader:function(e){return e.app.autoHideHeader},isMobile:function(e){return e.app.isMobile},sideCollapsed:function(e){return e.app.sideCollapsed},multiTab:function(e){return e.app.multiTab}})),{},{isTopMenu:function(){return"topmenu"===this.layout}}),methods:{isSideMenu:function(){return!this.isTopMenu}}}}}]);