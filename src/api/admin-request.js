import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
const adminService = axios.create({
  baseURL: '/api',
  timeout: 10000
})
adminService.interceptors.request.use(config => {
  const adminToken = localStorage.getItem('admin_token')
  if(adminToken){
    config.headers.Authorization = `Bearer ${adminToken}`
  }
  return config
})
adminService.interceptors.response.use(
  res => res.data,
  err => {
    if(err.response?.status === 401){
      ElMessage.warning('管理员登录失效，请重新登录')
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
    }else{
      ElMessage.error(err.response?.data?.detail || '服务器异常')
    }
    return Promise.reject(err)
  }
)
export default adminService
