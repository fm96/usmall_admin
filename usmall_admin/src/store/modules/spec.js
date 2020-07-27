import {
  specList,
  specCount
} from '../../util/request'
export const state = {
  list: [],
  total: 0,
  size: 2,
  page: 1,
}

export const mutations = {
  //   修改商品规格列表
  changeSpecList(state, arr) {
    arr.forEach(i => {
      i.attrs = JSON.parse(i.attrs)
    });
    state.list = arr
  },
  //   修改商品规格总数
  changeSpecTotal(state, num) {
    state.total = num
  },
  // 修改当前页
  changePage(state, page) {
    state.page = page
  }
}

export const actions = {
  // 商品规格列表
  resquestList(context) {
    const params = {
      size: context.state.size,
      page: context.state.page
    };

    specList(params).then(res => {
      if (res.data.list.length == 0 && context.state.page > 0) {
        context.commit('changePage', context.state.page - 1);
        context.dispatch('resquestList');
        return;
      }
      context.commit('changeSpecList', res.data.list)
    })
  },
  // 修改商品规格总数
  requestToatl(context) {
    specCount().then(res => {
      if (res.data.code == 200) {
        context.commit('changeSpecTotal', res.data.list[0].total)
      }
    })
  },
  // 修改当前页
  requestPage(context, page) {
    context.commit('changePage', page)
  }
}

export const getters = {
  //   管理员列表
  list(state) {
    return state.list
  },
  // 每页显示的数目
  size(state) {
    return state.size
  },
  // 商品规格总数
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
