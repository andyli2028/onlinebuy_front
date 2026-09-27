<template>
  <div class="register-page">
    <div class="register-box">
      <h2 class="title">买家注册</h2>
      <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-width="80px">
        <el-form-item label="登录账号" prop="buyer_id">
          <el-input v-model="registerForm.buyer_id" placeholder="请设置登录账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请设置密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item label="买家昵称" prop="buyer_name">
          <el-input v-model="registerForm.buyer_name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="registerForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="registerForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="registerForm.birthday" type="date" placeholder="选择生日" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email_address">
          <el-input v-model="registerForm.email_address" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" style="width:100%" :loading="loading" @click="handleRegister">
            注 册
          </el-button>
        </el-form-item>
      </el-form>
      <div class="footer-link">
        已有账号？<el-link type="primary" @click="goLogin">去登录</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { buyerRegister } from '@/api/buyer'

const router = useRouter()
const registerFormRef = ref()
const loading = ref(false)

const registerForm = reactive({
  buyer_id: '',
  password: '',
  confirmPassword: '',
  buyer_name: '',
  mobile: '',
  gender: 1,
  birthday: null,
  email_address: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  buyer_id: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  buyer_name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  email_address: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
}

const handleRegister = async () => {
  await registerFormRef.value.validate()
  loading.value = true
  try {
    // 格式化生日为datetime格式
    const params = { ...registerForm }
    if (params.birthday) {
      params.birthday = new Date(params.birthday).toISOString().slice(0, 19).replace('T', ' ')
    }
    delete params.confirmPassword

    const res = await buyerRegister(params)
    if (res.code === 200 && res.data.updateRecord === 1) {
      ElMessage.success('注册成功，请登录')
      router.push('/user/login')
    } else {
      ElMessage.error('注册失败，账号可能已存在')
    }
  } catch (err) {
    ElMessage.error(err.response?.data?.msg || '注册失败')
  } finally {
    loading.value = false
  }
}

const goLogin = () => {
  router.push('/user/login')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}
.register-box {
  width: 500px;
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
.footer-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
</style>
