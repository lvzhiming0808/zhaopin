<template>
  <div id='app'>
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"> -->
            <!-- 这里是会被缓存的视图组件 -->
        <!-- </router-view>
    </keep-alive> -->
    <router-view></router-view>
    <!-- <router-view v-if="!$route.meta.keepAlive"> -->
        <!-- 这里是不被缓存的视图组件 -->
    <!-- </router-view> -->
  </div>
</template>

<script>
//  import fetch from '@/utils/fetch'
// import {  } from "./assets/iconfont/iconfont.css";
  export default {
    name: 'app',
    // ,
    mounted() {
      // if (location.hash.indexOf('searchdetail') > 0) {
      //   this.$router.push('/layout/resumeSearch/searchdetail')
      // }
    },
    watch: {  //  清除职位筛选的数据
      '$route'(to, from) {
        if (to.path !== '/layout/job' && to.path !== '/layout/PositionDetails') {
          localStorage.setItem('jobAjaxData', '{}')
        }
        if (to.path !== '/layout/resume' && to.path !== '/layout/activeSend' && to.path !== '/layout/detailEditing') {
          localStorage.removeItem('resumeAjaxdata')
        }
        if (to.path !== '/layout/communicate' && to.path !== '/layout/userMange') {
          localStorage.removeItem('comAjaxObj')
        }
      }
    }
  }
</script>
<style lang='scss'>
  #app{
    height: 100%;
    min-width: 1028px;
    font-family: 微软雅黑 ! important;
  }
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100%;
        position: relative;
        border: 1px solid #eee;
    }
</style>

