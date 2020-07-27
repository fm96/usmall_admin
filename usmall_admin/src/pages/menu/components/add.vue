<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item
          label="菜单名称"
          label-width="80px"
          :rules="[
      { required: true, message: '菜单名称不能为空'}
    ]"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="上级菜单"
          label-width="80px"
          :rules="[
      { required: true, message: '上级菜单不能为空'}
    ]"
        >
          <el-select v-model="form.pid" placeholder="请选择">
            <!-- <el-option label="--请选择--" disabled value></el-option> -->
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
            <!-- 动态数据 -->
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option v-for="item in ads" :key="item" :label="item" :value="item"></el-option>
            <!-- 动态数据 -->
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd==true">添 加</el-button>
        <el-button type="primary" @click="update(id)" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { menuAdd } from "../../../util/request";
import { seccessAlert, warningAlert } from "../../../util/alert";
import {mapGetters,mapActions} from 'vuex';
import {menuList,getDetail,updateMenu} from '../../../util/request'
export default {
  props: ["info"],
  components: {},
  computed:{
    ...mapGetters({
      list:'menu/list'
    })
  },
  data() {
    return { 
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      icons: [
        "el-icon-delete-solid",
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-goods"
      ],
      ads: [
        "/home",
        "/admin",
        "/goods",
        "/login",
        "/banner",
        "/menu",
        "/role",
        "/seckill",
        "/sort",
        "/spec"
      ]
    };
  },
  methods: {
    ...mapActions({
      resquestList:'menu/resquestList'
    }),
    //   取消弹框
    cancle() {
      this.info.show = false;
      if(!this.info.isAdd){
        this.empty()
      }
    },
    // 清空输入框
    empty(){
        this.form={
             pid: 0,
            title: "",
            icon: "",
            type: 1,
            url: "",
            status: 1

        }
    },
    // 添加菜单
    add() {
      menuAdd(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert(res.data.msg);
          this.cancle();
          this.empty();
          this.resquestList();
        }else{
            warningAlert(res.data.msg)
        }
      });
    },
    // 获取某一条数据
    menuDetail(id){
      getDetail({id:id}).then(res=>{
          this.form=res.data.list;
          this.form.id=id
          console.log(this.form.id)
      })
      // console.log(id)
    },
    // 点击编辑
    update(){
      updateMenu(this.form).then(res=>{
        if(res.data.code==200){
          seccessAlert(res.data.msg);
          this.cancle();
          this.resquestList();
        }else{
          warningAlert(res.data.msg)
        }
      })
    }

  },
  mounted() {}
};
</script>
<style scoped>
</style>