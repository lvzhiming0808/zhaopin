import axios from 'axios'
import qs from 'qs'
import { getAuth, getAuthKey } from '@/utils/auth'
import router from '@/router'
import { Message } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  // 配置默认路径
  baseURL: process.env.baseURL,
  // 设置请求超时的时间
  timeout: 80000
})
// request 拦截器
service.interceptors.request.use(config => {
  if (config.isJson) {
    // 判断请求头 并设置请求头
    config.headers['Content-Type'] = 'application/json'
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  if (config.isLogin) {
    // 看这个数据是不是登陆页面
    config.data = qs.stringify(config.data)
  } else {
    // 判断请求方式 设置不同的数据
    if (config.method.toLowerCase() === 'post') {
      // 如果是 post 请求, 且数据类型为 urlencoded 需要用 qs 序列化
      if (!config.isJson) {
        config.data = qs.stringify(config.data)
      }
    } else {
      // 如果是 get 请求把请求数据放到 params 上
      // ps: 如果后期添加其他请求类型, 这个位置还要更新
      config.params = config.data
    }
  }
  if (getAuth()) {
    config.headers.Authorization = getAuth()
    config.headers['token-type'] = getAuthKey()
  }
  return config
}, err => {
  Promise.reject(err)
})

// response 拦截器
service.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === -1) {
      Message.error(data.message)
    }
    if (data.code === 403) {
      if (router.history.current.path === '/interviewer') {
        router.push('/timeout')
      } else {
        Message.error('登录超时，请重新登录')
        router.push('login')
      }
    }
    return data
  },
  err => {
    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
export const download = url => {
  window.open(`${process.env.baseURL}${url}`)
}
export default service
export const downloadall = url => {
  window.open(`${process.env.baseURL}${url}`)
}
