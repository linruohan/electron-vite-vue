import { request } from '@/utils/axios'
// 获取验证码

export function getCaptcha(data: {
  phone: string
  uuid: string
  purpose: string
}): any {
  return request({
    url: '/staff/getVerifyCode',
    method: 'get',
    params: data
  })
}
