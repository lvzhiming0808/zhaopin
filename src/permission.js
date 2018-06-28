// import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import {
//   getAuth,
//   getAuthFromCookie,
//   carryAuthToSessionStorage } from '@/utils/auth' // 验权
// import Permission from './plugins/Permision'
// import { GET_INFO } from './store/modules/user/actionTypes'

// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (getAuth()) {
//     if (!store.getters.showName) {
//       store.dispatch(GET_INFO).then(response => {
//         Permission.updatePermission(response.roles[0])
//         next()
//       })
//     } else {
//       next()
//     }
//   } else if (getAuthFromCookie()) {
//     carryAuthToSessionStorage()
//     next()
//   } else {
//     window.location.href = '重定向至统一登陆页面'
//   }
// })
// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })

// import store from './store'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
import { getAuth, removeAuth } from '@/utils/auth' // 验权
// import { GET_INFO } from './store/modules/user/actionTypes'
import router, {
	// asyncSopRouterMap,
	// asycArmyRouterMap
} from './router'

// var _hmt = window._hmt || [] //  百度统计路参数
router.beforeEach((to, from, next) => {
  NProgress.start()
  //  百度统计路由方法
  // if (to.path) {
  //   _hmt.push(['_trackPageview', '/#' + to.fullPath])
  // }
  // 通过url开启新页面的测试
  if (getAuth() || router.history.pending.query.t || router.history.pending.query.token) {
    // 这里增加一个面试官的判断仍然将token储存到session里面去
    if (to.path === '/login') {
      // 清除token
      removeAuth()
      next()
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    next('/login')
    NProgress.done()
  }
})
router.afterEach((to, from, next) => {
  NProgress.done()
  setTimeout(() => {   //  百度统计
    var _hmt = _hmt || [];
    (function() {
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?eb4a287b622f4f476e42e9e565d5e696'
      hm.id = 'baidu_tj'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
})

