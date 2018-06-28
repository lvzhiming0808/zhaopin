import actions from './actions'
import mutations from './mutations'
import getters from './getters'
export default {
  namespaced: true,
  getters,
  state: {
    publishList: [],
    SubordinateDepartment: [],
    sameTime: '1',
    publishWay: '',
    deptId: [],
    isPersonal: '0001',
    searchWork: '',
    currentPage1: 1,
    dynamicTags: []
  },
  actions,
  mutations
}

