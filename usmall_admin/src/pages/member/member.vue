<template>
<div>
    <!-- 修改弹框 -->
    <v-update :info='info' ref="update"></v-update>
    <!-- 列表 -->
    <v-list @update='update'></v-list>
</div>
</template>
<script>
import vUpdate from './components/update'
import vList from './components/list'
export default {
 components: {
     vUpdate,
     vList
 },
data(){
return {
    info:{
        show:false,
        title:'会员修改'
    }
}
},
methods: {
    // 修改，调用update.vue的getInfo方法
    update(id){
        this.info.show=true;
        this.$refs.update.getInfo(id);
    }
},
mounted(){}
}
</script>
<style scoped>
</style>