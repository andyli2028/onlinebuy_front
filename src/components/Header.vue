<template>
  <div class="header-wrap">
    <!-- 顶部小导航 -->
    <div class="top-nav">
      <div class="container">
        <span>欢迎来到在线商城！</span>
        <span class="top-nav-right">
          <el-link v-if="!isLogin" type="primary" @click="goLogin">登录</el-link>
          <el-divider direction="vertical" />
          <el-link v-if="!isLogin" type="primary" @click="goRegister">注册</el-link>
          <template v-else>
            <el-link type="primary" @click="goUserCenter">{{ username }}</el-link>
            <el-divider direction="vertical" />
            <el-link type="danger" @click="handleLogout">退出</el-link>
          </template>
          <el-divider direction="vertical" />
          <el-link @click="goCart">
            <el-icon><ShoppingCart /></el-icon>
            购物车({{ cartCount }})
          </el-link>
        </span>
      </div>
    </div>
    <!-- 头部：logo + 分类下拉 + 搜索框 -->
    <div class="header">
      <div class="container header-main">
        <div class="logo" @click="goHome">
          <span class="logo-icon">🛒</span> 在线商城
        </div>
        <!-- 全部商品分类下拉 -->
        <el-dropdown trigger="click" @command="handleCategoryChange" class="cat-dropdown">
          <span class="cat-dropdown-link">
            全部商品分类
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in categoryList"
                :key="item.id"
                :command="item.id"
              >
                {{ item.category_name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 搜索框 -->
        <div class="search-wrap">
          <el-input
            v-model="searchKey"
            placeholder="输入商品名称搜索"
            size="large"
            class="search-input"
            @keyup.enter="onSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="danger" size="large" @click="onSearch">搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, Search, ArrowDown } from '@element-plus/icons-vue'
import { getBuyerInfo } from '@/api/buyer'

const router = useRouter()

// 状态
const searchKey = ref('')
const isLogin = ref(false)
const username = ref('')
const cartCount = ref(0)
const categoryList = ref([
  { id: 1, category_name: '手机数码', icon: '📱' },
  { id: 2, category_name: '家用电器', icon: '📺' },
  { id: 3, category_name: '服装鞋包', icon: '👕' },
  { id: 4, category_name: '食品生鲜', icon: '🍎' },
  { id: 5, category_name: '美妆护肤', icon: '💄' },
  { id: 6, category_name: '家居家装', icon: '🛋️' },
])

// 页面跳转
const goHome = () => router.push('/')
const goLogin = () => router.push('/user/login')
const goRegister = () => router.push('/user/register')
const goCart = () => router.push('/cart')
const goUserCenter = () => router.push('/user/profile')

const handleCategoryChange = (categoryId) => {
  router.push({ path: '/goods/list', query: { category_id: categoryId } })
}
const onSearch = () => {
  if (!searchKey.value.trim()) return
  router.push({ path: '/goods/list', query: { keyword: searchKey.value.trim() } })
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('user_id')
  isLogin.value = false
  username.value = ''
  cartCount.value = 0
  router.push('/')
}

// 加载用户信息
async function loadUserInfo() {
  const token = localStorage.getItem('token')
  if (!token) {
    isLogin.value = false
    username.value = ''
    return
  }
  try {
    const res = await getBuyerInfo()
    isLogin.value = true
    username.value = res.data.buyer_name
  } catch (err) {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user_id')
    isLogin.value = false
    username.value = ''
  }
}

onMounted(() => {
  loadUserInfo()
  cartCount.value = 0
})

// 监听路由切换，每次切页面重新刷新登录状态（进入用户中心/首页都更新）
watch(
  () => router.currentRoute.value.path,
  () => {
    loadUserInfo()
  }
)
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
/* 顶部小导航 */
.top-nav {
  background: #f5f5f5;
  font-size: 13px;
  color: #666;
  line-height: 36px;
}
.top-nav .container {
  display: flex;
  justify-content: space-between;
}
.top-nav-right {
  display: flex;
  align-items: center;
}
/* 头部 */
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.header-main {
  display: flex;
  align-items: center;
  padding: 20px 0;
  gap: 30px;
}
.logo {
  font-size: 26px;
  font-weight: bold;
  color: #e53e3e;
  cursor: pointer;
  white-space: nowrap;
}
.logo-icon {
  margin-right: 4px;
}
.cat-dropdown-link {
  cursor: pointer;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 4px;
}
.search-wrap {
  flex: 1;
  display: flex;
  gap: 8px;
}
.search-input {
  flex: 1;
}
</style>
