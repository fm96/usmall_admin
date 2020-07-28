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
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirstCateId">
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
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecondCateId">
            <!-- 动态数据 -->
            <el-option v-for="i in secondArr" :key="i.id" :label="i.catename" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <!-- 动态数据 -->
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd==true">添 加</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //   获取商品分类列表
      sortList: "sort/list",
      // 获取商品规格列表
      specList: "spec/list"
    })
  },
  data() {
    return {
      timeArr: [],
      secondArr: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      //   商品分类列表
      requestSortList: "sort/resquestList",
      //   商品规格列表
      requestSpecList: "spec/resquestList"
    }),
    // 点击一级分类的内容，渲染二级分类的内容
    changeFirstCateId() {
      let index = this.sortList.findIndex(
        item => item.id == this.form.first_cateid
      );
      this.secondArr = this.sortList[index].children;
      this.form.second_cateid = "";
    },
    // 点击二级分类的内容，渲染商品的内容
    changeSecondCateId(){

    },
    // 添加
    add(){
        // 时间对象转换成时间戳
        this.begintime=this.timeArr[0].getTime();
        this.endtime=this.timeArr[1].getTime();
    }
  },
  mounted() {
    if (this.sortList.length == 0) {
      this.requestSortList();
    }
    this.requestSpecList()
  }
};
</script>
<style scoped>
</style>