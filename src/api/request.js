// src/api/request.js
import axios from 'axios'

const service = axios.create({
  baseURL: '', // 空，所有接口写完整相对路径
  timeout: 10000
})

// 请求拦截器：携带token
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/user/login'
    }
    return Promise.reject(err)
  }
)

export default service
