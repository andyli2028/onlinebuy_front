<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">在线商城</router-link>
      </div>
      <div class="nav-menu">
        <router-link to="/">首页</router-link>
        <router-link to="/goods/list">商品列表</router-link>
      </div>
      <div class="user-area">
        <template v-if="isLogin">
          <el-link type="primary" @click="goUserCenter">{{ username }}</el-link>
          <el-divider direction="vertical" />
          <el-button link type="danger" @click="handleLogout">退出登录</el-button>
        </template>
        <template v-else>
          <el-link type="primary" @click="goLogin">登录</el-link>
          <el-divider direction="vertical" />
          <el-link type="primary" @click="goRegister">注册</el-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBuyerInfo } from '@/api/buyer'
import { getSellerInfo } from '@/api/seller'

const router = useRouter()
const route = useRoute() // 新增，获取路由对象

const isLogin = ref(false)
const username = ref('')

// 加载用户信息【修复：根据角色区分接口】
const loadUserInfo = async () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') // 取出当前登录角色
  if (!token || !role) {
    isLogin.value = false
    username.value = ''
    return
  }
  try {
    let res
    if (role === 'buyer') {
      res = await getBuyerInfo()
      if (res.code === 200) {
        username.value = res.data.buyer_name
      }
    } else if (role === 'seller') {
      res = await getSellerInfo()
      if (res.code === 200) {
        username.value = res.data.seller_name
      }
    }
    isLogin.value = true
    localStorage.setItem('username', username.value)
  } catch (err) {
    console.error('获取用户信息失败', err)
    clearUserState()
  }
}

// 清除本地登录信息
const clearUserState = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('user_id')
  localStorage.removeItem('username')
  isLogin.value = false
  username.value = ''
}

// 页面挂载时加载用户信息
onMounted(() => {
  loadUserInfo()
})

// ✅ 新增：监听路由变化，每次切换页面重新加载用户信息
watch(route, () => {
  loadUserInfo()
})

// 跳转登录
const goLogin = () => {
  router.push('/user/login')
}
// 跳转注册
const goRegister = () => {
  router.push('/user/register')
}
// 用户中心
const goUserCenter = () => {
  router.push('/user/profile')
}
// 退出登录
const handleLogout = () => {
  clearUserState()
  ElMessage.success('已退出登录')
  router.push('/')
}
</script>
<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.container {
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo a {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}
.nav-menu {
  display: flex;
  gap: 24px;
}
.nav-menu a {
  color: #333;
  text-decoration: none;
}
.user-area {
  display: flex;
  align-items: center;
}
</style>
