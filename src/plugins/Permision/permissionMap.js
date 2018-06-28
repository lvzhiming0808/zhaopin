/**
 * 角色种类: 超级管理员、hrbp、hr
 */
 export default {
   1: {  // 超级管理
     account: true, // 账号中心
     distribution: true   // 分配
   },
   2: {  // hrbp
     account: false, // 账号中心
     distribution: true   // 分配
   },
   3: {    //  hr
    //  LEFT_SIDEBAR: {
    //    home: '主页',
    //    job: '职位管理',
    //    resume: '简历管理',
    //    people: '人才库',
    //    search: '简历搜索'
    //  },
     account: false, // 账号中心
     distribution: false   // 分配
   }
 }
