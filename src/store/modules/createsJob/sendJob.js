
const state = {
  allJobCreatMessage: '', // 全部原始数据
  nowMessage: {}, //  当前页面的信息
  jonMessage: '', //  obj的简历信息
  endTime: '',
  jobdirection: '',
  jobLifhts: '',
  publishChannel: '',
  publishPlace: '',
  openMounths: ''
}

const mutations = {
  set_allJobCreatMessage(state, val) {
    state.allJobCreatMessage = val
  },
  set_jonMessage(state, val) {
    state.jonMessage = val
  },
  set_nowMessage(state, val) {
    state.nowMessage.id = val
  },
  set_nowMessage_publishUserId(state, val) {
    state.nowMessage.publishUserId = val
  },
  set_openmounth(state, val) {
    state.openMounths = val
  },
  set_nowMessageId(state, val) {
    state.nowMessage = {}
  },
  set_endTime(state, val) {
    state.endTime = val
  },
  set_jobdirection(state, val) {
    state.jobdirection = val
  },
  set_jobLifhts(state, val) {
    state.jobLifhts = val
  },
  set_publishChannel(state, val) {
    state.publishChannel = val
  },
  set_publishPlace(state, val) {
    state.publishPlace = val
  },

  mixMessage(state) { //  取回数据，然后进行mix混合
    var el = arguments
    for (var key in el[0]) {
      key
      if (key !== 'allJobCreatMessage') {
        for (var k in el[0][key]) {
          k
          if (k !== 'checkModel' && k !== 'jobPropertyId_model' && k !== 'deptId_model' && k !== 'checkListChannel' && k !== 'deptIds' && k !== 'deptName') {
            el[0].nowMessage[k] = el[0][key][k]
          }
        }
      }
    }
  }
}

const actions = {
  set_jonMessage({ commit }) {
    commit('set_jonMessage')
  },
  set_endTime({ commit }) {
    commit('set_endTime')
  },
  set_jobdirection({ commit }) {
    commit('set_jobdirection')
  },
  set_jobLifhts({ commit }) {
    commit('set_jobLifhts')
  },
  set_publishChannel({ commit }) {
    commit('set_publishChannel')
  },
  set_publishPlace({ commit }) {
    commit('set_publishPlace')
  },
  set_openmounth({ commit }) {
    commit('set_openmounth')
  }

}

export default {
  state,
  mutations,
  actions
}
