import {bannerList} from '../../util/request'
export const state={
    user:null
}
export const mutations={
    // 修改用户
    changeUser(state,user){
        state.user=user
    }
}
export const actions={
    // 修改用户
    changeUser(context,obj){
        context.commit('changeUser',obj)
    }
}
export const getters={
    user(state){
        return state.user
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}