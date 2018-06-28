
const state = {
  publishState: '', // 简历当前的状态，为在线，不在线
  RefJobMessage: '',
  RefpublishPlace: '',
  Refjobdirection: '',
  RefendTime: '',
  RefpublishChannel: '',
  Refdept: '',
  Refdepty_validate: false,
  RefJobMessageOnly_validate: false,
  RefpublishChannelOnly_validate: false,
  RefRefpublishPlaceOnly_validate: false,
  isRefJobMessage: false, //  验证jobmessage的表单有没全部填写
  Professional: false,
  jobStern: false,
  IsSameTime: false,
  IsinterviewData: false,
  interviewData: [] //  记录change的数据
}

const mutations = {
  set_publishState(state, val) {
    state.publishState = val
    // console.log('Vuex_publishState', state.publishState)
  },
  set_RefJobMessage(state, val) { //  获取dom对象
    state.RefJobMessage = val
    // console.log(state.RefJobMessage)
  },
  set_RefpublishPlace(state, val) { //  获取dom对象
    state.RefpublishPlace = val
    // console.log(state.RefJobMessage)
  },
  set_RefdeptId(state, val) { //  获取dom对象
    state.Refdept = val
    // console.log(state.RefJobMessage)
  },
  set_Refjobdirection(state, val) { //  获取dom对象
    state.Refjobdirection = val
    // console.log(state.RefJobMessage)
  },
  set_RefendTime(state, val) { //  获取dom对象
    state.RefendTime = val
    // console.log(state.RefJobMessage)
  },
  set_RefpublishChannel(state, val) { //  获取dom对象
    state.RefpublishChannel = val
    // console.log(state.RefJobMessage)
  },
  set_RefJobMessage_validate(state) {
    // state.RefJobMessage.validate((valid) => {
      // console.log('valid', valid)
      // if (valid) {
      //   state.isRefJobMessage = true
      // } else {
      //   state.isRefJobMessage = false
      // }
    // })
    // state.RefpublishPlace.validate((valid) => {})
    state.Refjobdirection.validate((valid) => {})
    state.RefendTime.validate((valid) => {})
    // state.RefpublishChannel.validate((valid) => {})
  },
  set_RefJobMessageOnly_validate(state) { // 这里是进行单个验证
    state.RefJobMessage.validate((valid) => {
      // console.log('这里是进行单个验证', valid)
      if (valid) {
        state.RefJobMessageOnly_validate = true
      } else {
        state.RefJobMessageOnly_validate = false
      }
    })
  },
  set_RefpublishChannelOnly_validate(state) { // 这里是进行单个验证
    state.RefpublishChannel.validate((valid) => {
      // console.log('这里是进行单个验证', valid)
      if (valid) {
        state.RefpublishChannelOnly_validate = true
      } else {
        state.RefpublishChannelOnly_validate = false
      }
    })
  },
  set_RefRefpublishPlaceOnly_validate(state) { // 这里是进行单个验证
    state.RefpublishPlace.validate((valid) => {
      console.log('这里是进行单个验证', valid)
      if (valid) {
        state.RefRefpublishPlaceOnly_validate = true
      } else {
        state.RefRefpublishPlaceOnly_validate = false
      }
    })
  },
  set_RefRefdeptIdOnly_validate(state) { // 这里是进行单个验证
    state.Refdept.validate((valid) => {
      if (valid) {
        state.Refdepty_validate = true
      } else {
        state.Refdepty_validate = false
      }
    })
  },

  set_Professional_true(state) {
    state.Professional = true
  },
  set_Professional_false(state) {
    state.Professional = false
  },
  set_jobStern_true(state) {
    state.jobStern = true
  },
  set_jobStern_false(state) {
    state.jobStern = false
  },
  set_IsSameTime(state, val) {
    console.log(val, typeof val)
    if (val === '1') {
      state.IsSameTime = false
    } else {
      state.IsSameTime = true
    }
  },
  set_interviewData(state, val) {
    state.interviewData = val
  },
  set_IsinterviewData_false(state, val) {
    state.IsinterviewData = false
  },
  set_IsinterviewData(state, val) {
    for (var k of state.interviewData) {
      if (k) {
        state.IsinterviewData = false
      } else {
        state.IsinterviewData = true
        return
      }
    }
  }
}

const actions = {
  set_publishState({ commit }) {
    commit('set_jonMessage')
  }
}

export default {
  state,
  mutations,
  actions
}
