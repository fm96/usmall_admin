<template>
<div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
export default {
    props:['info'],
 components: {},
data(){
return {
    imageUrl:'',
    form:{
        title:'',
        img:null,
        status:1
    }
}
},
methods: {},
mounted(){}
}
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