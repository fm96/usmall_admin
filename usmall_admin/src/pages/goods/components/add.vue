<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
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
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changeSpecsId()">
            <!-- 动态数据 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label label-width="80px">
          <el-button type="primary" @click="add" v-if="info.isAdd==true">添 加</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { seccessAlert, warningAlert } from "../../../util/alert";
import { goodsAdd, goodsInfo,goodsUpdate } from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //   商品分类列表
      sortList: "sort/list",
      // 商品规格列表
      specList: "spec/list"
    })
  },
  data() {
    return {
      // 编辑器
      editor: null,
      // 图片地址
      imageUrl: "",
      //   二级分类数组
      secondArr: [],
      //   规格属性地址
      attrsArr: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      //   商品分类列表
      resquesSortList: "sort/resquestList",
      // 商品规格列表
      resquesSpecList: "spec/resquestList",
      // 商品列表
      resquesGoodsList: "goods/requestList",
      // 商品总数
      resquesTotal:'goods/requestTotal'
    }),
    //   创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      // 取值，设置值
      this.editor.txt.html(this.form.description);
    },
    // 修改了图片
    changeImg(e) {
      // 上传图片不能超过2M
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      // 上传图片的后缀必须是.png .jpg .gif .jpeg
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some(item => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 点击一级分类内容，渲染对应的二级分类内容
    changeFirstCateId(bool) {
      // this.form.first_cateid = this.sortId;
      let index = this.sortList.findIndex(
        item => item.id == this.form.first_cateid
      );
      this.secondArr = this.sortList[index].children;
      //传了true,second_cateid就不置空；没传就置空
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    // 点击商品规格，渲染对应的规格属性
    changeSpecsId(bool) {
      // this.form.specsid = this.goodsId;
      let index = this.specList.findIndex(item => item.id == this.form.specsid);
      this.attrsArr = this.specList[index].attrs;
      if (!bool) {
        this.form.specsattr = [];
      }
    },
    // 清空
    empty() {
      // 编辑器
      (this.editor = this.editor.txt.html("")),
        // 图片地址
        (this.imageUrl = ""),
        //   二级分类数组
        (this.secondArr = []),
        //   规格属性地址
        (this.attrsArr = []),
        (this.form = {
          first_cateid: "",
          second_cateid: "",
          goodsname: "",
          price: 0,
          market_price: 0,
          img: null,
          description: "",
          specsid: "",
          specsattr: [],
          isnew: 1,
          ishot: 1,
          status: 1
        });
    },
    // 取消
    cancle() {
      this.info.show = false;
      if(!this.info.isAdd){
        this.empty();
      }
    },
    // 添加
    add() {
      // 设置文本框内容
      this.form.description = this.editor.txt.html();
      // 规格属性转换成字符串
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      // 发起请求
      goodsAdd(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert("添加成功");
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 重新获取列表数据
          this.resquesGoodsList();
          // 获取列表总数
          this.resquesTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条商品的信息
    getInfo(id) {
      // 发起请求
      goodsInfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 图片地址
          this.imageUrl = this.$imgUrl + res.data.list.img;
          //根据一级分类计算出二级分类的数组
          this.changeFirstCateId(true);
          //根据商品规格计算出商品属性
          this.changeSpecsId(true);
          // 转换成数组
          this.form.specsattr = JSON.parse(res.data.list.specsattr);
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      // 发起请求
      goodsUpdate(this.form).then(res=>{
        if(res.data.code==200){
          seccessAlert('修改成功');
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 重新获取列表
          this.resquesGoodsList();
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    //   商品列表
    if (this.sortList.length == 0) {
      this.resquesSortList();
    }
    //   商品规格
    this.resquesSpecList();
  }
};
</script>
<style scoped>
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}

/*  穿透 */
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#desc {
  width: 100%;
}
.add >>> .w-e-toolbar {
  /* overflow: hidden; */
}
</style>