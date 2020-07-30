import {
  adminList,adminTotal
  } from '../../util/request'
  export const state = {
    list: [],
    total:0,
    size:2,
    page:1,
  }
  
  export const mutations = {
    //   修改管理员列表
    changeAdminList(state, arr) {
      state.list = arr
    },
    // 修改管理员总数
    changeTotal(state,num){
        state.total=num
    },
    // 修改当前页码
    changePage(state,page){
        state.page=page
    }
  }
  
  export const actions = {     
      // 管理员列表
    resquestList(context) {
        const params={
          size:context.state.size,
          page:context.state.page
        };
        
        adminList(params).then(res => {
          if(res.data.list==null&&context.state.page>1){
            context.commit('changePage',context.state.page-1);
            context.dispatch('resquestList');
            return;
          }
        context.commit('changeAdminList',res.data.list)
        // console.log(res)
      })
    },
    // 管理员总数
    requestTotal(context){
        adminTotal().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 修改当前页码
    changePage(context,page){
        context.commit('changePage',page)
    }
  }
  
  export const getters = {
    //   管理员列表
    list(state) {
      return state.list
    },
    // 每页显示的数目
    size(state){
        return state.size
    },
    //当前页数
    page(state){
        return state.page
    },
    // 管理员总数
    total(state){
        return state.total
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
  }
  