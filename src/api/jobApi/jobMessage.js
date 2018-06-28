import fetch from '../../utils/fetch'

export const propertylist = (data) => { // 多级架构职能类别
  return fetch({
    url: 'job/propertylist',
    method: 'post',
    data
  })
}
export const deptlist = (data) => { // 部门的组织架构
  return fetch({
    url: 'job/deptlist',
    method: 'get',
    data
  })
}
export const deptlistAll = (data) => { // 部门的组织架构 全部没有归类的部分
  return fetch({
    url: 'department/deptlistAll',
    method: 'get',
    data
  })
}
