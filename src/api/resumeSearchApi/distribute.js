import fetch from '../../../src/utils/fetch'
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
export const channelCount = (options) => { // 搜索列表数字
  return fetch({
    url: 'search/channelCount',
    method: 'post',
    data: options
  })
}
export const channelData = (options) => { // 搜索列表
  return fetch({
    url: 'search/channelData',
    method: 'post',
    data: options
  })
}
