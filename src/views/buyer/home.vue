<template>
  <div class="home-page">
    <!-- 轮播 Banner -->
    <div class="container banner-wrap">
      <el-carousel height="380px" :interval="4000" arrow="hover">
        <el-carousel-item v-for="(banner, idx) in bannerList" :key="idx">
          <div class="banner-item" :style="{ background: banner.bg }">
            <div class="banner-text">
              <h2>{{ banner.title }}</h2>
              <p>{{ banner.subtitle }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 商品分类入口 -->
    <div class="container section">
      <div class="category-grid">
        <div
          class="category-item"
          v-for="cat in categoryList"
          :key="cat.id"
          @click="handleCategoryChange(cat.id)"
        >
          <div class="category-icon">{{ cat.icon }}</div>
          <div class="category-name">{{ cat.category_name }}</div>
        </div>
      </div>
    </div>
    <!-- 热门商品板块 -->
    <div class="container section">
      <div class="section-title">
        <span class="title-bar"></span>
        <h3>热门推荐</h3>
      </div>
      <div class="goods-grid">
        <div
          class="goods-card"
          v-for="goods in goodsList"
          :key="goods.id"
          @click="goGoodsDetail(goods.id)"
        >
          <div class="goods-img" :style="{ background: goods.imgBg }">
            <span class="goods-emoji">{{ goods.emoji }}</span>
          </div>
          <div class="goods-info">
            <div class="goods-name" :title="goods.name">{{ goods.name }}</div>
            <div class="goods-desc">{{ goods.desc }}</div>
            <div class="goods-bottom">
              <span class="goods-price">¥{{ goods.price }}</span>
              <span class="goods-sales">已售{{ goods.sales }}件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>在线商城 ©2026 | 买家端首页</p>
        <p class="footer-sub">Vue3 + Element Plus + FastAPI</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// ========== 模拟数据 ==========
// 一级商品分类
const categoryList = ref([
  { id: 1, category_name: '手机数码', icon: '📱' },
  { id: 2, category_name: '家用电器', icon: '📺' },
  { id: 3, category_name: '服装鞋包', icon: '👕' },
  { id: 4, category_name: '食品生鲜', icon: '🍎' },
  { id: 5, category_name: '美妆护肤', icon: '💄' },
  { id: 6, category_name: '家居家装', icon: '🛋️' },
])
// 轮播 Banner
const bannerList = ref([
  { title: '新人专享礼包', subtitle: '注册即送 100 元优惠券', bg: 'linear-gradient(135deg, #ff6b6b, #ee5a24)' },
  { title: '数码好物节', subtitle: '手机电脑低至 5 折起', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { title: '生鲜直达', subtitle: '产地直采 新鲜到家', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
])
// 商品列表
const goodsList = ref([
  { id: 1, name: '智能手机 Pro Max 256G', desc: '徕卡三摄 5000mAh大电池', price: 4999, sales: 1200, emoji: '📱', imgBg: '#fce4ec' },
  { id: 2, name: '全自动滚筒洗衣机 10kg', desc: '变频静音 高温除菌洗', price: 1899, sales: 860, emoji: '🧺', imgBg: '#e3f2fd' },
  { id: 3, name: '夏季纯棉短袖T恤', desc: '宽松版型 多色可选', price: 59, sales: 5600, emoji: '👕', imgBg: '#fff3e0' },
  { id: 4, name: '红富士苹果 5斤装', desc: '陕西洛川 脆甜多汁', price: 29.9, sales: 8900, emoji: '🍎', imgBg: '#ffebee' },
  { id: 5, name: '无线蓝牙耳机降噪版', desc: '主动降噪 30h续航', price: 399, sales: 3200, emoji: '🎧', imgBg: '#ede7f6' },
  { id: 6, name: '保湿护肤套装', desc: '补水保湿 敏感肌适用', price: 299, sales: 2100, emoji: '🧴', imgBg: '#fce4ec' },
  { id: 7, name: '北欧布艺沙发 三人位', desc: '实木框架 可拆洗', price: 2599, sales: 320, emoji: '🛋️', imgBg: '#e8f5e9' },
  { id: 8, name: '智能扫地机器人', desc: '激光导航 自动集尘', price: 1599, sales: 1500, emoji: '🤖', imgBg: '#e0f7fa' },
])

// ========== 跳转方法 ==========
const goGoodsDetail = (id) => {
  router.push(`/goods/detail/${id}`)
}
const handleCategoryChange = (categoryId) => {
  router.push({ path: '/goods/list', query: { category_id: categoryId } })
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f5f5f5;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
/* Banner */
.banner-wrap {
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
}
.banner-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.banner-text h2 {
  font-size: 36px;
  margin-bottom: 10px;
}
.banner-text p {
  font-size: 18px;
  opacity: 0.9;
}
/* 板块 */
.section {
  margin-top: 24px;
}
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.title-bar {
  width: 4px;
  height: 20px;
  background: #e53e3e;
  border-radius: 2px;
}
.section-title h3 {
  font-size: 20px;
  color: #333;
}
/* 分类入口 */
.category-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
.category-item {
  text-align: center;
  padding: 16px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.category-item:hover {
  background: #fff5f5;
}
.category-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.category-name {
  font-size: 14px;
  color: #333;
}
/* 商品网格 */
.goods-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.goods-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}
.goods-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.goods-img {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.goods-emoji {
  font-size: 64px;
}
.goods-info {
  padding: 12px;
}
.goods-name {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-desc {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.goods-price {
  color: #e53e3e;
  font-size: 18px;
  font-weight: bold;
}
.goods-sales {
  font-size: 12px;
  color: #999;
}
/* 页脚 */
.footer {
  background: #222;
  color: #aaa;
  padding: 30px 0;
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
}
.footer-sub {
  font-size: 12px;
  margin-top: 8px;
  color: #666;
}
</style>
