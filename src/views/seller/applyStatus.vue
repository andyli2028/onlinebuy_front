<template>
  <div class="status-page">
    <el-card style="max-width:600px;margin:0 auto">
      <h2 class="title">入驻申请状态查询</h2>
      <el-form :model="searchForm">
        <el-form label="卖家账号">
          <el-input v-model="searchForm.seller_id"></el-input>
        </el-form>
        <el-button type="primary" @click="searchStatus" :loading="loading">查询</el-button>
      </el-form>
      <div v-if="statusData" class="result-box">
        <el-divider></el-divider>
        <p>账号：{{statusData.seller_id}}</p>
        <p>企业名称：{{statusData.enterprise_name}}</p>
        <p>审核状态：
          <el-tag :type="statusTagType">{{statusText}}</el-tag>
        </p>
        <p>备注：{{statusData.audit_msg || '无'}}</p>
        <el-button v-if="statusData.audit_status ===2" type="warning" @click="goResubmit">重新提交资料</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref,reactive,computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getSellerApplyStatus } from '@/api/seller'

const router = useRouter()
const loading = ref(false)
const searchForm = reactive({seller_id:''})
const statusData = ref(null)

const statusText = computed(()=>{
  const map = {0:"待审核",1:"审核通过",2:"审核驳回"}
  return map[statusData.value.audit_status] || "未知状态"
})
const statusTagType = computed(()=>{
  const map = {0:"info",1:"success",2:"danger"}
  return map[statusData.value.audit_status]
})

const searchStatus = async ()=>{
  if(!searchForm.seller_id){
    ElMessage.warning("请输入卖家账号")
    return
  }
  loading.value = true
  try{
    const res = await getSellerApplyStatus(searchForm)
    if(res.code ===200){
      statusData.value = res.data.records
    }else{
      ElMessage.error(res.msg)
      statusData.value = null
    }
  }catch(err){
    ElMessage.error("查询失败")
  }finally{
    loading.value = false
  }
}

const goResubmit = ()=>{
  router.push({path:'/seller/apply',query:{seller_id:statusData.value.seller_id,edit:true}})
}
</script>
<style scoped>
.status-page{padding:40px;background:#f5f7fa;min-height:100vh}
.title{text-align:center;margin-bottom:24px}
.result-box{margin-top:20px;}
</style>
