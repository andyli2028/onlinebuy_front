<template>
<el-card style="max-width:700px;margin:30px auto">
  <h2>企业资料修改</h2>
  <el-form ref="formRef" :model="form" label-width="160px">
    <el-form-item label="企业名称">
      <el-input v-model="form.enterprise_name" disabled></el-input>
    </el-form-item>
    <el-form-item label="营业执照编号">
      <el-input v-model="form.license_no" disabled></el-input>
    </el-form-item>
    <el-form-item label="法人姓名">
      <el-input v-model="form.legal_person" disabled></el-input>
    </el-form-item>
    <el-form-item label="联系手机号" prop="contact_mobile">
      <el-input v-model="form.contact_mobile"></el-input>
    </el-form-item>
    <el-form-item label="联系邮箱" prop="contact_email">
      <el-input v-model="form.contact_email"></el-input>
    </el-form-item>
    <el-form-item label="企业地址" prop="enterprise_address">
      <el-input v-model="form.enterprise_address" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="loading">保存修改</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getSellerProfile,updateSellerProfile } from '@/api/seller'
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const form = reactive({
  enterprise_name:'',license_no:'',legal_person:'',
  contact_mobile:'',contact_email:'',enterprise_address:''
})

const loadData = async ()=>{
  const res = await getSellerProfile()
  if(res.code ===200){
    Object.assign(form,res.data.records)
  }
}

const onSubmit = async ()=>{
  await formRef.value.validate()
  loading.value = true
  try{
    const submitData = {
      contact_mobile:form.contact_mobile,
      contact_email:form.contact_email,
      enterprise_address:form.enterprise_address
    }
    const res = await updateSellerProfile(submitData)
    if(res.code ===200){
      ElMessage.success('资料更新成功')
    }else{
      ElMessage.error(res.msg)
    }
  }catch(err){
    ElMessage.error('保存失败')
  }finally{
    loading.value = false
  }
}

onMounted(()=>loadData())
</script>
