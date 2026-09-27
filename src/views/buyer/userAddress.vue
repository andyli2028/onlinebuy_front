<template>
  <div class="address-page">
    <div class="container">
      <div class="page-header">
        <h3>收货地址管理</h3>
        <el-button type="primary" @click="openAddDialog">新增地址</el-button>
      </div>

      <!-- 地址列表 -->
      <div class="address-list">
        <div class="address-card" v-for="item in addressList" :key="item.address_id">
          <div class="address-info">
            <div class="address-header">
              <span class="receiver">{{ item.receiver_name }}</span>
              <span class="phone">{{ item.phone }}</span>
              <el-tag v-if="item.is_default === 1" type="danger" size="small" class="default-tag">默认</el-tag>
            </div>
            <div class="address-detail">
              {{ item.province }} {{ item.city }} {{ item.district }} {{ item.detail_address }}
            </div>
          </div>
          <div class="address-actions">
            <el-button link type="primary" @click="openEditDialog(item)">编辑</el-button>
            <el-button v-if="item.is_default !== 1" link type="warning" @click="handleSetDefault(item)">设为默认</el-button>
            <el-button link type="danger" @click="handleDelete(item)">删除</el-button>
          </div>
        </div>
        <el-empty v-if="addressList.length === 0" description="暂无收货地址" />
      </div>
    </div>

    <!-- 新增/编辑地址弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form ref="addressFormRef" :model="addressForm" :rules="rules" label-width="80px">
        <el-form-item label="收货人" prop="receiver_name">
          <el-input v-model="addressForm.receiver_name" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addressForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="addressForm.province" placeholder="如：广东省" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addressForm.city" placeholder="如：深圳市" />
        </el-form-item>
        <el-form-item label="区/县" prop="district">
          <el-input v-model="addressForm.district" placeholder="如：南山区" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail_address">
          <el-input v-model="addressForm.detail_address" type="textarea" placeholder="街道、门牌号等" />
        </el-form-item>
        <el-form-item label="设为默认">
          <el-switch v-model="addressForm.is_default" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getAddressList,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from '@/api/buyer'

const addressList = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('新增地址')
const submitLoading = ref(false)
const addressFormRef = ref()

// 获取buyer_id
const buyer_id = localStorage.getItem('user_id') || 1

const addressForm = reactive({
  address_id: null,
  receiver_name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail_address: '',
  is_default: 0,
  buyer_id: buyer_id
})

const rules = {
  receiver_name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  province: [{ required: true, message: '请输入省份', trigger: 'blur' }],
  city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
  district: [{ required: true, message: '请输入区/县', trigger: 'blur' }],
  detail_address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
}

// 加载地址列表
const loadAddressList = async () => {
  try {
    const res = await getAddressList()
    if (res.code === 200) {
      addressList.value = res.data.record || []
    }
  } catch (err) {
    ElMessage.error('获取地址列表失败')
  }
}

// 打开新增弹窗
const openAddDialog = () => {
  dialogTitle.value = '新增地址'
  Object.assign(addressForm, {
    address_id: null,
    receiver_name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail_address: '',
    is_default: 0
  })
  dialogVisible.value = true
}

// 打开编辑弹窗
const openEditDialog = (item) => {
  dialogTitle.value = '编辑地址'
  Object.assign(addressForm, item)
  dialogVisible.value = true
}

// 提交表单
const handleSubmit = async () => {
  await addressFormRef.value.validate()
  submitLoading.value = true
  try {
    if (addressForm.address_id) {
      // 编辑
      const res = await updateAddress(addressForm)
      if (res.code === 200) {
        ElMessage.success('修改成功')
        dialogVisible.value = false
        loadAddressList()
      } else {
        ElMessage.error(res.msg || '修改失败')
      }
    } else {
      // 新增
      const res = await addAddress(addressForm)
      if (res.code === 200) {
        ElMessage.success('添加成功')
        dialogVisible.value = false
        loadAddressList()
      } else {
        ElMessage.error(res.msg || '添加失败')
      }
    }
  } catch (err) {
    ElMessage.error(err.response?.data?.msg || '操作失败')
  } finally {
    submitLoading.value = false
  }
}

// 删除地址
const handleDelete = (item) => {
  ElMessageBox.confirm('确定要删除该地址吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const res = await deleteAddress(item.address_id)
      if (res.code === 200) {
        ElMessage.success('删除成功')
        loadAddressList()
      } else {
        ElMessage.error(res.msg || '删除失败')
      }
    } catch (err) {
      ElMessage.error('删除失败')
    }
  })
}

// 设为默认
const handleSetDefault = (item) => {
  setDefaultAddress(item.address_id).then(res => {
    if (res.code === 200) {
      ElMessage.success('已设为默认地址')
      loadAddressList()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  })
}

onMounted(() => {
  loadAddressList()
})
</script>

<style scoped>
.address-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
}
.container {
  width: 1000px;
  margin: 0 auto;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.page-header h3 {
  margin: 0;
  color: #333;
}
.address-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.address-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.address-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.receiver {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.phone {
  color: #666;
}
.default-tag {
  margin-left: 8px;
}
.address-detail {
  color: #666;
  font-size: 14px;
}
.address-actions {
  display: flex;
  gap: 8px;
}
</style>
