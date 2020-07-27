<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input placeholder="请输入内容" v-model="user.username" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {adminLogin} from '../../util/request'
import {seccessAlert,warningAlert} from '../../util/alert'
export default {
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      // this.$router.push("/");
      // 登录请求
      adminLogin(this.user).then(res=>{
        if(res.data.code==200){
          seccessAlert(res.data.msg);
          this.$router.push("/");
          localStorage.setItem('username', JSON.stringify(this.user.username));
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
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #503547, #373b5a);
}
.con {
  width: 400px;
  padding: 20px 50px;
  background: #fefefe;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-sizing: border-box;
}
h3 {
  line-height: 60px;
  text-align: center;
  font-size: 22px;
}
.el-input {
  margin-bottom: 15px;
}
.el-button {
  width: 100%;
}
</style>