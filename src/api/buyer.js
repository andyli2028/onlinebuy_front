import service from './request'
// ========== 认证相关 ==========
// 买家注册
export function buyerRegister(data) {
  return service({
    url: '/buyer/register',
    method: 'post',
    data
  })
}
// 买家登录（OAuth2PasswordRequestForm，form-urlencoded）
export function buyerLogin(data) {
  const formData = new URLSearchParams()
  formData.append('username', data.username)
  formData.append('password', data.password)
  return service({
    url: '/buyer/login',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
// 获取当前买家信息
export function getBuyerInfo() {
  return service({
    url: '/buyer/me',
    method: 'get'
  })
}
// ========== 收货地址相关 ==========
// 新增地址
export function addAddress(data) {
  return service({
    url: '/buyer/address/add',
    method: 'post',
    data
  })
}
// 修改地址
export function updateAddress(data) {
  return service({
    url: '/buyer/address/update',
    method: 'post',
    data
  })
}
// 删除地址
export function deleteAddress(address_id) {
  return service({
    url: '/buyer/address/delete',
    method: 'post',
    data: { address_id }
  })
}
// 设置默认地址
export function setDefaultAddress(address_id) {
  return service({
    url: '/buyer/address/set_default',
    method: 'post',
    data: { address_id }
  })
}
// 地址列表
export function getAddressList() {
  return service({
    url: '/buyer/address/list',
    method: 'get'
  })
}
// 地址详情
export function getAddressDetail(address_id) {
  return service({
    url: `/buyer/address/detail/${address_id}`,
    method: 'get'
  })
}
