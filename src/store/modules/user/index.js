import * as types from './actionTypes'
import { setAuth } from '@/utils/auth'
import { login } from '@/api/loginApi/user'
import role from '../../../plugins/Permision'

export default {
  state: {
    loginName: '',
    auth: '',
    roles: [],
    showName: '',
    job: '',
    organization: '',
    showRid: '',
    showCount: ''
  },
  mutations: {
    [types.SET_LOGIN_NAME](state, loginName) {
      state.loginName = loginName
    },
    [types.SET_AUTH](state, auth) {
      state.auth = auth
    },
    [types.SET_ROLES](state, roles) {
      state.roles = roles
    },
    [types.SET_AVATAR](state, avatar) {
      state.avatar = avatar
    },
    [types.SET_JOB](state, job) {
      state.job = job
    },
    [types.SET_BRANCH](state, branch) {
      state.branch = branch
    },
    [types.SET_ORGANIZATION](state, organization) {
      state.organization = organization
    },
    [types.SET_SHOWNAME](state, value) {
      state.showName = value
    },
    [types.SET_SHOWRID](state, roleId) {
      state.showRid = roleId
    },
    [types.SET_SHOWCOUNT](state, loginCount) {
      state.showCount = loginCount
    }
  },
  actions: {
    [types.LOG_IN]({ commit }, userInfo) {
      const {
        email,
				password
      } = userInfo
      return new Promise((resolve, reject) => {
        login({ email, password }).then(response => {
          const { access_token } = response.data
          const { token_type } = response.data
          const {
            userName,
            roleId,
            loginCount
          } = response.data.loginUser
          const {
            userId
          } = response.data.loginUser
          role.updatePermission(roleId)
          setAuth(access_token, token_type, userName, roleId, email, loginCount, userId)
          commit(types.SET_SHOWRID, roleId)
          commit(types.SET_SHOWCOUNT, loginCount)
          commit(types.SET_SHOWNAME, userName)
          commit(types.SET_AUTH, access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    // [types.GET_INFO]({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(response => {
    //       const {
    //         roles,
		// 				job,
    //         showName,
		// 				organization
    //       } = response

    //       commit(types.SET_ROLES, roles)
    //       commit(types.SET_SHOW_NAME, showName)
		// 			// 这个字段有点尴尬, 它的 name 居然是一个
    //       commit(types.SET_JOB, job)
    //       commit(types.SET_ORGANIZATION, organization)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }
  }
}
