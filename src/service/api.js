import { request } from '@/service/request'

// 取得token
export const getToken = () => {
  return JSON.parse(localStorage.getItem('userInfo')).token
}

// 獲得登入OTP碼
export const getOtp = (data) =>
  request({
    url: 'member/otp',
    method: 'get',
    headers: {},
    data: data
  })

// 會員登入
export const login = (data) =>
  request({
    url: '/member/login',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    data: data
  })

// 會員註冊
export const createMember = (data) =>
  request({
    url: '/admin/member/customer/c',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'text/plain'
    },
    data: data
  })
