<template>
<el-card style="max-width:550px;margin:30px auto">
  <h2>修改登录密码</h2>
  <el-form ref="formRef" :model="form" label-width="120px">
    <el-form-item label="旧密码" prop="old_password">
      <el-input v-model="form.old_password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="new_password">
      <el-input v-model="form.new_password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="loading">确认修改</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { updateSellerPwd } from '@/api/seller'
const formRef = ref(null)
const loading = ref(false)
const form = reactive({
  old_password:'',
  new_password:''
})

const onSubmit = async ()=>{
  await formRef.value.validate()
  loading.value = true
  try{
    const res = await updateSellerPwd(form)
    if(res.code ===200){
      ElMessage.success('密码修改成功，请重新登录')
      localStorage.clear()
      location.href="/seller/login"
    }else{
      ElMessage.error(res.msg)
    }
  }catch(err){
    ElMessage.error('修改失败')
  }finally{
    loading.value = false
  }
}
</script>
