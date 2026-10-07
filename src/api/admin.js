import service from './admin-request'

// 管理员登录 OAuth2PasswordRequestForm
export function adminLogin(data) {
  const formData = new URLSearchParams()
  formData.append('username', data.username)
  formData.append('password', data.password)
  return service({
    url: '/admin/login',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 分页获取卖家入驻申请列表
export function getSellerApplyList(params) {
  return service({
    url: '/admin/seller/apply/list',
    method: 'get',
    params
  })
}

// 卖家入驻审核
export function auditSellerApply(data) {
  return service({
    url: '/admin/seller/apply/audit',
    method: 'post',
    data
  })
}

// 获取卖家详情
export function getAdminSellerDetail(id) {
  return service({
    url: `/admin/seller/detail/${id}`,
    method: 'get'
  })
}

// 封禁/解封卖家账号
export function updateSellerStatus(data) {
  return service({
    url: '/admin/seller/status',
    method: 'post', // 改为 post，和后端保持一致
    data
  })
}
