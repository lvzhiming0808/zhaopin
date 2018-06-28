<template>
  <div class="place-wrapper">
     <ul class="place-nav">
       <router-link to='./InterviewNotice'><li>面试通知</li></router-link>
       <router-link to='./sendOffer'><li>发送offer</li></router-link>
     </ul>
     <div class="place-main">
       <router-view></router-view>
     </div>
  </div>
</template>
<script>
export default{
  data() {
    return {
      input4: ''
    }
  }
}
</script>
<style lang="scss">
.place-wrapper{
  min-height: 700px;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 30px;
  a{
    text-decoration: none;
  }
  .place-nav{
    height: 58px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #D3DCE4;
    a{
      flex:1;
      text-align: center;
      line-height: 58px;
      font-size: 14px;
      color: #000;
    }
    .router-link-active{
      border-bottom: 1px solid #2d8cf0;
      color: #2d8cf0;
    }
  }
}
</style>

