<template>
  <div class="seller-layout">
    <!-- 侧边栏 -->
    <el-aside width="220px" class="aside">
      <div class="logo">卖家管理后台</div>
      <el-menu
        :default-active="activeMenu"
        router
        class="sidebar-menu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
      >
        <el-menu-item index="/seller/home">
          <el-icon><House /></el-icon>
          <span>工作台</span>
        </el-menu-item>
        <el-menu-item index="/seller/profile">
          <el-icon><Document /></el-icon>
          <span>企业资料</span>
        </el-menu-item>
        <el-menu-item index="/seller/password">
          <el-icon><Lock /></el-icon>
          <span>修改密码</span>
        </el-menu-item>
        <el-menu-item index="/seller/goods">
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧区域 -->
    <div class="main-wrapper">
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <span>欢迎，卖家账号：{{ sellerId }}</span>
        <el-button type="text" @click="handleLogout" class="logout-btn">退出登录</el-button>
      </el-header>
      <!-- 子页面渲染区域 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { House, Document, Lock, Goods } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 菜单高亮
const activeMenu = computed(() => route.path)
const sellerId = ref(localStorage.getItem('user_id') || '')

// 登出
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('user_id')
  ElMessage.success('已退出登录')
  router.push('/seller/login')
}
</script>

<style scoped>
.seller-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.aside {
  background-color: #304156;
}
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border-bottom: 1px solid #1f2d3d;
}
.sidebar-menu {
  border-right: none;
}
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.header {
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.logout-btn {
  color: #606266;
}
.main {
  background: #f2f3f5;
  padding: 20px;
  overflow: auto;
}
</style>
