<template>
  <div class="profile-page">
    <div class="container">
      <div class="page-header">
        <h3>个人中心</h3>
      </div>

      <div class="profile-card">
        <div class="user-info">
          <el-avatar :size="80" icon="UserFilled" />
          <div class="user-detail">
            <h4>{{ userInfo.buyer_name || '买家用户' }}</h4>
            <p>账号：{{ userInfo.buyer_id }}</p>
          </div>
        </div>

        <el-divider />

        <div class="menu-list">
          <div class="menu-item" @click="goAddress">
            <div class="menu-left">
              <el-icon :size="20"><Location /></el-icon>
              <span>收货地址管理</span>
            </div>
            <el-icon><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goOrder">
            <div class="menu-left">
              <el-icon :size="20"><List /></el-icon>
              <span>我的订单</span>
            </div>
            <el-icon><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goCart">
            <div class="menu-left">
              <el-icon :size="20"><ShoppingCart /></el-icon>
              <span>购物车</span>
            </div>
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>

        <el-divider />

        <el-button type="danger" style="width:100%" @click="handleLogout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBuyerInfo } from '@/api/buyer'
import { Location, List, ShoppingCart, ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const userInfo = ref({})

const loadUserInfo = async () => {
  try {
    const res = await getBuyerInfo()
    if (res.code === 200) {
      userInfo.value = res.data
      localStorage.setItem('user_id', res.data.buyer_id)
      localStorage.setItem('username', res.data.buyer_name)
    }
  } catch (err) {
    ElMessage.error('获取用户信息失败')
  }
}

const goAddress = () => {
  router.push('/user/address')
}

const goOrder = () => {
  router.push('/user/order')
}

const goCart = () => {
  router.push('/cart')
}

const handleLogout = () => {
  localStorage.clear()
  ElMessage.success('已退出登录')
  router.push('/user/login')
}

onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
}
.container {
  width: 800px;
  margin: 0 auto;
}
.page-header {
  margin-bottom: 20px;
}
.page-header h3 {
  margin: 0;
  color: #333;
}
.profile-card {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}
.user-detail h4 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #333;
}
.user-detail p {
  margin: 0;
  color: #999;
  font-size: 14px;
}
.menu-list {
  display: flex;
  flex-direction: column;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:hover {
  color: #e53e3e;
}
.menu-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
}
</style>
