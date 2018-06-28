export const callValueForm_map = {
  '240002': 'refuseReason',
  '240003': 'nextDialTime',
  '240004': 'disConnectReason'
}
export const callValueForm = {
  '240002': '', //  拨打记录、拒绝面试
  '240003': '', //  拨打记录、再联系
  '240004': '' //  拨打记录、未接通
}
export const callmessage_map = {
  '240001': '确认面试',
  '240002': '拒绝面试',
  '240003': '再联系',
  '240004': '未接通'
}
export const calloptions = [  //  拒绝面试
  ['距离太远', '距离太远'],
  ['已确定工作计划', '已确定工作计划'],
  ['薪资太低', '薪资太低'],
  ['职业规划', '职业规划'],
  ['其它', '其它']
]
export const calloptions2 = [ //  未接通
  ['对方未接', '对方未接'],
  ['关机', '关机'],
  ['对方拒接', '对方拒接'],
  ['空号', '空号'],
  ['不在服务区', '不在服务区']
]
export const interviewConst = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五'
}
export const interviewStatu = {
  0: '面试中',
  1: '通过',
  2: '不通过'
}
export const interviewStatuType = {
  0: 'warning',
  1: 'success',
  2: 'info'
}
export const options2 = [
  {
  // 人才分类
    value: 150001,
    label: '一般人才'
  },
  {
    value: 150002,
    label: '高级人才'
  }
]
export const options3 = [
  {
  // 人才库类型
    value: 160001,
    label: '人才储备'
  }
  // {
  //   value: 160002,
  //   label: '已淘汰'
  // },
  // {
  //   value: 160003,
  //   label: '黑名单'
  // }
]
export const options4 = [
  {
  // 入库原因
    value: 170001,
    label: '综合条件不匹配'
  },
  {
    value: 170002,
    label: '薪酬不匹配'
  },
  {
    value: 170003,
    label: '候选人放弃'
  },
  {
    value: 170004,
    label: '职位已下架'
  },
  {
    value: 170005,
    label: '无法联系'
  },
  {
    value: 170006,
    label: '材料不充足'
  },
  {
    value: 170007,
    label: '人员储备'
  },
  {
    value: 170008,
    label: '背景不匹配'
  },
  {
    value: 170009,
    label: '其他'
  }
]

