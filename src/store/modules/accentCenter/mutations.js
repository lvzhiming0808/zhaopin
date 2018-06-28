import * as types from './actionTypes'

export default {
  [types.HANDEL_ORGLEFTLIST](state, value) {
    state.orgLeftList = value
  },
  [types.HANDEL_ORGDEATIL](state, value) {
    state.detaliList = value
  }
}
