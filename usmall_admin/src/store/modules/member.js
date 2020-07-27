import {
  memberList
} from '../../util/request'

export const state = {
  list: []
}
export const mutations = {
  // 修改会员列表
  changeList(state, arr) {
    state.list = arr
  }
}
export const actions = {
  // 获取会员列表
  requestList(context) {
    memberList().then(res => {
      context.commit('changeList',res.data.list)
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
  namespaced: true
}
