import * as types from './actionTypes'
import { newNeed } from '../../../api/jobApi/newCreat'
import { jobList } from '../../../api/jobApi/jobIndex'
export default {
    // 更改地址详情
  [types.HANDLE_ADDRDETAIL]({ commit }, value) {
    commit(types.HANDLE_ADDRDETAIL, value)
  },
  // 工作地点
  [types.SELECT_WORKPLACE]({ commit }, value) {
    commit(types.SELECT_WORKPLACE, value)
  },
  // 发布地点
  [types.CHECKBOX_PUBlISHPLACE]({ commit }, value) {
    commit(types.CHECKBOX_PUBlISHPLACE, value)
  },
  // 工作性质
  [types.SELECT_WORKNATURE]({ commit }, value) {
    commit(types.SELECT_WORKNATURE, value)
  },
  // 职位名称
  [types.HANDLE_WORKNAME]({ commit }, value) {
    commit(types.HANDLE_WORKNAME, value)
  },
  // 最低学历
  [types.SELECT_MINEDUCATION]({ commit }, value) {
    commit(types.SELECT_MINEDUCATION, value)
  },
  // 工作年限
  [types.SELECT_WORKYEAR]({ commit }, value) {
    commit(types.SELECT_WORKYEAR, value)
  },
  // 招聘人数
  [types.HANDLE_PEOPLENUMBER]({ commit }, value) {
    commit(types.HANDLE_PEOPLENUMBER, value)
  },
  // 薪资
  [types.SELECT_SAlARY]({ commit }, value) {
    commit(types.SELECT_SAlARY, value)
  },
   // 应聘反馈时长
  [types.HANDLE_TIME]({ commit }, value) {
    commit(types.HANDLE_TIME, value)
  },
  // 职能类别
  [types.SELECT_COMPANYNATURE]({ commit }, value) {
    commit(types.SELECT_COMPANYNATURE, value)
  },
  // 职位职责
  [types.HANDLE_WORKDUTY]({ commit }, value) {
    commit(types.HANDLE_WORKDUTY, value)
  },
    // 任职要求
  [types.HANDLE_WORKNEED]({ commit }, value) {
    commit(types.HANDLE_WORKNEED, value)
  },

  // 截止时间
  [types.HANDLE_ENDTIME]({ commit }, value) {
    commit(types.HANDLE_ENDTIME, value)
  },
  // 添加职位标签输入框
  [types.handle_Professional]({ commit }, value) {
    commit(types.handle_Professional, value)
  },
// 添加职位标签
  [types.add_dynamicTags1]({ commit, state, dispatch }, value) {
    const temp = [].concat(state.dynamicTags1)
    temp.push(value)
    commit(types.handle_dynamicTags1, temp)
  },
  // 删除职位标签
  [types.del_dynamicTags1]({ commit, state, dispatch }, value) {
    const temp = [].concat(state.dynamicTags1)
    temp.splice(temp.indexOf(value), 1)
    commit(types.handle_dynamicTags1, temp)
  },
  // 添加亮点
  [types.add_LIGHTS]({ commit, state, dispatch }, value) {
    const temp = [].concat(state.lightOpt)
    temp.push(value)
    commit(types.HANDLE_LIGHTS, temp)
  },
  // 发布渠道
  [types.HANDLE_PUBLISHCHANNEL]({ commit }, value) {
    commit(types.HANDLE_PUBLISHCHANNEL, value)
  },
  [types.HANDLE_CANCEL]({ state }) {
    window.location.reload()
  },
  // 提交
  [types.HANDLE_SUBMIT]({ state }) {
    var date = state.datas
    if (date) {
      var year = date.getFullYear()
      var mon = date.getMonth()
      var day = date.getDate()
      var strs = year + '-' + (mon + 1) + '-' + day
    } else {
      date = ''
    }
    console.log(strs)
    // var arr = [state.education, state.workYear,state.salary,]
    if (
       state.education === '' || state.workYear === '' ||
       state.salary === '' || state.companynature === '' ||
       state.publicPlace === [] || state.workPlace === '' ||
       state.checkListChannel === [] || state.workNature === '' ||
       state.positioNname === '' || state.peopleNumber === '' ||
       state.FeedbackTime === '' || state.addressDetail === '' ||
       state.textarea1 === '' || state.textarea2 === '' ||
       state.dynamicTags1 === [] || state.lightOpt === []) {
      return false
    } else {
      var text1 = state.textarea1.split('\n')
      var text2 = state.textarea2.split('\n')
      newNeed({
        jobPropertyId: state.workNature, // 工作性质
        degreeId: state.education, // 最低学历
        jobName: state.positioNname, // 职位名称
        workLength: state.workYear, // 工作年限
        number: state.peopleNumber, // 招聘人数
        feedbackTime: state.FeedbackTime, // 应聘反馈时长
        salaryPeriod: state.salary, // 薪资待遇
        jobCategory: state.companynature, // 职能类别
        deptId: '', // 需求部门
        publishCity: state.publicPlace.toString(), // 发布地点
        workPlace: state.workPlace, // 工作地点
        workSite: state.addressDetail, // 工作地址
        jobDesc: text1.toString(), // 职位职责
        jobDuty: text2.toString(), // 任职要求
        jobLable: state.dynamicTags1.toString(), // 职业标签
        jobStern: state.lightOpt.toString(), // 职位亮点
       // payMonth:state.
      // deadline: strs, // 截止日期
        accptSetting: state.sameTime, // 简历接收方式
        receiveEmail: state.dynamicTags.toString(), // 简历接收邮箱
        // 发布渠道
        publishWay: state.checkListChannel.toString()

      }).then(res => {
        if (res.code === 200) {
          jobList({
            page: 1, // 第几页
            size: 10// 一页多少条
          })
        .then(res => { // 职位管理列表
          this.AllSizes = res.total
          this.joblistText = res.list
        })
        } else {
          alert(res.message)
        }
      })
    }
  }

}
