import * as types from './actionTypes'
export default {
  [types.HANDLE_ADDRDETAIL](state, value) {
    state.addressDetail = value
  },
  [types.SELECT_WORKPLACE](state, value) {
    state.workPlace = value
  },
  [types.CHECKBOX_PUBlISHPLACE](state, value) {
    state.publicPlace = value
  },
  [types.SELECT_WORKNATURE](state, value) {
    state.workNature = value
  },
  [types.HANDLE_WORKNAME](state, value) {
    state.positioNname = value
  },
  [types.SELECT_MINEDUCATION](state, value) {
    state.education = value
  },
  [types.SELECT_WORKYEAR](state, value) {
    state.workYear = value
  },
  [types.HANDLE_PEOPLENUMBER](state, value) {
    state.peopleNumber = value
  },
  [types.SELECT_SAlARY](state, value) {
    state.salary = value
  },
  [types.HANDLE_TIME](state, value) {
    state.FeedbackTime = value
  },
  [types.SELECT_COMPANYNATURE](state, value) {
    state.companynature = value
  },
  [types.HANDLE_WORKDUTY](state, value) {
    state.textarea1 = value
  },
  [types.HANDLE_WORKNEED](state, value) {
    state.textarea2 = value
  },
  [types.HANDLE_ENDTIME](state, value) {
    state.datas = value
  },
  [types.handle_Professional](state, value) {
    state.Professional = value
  },
  [types.handle_dynamicTags1](state, value) {
    state.dynamicTags1 = value
  },
  [types.HANDLE_LIGHTS](state, value) {
    state.lightOpt = value
  },
  [types.HANDLE_PUBLISHCHANNEL](state, value) {
    state.checkListChannel = value
  },
  [types.SET_SAMETIME](state, value) {
    state.sameTime = value
  },
  [types.UPDATE_DYNAMICTAGS](state, value) {
    state.dynamicTags.push(value)
  }
}
