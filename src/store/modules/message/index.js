import actions from './actions'
import mutations from './mutations'
import getters from './getters'
export default {
  namespaced: true,
  getters,
  state: {
    currentPage: 1,
    types: 0
  },
  actions,
  mutations
}

