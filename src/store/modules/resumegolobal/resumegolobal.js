export const OPTIONWORKLENGTH = [
  { label: '经验不限', keys: 40001 },
  { label: '1年以下', keys: 40002 },
  { label: '1-3年', keys: 40003 },
  { label: '3-5年', keys: 40004 },
  { label: '5-10年', keys: 40005 },
  { label: '10年以上', keys: 40006 }
]
export const DEGREES = [
  { label: '不限', keys: 50001 },
  { label: '中专', keys: 50002 },
  { label: '高中', keys: 50003 },
  { label: '大专', keys: 50004 },
  { label: '本科', keys: 50005 },
  { label: '硕士', keys: 50006 },
  { label: '博士', keys: 50007 }
]
export const TALENTCLASS = [
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
export const TALENTPOOLS = [
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
export const TALENTRESON = [
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
export const EXPEACTPLACES = [{
  // 人才分类
  keys: '武汉',
  label: '武汉'
},
{
  keys: '北京',
  label: '北京'
}]
export const DEGREESFORSEARCH = [
  { label: '不限', keys: 50001 },
  { label: '中专', keys: 50002 },
  { label: '高中', keys: 50003 },
  { label: '大专', keys: 50004 },
  { label: '本科', keys: 50005 },
  { label: '硕士', keys: 50006 },
  { label: '博士', keys: 50007 }
]
export const CURRENTSTATE = [
  { label: '不限', keys: 220000 },
  { label: '在职-暂不考虑', keys: 220001 },
  { label: '在职-考虑机会', keys: 220002 },
  { label: '在职-一个月内到岗', keys: 220003 },
  { label: '离职', keys: 220004 }
]
export const UPDATEDATE = [
  { id: 1, label: '不限', keys: 80000 },
  { id: 2, label: '三天', keys: new Date(new Date() - 24 * 60 * 60 * 1000 * 3).getFullYear() + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 3).getMonth() + 1) + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 3).getDate()) },
  { id: 3, label: '一周', keys: new Date(new Date() - 24 * 60 * 60 * 1000 * 7).getFullYear() + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 7).getMonth() + 1) + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 7).getDate()) },
  { id: 4, label: '两周', keys: new Date(new Date() - 24 * 60 * 60 * 1000 * 14).getFullYear() + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 14).getMonth() + 1) + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 14).getDate()) },
  { id: 5, label: '一个月', keys: new Date(new Date() - 24 * 60 * 60 * 1000 * 30).getFullYear() + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 30).getMonth() + 1) + '/' +
    (new Date(new Date() - 24 * 60 * 60 * 1000 * 30).getDate()) }
]
export const SEXLIST = [
  {
    value: '70000',
    label: '不限'
  },
  {
    value: '70001',
    label: '男'
  }, {
    value: '70002',
    label: '女'
  }]
export const SROUCE = [
  { value: 10001, label: '10001', checked: true },
  { value: 10002, label: '10002', checked: true },
  { value: 10003, label: '10003', checked: true },
  { value: 10004, label: '10004', checked: true },
  { value: 10005, label: '10005', checked: true },
  // { value: 10006, label: '10006', checked: true },
  { value: 10007, label: '10007', checked: true }
]
export const PUBLISHSTATES = [
  {
    // 入库原因
    value: 130001,
    label: '已下线'
  },
  {
    value: 130002,
    label: '发布中'
  },
  {
    value: 130003,
    label: '已到期'
  }
]
export const PUBLISHWAYS = [
  { value: 10001,
    label: '智联招聘'
  },
  {
    value: 10005,
    label: '前程无忧'
  },
  {
    value: 10004,
    label: 'Boss直聘'
  },
  {
    value: 10006,
    label: '拉勾网'
  },
  {
    value: 10003,
    label: '猎聘网'
  },
  {
    value: 10002,
    label: '58同城'
  }
]
export const SALARYPERIODS = [
  {
    // 入库原因
    value: 30001,
    label: '1-2k'
  }, {
    // 入库原因
    value: 30002,
    label: '2-4k'
  }, {
    // 入库原因
    value: 30003,
    label: '4-6k'
  }, {
    // 入库原因
    value: 30004,
    label: '6-8k'
  }, {
    // 入库原因
    value: 30005,
    label: '8-10k'
  }, {
    // 入库原因
    value: 30006,
    label: '10-15k'
  }, {
    // 入库原因
    value: 30007,
    label: '15-20k'
  }, {
    // 入库原因
    value: 30008,
    label: '20-30k'
  }, {
    // 入库原因
    value: 30009,
    label: '30-50k'
  }, {
    // 入库原因
    value: 30010,
    label: '50-70k'
  }, {
    // 入库原因
    value: 30011,
    label: '70-100k'
  }
]

