import { request } from '@/service/request'

// 取得token
export const getToken = () => {
  return JSON.parse(localStorage.getItem('memberInfo')).token
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
    url: '/member/register',
    method: 'post',
    headers: {
      'Content-Type': 'text/plain'
    },
    data: data
  })

// 取得當前會員資料
export const memberData = (data) =>
  request({
    url: '/member/center/info/r',
    method: 'get',
    headers: {
      token: getToken(),
      'Content-Type': 'text/plain'
    },
    data: data
  })

// 取得商品資訊
export const getGoodsList = (data) =>
  request({
    url: '/member/goods/list',
    method: 'post',
    headers: {
      'Content-Type': 'text/plain'
    },
    data: data
  })

// 更新當前會員資料
export const updateMemberData = (data) =>
  request({
    url: '/member/center/info/u',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })

// 新增商品至購物車
export const addGoodsCart = (data) =>
  request({
    url: '/member/cartInfo/c',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })

// 獲得購物車裡所有商品
export const getGoodsCart = (data) =>
  request({
    url: '/member/cartInfo/r',
    method: 'get',
    headers: {
      token: getToken()
    },
    data: data
  })

// 刪除購物車裡商品
export const deleteGoodsCart = (data) =>
  request({
    url: '/member/cartInfo/d',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'text/plain'
    },
    data: data
  })

// 確定送出購物車裡商品
export const submitGoodsCart = (data) =>
  request({
    url: '/member/cartInfo/checkout',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })

// 獲得所有訂單
export const getOrderList = (data) =>
  request({
    url: '/member/center/order/list',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })
// 添加商品至收藏清單
export const addLikeList = (data) =>
  request({
    url: '/member/favor/c',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'text/plain'
    },
    data: data
  })
// 獲得所有收藏列表
export const allLikeList = (data) =>
  request({
    url: '/member/favor/r',
    method: 'get',
    headers: {
      token: getToken()
    },
    data: data
  })
// 刪除喜愛清單
export const deleteLikeList = (data) =>
  request({
    url: '/member/favor/d',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'text/plain'
    },
    data: data
  })
// 獲得照片
export const getImg = (data) =>
  request({
    url: '/admin/image/r',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })

// 獲得訂單詳細資料
export const orderDetail = (data) =>
  request({
    url: '/member/center/order/detail',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })

// 獲得訂單詳細資料
export const updateCartInfo = (data) =>
  request({
    url: '/member/cartInfo/u',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'application/json'
    },
    data: data
  })

// 獲得優惠卷詳細資料
export const benefitsList = (data) =>
  request({
    url: '/member/center/benefits',
    method: 'get',
    headers: {
      token: getToken()
    },
    data: data
  })

//贈送折價卷
export const createDiscount = (data) =>
  request({
    url: '/admin/member/discount/c',
    method: 'post',
    headers: {
      token: getToken(),
      'Content-Type': 'text/plain'
    },
    data: data
  })
