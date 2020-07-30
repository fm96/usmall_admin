import axios from 'axios'
import qs from 'qs'
import store from '../store'
import {warningAlert} from './alert'
import router from '../router'

// 请求拦截
axios.interceptors.request.use(config=>{
  if(config.url !=baseUrl + '/api/userlogin'){
    config.headers.authorization=store.state.login.user.token;
  }
  return config
})
// 响应拦截
axios.interceptors.response.use(res => {
  console.group('此次请求的地址是：' + res.config.url);
  console.log(res);
  console.groupEnd();
  if(res.data.msg=='登录已过期或访问权限受限'){
    warningAlert("登录已过期或访问权限受限")
        router.push("/login");
        return;
  }
  return res;
})

// const baseUrl = '/api';

const baseUrl = '';

// 菜单添加
export const menuAdd = (params) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 菜单列表
export const menuList = (params) => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params: params
  })
}
// 获取某一条数据
export const getDetail = (params) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'get',
    params: params
  })
}
// 修改某一条数据
export const updateMenu = (params) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 删除菜单
export const delMenu = (params) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 添加角色
export const roleAdd = (params) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 角色列表
export const roleList = () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: 'get'
  })
}
// 获取一条角色信息
export const roleInfo = (params) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'get',
    params
  })
}
// 角色修改
export const roleUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 角色删除
export const roleDel = (params) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 管理员添加
export const adminAdd = (params) => {
  return axios({
    url: baseUrl + '/api/useradd',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 获取管理员总数
export const adminTotal = () => {
  return axios({
    url: baseUrl + '/api/usercount',
    method: 'get',
  })
}
// 管理员列表
export const adminList = (params) => {
  return axios({
    url: baseUrl + '/api/userlist',
    method: 'get',
    params
  })
}
// 获取一条管理员信息
export const adminInfo = (params) => {
  return axios({
    url: baseUrl + '/api/userinfo',
    method: 'get',
    params
  })
}
// 管理员修改
export const adminUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/useredit',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 管理员删除
export const adminDel = (params) => {
  return axios({
    url: baseUrl + '/api/userdelete',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 管理员登录
export const adminLogin = (params) => {
  return axios({
    url: baseUrl + '/api/userlogin',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 商品分类添加
export const sortAdd = (params) => {
  // post请求里含有文件的，文件处理
  var form = new FormData();
  for (var i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/cateadd',
    method: 'post',
    data: form
  })
}
// 商品分类列表
export const sortList = (params) => {
  return axios({
    url: baseUrl + '/api/catelist',
    method: 'get',
    params
  })
}
// 获取商品分类中的一条数据
export const sortInfo = (params) => {
  return axios({
    url: baseUrl + '/api/cateinfo',
    method: 'get',
    params
  })
}
// 商品分类修改
export const sortUpdate = (params) => {
  var form = new FormData();
  for (let i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/cateedit',
    method: 'post',
    data: form
  })
}
// 商品分类删除
export const sortDel = (params) => {
  return axios({
    url: baseUrl + '/api/catedelete',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 添加规格属性
export const specAdd = (params) => {
  return axios({
    url: baseUrl + '/api/specsadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//   获取商品规格列表
export const specList = (params) => {
  return axios({
    url: baseUrl + '/api/specslist',
    method: 'get',
    params
  })
}
//   获取商品规格总数
export const specCount = () => {
  return axios({
    url: baseUrl + '/api/specscount',
    method: 'get'
  })
}
// 获取商品规格一条
export const specInfo = (params) => {
  return axios({
    url: baseUrl + '/api/specsinfo',
    method: 'get',
    params
  })
}
//   商品规格修改
export const specUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/specsedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
//   商品规格删除
export const specDel = (params) => {
  return axios({
    url: baseUrl + '/api/specsdelete',
    method: 'post',
    data: qs.stringify(params)
  })
}


// 添加商品
export const goodsAdd = (params) => {
  let form=new FormData();
  for(let i in params){
    form.append(i,params[i])
  }
  return axios({
    url: baseUrl + '/api/goodsadd',
    method: 'post',
    data: form
  })
}
//   获取商品列表
export const goodsList = (params) => {
  return axios({
    url: baseUrl + '/api/goodslist',
    method: 'get',
    params
  })
}
//   获取商品总数
export const goodsCount = () => {
  return axios({
    url: baseUrl + '/api/goodscount',
    method: 'get'
  })
}
// 获取商品信息一条
export const goodsInfo = (params) => {
  return axios({
    url: baseUrl + '/api/goodsinfo',
    method: 'get',
    params
  })
}
//   商品修改
export const goodsUpdate = (params) => {
  let form=new FormData();
  for(let i in params){
    form.append(i,params[i])
  }
  return axios({
    url: baseUrl + '/api/goodsedit',
    method: 'post',
    data: form
  })
}
//   商品删除
export const goodsDel = (params) => {
  return axios({
    url: baseUrl + '/api/goodsdelete',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 会员列表
export const memberList = () => {
  return axios({
    url: baseUrl + '/api/memberlist',
    method: 'get'
  })
}
// 获取会员中的一条信息
export const memberInfo = (params) => {
  return axios({
    url: baseUrl + '/api/memberinfo',
    method: 'get',
    params
  })
}
// 会员修改
export const memberUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/memberedit',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 轮播图添加
export const bannerAdd = (params) => {
  let form = new FormData();
  for (let i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/banneradd',
    method: 'post',
    data: form
  })
}

// 获取轮播图列表
export const bannerList = () => {
  return axios({
    url: baseUrl + '/api/bannerlist',
    method: 'get'
  })
}
// 获取轮播图列表中的一条信息
export const bannerInfo = (params) => {
  return axios({
    url: baseUrl + '/api/bannerinfo',
    method: 'get',
    params
  })
}
// 轮播图修改
export const bannerUpdate = (params) => {
  let form = new FormData();
  for (let i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/banneredit',
    method: 'post',
    data: form
  })
}
// 轮播图删除
export const bannerDel = (params) => {
  return axios({
    url: baseUrl + '/api/bannerdelete',
    method: 'post',
    data: qs.stringify(params)
  })
}

//限时秒杀添加
export const seckillAdd=(params)=>{
  return axios({
    url:baseUrl+'/api/seckadd',
    method:'post',
    data:params
  })
}

// 限时秒杀列表
export const seckillList=()=>{
  return axios({
    url:baseUrl+'/api/secklist',
    method:'get'
  })
}
// 获取限时秒杀列表中的一条
export const seckillInfo=(params)=>{
  return axios({
    url:baseUrl+'/api/seckinfo',
    method:'get',
    params
  })
}
// 限时秒杀修改
export const seckillUpdate=(params)=>{
  return axios({
    url:baseUrl+'/api/seckedit',
    method:'post',
    data:qs.stringify(params)
  })
}
// 限时秒杀删除
export const seckillDel=(params)=>{
  return axios({
    url:baseUrl+'/api/seckdelete',
    method:'post',
    data:qs.stringify(params)
  })
}
