import {
  goodsList,
  goodsCount
} from '../../util/request'
export const state = {
  list: [],
  size: 2,
  page: 1,
  total: 0
}
export const mutations = {
  // 修改商品列表
  changeList(state, arr) {
    state.list = arr
  },
  // 修改商品总数
  changeTotal(state, num) {
    state.total = num
  },
  // 修改当前页数
  changePage(state, page) {
    state.page = page
  }
}
export const actions = {
  // 修改商品列表
  requestList(context) {
     let params = {
        page: context.state.page,
        size: context.state.size
      }
    // 发起请求
    goodsList(params).then(res => {
      if (res.data.list == null && context.state.page > 1) {
        context.commit("changePage", context.state.page - 1);
        context.dispatch("requestList")
        return;
      }
      context.commit('changeList', res.data.list)
    })
  },
  // 修改商品总数
  requestTotal(context) {
    // 发请求
    goodsCount().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  // 修改当前页数
  changePage(context, page) {
    context.commit('changePage', page)
  }
}
export const getters = {
  list(state) {
    return state.list
  },
  size(state) {
    return state.size
  },
  total(state) {
    return state.total
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
