import actions from './actions'
import mutations from './mutations'
export default {
  namespaced: true,
  state: {
    addressDetail: '',
    workPlace: '',
    publicPlace: [],
    workNature: '',
    positioNname: '',
    education: '',
    workYear: '',
    peopleNumber: '',
    salary: '',
    FeedbackTime: '',
    companynature: '',
    textarea1: '',
    textarea2: '',
    datas: '',
    sameTime: '1',
    dynamicTags1: [],
    dynamicTags: [],
    Professional: '',
    lightOpt: [],
    checkListChannel: []
  },
  actions,
  mutations
}
