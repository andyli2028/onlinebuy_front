<template>
  <div class="admin-login">
    <el-card class="login-card">
      <h2>商城后台管理系统</h2>
      <el-form ref="formRef" :model="loginForm" label-width="80px">
        <el-form-item label="管理员账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { adminLogin } from '@/api/admin'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  await formRef.value.validate()
  loading.value = true
  try {
    const res = await adminLogin(loginForm)
    localStorage.setItem('admin_token', res.access_token)
    ElMessage.success('管理员登录成功')
    console.log('准备跳转')
    router.push('/admin/seller/apply/list')
    console.log('跳转完成')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
.admin-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}
.login-card {
  width: 400px;
  padding: 30px;
}
h2 {
  text-align: center;
  margin-bottom: 24px;
}
</style>
