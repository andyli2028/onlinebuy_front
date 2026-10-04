<template>
  <div class="apply-page">
    <el-card class="apply-card">
      <h2 class="title">卖家入驻申请</h2>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="卖家账号" prop="seller_id">
          <el-input v-model="form.seller_id" placeholder="自定义登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="enterprise_name">
          <el-input v-model="form.enterprise_name"></el-input>
        </el-form-item>
        <el-form-item label="营业执照编号" prop="license_no">
          <el-input v-model="form.license_no"></el-input>
        </el-form-item>
        <el-form-item label="营业执照图片链接" prop="business_license">
          <el-input v-model="form.business_license" placeholder="填入图片url"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名" prop="legal_person">
          <el-input v-model="form.legal_person"></el-input>
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
          <el-button type="primary" @click="onSubmit" :loading="submitLoading">提交申请</el-button>
          <el-button @click="$router.push('/seller/apply/status')">查询申请状态</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { submitSellerApply } from '@/api/seller'

const router = useRouter()
const formRef = ref(null)
const submitLoading = ref(false)
const form = reactive({
  seller_id:'',
  password:'',
  enterprise_name:'',
  business_license:'',
  license_no:'',
  legal_person:'',
  contact_mobile:'',
  contact_email:'',
  enterprise_address:''
})

const rules = {
  seller_id:[{required:true,message:'请输入卖家账号',trigger:'blur'}],
  password:[{required:true,message:'请输入密码',trigger:'blur'}],
  enterprise_name:[{required:true,message:'企业名称不能为空'}],
  license_no:[{required:true,message:'营业执照编号必填'}],
  business_license:[{required:true}],
  legal_person:[{required:true}],
  contact_mobile:[{required:true}],
  contact_email:[{required:true}],
  enterprise_address:[{required:true}]
}

const onSubmit = async ()=>{
  await formRef.value.validate()
  submitLoading.value = true
  try{
    const res = await submitSellerApply(form)
    if(res.code === 200){
      ElMessage.success('提交成功！请等待审核')
      router.push('/seller/apply/status')
    }else{
      ElMessage.error(res.msg || '提交失败')
    }
  }catch(err){
    ElMessage.error('接口异常')
  }finally{
    submitLoading.value = false
  }
}
</script>

<style scoped>
.apply-page{
  padding:40px;
  background:#f5f7fa;
  min-height:100vh;
}
.apply-card{
  max-width:700px;
  margin:0 auto;
}
.title{
  text-align:center;
  margin-bottom:30px;
}
</style>
