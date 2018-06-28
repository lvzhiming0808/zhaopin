import fetch from '../../utils/fetch'
export const searchDetail = (options) => { // 简历搜索的详情页面
  return fetch({
    url: 'search/detail',
    method: 'get',
    data: options
  })
}

export const download = (options) => { // 简历搜索的详情页面下载简历
  return fetch({
    url: 'resume/resumeDownload',
    method: 'get',
    data: options
  })
}

