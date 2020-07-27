<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column label="菜单图标">
          <template slot-scope="scope">
             <i :class="scope.row.icon"></i>
          </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址">
          
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
import {menuList,delMenu} from '../../../util/request';
import {mapGetters,mapActions} from 'vuex'
import { seccessAlert, warningAlert } from '../../../util/alert';
export default {
  components: {},
  data() {
    return {
    };
  },
  computed:{
      ...mapGetters({
          menuList:'menu/list'
      })
  },
  methods: {
      ...mapActions({
          resquestList:'menu/resquestList'
      }),
    //   点击编辑,通知父组件menu
    update(id){
        this.$emit('update',id);
    },
    // 删除
    del(id){
      // 发起请求
      delMenu({id:id}).then(res=>{
          if(res.data.code==200){
            seccessAlert('删除成功');
            // 请求菜单列表数据，刷新页面
            this.resquestList();
          }else{
            warningAlert(res.data.msg)
          }
      })
    }
  },
  mounted() {
      this.resquestList()
  }
};
</script>
<style scoped>
</style>