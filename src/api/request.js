import axios from 'axios'

// import store from '@/store/index' 如果使用vuex，token，userinfo都可以在LOGIN後放在store中，便不需要使用storage
let baseUrl = 'http://localhost:8080/'
axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 30000
// axios.defaults.withCredentials = true
// 攔截器，設定token
axios.interceptors.request.use(config => {
  if (localStorage && localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
  }
  return config
}, error => {
  // error handler，ElementUI的$message和彈窗都可以用來顯示錯誤內容
  console.log(error)
  return Promise.error(error)
})
// 回應攔截器
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    // 993 LOGIN TOKEN 失效
    if (response.data.code !== '993') {
      return Promise.resolve(response)
    } else {
      console.log('Token Expired!!')
      // store.commit('clearUserInfo')  // 使用vuex儲存使用者資訊的話這邊要清空
      // window.location.href = '/#/login'
    }
  } else {
    return Promise.reject(response)
  }
})

// 封裝Request

const request = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

  get: (url, params) => new Promise((resolve, reject) => {
    axios.get(url, {
       params,
     })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
         reject(error);
       });
   }),

  post: (url, params) => new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }),

  put: (url, params) => new Promise((resolve, reject) => {
    axios.put(url, params)
       .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
       });
   }),
 
   delete: (url, params) => new Promise((resolve, reject) => {
     axios.delete(url, params)
       .then((response) => {
         resolve(response.data);
       })
       .catch((error) => {
         reject(error);
       });
   }),
};

export default request