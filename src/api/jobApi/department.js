import fetch from '../../utils/fetch'
export const departmentlist = (date) => { // 获取部门组织结构
  return fetch({
    url: '/job/deptlist',
    method: 'get',
    date
  })
}
export const deptall = (data) => { // 获取部门数据id对应表
  return fetch({
    url: '/job/deptlistAll',
    method: 'get',
    data
  })
}
