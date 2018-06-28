import fetch from '../utils/fetch'
export const score = (data) => { // 获取简历列表
  return fetch({
    url: 'resume/record',
    method: 'get',
    data
  })
}
export const searchDetail = (options) => { // 简历搜索的详情页面
  return fetch({
    url: 'search/detail',
    method: 'get',
    data: options
  })
}
export const interviewRecords = (options) => { // 简历搜索的详情页面
  return fetch({
    url: 'resume/interviewRecords',
    method: 'post',
    data: options
  })
}
export const relevanceJob = (options) => { // 简历搜索的详情页面
  return fetch({
    url: 'resume/relevanceJob',
    method: 'post',
    data: options
  })
}
