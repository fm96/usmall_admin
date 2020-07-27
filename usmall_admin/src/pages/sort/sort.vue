<template>
<div>
    <el-button type="primary" @click="add">添 加</el-button>
    <!-- 添加弹框 -->
    <v-add :info='info' ref="add"></v-add>
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
        title:'商品分类添加',
        isAdd:true
    }
}
},
methods: {
    // 添加
    add(){
        this.info.show=true
    },
    // 点击编辑修改数据
    update(id){
        this.info.title='商品分类修改';
        this.info.show=true;
        this.info.isAdd=false;
        // 调用add组件的方法
        this.$refs.add.getInfo(id);
    }
},
mounted(){}
}
</script>
<style scoped>
</style>