<template>
  <div>
    <!-- 添加按钮 -->
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
        title: "活动添加",
        isAdd: true
      }
    };
  },
  methods: {
    // 添加
    add() {
      this.info.show = true;
      this.info.title = "活动添加";
      this.info.isAdd = true;
    },
    // 编辑，修改数据，调用add.vue的getInfo方法
    update(id) {
      this.info.show = true;
      this.info.title = "活动修改";
      this.info.isAdd = false;
      // 调用add.vue的getInfo方法
      this.$refs.add.getInfo(id);
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>