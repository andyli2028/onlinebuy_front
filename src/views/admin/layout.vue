<template>
  <el-container style="height:100vh;">
    <el-aside width="220px" style="background-color:#001529;">
      <div class="logo">商城管理后台</div>
      <el-menu
        default-active="seller-apply"
        background-color="#001529"
        text-color="#ffffff"
        active-text-color="#409eff"
        router
      >
        <el-menu-item index="/admin/seller-apply">卖家入驻申请管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background:#fff;display:flex;justify-content:flex-end;padding:0 20px;line-height:60px;">
        <el-button type="text" @click="logout">退出登录</el-button>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('admin_token')
  ElMessage.success('已退出管理员登录')
  router.push('/admin/login')
}
</script>
<style>
.logo {
  color: #fff;
  text-align: center;
  padding: 20px 0;
  font-size: 18px;
}
</style>
