<template>
<div class="seller-home">
  <el-card>
    <h2>卖家工作台</h2>
    <el-row :gutter="20" style="margin-top:30px">
      <el-col :span="8">
        <el-statistic title="企业名称" :value="profile.enterprise_name || '-'"></el-statistic>
      </el-col>
      <el-col :span="8">
        <el-statistic title="法人" :value="profile.legal_person || '-'"></el-statistic>
      </el-col>
      <el-col :span="8">
        <el-statistic title="联系手机" :value="profile.contact_mobile || '-'"></el-statistic>
      </el-col>
    </el-row>
    <div style="margin-top:40px">
      <el-button type="primary" @click="$router.push('/seller/profile')">修改企业资料</el-button>
      <el-button type="default" @click="$router.push('/seller/password')">修改登录密码</el-button>
      
    </div>
  </el-card>
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getSellerProfile } from '@/api/seller'
const router = useRouter()
const profile = ref({})

const loadProfile = async ()=>{
  const res = await getSellerProfile()
  if(res.code ===200){
    profile.value = res.data.records
  }
}

onMounted(()=>{
  loadProfile()
})
</script>
<style scoped>
.seller-home{padding:30px}
</style>
