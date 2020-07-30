import {bannerList} from '../../util/request'
export const state={
    user:sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):null
}
export const mutations={
    // 修改用户
    changeUser(state,user){
        state.user=user
        if(user){
            sessionStorage.setItem('user',JSON.stringify(state.user))
        }else{
            sessionStorage.removeItem('user')
        }
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