webpackJsonp([7],{"4Zld":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("4YfN"),s=i.n(o),n=i("fUgm"),r=i("D/cR"),a=i("BGi1"),d={props:["info"],computed:s()({},Object(n.c)({sortList:"sort/list",goodsList:"goods/list"})),data:function(){return{timeArr:[],secondArr:[],goodsArr:[],form:{title:"",begintime:"",endtime:"",first_cateid:"",second_cateid:"",goodsid:"",status:1}}},methods:s()({},Object(n.b)({requestSortList:"sort/resquestList",requestGoodsList:"goods/requestList",requestList:"seckill/requestList"}),{changeFirstCateId:function(t){var e=this,i=this.sortList.findIndex(function(t){return t.id==e.form.first_cateid});this.secondArr=this.sortList[i].children,t||(this.form.second_cateid="")},changeSecondCateId:function(t){var e=this;Object(r.s)({fid:this.form.first_cateid,sid:this.form.second_cateid}).then(function(t){200==t.data.code&&(e.goodsArr=t.data.list)}),t||(this.form.goodsid="")},empty:function(){this.form={title:"",begintime:"",endtime:"",first_cateid:"",second_cateid:"",goodsid:"",status:1},this.timeArr=[]},cancle:function(){this.info.show=!1,this.info.isAdd||this.empty()},add:function(){var t=this;this.form.begintime=this.timeArr[0].getTime(),this.form.endtime=this.timeArr[1].getTime(),Object(r.E)(this.form).then(function(e){200==e.data.code?(Object(a.a)("添加成功"),t.empty(),t.cancle(),t.requestList()):Object(a.b)(e.data.msg)})},getInfo:function(t){var e=this;console.log(t),Object(r.G)({id:t}).then(function(i){200==i.data.code?(e.form=i.data.list,e.form.begintime=new Date(JSON.parse(i.data.list.begintime)),e.form.endtime=new Date(JSON.parse(i.data.list.endtime)),e.changeFirstCateId(!0),e.changeSecondCateId(!0),e.form.id=t,e.timeArr=[e.form.begintime,e.form.endtime],console.log(e.form.begintime)):Object(a.b)(i.data.msg)})},update:function(){var t=this;this.form.begintime=this.timeArr[0].getTime(),this.form.endtime=this.timeArr[1].getTime(),Object(r.I)(this.form).then(function(e){200==e.data.code?(Object(a.a)("修改成功"),t.empty(),t.cancle(),t.requestList()):Object(a.b)(e.data.msg)})}}),mounted:function(){0==this.sortList.length&&this.requestSortList()}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{title:t.info.title,visible:t.info.show},on:{"update:visible":function(e){return t.$set(t.info,"show",e)}}},[i("el-form",{attrs:{model:t.form}},[i("el-form-item",{attrs:{label:"活动名称","label-width":"80px"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"活动期限","label-width":"80px"}},[i("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:t.timeArr,callback:function(e){t.timeArr=e},expression:"timeArr"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"一级分类","label-width":"80px"}},[i("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){return t.changeFirstCateId()}},model:{value:t.form.first_cateid,callback:function(e){t.$set(t.form,"first_cateid",e)},expression:"form.first_cateid"}},t._l(t.sortList,function(t){return i("el-option",{key:t.id,attrs:{label:t.catename,value:t.id}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"二级分类","label-width":"80px"}},[i("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){return t.changeSecondCateId()}},model:{value:t.form.second_cateid,callback:function(e){t.$set(t.form,"second_cateid",e)},expression:"form.second_cateid"}},t._l(t.secondArr,function(t){return i("el-option",{key:t.id,attrs:{label:t.catename,value:t.id}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"商品","label-width":"80px"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.goodsid,callback:function(e){t.$set(t.form,"goodsid",e)},expression:"form.goodsid"}},t._l(t.goodsArr,function(t){return i("el-option",{key:t.id,attrs:{label:t.goodsname,value:t.id}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"状态","label-width":"80px"}},[i("el-switch",{attrs:{"active-value":1,"inactive-value":2},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.cancle}},[t._v("取 消")]),t._v(" "),1==t.info.isAdd?i("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添 加")]):i("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("修 改")])],1)],1)],1)},staticRenderFns:[]};var c=i("C7Lr")(d,l,!1,function(t){i("n1xl")},"data-v-b6650eac",null).exports,f={computed:s()({},Object(n.c)({list:"seckill/list"})),data:function(){return{}},methods:s()({},Object(n.b)({requestList:"seckill/requestList"}),{update:function(t){this.$emit("update",t)},del:function(t){var e=this;Object(r.F)({id:t}).then(function(t){200==t.data.code?(Object(a.a)("删除成功"),e.requestList()):Object(a.b)(t.data.msg)})}}),mounted:function(){this.requestList()}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[i("el-table-column",{attrs:{prop:"title",label:"活动名称",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{label:"状态",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?i("el-button",{attrs:{type:"primary"}},[t._v("启 用")]):i("el-button",{attrs:{type:"info"}},[t._v("禁 用")])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"address",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary"},on:{click:function(i){return t.update(e.row.id)}}},[t._v("编 辑")]),t._v(" "),i("v-btn",{on:{comifirm:function(i){return t.del(e.row.id)}}})]}}])})],1)],1)},staticRenderFns:[]};var m={components:{vAdd:c,vList:i("C7Lr")(f,u,!1,function(t){i("wSeZ")},"data-v-cc824534",null).exports},data:function(){return{info:{show:!1,title:"活动添加",isAdd:!0}}},methods:{add:function(){this.info.show=!0,this.info.title="活动添加",this.info.isAdd=!0},update:function(t){this.info.show=!0,this.info.title="活动修改",this.info.isAdd=!1,this.$refs.add.getInfo(t)}},mounted:function(){}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-button",{attrs:{type:"primary"},on:{click:this.add}},[this._v("添 加")]),this._v(" "),e("v-add",{ref:"add",attrs:{info:this.info}}),this._v(" "),e("v-list",{on:{update:this.update}})],1)},staticRenderFns:[]};var b=i("C7Lr")(m,h,!1,function(t){i("qiyi")},"data-v-102236a8",null);e.default=b.exports},n1xl:function(t,e){},qiyi:function(t,e){},wSeZ:function(t,e){}});
//# sourceMappingURL=7.8bc229b65b477a21a47f.js.map