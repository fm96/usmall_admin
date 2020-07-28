<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import { seccessAlert, warningAlert } from "../../../util/alert";
import { bannerAdd, bannerInfo,bannerUpdate } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        title: "",
        img: null,
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      requestList: "banner/requestList"
    }),
    // 清空
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1
      };
      this.imageUrl = "";
    },
    // 取消
    cancle() {
      this.info.show = false;
    },
    // 修改图片
    changeImg(e) {
      // 上传图片不能超过2M
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传图片不能超过2M");
        return;
      }
      // 上传图片后缀必须是.png .jpg .gif .jpeg
      let extname = e.name.slice(e.name.lastIndexOf("."));
      let extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some(item => item === extname)) {
        warningAlert("上传的文件必须是图片");
        return;
      }
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 添加
    add() {
      // 发起请求
      bannerAdd(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert("添加成功");
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 重新获取轮播图列表数据
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取轮播列表的一条信息
    getInfo(id) {
      // 发起请求
      bannerInfo({id:id}).then(res=>{
          if(res.data.code==200){
              this.form=res.data.list;
              this.imageUrl=this.$imgUrl+res.data.list.img;
              this.form.id=id
          }else{
              warningAlert(res.data.msg)
          }
      })
    },
    // 修改
    update() {
        // 发起请求
        bannerUpdate(this.form).then(res=>{
                if(res.data.code==200){
                    seccessAlert('修改成功');
                    // 取消
                    this.cancle();
                    // 重新获取轮播列表
                    this.requestList();
                }else{
                    warningAlert(res.data.msg)
                }
        })
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