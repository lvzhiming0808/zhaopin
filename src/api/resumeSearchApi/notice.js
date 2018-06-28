import fetch from '../../utils/fetch'
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
export const listWithPublishName = (data) => { // 获取职位列表
  return fetch({
    url: '/job/listWithPublishName',
    method: 'get',
    data
  })
}
export const getInterviewCountsById = (data) => { // 获取职位列表
  return fetch({
    url: '/job/getInterviewCountsById',
    method: 'get',
    data
  })
}
