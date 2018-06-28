import * as types from './actionTypes'
export default {
  [types.HANDEL_SEARCHOBJ](state, value) {
    state.searchobj = value
  },
  [types.HANDEL_KEYWORD](state, value) {
    state.searchobj.keyword = value
  },
  [types.HANDEL_AGEMIN](state, value) {
    state.searchobj.ageMin = value
  },
  [types.HANDEL_AGEMAX](state, value) {
    state.searchobj.ageMax = value
  },
  [types.HANDEL_SEX](state, value) {
    state.searchobj.sex = value
  },
  [types.HANDEL_EXPECTPLACE](state, value) {
    state.searchobj.expectPlace = value
  },
  [types.HANDEL_DEGREE](state, value) {
    state.searchobj.degree = value
  },
  [types.HANDEL_CURRENTSTATE](state, value) {
    state.searchobj.currentState = value
  },
  [types.HANDEL_UPDATEDATE](state, value) {
    state.searchobj.updateDate = value
  },
  [types.HANDEL_RESIDEADDRESS](state, value) {
    state.searchobj.resideAddress = value
  },
  [types.HANDEL_WORKLENGTHMIN](state, value) {
    state.searchobj.workLengthMin = value
  },
  [types.HANDEL_WORKLENGTHMAX](state, value) {
    state.searchobj.workLengthMax = value
  },
  [types.HANDEL_SALARYMIN](state, value) {
    state.searchobj.salaryMin = value
  },
  [types.HANDEL_SALARYMAX](state, value) {
    state.searchobj.salaryMax = value
  },
  [types.CHANGE_CURRENTPAGE](state, value) {
    state.pages.currentPage = value
  },
  [types.HANDEL_ACTIVENAME](state, value) {
    state.activeName = value
  },
  [types.HANDEL_PLATID](state, value) {
    state.searchobj.platId = value
  }
}
