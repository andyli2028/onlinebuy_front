// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const routes = [
  // ========== 买家前台 buyer ==========
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/buyer/home.vue'),
    meta: { title: '商城首页', white: true } // white:true 游客免登录访问
  },
  /*
  {
    path: '/goods/list',
    name: 'GoodsList',
    component: () => import('@/views/buyer/goodsList.vue'),
    meta: { title: '商品列表', white: true } // 商品列表也可以游客浏览
  },
  {
    path: '/goods/detail/:id',
    name: 'GoodsDetail',
    component: () => import('@/views/buyer/goodsDetail.vue'),
    meta: { title: '商品详情', white: true } // 商品详情游客可看
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/buyer/cart.vue'),
    meta: { title: '购物车', roles: ['buyer'] }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/buyer/checkout.vue'),
    meta: { title: '订单确认', roles: ['buyer'] }
  },
  {
    path: '/order/pay/:orderNo',
    name: 'OrderPay',
    component: () => import('@/views/buyer/orderPay.vue'),
    meta: { title: '订单支付', roles: ['buyer'] }
  },
  */
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/buyer/userProfile.vue'),
    meta: { title: '个人中心', roles: ['buyer'] }
  },

  {
    path: '/user/address',
    name: 'UserAddress',
    component: () => import('@/views/buyer/userAddress.vue'),
    meta: { title: '收货地址管理', roles: ['buyer'] }
  },
  /*
  {
    path: '/user/order',
    name: 'UserOrderList',
    component: () => import('@/views/buyer/userOrderList.vue'),
    meta: { title: '我的订单', roles: ['buyer'] }
  },
  {
    path: '/user/order/:orderNo',
    name: 'UserOrderDetail',
    component: () => import('@/views/buyer/userOrderDetail.vue'),
    meta: { title: '订单详情', roles: ['buyer'] }
  },
  */
  // 买家白名单
  {
    path: '/user/login',
    name: 'BuyerLogin',
    component: () => import('@/views/buyer/login.vue'),
    meta: { title: '买家登录', white: true }
  },
  {
    path: '/user/register',
    name: 'BuyerRegister',
    component: () => import('@/views/buyer/register.vue'),
    meta: { title: '买家注册', white: true }
  },
  /*
  // ========== 卖家后台 seller ==========
  {
    path: '/seller/login',
    name: 'SellerLogin',
    component: () => import('@/views/seller/login.vue'),
    meta: { title: '卖家登录', white: true }
  },
  {
    path: '/seller/home',
    name: 'SellerHome',
    component: () => import('@/views/seller/home.vue'),
    meta: { title: '卖家中心首页', roles: ['seller'] }
  },
  {
    path: '/seller/goods',
    name: 'SellerGoodsList',
    component: () => import('@/views/seller/goodsList.vue'),
    meta: { title: '商品管理', roles: ['seller'] }
  },
  {
    path: '/seller/goods/add',
    name: 'SellerGoodsAdd',
    component: () => import('@/views/seller/goodsAdd.vue'),
    meta: { title: '新增商品', roles: ['seller'] }
  },
  {
    path: '/seller/goods/edit/:id',
    name: 'SellerGoodsEdit',
    component: () => import('@/views/seller/goodsEdit.vue'),
    meta: { title: '编辑商品', roles: ['seller'] }
  },
  {
    path: '/seller/order',
    name: 'SellerOrderList',
    component: () => import('@/views/seller/orderList.vue'),
    meta: { title: '卖家订单列表', roles: ['seller'] }
  },
  {
    path: '/seller/order/:orderNo',
    name: 'SellerOrderDetail',
    component: () => import('@/views/seller/orderDetail.vue'),
    meta: { title: '卖家订单详情', roles: ['seller'] }
  },
  // ========== 平台管理员后台 admin ==========
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/login.vue'),
    meta: { title: '管理员登录', white: true }
  },
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: () => import('@/views/admin/home.vue'),
    meta: { title: '平台后台首页', roles: ['admin'] }
  },
  {
    path: '/admin/category',
    name: 'CategoryManage',
    component: () => import('@/views/admin/category.vue'),
    meta: { title: '商品分类管理', roles: ['admin'] }
  },
  {
    path: '/admin/user/buyer',
    name: 'BuyerUserManage',
    component: () => import('@/views/admin/userBuyer.vue'),
    meta: { title: '买家用户管理', roles: ['admin'] }
  },
  {
    path: '/admin/user/seller',
    name: 'SellerUserManage',
    component: () => import('@/views/admin/userSeller.vue'),
    meta: { title: '卖家用户管理', roles: ['admin'] }
  },
  {
    path: '/admin/goods',
    name: 'AdminGoodsList',
    component: () => import('@/views/admin/goodsList.vue'),
    meta: { title: '全平台商品', roles: ['admin'] }
  },
  {
    path: '/admin/order',
    name: 'AdminOrderList',
    component: () => import('@/views/admin/orderList.vue'),
    meta: { title: '全平台订单', roles: ['admin'] }
  },
  */
  // 404兜底
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
// =========== 全局路由守卫 ===========
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '在线商城'
  // 白名单页面：直接放行，不需要token
  if (to.meta.white) {
    return next()
  }

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // 无token，跳转对应登录页
  if (!token) {
    if (to.path.startsWith('/seller')) {
      ElMessage.warning('请先登录卖家账号')
      return next('/seller/login')
    } else if (to.path.startsWith('/admin')) {
      ElMessage.warning('请先登录管理员账号')
      return next('/admin/login')
    } else {
      ElMessage.warning('请先登录买家账号')
      return next('/user/login')
    }
  }

  // 有token，校验页面所需角色
  if (to.meta.roles && !to.meta.roles.includes(role)) {
    ElMessage.warning('当前账号无权限访问该页面')
    return next('/')
  }

  // 全部校验通过，放行
  next()
})

export default router
