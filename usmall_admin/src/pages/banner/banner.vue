<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添 加</el-button>
    <!-- 添加弹框 -->
    <v-add :info='info'></v-add>
    <!-- 列表 -->
    <v-list></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
        info:{
            show:false,
            title:'轮播图添加',
            isAdd:true
        }
    };
  },
  methods: {
    //添加
    add(){
        this.info.show=true
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>