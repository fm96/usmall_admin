<template>
  <div class="main">
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性">
          <template slot-scope="scope">
            <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
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
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" @current-change="page" :page-size='size' :total="total"></el-pagination>
  </div>
</template>
<script>
// 仓库
import {mapGetters,mapActions} from 'vuex'
// 接口
import {specDel} from '../../../util/request'
// 弹框
import {seccessAlert,warningAlert} from '../../../util/alert'
export default {
  components: {},
  computed:{
      ...mapGetters({
          list:'spec/list',
          total:'spec/total',
          size:'spec/size'
          
      })
  },
  data() {
    return {
    };
  },
  methods: {
      ...mapActions({
          requestToatl:'spec/requestToatl',
          resquestList:'spec/resquestList',
          requestPage:'spec/requestPage'
      }),
    // 点击编辑，通知父组件修改数据
    update(id) {
      this.$emit('update',id)
    },
    // 删除
    del(id) {
      // 发起请求
      specDel({id:id}).then(res=>{
        if(res.data.code==200){
          seccessAlert('删除成功');
          this.resquestList();
          this.requestToatl();
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    // 修改当前页
    page(page){
      this.requestPage(page);
      this.resquestList();
    }
  },
  mounted() {
    //   获取商品规格列表
    this.resquestList();
    //   获取商品规格总数
    this.requestToatl();
  }
};
</script>
<style scoped>
.main{
    overflow: hidden;
}
.el-pagination{
    float: right;
}
</style>