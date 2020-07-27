<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger">删除</el-button> -->
          <v-btn @comifirm="del(scope.row.id)"></v-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { roleDel } from "../../../util/request";
import { seccessAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/list"
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      resquestList: "role/resquestList"
    }),
    //   点击编辑，通知父组件
    update(id) {
      this.$emit("update", id);
      console.log(id);
    },
    // 删除
    del(id) {
      roleDel({ id: id }).then(res => {
        if (res.data.code == 200) {
          seccessAlert(res.data.msg);
          this.resquestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
      console.log(id);
    }
  },
  mounted() {
    this.resquestList();
  }
};
</script>
<style scoped>
</style>