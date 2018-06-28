import actions from './actions'
import mutations from './mutations'
import getters from './getters'
export default {
  namespaced: true,
  state: {
    searchobj: {
      keyword: '',
      ageMin: '',
      ageMax: '',
      sex: '70000',
      workLengthMin: '',
      workLengthMax: '',
      degree: 50001,
      currentState: 220000,
      updateDate: 80000,
      expectPlace: ['不限'],
      resideAddress: ['不限'],
      salaryMax: '',
      salaryMin: '',
      isBrandCompany: '200001',
      isBrandUniversity: '',
      platId: ''
    },
    activeName: '10001',
    pages: {
      currentPage: 1,
      totles: 0
    }

  },
  actions,
  mutations,
  getters
}
