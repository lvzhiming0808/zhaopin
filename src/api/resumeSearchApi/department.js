import fetch from '../../utils/fetch'
export const departmentlist = (date) => { // 获取简历列表
  return fetch({
    url: '/job/deptlist',
    method: 'get',
    date
  })
}
