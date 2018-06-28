import fetch from '../../utils/fetch'

export const newNeed = (data) => { // 新招聘需求(发布职位)
  return fetch({
    isJson: true,
    url: '/job/publish',
    method: 'post',
    data
  })
}
export const saveEditLocal = (data) => { // 新招聘需求(发布职位)
  return fetch({
    isJson: true,
    url: 'job/saveEditLocal',
    method: 'post',
    data
  })
}
export const getInterviews = (data) => { // 获取面试
  return fetch({
    url: 'user/listTree',
    method: 'get',
    data
  })
}
export const searchinterview = (data) => { // 搜索面试官
  return fetch({
    url: '/user/list',
    method: 'get',
    data
  })
}

export const publishWay = (data) => { // 新招聘需求发布渠道
  return fetch({
    url: '/inviteAccount/channellist',
    method: 'get',
    data
  })
}
export const getDerpartment = (data) => { // 新招聘需所属部门
  return fetch({
    url: '/job/jobDepartments',
    method: 'get',
    data
  })
}
