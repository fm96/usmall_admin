<template>
  <div>
    <el-button type="primary" @click="add">添 加</el-button>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @update="update"></v-list>
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
      info: {
        show: false,
        title: "添加角色",
        isAdd: true
      }
    };
  },
  methods: {
    // 添加
    add() {
      this.info.show = true;
      this.info.title = "添加角色";
      this.info.isAdd = true;
    },
    // 点击编辑，调用add的方法
    update(id) {
      this.info.show = true;
      this.info.title = "修改角色";
      this.info.isAdd = false;
      this.$refs.add.getInfo(id);
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>