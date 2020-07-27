import {
  menuList
} from '../../util/request'
export const state = {
  list: []
}

export const mutations = {
  changeMenuList(state, arr) {
    state.list = arr
  }
}

export const actions = {
    // 菜单列表
  resquestList(context) {
    menuList({
      istree: true
    }).then(res => {
      context.commit('changeMenuList',res.data.list)
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
