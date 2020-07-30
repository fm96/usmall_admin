<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="80px">
          <el-date-picker
            v-model="timeArr"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirstCateId()">
            <!-- 动态数据 -->
            <el-option
              v-for="item in sortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecondCateId()">
            <!-- 动态数据 -->
            <el-option v-for="i in secondArr" :key="i.id" :label="i.catename" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <!-- 动态数据 -->
            <el-option v-for="item in goodsArr" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd==true">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {seckillAdd,goodsList,seckillInfo,seckillUpdate} from '../../../util/request'
import {warningAlert,seccessAlert} from '../../../util/alert'
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //   获取商品分类列表
      sortList: "sort/list",
      // 获取商品列表
      goodsList: "goods/list"
    })
  },
  data() {
    return {
      timeArr: [],
      secondArr: [],
      goodsArr: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: '',
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      //   商品分类列表
      requestSortList: "sort/resquestList",
      //   商品列表
      requestGoodsList: "goods/requestList",
      // 活动列表
      requestList:'seckill/requestList'
    }),
    // 点击一级分类的内容，渲染二级分类的内容
    changeFirstCateId(bool) {
      let index = this.sortList.findIndex(
        item => item.id == this.form.first_cateid
      );
      this.secondArr = this.sortList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    // 点击二级分类的内容，渲染商品的内容
    changeSecondCateId(bool) {
      // 发起请求获取商品列表
        goodsList({fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
          if(res.data.code==200){
            this.goodsArr=res.data.list;
          }

        })
      if(!bool){
        this.form.goodsid=''
      }
    },
    // 清空
    empty(){
      this.form={
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      }
      this.timeArr=[]
    },
    // 取消
    cancle(){
      this.info.show=false
    },
    // 添加
    add() {
      // 时间对象转换成时间戳
      this.form.begintime = this.timeArr[0].getTime();
      this.form.endtime = this.timeArr[1].getTime();
      // 发起请求
      seckillAdd(this.form).then(res=>{
        if(res.data.code==200){
          seccessAlert('添加成功')
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 重新获取活动列表数据
          this.requestList()

        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    // 获取秒杀活动的一条信息
    getInfo(id){
      console.log(id)
      // 发请求
      seckillInfo({id:id}).then(res=>{
        if(res.data.code==200){
            this.form=res.data.list;
            // 时间戳转换成时间对象
            this.form.begintime=new Date(JSON.parse(res.data.list.begintime));
            this.form.endtime=new Date(JSON.parse(res.data.list.endtime));
            // 调用得到数组内容
            this.changeFirstCateId(true);
            this.changeSecondCateId(true);
             this.form.id=id
             this.timeArr=[this.form.begintime,this.form.endtime]
            console.log(this.form.begintime)
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    // 修改
    update(){
       // 时间对象转换成时间戳
      this.form.begintime = this.timeArr[0].getTime();
      this.form.endtime = this.timeArr[1].getTime();
      seckillUpdate(this.form).then(res=>{
        if(res.data.code==200){
          seccessAlert('修改成功');
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 重新获取活动列表数据
          this.requestList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    // 商品分类列表
    if (this.sortList.length == 0) {
      this.requestSortList();
    }
  }
};
</script>
<style scoped>
</style>