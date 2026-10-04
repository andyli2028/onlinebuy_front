import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建axios实例，使用相对路径，走vite代理
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器：自动携带Bearer token
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // OAuth2登录接口返回 {access_token, token_type}，没有code字段
    if (res.access_token) {
      return res
    }
    // 其余自定义包装接口（带code）
    if (res.code !== 200) {
      ElMessage.error(res.msg || '请求失败')
      // token无效、过期，退出登录
      if (res.code === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        router.push('/user/login')
      }
      return Promise.reject(res)
    }
    return res
  },
  error => {
    console.log('axios响应错误：', error)
    if (error.response && error.response.status === 401) {
      ElMessage.warning('登录已失效，请重新登录')
      localStorage.clear()
      router.push('/user/login')
    } else if(error.response?.status === 502){
      ElMessage.error('后端服务连接失败，请检查后台服务是否启动')
    } else {
      ElMessage.error(error.message || '服务器异常')
    }
    return Promise.reject(error)
  }
)

export default service
