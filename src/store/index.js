import Vue from 'vue'
import Vuex from 'vuex'
import newCreates from './modules/newCreates'
import user from './modules/user'
import sendJob from './modules/createsJob/sendJob'
import RegExpJob_disable from './modules/createsJob/RegExpJob_disable'
import sendOffer from './modules/sendOffer/sendOffer'
import Jobmanagement from './modules/Jobmanagement/index'
import resumeSearch from './modules/resumeSearch/index'
import PendingTreatment from './modules/PendingTreatment/index'
import accentCenter from './modules/accentCenter/index'
import message from './modules/message/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    newCreates,
    sendJob,
    RegExpJob_disable,
    sendOffer,
    Jobmanagement,
    resumeSearch,
    PendingTreatment,
    accentCenter,
    message
  },
  state: {},
  mutations: {

  }
})
