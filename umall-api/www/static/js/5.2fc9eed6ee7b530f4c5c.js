webpackJsonp([5],{aihb:function(t,e){},m787:function(t,e){},o8A2:function(t,e){},zFyg:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("4YfN"),n=a.n(i),s=a("fUgm"),o=a("D/cR"),r=a("BGi1"),l={props:["info"],components:{},computed:n()({},Object(s.c)({list:"sort/list"})),data:function(){return{imageUrl:"",form:{pid:0,catename:"",img:null,status:1}}},methods:n()({},Object(s.b)({resquestList:"sort/resquestList"}),{cancle:function(){this.info.show=!1,this.info.isAdd||this.empty()},empty:function(){this.form={pid:0,catename:"",img:null,status:1},this.imageUrl=""},changeImg:function(t){if(t.size>2097152)Object(r.b)("上传的图片不能超过2M");else{var e=t.name.slice(t.name.lastIndexOf("."));if([".png",".jpg",".gif",".jpeg"].some(function(t){return t===e})){var a=t.raw;console.log(a),this.imageUrl=URL.createObjectURL(a),this.form.img=a}else Object(r.b)("上传文件必须是图片")}},add:function(){var t=this;Object(o.J)(this.form).then(function(e){200==e.data.code?(Object(r.a)(e.data.msg),t.cancle(),t.empty(),t.resquestList()):Object(r.b)(e.data.msg)})},getInfo:function(t){var e=this;Object(o.L)({id:t}).then(function(a){200==a.data.code?(e.form=a.data.list,e.imageUrl=e.$imgUrl+e.form.img,e.form.id=t):Object(r.b)(a.data.msg)})},update:function(){var t=this;console.log(this.form),Object(o.N)(this.form).then(function(e){200==e.data.code?(Object(r.a)("修改成功"),t.cancle(),t.resquestList()):Object(r.b)(e.data.msg)})}}),mounted:function(){}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add"},[a("el-dialog",{attrs:{title:t.info.title,visible:t.info.show},on:{"update:visible":function(e){return t.$set(t.info,"show",e)}}},[a("el-form",{attrs:{model:t.form}},[a("el-form-item",{attrs:{label:"上级分类","label-width":"80px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.pid,callback:function(e){t.$set(t.form,"pid",e)},expression:"form.pid"}},[a("el-option",{attrs:{label:"顶级分类",value:0}}),t._v(" "),t._l(t.list,function(t){return a("el-option",{key:t.id,attrs:{label:t.catename,value:t.id}})})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"分类名称","label-width":"80px"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.catename,callback:function(e){t.$set(t.form,"catename",e)},expression:"form.catename"}})],1),t._v(" "),0!==t.form.pid?a("el-form-item",{attrs:{label:"图片","label-width":"80px"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"#","show-file-list":!1,"on-change":t.changeImg}},[t.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":"80px"}},[a("el-switch",{attrs:{"active-value":1,"inactive-value":2},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancle}},[t._v("取 消")]),t._v(" "),1==t.info.isAdd?a("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添 加")]):a("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("修 改")])],1)],1)],1)},staticRenderFns:[]};var d=a("C7Lr")(l,c,!1,function(t){a("aihb")},"data-v-d1796e52",null).exports,u={components:{},computed:n()({},Object(s.c)({list:"sort/list"})),data:function(){return{}},methods:n()({},Object(s.b)({resquestList:"sort/resquestList"}),{update:function(t){this.$emit("update",t)},del:function(t){var e=this;Object(o.K)({id:t}).then(function(t){200==t.data.code?(Object(r.a)(t.data.msg),e.resquestList()):Object(r.b)(t.data.msg)})}}),mounted:function(){this.resquestList()}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:t.list,"row-key":"id",border:"","tree-props":{children:"children",hasChildren:"hasChildren"}}},[a("el-table-column",{attrs:{prop:"id",label:"分类编号",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"catename",label:"分类名称",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"图片"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:t.$imgUrl+e.row.img,alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("el-button",{attrs:{type:"primary"}},[t._v("启用")]):a("el-button",{attrs:{type:"info"}},[t._v("禁用")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.update(e.row.id)}}},[t._v("编辑")]),t._v(" "),a("v-btn",{on:{comifirm:function(a){return t.del(e.row.id)}}})]}}])})],1)],1)},staticRenderFns:[]};var m={components:{vAdd:d,vList:a("C7Lr")(u,f,!1,function(t){a("m787")},"data-v-ef847c74",null).exports},data:function(){return{info:{show:!1,title:"商品分类添加",isAdd:!0}}},methods:{add:function(){this.info.show=!0,this.info.title="商品分类添加",this.info.isAdd=!0},update:function(t){this.info.title="商品分类修改",this.info.show=!0,this.info.isAdd=!1,this.$refs.add.getInfo(t)}},mounted:function(){}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-button",{attrs:{type:"primary"},on:{click:this.add}},[this._v("添 加")]),this._v(" "),e("v-add",{ref:"add",attrs:{info:this.info}}),this._v(" "),e("v-list",{on:{update:this.update}})],1)},staticRenderFns:[]};var h=a("C7Lr")(m,p,!1,function(t){a("o8A2")},"data-v-2241a0e5",null);e.default=h.exports}});
//# sourceMappingURL=5.2fc9eed6ee7b530f4c5c.js.map