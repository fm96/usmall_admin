<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <el-table-column label="状态" width="180">
          <template slot-scope="scope">
              <el-button type="primary" v-if='scope.row.status==1'>启 用</el-button>
              <el-button type="info" v-else>禁 用</el-button>
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
import {seccessAlert,warningAlert} from '../../../util/alert'
import {seckillDel} from '../../../util/request'
export default {
  computed: {
      ...mapGetters({
          list:'seckill/list'
      })
  },
  data() {
    return {};
  },
  methods: {
      ...mapActions({
          requestList:'seckill/requestList'
      }),
      // 编辑，通知父组件修改信息
      update(id){
        this.$emit('update',id)
      },
      // 删除
      del(id){
        seckillDel({id:id}).then(res=>{
          if(res.data.code==200){
            seccessAlert('删除成功')
            this.requestList()
          }else{
            warningAlert(res.data.msg)
          }
        })
      }
  },
  mounted() {
      this.requestList()
  }
};
</script>
<style scoped>
</style>