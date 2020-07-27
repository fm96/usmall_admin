<template>
<div>
    <el-button type="primary" @click="add">添 加</el-button>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @update='update'></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
 components: {
     vAdd,
     vList
 },
data(){
return {
    info:{
        show:false,
        title:'添加管理员',
        isAdd:true
    }
}
},
methods: {
    // 添加
    add(){
        this.info.show=true;
    },
    // 点击编辑修改add.vue的数据
    update(id){
        this.info.show=true;
        this.info.title='管理员修改';
        this.info.isAdd=false;
        // 调用add.vue的方法
        this.$refs.add.getInfo(id)
    }
},
mounted(){}
}
</script>
<style scoped>
</style>