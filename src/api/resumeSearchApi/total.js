import fetch from '../../utils/fetch'
export const jobList = (data) => { // 简历列表
  return fetch({
    url: '/resume/filter',
    method: 'post',
    data
  })
}
export const numList = (data) => { // 简历数量
  return fetch({
    url: '/resume/num',
    method: 'get',
    data
  })
}
export const distribution = (data) => { // 简历分配
  return fetch({
    url: '/resume/distribute',
    method: 'get',
    data
  })
}
export const giveup = (data) => { // 简历放弃
  return fetch({
    url: '/resume/abandon',
    method: 'post',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    data
  })
}
export const ecommend = (data) => { // 推荐简历
  return fetch({
    url: '/Resume/recommend',
    method: 'post',
    data
  })
}
export const addpeople = (data) => { // 添加推荐人
  return fetch({
    url: '/referral/add',
    method: 'post',
    data
  })
}
export const upload = (data) => { // 简历编辑上传
  return fetch({
    url: '/resume/save',
    method: 'post',
    data
  })
}
export const details = (data) => { // 简历详情
  return fetch({
    url: '/resume/detail',
    method: 'get',
    data
  })
}

export const analysis = (data) => { // 简历上传后的解析
  return fetch({
    url: '/resume/file/analysis',
    method: 'get',
    data
  })
}
export const preservation = (data) => { // 上传后编辑保存
  return fetch({
    url: '/resume/file/save',
    method: 'post',
    data
  })
}
export const detailedting = (data) => { // 简历详情编辑保存
  return fetch({
    url: '/resume/file/save',
    method: 'post',
    data
  })
}

export const position = (data) => { // 人才详情编辑保存
  return fetch({
    url: '/talent/upload/save',
    method: 'post',
    data
  })
}

export const department = (data) => { // 部门的数据
  return fetch({
    url: '/job/deptlist',
    method: 'get',
    data
  })
}

export const joblin = (data) => { // 应聘岗位
  return fetch({
    url: '/job/joblistByDept',
    method: 'post',
    data
  })
}
export const deptall = (data) => { // 获取部门数据id对应表
  return fetch({
    url: '/job/deptlistAll',
    method: 'get',
    data
  })
}
export const magess = (data) => { // 消息列表
  return fetch({
    url: '/notify/list',
    method: 'get',
    data
  })
}
export const magessnum = (data) => { // 消息数量
  return fetch({
    url: '/notify/count',
    method: 'get',
    data
  })
}
export const magessdeleted = (data) => { // 消息删除
  return fetch({
    url: '/notify/remove',
    method: 'post',
    data
  })
}
export const magessdered = (data) => { // 消息设已读
  return fetch({
    url: '/notify/read',
    method: 'post',
    data
  })
}
export const checkQueue = (data) => { // 查询是否存在排队情况
  return fetch({
    url: '/resume/checkQueue',
    method: 'post',
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
export const getinterview = (data) => { // 搜索面试官
  return fetch({
    url: '/employee/list',
    method: 'get',
    data
  })
}
