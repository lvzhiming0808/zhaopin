import actions from './actions'
import mutations from './mutations'
import getters from './getters'
export default {
  namespaced: true,
  getters,
  state: {
    classfic: 190007,
    matching: 'ALL',
    ajaxdata: {
      page: 1,
      size: 20,
      resumeState: '',
      inWay: 190007,
      matchEnums: ''
    }
  },
  actions,
  mutations
}

