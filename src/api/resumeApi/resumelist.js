import fetch from '../../utils/fetch'
export const resumeList = (data) => { // 简历列表
  return fetch({
    url: '/resume/filter',
    method: 'post',
    data
  })
}
// import fetch from '../../utils/fetch'
export const allotlist = (options) => { // 获取分配列表
  return fetch({
    url: '/userManage/userList',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const details = (data) => { // 简历详情
  return fetch({
    url: '/resume/detail',
    method: 'get',
    data
  })
}
export const detailinterviewr = (data) => { // 面试官的简历详情
  return fetch({
    url: '/resume/detailInterviewer',
    method: 'get',
    data
  })
}
export const allotTo = (options) => { // 分配给谁
  return fetch({
    url: 'resume/distribute',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const move = (options) => { // 移入阶段的操作
  return fetch({
    url: 'resume/move',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const giveUp = (options) => { // 简历放弃的操作
  return fetch({
    url: 'resume/abandon',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const queryAbandon = (options) => { // 应聘岗位
  return fetch({
    url: '/resume/queryAbandon',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const resumeSearch = (options) => { // 简历搜索
  return fetch({
    url: 'search/list',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const talentTurn = (options) => { // 简历调转
  return fetch({
    url: 'talent/turn',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const interviewSend = (options) => { // 面试通知
  return fetch({
    url: 'interview/send',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const offerSend = (options) => { // 面试通知
  return fetch({
    url: 'offer/send',
    method: 'post',
    isJson: true,
    data: options
  })
}
export const numList = (data) => { // 简历数量
  return fetch({
    url: '/resume/num',
    method: 'post',
    data
  })
}
// import fetch from '../utils/fetch'
export const evaluate = (options) => { // 评价提交
  return fetch({
    url: '/resume/evaluate',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const score = (data) => { // 获取简历评价和操作记录
  return fetch({
    url: 'resume/record',
    method: 'get',
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
export const preservation = (data) => { // 上传后编辑保存
  return fetch({
    url: '/resume/file/save',
    method: 'post',
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

export const dialRecords = (data) => { // 拨打记录列表
  return fetch({
    url: '/resume/dialRecords',
    method: 'post',
    data
  })
}
export const insertDialRecord = (data) => { // 保存拨打记录
  return fetch({
    isJson: 'true',
    url: '/resume/insertDialRecord',
    method: 'post',
    data
  })
}
export const interviewRecords = (data) => { // 简历搜索的详情页面
  return fetch({
    url: 'resume/interviewRecords',
    method: 'post',
    data
  })
}
export const insertInterviewTurn = (data) => { // 添加面试
  return fetch({
    isJson: 'true',
    url: 'resume/insertInterviewTurn',
    method: 'post',
    data
  })
}
export const finishInterview = (data) => { // 结束面试
  return fetch({
    url: 'resume/finishInterview',
    method: 'post',
    data
  })
}
export const deleInterviewTurn = (data) => { // 删除面试
  return fetch({
    url: 'resume/deleInterviewTurn',
    method: 'post',
    data
  })
}
export const saveInterviewTurn = (data) => { // 反馈
  return fetch({
    isJson: 'true',
    url: 'resume/saveInterviewTurn',
    method: 'post',
    data
  })
}
export const relevanceJob = (options) => { // 简历搜索的详情页面
  return fetch({
    url: 'resume/relevanceJob',
    method: 'post',
    params: {
      ...options
    }
  })
}

export const sysUsers = (data) => { // 简历管理分配列表
  return fetch({
    url: '/sys/user/sysUsers',
    method: 'get',
    data
  })
}
