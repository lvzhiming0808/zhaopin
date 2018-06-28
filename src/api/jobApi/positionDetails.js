import fetch from '../../utils/fetch'

export const saveEdit = (data) => { // 新招聘需求(发布职位)
  return fetch({
    isJson: true,
    url: '/job/saveEdit',
    method: 'post',
    data
  })
}

export const getResumeInfo = (data) => { // 待办
  return fetch({
    url: '/job/getResumeInfo',
    method: 'get',
    data
  })
}

