<template>
<div class="login-wrap">
  <el-card class="login-card">
    <h2>卖家后台登录</h2>
    <el-form ref="formRef" :model="loginForm">
      <el-form-item label="卖家账号" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
      </el-form-item>
      <div class="tip">还没有入驻？<el-link type="primary" @click="$router.push('/seller/apply')">立即申请入驻</el-link></div>
    </el-form>
  </el-card>
</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { sellerLogin } from '@/api/seller'
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const loginForm = reactive({username:'',password:''})
const handleLogin = async ()=>{
  loading.value = true
  try{
    // ❗不要在这里构造FormData！直接传loginForm对象给sellerLogin
    console.log('登录表单：', loginForm)
    const res = await sellerLogin(loginForm)
    if(res.access_token){
      localStorage.setItem('token',res.access_token)
      localStorage.setItem('role','seller')
      localStorage.setItem('username',res.username || loginForm.username)
      ElMessage.success('登录成功')
      router.push('/seller/home')
    }
  }catch(err){
    ElMessage.error(err.response?.data?.detail || '登录失败')
  }finally{
    loading.value = false
  }
}
</script>
<style scoped>
.login-wrap{
  display:flex;align-items:center;justify-content:center;
  height:100vh;background:#f5f7fa;
}
.login-card{width:400px;padding:30px}
h2{text-align:center;margin-bottom:24px}
.tip{margin-top:16px;text-align:right}
</style>
