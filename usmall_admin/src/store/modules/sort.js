import {
    sortList
  } from '../../util/request'
  export const state = {
    list: []
  }
  
  export const mutations = {
    changeSortList(state, arr) {
      state.list = arr
    }
  }
  
  export const actions = {
      // 角色列表
    resquestList(context) {
        sortList({istree:true}).then(res => {
        context.commit('changeSortList',res.data.list)
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
  