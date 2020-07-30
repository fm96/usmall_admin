<template>
  <div>
    <el-container class="main">
      <el-aside width="200px">
        <!-- 导航开始 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
         <!--  系统设置 -->
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/admin">管理员管理</el-menu-item>
          </el-submenu> -->
          <!-- 商城管理 -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/sort">商品分类</el-menu-item>
            <el-menu-item index="/spec">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu> -->

          <!-- 混合目录 -->
         <template v-for="(item) in user.menus">
            <el-submenu v-if="item.children" :index="item.id+''" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="(i) in item.children" :key="i.title" :index="i.url">{{i.title}}</el-menu-item>
            </el-submenu>

            <el-menu-item v-if="!item.children" :key="item.id" :index="item.url">
              <span slot="title">{{item.title}}</span>
            </el-menu-item>

          </template>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="right">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="pad"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user:'login/user'
    }),
    // 判断是否有目录
    hasChildren(){
      return this.user.menus[0].Children?true:false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      changeUser:'login/changeUser'
    }),
    // 退出
    exit(){
      this.changeUser(null);
      this.$router.push('/login')
    }
  },
  mounted() {
  }
};
</script>
<style scoped>
.main {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  overflow: hidden;
}

.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fefefe;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-item,
.el-submenu,
.el-submenu__title {
  width: 200px;
}
.right {
  float: right;
}
.pad{
    padding-top: 10px;
}
</style>