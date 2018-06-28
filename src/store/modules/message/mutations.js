import * as types from './actionTypes'
export default{
  [types.HANDEL_CURRENTPAGE](state, value) {
    state.currentPage = value
  },
  [types.HANDEL_TYPES](state, value) {
    state.types = value
  }
}
