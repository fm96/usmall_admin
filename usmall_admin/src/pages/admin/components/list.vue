<template>
  <div>
    <el-table :data="adminList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="username" label="角色名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.uid)">编辑</el-button>
          <!-- <el-button type="danger">删除</el-button> -->
          <v-btn @comifirm="del(scope.row.uid)"></v-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" @current-change="page" :page-size='size' :total="total"></el-pagination>
  </div>
</template>
<script>
// 仓库
import { mapGetters, mapActions } from "vuex";
import {adminDel} from '../../../util/request';
import {seccessAlert,warningAlert} from '../../../util/alert'
export default {
  components: {},
  computed: {
    ...mapGetters({
      adminList: "admin/list",
      total:'admin/total',
        size:'admin/size'
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      resquestList: "admin/resquestList",
      requestTotal:'admin/requestTotal',
      changePage:'admin/changePage'
    }),
    // 编辑，通知父组件admin.vue
    update(id) {
        this.$emit('update',id);
        // console.log(id)
    },
    // 修改当前页码
    page(page){
        this.changePage(page);
        this.resquestList()
    },
    // 删除
    del(id){
        console.log(id)
        // 发起请求
        adminDel({uid:id}).then(res=>{
            if(res.data.code==200){
                seccessAlert(res.data.msg);
                this.resquestList();
                this.requestTotal()
            }else{
                warningAlert(res.data.msg)
            }
        })
    }
  },
  mounted() {
    //   获取管理员列表
    this.resquestList();
    // 获取管理员总数
    this.requestTotal()
  }
};
</script>
<style scoped>
</style>