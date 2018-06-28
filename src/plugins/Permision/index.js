import config from './permissionMap'

export default {
  permission: {},
  install(Vue) {
    const checkRole = identity => this.permission[identity]
    Vue.checkRole = Vue.prototype.$checkRole = checkRole
  },
  updatePermission(identity) {
    this.permission = config[identity]
  }
}
