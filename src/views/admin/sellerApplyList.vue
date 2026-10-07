<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col span="6">
          <el-select v-model="query.audit_status" placeholder="审核状态筛选">
            <el-option label="待审核" :value="0" />
            <el-option label="已通过" :value="1" />
            <el-option label="已驳回" :value="2" />
          </el-select>
        </el-col>
        <el-col span="6">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top:15px;">
      <el-table :data="tableData" border>
        <el-table-column label="ID" prop="id" width="80" />
        <el-table-column label="卖家账号" prop="seller_id" />
        <el-table-column label="企业名称" prop="company_name" />
        <el-table-column label="联系人手机" prop="mobile" />
        <el-table-column label="审核状态">
          <template #default="scope">
            <el-tag :type="statusTag(scope.row.audit_status)">
              {{ statusText(scope.row.audit_status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="驳回原因" prop="reject_reason" />
        <el-table-column label="申请时间" prop="apply_time" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button type="primary" link @click="goDetail(scope.row.id)">查看详情</el-button>
            <el-button v-if="scope.row.audit_status === 0" type="success" link @click="openAudit(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="query.page"
        v-model:page-size="query.page_size"
        :total="total"
        @change="loadData"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top:15px;"
      />
    </el-card>

    <!-- 审核弹窗 -->
    <el-dialog v-model="auditDialog.visible" title="卖家入驻审核">
      <el-form :model="auditForm">
        <el-form-item label="审核结果">
          <el-radio-group v-model="auditForm.audit_result">
            <el-radio label="1">审核通过</el-radio>
            <el-radio label="2">驳回申请</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="auditForm.audit_result === '2'" label="驳回原因">
          <el-input v-model="auditForm.reject_reason" type="textarea" placeholder="驳回时必须填写原因"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="auditDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="submitAudit">确认提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getSellerApplyList, auditSellerApply } from '@/api/admin'

const router = useRouter()

const tableData = ref([])
const total = ref(0)

// ⚠️ audit_status 后端是必填，不能为null，默认0 查询待审核
const query = reactive({
  page: 1,
  page_size: 10,
  audit_status: 0
})

const auditDialog = ref({ visible: false })
const auditForm = ref({
  id: null,
  audit_result: '1',
  reject_reason: ''
})

const loadData = async () => {
  const res = await getSellerApplyList(query)
  tableData.value = res.data.records
  total.value = res.data.total
}

const resetQuery = () => {
  query.page = 1
  query.audit_status = 0 // 重置回到待审核，不能置null
  loadData()
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

const openAudit = (row) => {
  auditForm.value.id = row.id
  auditForm.value.audit_result = '1'
  auditForm.value.reject_reason = ''
  auditDialog.value.visible = true
}

const submitAudit = async () => {
  if (auditForm.value.audit_result === '2' && !auditForm.value.reject_reason?.trim()) {
    ElMessage.warning('驳回申请必须填写驳回原因')
    return
  }
  await auditSellerApply(auditForm.value)
  ElMessage.success('审核操作完成')
  auditDialog.value.visible = false
  loadData()
}

const goDetail = (id) => {
  router.push(`/admin/seller-detail/${id}`)
}

onMounted(() => loadData())
</script>
