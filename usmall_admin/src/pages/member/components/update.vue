<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="80px" :rules="[
      { required: true}
    ]">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px" :rules="[
      { required: true}
    ]">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import {memberInfo,memberUpdate} from '../../../util/request'
import {seccessAlert,warningAlert} from '../../../util/alert'
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname:'',
        phone:'',
        password:'',
        status:1
      }
    };
  },
  methods: {
      ...mapActions({
          requestList:'member/requestList'
      }),
    //   获取会员列表中的一条信息
    getInfo(id){
        // 发起请求
        memberInfo({uid:id}).then(res=>{
            if(res.data.code==200){
                this.form=res.data.list;
                this.form.password='';
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    // 取消
    cancle(){
        this.info.show=false;
    },
    // 修改
    update(){
        // 发起请求
    memberUpdate(this.form).then(res=>{
            if(res.data.code==200){
                seccessAlert('修改成功');
                // 取消
                this.cancle();
                // 重新获取列表
                this.requestList();
            }else{
                warningAlert(res.data.msg)
            }
    })
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>