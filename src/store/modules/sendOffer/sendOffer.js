
const state = {
  SendInvited: ''    //  存储发送面试邀请
}
const mutations = {
  set_SendInvited(state, val) {
    state.SendInvited = val
    window.localStorage.setItem('userinfo', JSON.stringify(val))
  }
}
export default {
  state,
  mutations
}
