<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- https://jsonplaceholder.typicode.com/posts/ -->
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
// 仓库
import { mapGetters, mapActions } from "vuex";
// 接口
import { sortAdd, sortInfo, sortUpdate } from "../../../util/request";
// 弹框
import { seccessAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "sort/list"
    })
  },
  data() {
    return {
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      resquestList: "sort/resquestList"
    }),
    // 取消
    cancle() {
      this.info.show = false;
    },
    // 清空
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      };
      this.imageUrl = "";
    },
    // 修改图片
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
      // 获取图片文件
      let file = e.raw;
      console.log(file);
      // 生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 添加
    add() {
      // 发起请求
      sortAdd(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert(res.data.msg);
          // 取消
          this.cancle();
          // 清空
          this.empty();
          // 重新请求列表数据
          this.resquestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条分类信息
    getInfo(id) {
      sortInfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          // seccessAlert(res.data.msg);
          this.form = res.data.list;
          this.imageUrl = this.$imgUrl + this.form.img;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      console.log(this.form);
      sortUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert('修改成功');
          // 取消
          this.cancle();
          // 重新请求列表数据
          this.resquestList();
        }else{
          warningAlert(res.data.msg)
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped lang='stylus'>
.add>>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add>>> .el-upload:hover {
  border-color: #409eff !important;
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
</style>