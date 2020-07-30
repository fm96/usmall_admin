import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

// 路由独享守卫
function havePower(url){
  return store.state.login.user.menus_url.some(i=>i==url)
}
let router= new Router({
  routes: [
    {
      path:'/login',
      component:()=>import('../pages/login/login.vue')
    },
    {
      path:'/',
      component:()=>import('../pages/index/index.vue'),
      children:[
        {
          path:'home',
          component:()=>import('../pages/home/home'),
          name:'首页'
        },
        {
          path:'admin',
          component:()=>import('../pages/admin/admin'),
          name:'管理员列表',
          beforeEnter(to,from,next){
            havePower('/admin')?next():next('/home')
          }
        },
        {
          path:'banner',
          component:()=>import('../pages/banner/banner'),
          name:'轮播图列表',
          beforeEnter(to,from,next){
            havePower('/banner')?next():next('/home')
          }
        },
        {
          path:'goods',
          component:()=>import('../pages/goods/goods'),
          name:'商品列表',
          beforeEnter(to,from,next){
            havePower('/goods')?next():next('/home')
          }
        },
        {
          path:'member',
          component:()=>import('../pages/member/member'),
          name:'会员列表',
          beforeEnter(to,from,next){
            havePower('/member')?next():next('/home')
          }
        },
        {
          path:'menu',
          component:()=>import('../pages/menu/menu'),
          name:'菜单列表',
          beforeEnter(to,from,next){
            havePower('/menu')?next():next('/home')
          }
        },
        {
          path:'role',
          component:()=>import('../pages/role/role'),
          name:'角色列表',
          beforeEnter(to,from,next){
            havePower('/role')?next():next('/home')
          }
        },
        {
          path:'seckill',
          component:()=>import('../pages/seckill/seckill'),
          name:'秒杀活动列表',
          beforeEnter(to,from,next){
            havePower('/seckill')?next():next('/home')
          }
        },
        {
          path:'sort',
          component:()=>import('../pages/sort/sort'),
          name:'商品分类列表',
          beforeEnter(to,from,next){
            havePower('/sort')?next():next('/home')
          }
        },
        {
          path:'spec',
          component:()=>import('../pages/spec/spec'),
          name:'商品规格列表',
          beforeEnter(to,from,next){
            havePower('/spec')?next():next('/home')
          }
        },
        {
          path:'',
          redirect:'home'
        }
      ]
    }
  ]
})

// 登录拦截
router.beforeEach((to,from,next)=>{
  // 如果前往登录页面，next（）
  if(to.path=='/login'){
    next()
    return; 
  }
  // 如果不是去往登录页，要判断store.user. user是true,next();user-null,next('/login')
  if(store.state.login.user){
    next();
    return;
    
  }
  next('/login')
})

export default router
