<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span>卖家企业详情</span>
        <el-button @click="$router.back()">返回列表</el-button>
      </div>
    </template>

    <el-descriptions :column="2" border v-if="info">
      <el-descriptions-item label="卖家ID">{{ info.seller_id }}</el-descriptions-item>
      <el-descriptions-item label="企业名称">{{ info.enterprise_name }}</el-descriptions-item>
      <el-descriptions-item label="统一社会信用代码">{{ info.license_no }}</el-descriptions-item>
      <el-descriptions-item label="联系人姓名">{{ info.legal_person }}</el-descriptions-item>
      <el-descriptions-item label="联系手机">{{ info.contact_mobile }}</el-descriptions-item>
      <el-descriptions-item label="入驻审核状态">
        <el-tag :type="statusTag(info.audit_status)">
          {{ statusText(info.audit_status) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="账号状态">
        <el-tag :type="info.seller_status === 0 ? 'success' : 'danger'">
          {{ info.seller_status === 0 ? '正常' : '已封禁' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="申请时间">{{ info.apply_time || '-' }}</el-descriptions-item>
      <el-descriptions-item label="审核时间">{{ info.audit_time || '-' }}</el-descriptions-item>
      <el-descriptions-item label="驳回原因">{{ info.reject_reason || '-' }}</el-descriptions-item>
    </el-descriptions>

    <div style="margin-top:24px;">
      <el-button v-if="info && info.seller_status === 0" type="danger" @click="changeStatus(1)">封禁账号</el-button>
      <el-button v-if="info && info.seller_status === 1" type="success" @click="changeStatus(0)">解封账号</el-button>
    </div>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAdminSellerDetail, updateSellerStatus } from '@/api/admin'

const route = useRoute()
const info = ref(null)
const id = route.params.id

const loadDetail = async () => {
  const res = await getAdminSellerDetail(id)
  info.value = res.data.records
}

const changeStatus = async (newStatus) => {
  const tip = newStatus === 1
    ? '确认封禁该卖家账号？封禁后卖家将无法登录卖家后台。'
    : '确认解封该卖家账号？'
  await ElMessageBox.confirm(tip)
  await updateSellerStatus({ id, seller_status: newStatus })
  ElMessage.success('账号状态修改成功')
  loadDetail()
}

const statusText = (val) => {
  if (val === 0) return '待审核'
  if (val === 1) return '已通过'
  if (val === 2) return '已驳回'
  return ''
}

const statusTag = (val) => {
  if (val === 0) return 'warning'
  if (val === 1) return 'success'
  if (val === 2) return 'danger'
  return ''
}

onMounted(() => loadDetail())
</script>
