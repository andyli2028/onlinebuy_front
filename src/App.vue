<template>
  <!-- 全局顶部导航 -->
  <Header />
  <!-- 路由页面渲染区域 -->
  <router-view />
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
