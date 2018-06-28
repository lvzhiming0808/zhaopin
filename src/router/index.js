import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const _import = file => require(`@/views/${file}`).default
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/layout/home/',
      name: '主页'
    },
    {
      path: '/layout',
      component: _import('layout/Layout'),
      children: [
        {
          path: 'home',
          component: _import('home'),
          name: '主页'
        },
        {
          path: 'job',
          component: _import('job'),
          name: '职位管理'
        },
        {
          path: 'resumeSearch',
          component: _import('resumeSearch'),
          name: '简历搜索'
        },
        {
          path: 'resume',
          component: _import('resume'),
          name: '简历管理'
        },
        {
          path: 'message',
          component: _import('message/message'),
          name: '消息'
        },
        {
          path: 'resumeUpload',
          component: _import('resumeUpload'),
          name: '简历上传'
        },
        {
          path: 'searchdetail',
          component: _import('resumeSearch/searchdetail'),
          name: '简历详情'
        },
        {
          path: 'talentdetails',
          component: _import('resumeSearch/talentDetails'),
          name: '简历详情'
        },
        {
          path: 'noticeSendView',
          component: _import('notice/noticeSendView'),
          name: '发送简历'
        },
        {
          path: 'noticeSendOffer',
          component: _import('notice/noticeSendOffer'),
          name: '发送offer'
        },
        {
          // 主动投递的页面
          path: 'activeSend',
          component: _import('resumedetails/activeSend'),
          name: '简历详情'
        },
        {
          path: 'detailEditing',
          component: _import('resumedetails/detailEditing'),
          name: '简历详情'
        },
        {
          path: 'newCreates2',
          component: _import('job/newCreates2'),
          name: '添加职位'
        },
        {
          path: 'PositionDetails',
          component: _import('job/PositionDetails'),
          name: '职位详情'
        },
        {
          path: 'PersonneManagement',
          component: _import('accountCenter/PersonneManagement'),
          name: '用户管理'
        },
        {
          path: 'communicate',
          component: _import('accountCenter/communicate'),
          name: '渠道管理'
        },
        {
          path: 'department',
          component: _import('accountCenter/department'),
          name: '部门管理',
          children: [
            {
              path: 'departmentRight',
              component: _import('accountCenter/departmentRight'),
              name: '部门管理右侧'
            }
          ]
        },
        {
          path: 'userMange',
          component: _import('accountCenter/userMange'),
          name: '关联用户管理'
        },
        {
          path: 'place',
          component: _import('accountCenter/place'),
          name: '模板设置',
          children: [
            {
              path: '',
              redirect: 'InterviewNotice'
            },
            {
              path: 'InterviewNotice',
              component: _import('accountCenter/InterviewNotice'),
              name: '模板设置'
            },
            {
              path: 'sendOffer',
              component: _import('accountCenter/sendOffer'),
              name: '模板设置'
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: _import('login/index'),
      name: 'login'
    },
    // 面试官的页面
    {
      path: '/interviewer',
      component: _import('interviewer')
    },
    // 面试官的失效页面
    {
      path: '/timeout',
      component: _import('interviewer/timeout')
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      component: _import('404')
    }
  ]
})
