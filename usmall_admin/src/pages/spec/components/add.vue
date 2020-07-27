<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 新增规格属性 -->
        <el-form-item label="规格属性" label-width="80px" v-for="(item,index) in attrArr" :key="index">
          <el-input autocomplete="off" class="width" v-model="item.value"></el-input>
          <el-button type="primary" @click="addSpec" v-if="index==0">新增规格属性</el-button>
          <el-button type="danger" @click="del(index)" v-else>删 除</el-button>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label label-width="80px">
          <el-button type="primary" @click="add" v-if="info.isAdd==true">添 加</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// 接口
import { specAdd,specInfo,specUpdate } from "../../../util/request";
import { seccessAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr: [{ value: "" }],
      text: 0,
      form: {
        specsname: "",
        attrs: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      requestToatl: "spec/requestToatl",
      resquestList: "spec/resquestList"
    }),
    //   添加规格属性标签
    addSpec() {
      this.attrArr.push({ value: "" });
    },
    // 删除规格属性标签
    del(index) {
      this.attrArr.splice(index, 1);
    },
    // 取消
    cancle() {
      this.info.show = false;
    },
    // 清空
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1
      };
      this.attrArr = [{ value: "" }];
    },
    // 添加规格属性
    add() {
      if (this.attrArr.some(item => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.value));
      // 发起请求
      specAdd(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert(res.data.msg);
          // 清空
          this.empty();
          //   取消
          this.cancle();
          // 请求商品规格列表
          this.resquestList();
          // 请求商品规格总数
          this.requestToatl();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取规格属性的一条
    getInfo(id){
      specInfo({id:id}).then(res=>{
          if(res.data.code==200){
            this.form=res.data.list[0];
            this.attrArr=JSON.parse(res.data.list[0].attrs).map((item)=>({value:item}))
          }else{
            warningAlert(res.data.msg)
          }
      })
    },
    // 修改
    update(){
      if (this.attrArr.some(item => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      // 转成字符串存入数据库
      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.value));
      // 发起请求
      specUpdate(this.form).then(res=>{
          if(res.data.code==200){
            seccessAlert(res.data.msg);
            this.cancle();
            this.resquestList();
          }else{
            warningAlert(res.data.msg)
          }
      })
    }
  },
  mounted() {}
};
</script>
<style scoped lang='stylus'>
.add>>> .el-form-item__content {
  display: flex;
}

.add>>> .el-input {
  flex: 1;
}

.el-dialog {
  overflow: hidden;
}

.dialog-footer {
  float: left;
}
</style>