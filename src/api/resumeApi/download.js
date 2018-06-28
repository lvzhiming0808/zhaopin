import fetch, { download, downloadall } from '../../utils/fetch'
export const department = (options) => { // 部门的数据
  return fetch({
    url: '/job/deptlist',
    method: 'post',
    params: {
      ...options
    }
  })
}

export const downloaResume = resumePath => {
  download(`/resume/file/download?resumePath=${resumePath}`)
}
export const downloaResumeFromother = (resumePath, filename) => {
  downloadall(`/resume/download?url=${resumePath}&filename=${filename}`)
}
