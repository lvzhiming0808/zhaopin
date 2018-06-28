import fetch from '@/utils/fetch'

// 登陆接口
export const login = data => fetch({
  url: '/user/login',
  method: 'post',
  isLogin: true,
  data
})

// 获取角色信息
export const getInfo = () => fetch('/users/me')

// /左侧列表
export const loginUserInfo = data => fetch({
  url: '/userManage/loginUserInfo',
  method: 'get',
  data
})

// 快捷登录状态轮询
export const channelLogin = data => fetch({
  url: '/channel/channelLoginStatus',
  method: 'get',
  data
})

// 点击渠道
export const AccountLogin = data => fetch({
  url: '/channel/channelAccountLogin',
  method: 'post',
  data
})

// 获取账号登录结果
export const AccountLoginResult = (platId, accont) => fetch({
  url: `/channel/channelAccountLoginResult?platId=${platId}&account=${accont}`,
  method: 'get'
})

// 发送验证码
export const sendAuthCode = (platId, accont, phone) => fetch({
  url: `/channel/sendChannelMessageAuthCode?platId=${platId}&account=${accont}&mobile=${phone}`,
  method: 'post'
})

// 获取发送验证码的结果
export const AuthCodeResult = (platId, phone) => fetch({
  url: `/channel/getChannelMessageAuthCodeResult?platId=${platId}&mobile=${phone}`,
  method: 'get'
})
