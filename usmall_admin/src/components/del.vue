<template>
  
    <el-button type="danger" @click="del">删 除</el-button>
  
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    del() {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        //   通知父组件
        this.$emit('comifirm')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>