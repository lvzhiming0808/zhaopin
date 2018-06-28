import fetch from '../../utils/fetch'
export const getConcat = (options) => { // 简历搜索的详情页面
  return fetch({
    url: '/search/contact',
    method: 'get',
    data: options
  })
}

export const instertingResume = (options) => { // 感兴趣
  return fetch({
    url: '/resume/interested',
    method: 'post',
    data: options
  })
}
