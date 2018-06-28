import fetch from '../../utils/fetch'

export const jobList = (data) => { // 职位列表
  return fetch({
    url: '/job/list',
    method: 'post',
    data
  })
}

export const Refresh = (data) => { // 刷新
  return fetch({
    url: '/job/refresh',
    method: 'get',
    data
  })
}

export const delet = (data) => { // 删除
  return fetch({
    url: '/job/dele',
    method: 'post',
    data
  })
}

export const outLine = (data) => { // 下线
  return fetch({
    url: '/job/undo',
    method: 'post',
    data
  })
}

export const rePublish = (data) => { // 重新发布
  return fetch({
    url: '/job/rePublish',
    method: 'get',
    data
  })
}

export const detail = (data) => { // 编辑,职位详情
  return fetch({
    url: '/job/detail',
    method: 'get',
    data
  })
}

export const getResumeInfoPre = (data) => { // 招聘百分比
  return fetch({
    url: '/job/getResumeInfoPre',
    method: 'get',
    data
  })
}

export const getJobListCount = (data) => { // 统计总数
  return fetch({
    url: '/job/getJobListCount',
    method: 'post',
    data
  })
}

export const getJobStatus = (data) => { // 左侧列表
  return fetch({
    url: '/job/jobStatus',
    method: 'get',
    data
  })
}

export const deletAll = (data) => { // 渠道包删除
  return fetch({
    url: '/job/confirmdelete',
    method: 'get',
    data
  })
}
export const getChannelOption = (data) => { // 渠道包按钮
  return fetch({
    url: '/job/channeloperateinfo',
    method: 'get',
    data
  })
}
export const goOnLine = (data) => { // 上线
  return fetch({
    url: '/job/online',
    method: 'post',
    data
  })
}
