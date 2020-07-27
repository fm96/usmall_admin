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
import vAdd from '../menu/components/add'
import vList from '../menu/components/list'
export default {
 components: {
     vAdd,
     vList
 },
data(){
return {
    info:{
        show:false,
        isAdd:true,
        title:'菜单添加',
    }
}
},
methods: {
    // 点击弹框出现
    add(){
        this.info.show=true;
    },
    // 点击编辑,调用add组件的menuDetail()方法
    update(id){
        this.info.show=true;
        this.info.title='菜单编辑';
        this.info.isAdd=false;
        this.$refs.add.menuDetail(id)
        // console.log(id)
    }
},
mounted(){}
}
</script>
<style scoped>
</style>