import * as types from './actionTypes'

export default {
  [types.HANDEL_CLASSFIC](state, value) {
    state.classfic = value
  },
  [types.HANDEL_MATCHING](state, value) {
    state.matching = value
  },
  [types.HANDEL_AJAXDATA](state, value) {
    state.ajaxdata = value
  },
  [types.HANDEL_PAGE](state, value) {
    state.ajaxdata.page = value
  },
  [types.HANDEL_SIZE](state, value) {
    state.ajaxdata.size = value
  },
  [types.HANDEL_RESUMESTATE](state, value) {
    state.ajaxdata.resumeState = value
  },
  [types.HANDEL_INWAY](state, value) {
    state.ajaxdata.inWay = value
  },
  [types.HANDEL_MATCHENUMS](state, value) {
    state.ajaxdata.matchEnums = value
  }
}
