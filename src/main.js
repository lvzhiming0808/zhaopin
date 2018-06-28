// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import '@/styles/common.css'
import App from './App'
import router from './router'
import store from './store'
import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'
import './permission'
import '@/icons'
import permission from './plugins/Permision'
import { GOLOBALCONTSTANS } from './json/golobalConstans'
import { GLOBALROUTE } from './json/globalLeftRoute'
import VDistpicker from 'v-distpicker'
import moment from 'moment/moment'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 引入的时间戳格式转换的工具
Vue.filter('moment', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment.unix(value / 1000).format(formatString) // 这是时间戳转时间
})
Vue.filter('pathformat', function(id) {
  for (var i = 0; i < GLOBALROUTE.length; i++) {
    if (GLOBALROUTE[i].id === id) {
      return GLOBALROUTE[i].path
    }
  }
})
Vue.filter('iconformat', function(id) {
  for (var i = 0; i < GLOBALROUTE.length; i++) {
    if (GLOBALROUTE[i].id === id) {
      return GLOBALROUTE[i].icon
    }
  }
})

Vue.filter('codeformat', function(value) {
  // 这是一个全局变量的过滤器 传入的是一个变量值 得到的是字符串展现
  for (var i = 0; i < GOLOBALCONTSTANS.length; i++) {
    if (GOLOBALCONTSTANS[i].value === value) {
      return GOLOBALCONTSTANS[i].label
    }
  }
})
Vue.filter('pathformat', function(id) {
  for (var i = 0; i < GLOBALROUTE.length; i++) {
    if (GLOBALROUTE[i].id === id) {
      return GLOBALROUTE[i].path
    }
  }
})
Vue.filter('iconformat', function(id) {
  for (var i = 0; i < GLOBALROUTE.length; i++) {
    if (GLOBALROUTE[i].id === id) {
      return GLOBALROUTE[i].icon
    }
  }
})
// Vue.filter('idformat', function(id) {
//   for (var i = 0; i < GLOBALROUTE.length; i++) {
//     if (GLOBALROUTE[i].id === id) {
//       return GLOBALROUTE[i].id
//     }
//   }
// })
// 这是一个全局时间过滤器用来将时间戳渲染成想要的时间样式
Vue.filter(`timeFormat`, function(value, type) {
  var dataTime = ''
  var data = new Date(value)
  // data.setTime(value)
  var year = data.getFullYear()
  var month = data.getMonth() + 1
  if (month < 10) {
    month = `0` + month
  }
  var day = data.getDate()
  if (day < 10) {
    day = `0` + day
  }
  // 在这里可以加switch case 方法判断type类型  这里暂时未加后期有需求不同样式再进行增加
  dataTime = year + `-` + month + `-` + day
  return dataTime
})
Vue.use(vueEventCalendar, {
  locale: 'zh',
  color: 'rgb(45, 140, 240)',
  background: 'red',
  className: '',
  weekStartOn: ''
})
Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.use(permission)
Vue.component('v-distpicker', VDistpicker)
