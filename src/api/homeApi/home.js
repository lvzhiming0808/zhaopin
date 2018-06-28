import fetch from '../../utils/fetch'
export const getHomeInfo = (data) => { // 获取统计数据
  return fetch({
    url: '/home/getHomeInfo',
    method: 'get',
    data
  })
}
export const getIncidentByDate = (options) => { // 获取本月数据
  return fetch({
    url: '/home/getIncidentByDate',
    method: 'post',
    params: {
      ...options
    }
  })
}

