import fetch from '../../utils/fetch'
export const FamousCompany = (options) => { // 名企
  return fetch({
    url: '/famousStore/EnterpriceList',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const FamousSchool = (options) => { // 名校
  return fetch({
    url: '/famousStore/UniversityList',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const dictionarylist = (options) => { // 常量表
  return fetch({
    url: '/dictionary/list',
    method: 'get',
    params: {
      ...options
    }
  })
}
// 127.0.0.1:8080/zhaopinsys/dictionary/list
export const addEnterprice = (options) => { // 添加名企
  return fetch({
    url: '/famousStore/addEnterprice',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const deleEnterprice = (options) => { // 删除名企
  return fetch({
    url: '/famousStore/deleEnterprice',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const resource = (options) => { // 获取角色权限列表
  return fetch({
    url: '/resource/list',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const editRole = (options) => { // 修改角色
  return fetch({
    url: '/userManage/edit',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const forbidden = (options) => { // 禁用角色
  return fetch({
    url: '/userManage/forbidden',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const del = (options) => { // 删除角色
  return fetch({
    url: '/userManage/dele',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const adduser = (options) => { // 添加角色
  return fetch({
    url: '/userManage/save',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const userpowerlist = (options) => { // 用户列表
  return fetch({
    url: '/resource/list',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const inviteAccount = (options) => { // 渠道列表获取
  return fetch({
    url: '/inviteAccount/list',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const iterviwetmp = (options) => { // 获取简历列表
  return fetch({
    url: '/template/IterViewList',
    method: 'post',
    params: {
      ...options
    }
  })
}

export const getuserlist = (options) => { // 获取用户
  return fetch({
    url: '/userManage/list',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const getadduserlist = (options) => { // 获取用户用户列表
  return fetch({
    url: '/userManage/employeeList',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const delaccount = (options) => { // 删除渠道
  return fetch({
    url: '/inviteAccount/dele',
    method: 'post',
    params: {
      ...options
    }
  })
}
export const addIterView = (data) => { // 新增面试模板
  return fetch({
    url: '/template/addIterView',
    method: 'post',
    data
  })
}
export const deleIterView = (data) => { // 删除面试模板
  return fetch({
    url: '/template/deleIterView',
    method: 'post',
    data
  })
}
export const defaultIterView = (data) => { // 设置默认简历模板
  return fetch({
    url: '/template/defaultIterView',
    method: 'post',
    data
  })
}
export const OfferList = (data) => { // 获取offer模板列表
  return fetch({
    url: '/template/OfferList',
    method: 'post',
    data
  })
}
export const edittmp = (data) => { // 获取面试邀请模板表
  return fetch({
    url: '/template/editToInterview',
    method: 'get',
    data
  })
}
export const editTmpsave = (data) => { // 保存修改模板
  return fetch({
    url: '/template/editIterView',
    method: 'post',
    data
  })
}
export const editOffer = (data) => { // 编辑offer模板
  return fetch({
    url: '/template/editToOffer',
    method: 'get',
    data
  })
}
export const SetDefaultoffer = (data) => { // 设置offer默认模板
  return fetch({
    url: '/template/defaultOffer',
    method: 'post',
    data
  })
}
export const deleOffer = (data) => { // 删除offer模板
  return fetch({
    url: '/template/deleOffer',
    method: 'post',
    data
  })
}
export const editSaveOffer = (data) => { // 删除offer模板
  return fetch({
    url: '/template/editOffer',
    method: 'post',
    data
  })
}
export const addOffer = (data) => { // 增加offer模板
  return fetch({
    url: '/template/addOffer',
    method: 'post',
    data
  })
}

export const otherSetting = (data) => { // 其他的请求数据
  return fetch({
    url: '/otherSetting/list',
    method: 'post',
    data
  })
}

export const otherSendEdit = (data) => { // 其他的编辑数据
  return fetch({
    url: '/otherSetting/edit',
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

export const channellist = (data) => { // 渠道列表
  return fetch({
    url: '/channel/list',
    method: 'get',
    data
  })
}

export const channelLogList = (data) => { // 用户操作列表
  return fetch({
    url: '/channel/channelLogList',
    method: 'get',
    data
  })
}

export const channeselect = (data) => { // 用户操作列表
  return fetch({
    url: '/inviteAccount/channellist',
    method: 'get',
    data
  })
}

export const baseUsers = (data) => { // 添加用户选择用户列表
  return fetch({
    url: '/user/baseUsers',
    method: 'get',
    data
  })
}

export const addChannelUser = (data) => { // 确定添加用户选择用户
  return fetch({
    url: '/channel/addChannelUser',
    method: 'post',
    data
  })
}

export const deleteuseer = (data) => { // 删除
  return fetch({
    url: '/channel/delete',
    method: 'get',
    data
  })
}

export const organizationTrees = (data) => { // 账号管理左侧列表
  return fetch({
    url: '/sys/organization/organizationTrees',
    method: 'get',
    data
  })
}

export const organizationDetails = (data) => { // 账号管理部门详情
  return fetch({
    url: '/sys/organization/organizationDetails',
    method: 'get',
    data
  })
}

export const addOrganization = (data) => { // 账号管理添加部门
  return fetch({
    url: '/sys/organization/addOrganization',
    method: 'post',
    data
  })
}

export const addLoginUser = (data) => { // 账号管理添加用户或者主管
  return fetch({
    url: '/sys/user/addLoginUser',
    method: 'post',
    data
  })
}

export const delOrganization = (data) => { // 账号管理删除部门
  return fetch({
    url: '/sys/organization/delOrganization',
    method: 'post',
    data
  })
}

export const delLoginUser = (data) => { // 账号管理删除用户
  return fetch({
    url: '/sys/user/delLoginUser',
    method: 'post',
    data
  })
}

export const OrgOrHrList = (data) => { // 获取添加主管或者hr的组织结构
  return fetch({
    url: 'user/listTree',
    method: 'get',
    data
  })
}

export const addnewchannel = (data) => { // 添加渠道
  return fetch({
    url: 'channel/addChannel',
    method: 'post',
    data
  })
}

export const addResult = (data, acc) => { // 添加渠道的结果
  return fetch({
    url: `channel/getAddChannelResult?platId=${data}&account=${acc}`,
    method: 'get'
  })
}

export const sendoutNum = (data, acc, mob) => { // 发送验证码
  return fetch({
    url: `channel/sendChannelMessageAuthCode?platId=${data}&account=${acc}&mobile=${mob}`,
    method: 'post',
    data
  })
}

export const senResult = (data, mob) => { // 获取发送验证码结果
  return fetch({
    url: `channel/getChannelMessageAuthCodeResult?platId=${data}&mobile=${mob}`,
    method: 'get',
    data
  })
}
