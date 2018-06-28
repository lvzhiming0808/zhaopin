import * as types from './actionTypes'

export default {
  [types.HANDEL_PUBLISHLIST](state, value) {
    state.publishList = value
  },
  [types.HANDEL_DEPARTMENT](state, value) {
    state.SubordinateDepartment = value
  },
  [types.HANDEL_RESUME](state, value) {
    state.sameTime = value
  },
  [types.HANDEL_PUBLISHCHANNEL](state, value) {
    state.publishWay = value
  },
  [types.HANDEL_DEPTID](state, value) {
    state.deptId = value
  },
  [types.HANDEL_ISPERSONAL](state, value) {
    state.isPersonal = value
  },
  [types.SEARCH_WORK](state, value) {
    state.searchWork = value
  },
  [types.PAGE_NUMBER](state, value) {
    state.currentPage1 = value
  },
  [types.SAVE_DYNAMICTAGS](state, value) {
    state.dynamicTags = value
  }

}
