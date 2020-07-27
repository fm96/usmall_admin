import {
    roleList
  } from '../../util/request'
  export const state = {
    list: []
  }
  
  export const mutations = {
    changeRoleList(state, arr) {
      state.list = arr
    }
  }
  
  export const actions = {
      // 角色列表
    resquestList(context) {
      roleList().then(res => {
        context.commit('changeRoleList',res.data.list)
      })
    }
  }
  
  export const getters = {
    list(state) {
      return state.list
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
  }
  