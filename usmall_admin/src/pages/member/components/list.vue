<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
              <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "member/list"
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "member/requestList"
    }),
    // 点击编辑通知父组件修改数据
    update(id){
        this.$emit('update',id)
    }
  },
  mounted() {
    //   获取会员列表
    this.requestList();
  }
};
</script>
<style scoped>
</style>