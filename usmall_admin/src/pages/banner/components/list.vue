<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
      <el-table-column label="图片">
            <template slot-scope="scope">
          <img :src="$imgUrl+scope.row.img" alt="">
        </template>
         </el-table-column>
      <el-table-column label="状态">
            <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
              <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
           <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.id)">编 辑</el-button>
          <v-btn @comifirm="del(scope.row.id)"></v-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import {bannerDel} from '../../../util/request'
import {seccessAlert,warningAlert} from '../../../util/alert'

export default {
  computed:{
      ...mapGetters({
          list:'banner/list'
      })
  },
  data() {
    return {
     
    };
  },
  methods: {
      ...mapActions({
          requestList:'banner/requestList'
      }),
    //   修改,通知父组件修改信息
      update(id){
          this.$emit('update',id)
      },
    //   删除
      del(id){
        //   发起请求
        bannerDel({id:id}).then(res=>{
            if(res.data.code==200){
                seccessAlert('删除成功');
                //重新获取轮播列表
                this.requestList();
            }else{
                warningAlert(res.data.msg)
            }
        })

      }
  },
  mounted() {
    //   获取轮播图列表
    this.requestList();
  }
};
</script>
<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>