import fetch from '../utils/fetch'
export const resumetemplate = (options) => { // 获取简历列表
  return fetch({
    url: '/interview/list',
    method: 'get',
    params: {
      ...options
    }
  })
}
export const offertemplate = (options) => { // 获取offer模板列表
  return fetch({
    url: '/offer/list',
    method: 'get',
    params: {
      ...options
    }
  })
}

