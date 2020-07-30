<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item
          label="所属角色"
          label-width="80px"
          :rules="[
      { required: true, message: '所属角色不能为空'}
    ]"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 动态数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名"
          label-width="80px"
          :rules="[
      { required: true, message: '用户名不能为空'}
    ]"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd==true">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 仓库
import { mapGetters, mapActions } from "vuex";
// 请求接口
import { adminAdd,adminInfo,adminUpdate} from "../../../util/request";
// 弹框
import { seccessAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/list"
    })
  },
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      //   获取角色列表方法
      resquestRoleList: "role/resquestList",
      requestTotal: "admin/requestTotal",
      resquestList: "admin/resquestList"
    }),
    //   取消
    cancle() {
      this.info.show = false;
      if(!this.info.isAdd){
        this.empty();
      }
    },
    // 清空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    // 添加管理员
    add() {
      // 发起请求
      adminAdd(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert(res.data.msg);
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 请求管理员列表数据
          this.resquestList();
          // 获取管理员总数
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条管理员信息
    getInfo(id){
        console.log(id)
        // 发起请求
        adminInfo({uid:id}).then(res=>{
            if(res.data.code==200){
                // seccessAlert(res.data.msg);
                this.form=res.data.list;
                this.form.password=''
            }else{
                warningAlert(res.data.msg)
            }
            // console.log(uid)
        })
    },
    // 修改
    update(){
         console.log(this.form)
        // delete this.form.randstr
        // 发起请求
        adminUpdate(this.form).then(res=>{
            if(res.data.code==200){
                seccessAlert(res.data.msg);
                this.cancle()
                // 重新请求管理员列表
                this.resquestList();

            }else{
                warningAlert(res.data.msg)
            }
            // console.log(this.form)
        })
       
    }
  },
  mounted() {
    //   请求角色列表
    this.resquestRoleList();
  }
};
</script>
<style scoped>
</style>