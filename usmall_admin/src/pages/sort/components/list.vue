<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl+scope.row.img" alt />
        </template>
      </el-table-column>
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
import {sortDel} from '../../../util/request'
import { seccessAlert,warningAlert } from '../../../util/alert';
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "sort/list"
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      resquestList: "sort/resquestList"
    }),
    // 编辑,通知父组件更改数据
    update(id) {
      this.$emit('update',id)
    },
    // 删除
    del(id) {
      // 发起请求
      sortDel({id:id}).then(res=>{
          if(res.data.code==200){
            seccessAlert(res.data.msg);
            // 重新请求列表
            this.resquestList();
          }else{
            warningAlert(res.data.msg)
          }
      })
    }
  },
  mounted() {
    // 获取商品分类列表
    this.resquestList();
  }
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>