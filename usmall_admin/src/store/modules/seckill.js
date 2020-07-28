import {seckillList} from '../../util/request'
export const state={
    list:[]
}
export const mutations={
    // 修改限时秒杀列表
    changeList(state,arr){
        state.list=arr
    }
}
export const actions={
    // 修改限时秒杀列表
    requestList(context){
        // 发起请求
        seckillList().then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}
export const getters={
    list(state){
        return state.list
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}