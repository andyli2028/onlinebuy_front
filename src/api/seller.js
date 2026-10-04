import service from './request'

// 1.提交入驻申请
export function submitSellerApply(data){
  return service({
    url: '/seller/apply/submit',
    method: 'post',
    data
  })
}
// 2.查询入驻状态
export function getSellerApplyStatus(data){
  return service({
    url: '/seller/apply/status',
    method: 'post',
    data
  })
}
// 3.驳回后重新提交入驻资料
export function resubmitSellerApply(data){
  return service({
    url: '/seller/apply/update',
    method: 'post',
    data
  })
}
// 4.卖家登录
export function sellerLogin(data){
  const formData = new URLSearchParams()
  formData.append('username', data.username)
  formData.append('password', data.password)
  return service({
    url: '/seller/login',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
// 5.获取卖家企业资料（原来的/profile/search）
export function getSellerProfile(){
  return service({
    url: '/seller/profile/search',
    method: 'get'
  })
}
// 6.获取卖家信息（Header组件调用：/seller/me）
export function getSellerInfo(){
  return service({
    url: '/seller/me',
    method: 'get'
  })
}
// 7.修改卖家资料（手机、邮箱、地址）
export function updateSellerProfile(data){
  return service({
    url: '/seller/profile/update',
    method: 'post',
    data
  })
}
//8.修改密码
export function updateSellerPwd(data){
  return service({
    url: '/seller/password/update',
    method: 'post',
    data
  })
}
