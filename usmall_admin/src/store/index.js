import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入mutations.js和actions.js
import {state,mutations,getters} from './mutations'
import actions from './actions'
// 引入模块
import menu from './modules/menu'
import role from './modules/role'
import admin from './modules/admin'
import sort from './modules/sort'
import spec from './modules/spec'
import member from './modules/member'
import banner from './modules/banner'
import seckill from './modules/seckill'


// 创建一个仓库
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        admin,
        sort,
        spec,
        member,
        banner,
        seckill
    }
})