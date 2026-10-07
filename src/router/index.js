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

  // ========== 卖家模块路由 ==========
  {
    path: '/seller/apply',
    name: 'SellerApply',
    component: () => import('@/views/seller/apply.vue'),
    meta: { title: '卖家入驻申请', roles: [] }
  },
  {
    path: '/seller/apply/status',
    name: 'SellerApplyStatus',
    component: () => import('@/views/seller/applyStatus.vue'),
    meta: { title: '入驻申请状态查询', roles: [] }
  },
  {
    path: '/seller/login',
    name: 'SellerLogin',
    component: () => import('@/views/seller/login.vue'),
    meta: { title: '卖家登录', roles: [] }
  },
  // 卖家后台布局父路由
  {
    path: '/seller',
    name: 'SellerLayout',
    component: () => import('@/views/seller/layout.vue'),
    redirect: '/seller/home',
    meta: { roles: ['seller'] },
    children: [
      {
        path: 'home',
        name: 'SellerHome',
        component: () => import('@/views/seller/home.vue'),
        meta: { title: '卖家工作台', roles: ['seller'] }
      },
      {
        path: 'profile',
        name: 'SellerProfile',
        component: () => import('@/views/seller/profile.vue'),
        meta: { title: '企业资料修改', roles: ['seller'] }
      },
      {
        path: 'password',
        name: 'SellerPassword',
        component: () => import('@/views/seller/password.vue'),
        meta: { title: '修改密码', roles: ['seller'] }
      },
      {
        path: 'goods',
        name: 'SellerGoods',
        // 预留商品管理页面，后面开发，先占位
        component: () => import('@/views/seller/goods.vue'),
        meta: { title: '商品管理', roles: ['seller'] }
      }
    ]
  },

  // ========== 管理员模块路由【新增】 ==========
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/login.vue'),
    meta: { title: '管理员登录', white: true }
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('@/views/admin/layout.vue'),
    redirect: '/admin/seller-apply',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'seller-apply',
        name: 'SellerApplyList',
        component: () => import('@/views/admin/sellerApplyList.vue'),
        meta: { title: '卖家入驻申请管理', roles: ['admin'] }
      },
      {
        path: 'seller-detail/:id',
        name: 'AdminSellerDetail',
        component: () => import('@/views/admin/sellerDetail.vue'),
        meta: { title: '卖家详情', roles: ['admin'] }
      }
    ]
  },

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

// =========== 全局路由守卫【改造支持admin】 ===========
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'NiuShop商城'

  // ✅ 白名单：不需要登录、不需要角色权限的页面
  const whiteList = [
    '/',
    '/seller/login',
    '/seller/apply',
    '/seller/apply/status',
    '/user/login',
    '/user/register',
    '/admin/login' //管理员登录加入白名单
  ]
  // 如果目标页面在白名单，直接放行
  if (whiteList.includes(to.path)) {
    // 如果已经登录管理员，不让重复进登录页
    if(to.path === '/admin/login' && localStorage.getItem('admin_token')){
      return next('/admin/seller-apply')
    }
    return next()
  }

  // ------ 管理员路由单独校验 ------
  if(to.path.startsWith('/admin')){
    const adminToken = localStorage.getItem('admin_token')
    if(!adminToken){
      ElMessage.warning('请使用管理员账号登录')
      return next('/admin/login')
    }
    // admin页面全部放行，后端接口继续鉴权
    return next()
  }

  // ------ 买家 / 卖家 原有逻辑 ------
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  // 没有token，跳转到买家登录（注意区分角色！）
  if (!token) {
    // 如果访问卖家后台页面，跳卖家登录；否则跳买家登录
    if (to.path.startsWith('/seller')) {
      return next('/seller/login')
    } else {
      return next('/user/login')
    }
  }
  // 有token，校验页面所需角色
  if (to.meta.roles && to.meta.roles.length > 0) {
    if (to.meta.roles.includes(role)) {
      // 角色匹配，放行
      return next()
    } else {
      // 角色不匹配，无权访问
      ElMessage.warning('权限不足，无法访问该页面')
      // 根据目标页面类型跳转对应登录页
      if (to.path.startsWith('/seller')) {
        return next('/seller/login')
      } else {
        return next('/')
      }
    }
  }
  // 其余情况直接放行
  next()
})

export default router
