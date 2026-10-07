<template>
  <!-- 路由不是 /admin 开头，才渲染顶部Header -->
  <Header v-if="!route.path.startsWith('/admin')" />
  <router-view />
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'

// 获取当前路由对象
const route = useRoute()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
