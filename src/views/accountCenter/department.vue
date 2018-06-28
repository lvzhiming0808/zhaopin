<template>
  <div class='department-wrapper' id="account_Purview">
      <!-- 部门管理 -->
      <div class='department-main'>
         <Row>
            <Col span="6">
              <departmentLeft @londingEvent="londingEvent"></departmentLeft>
            </Col>
            <Col span="18">
              <departmentRight :detaliList="detaliList" ref="deptRight"></departmentRight>
            </Col>
        </Row>
      </div>
      <Spin fix v-if="isShowLoading" style="position: absolute;">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
  import departmentLeft from './departmentLeft.vue'
  import departmentRight from './departmentRight.vue'
  import * as types from '../../store/modules/accentCenter/actionTypes'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isShowLoading: true
      }
    },
    components: {
      departmentLeft,
      departmentRight
    },
    computed: {
      ...mapGetters('accentCenter', [
        'detaliList'
      ])
    },
    methods: {
      ...mapActions('accentCenter', [
        types.HANDEL_ORGDEATIL
      ]),
      londingEvent(e) {
        this.isShowLoading = e.isLoading
      }
    }
  }
</script>
<style lang='scss'>
.department-wrapper {
  overflow: hidden;
    position: relative;
    .ivu-spin-main{
        top:200px !important;
      }
  .department-head {
    height: 50px;
    margin-top: 20px;
    .department-head-title {
      display: inline-block;
      border-left: 2px solid #2d8cf0;
      height: 14px;
      font-size: 16px;
      padding-left: 8px;
      line-height: 14px;
    }
  }
  .department-main {
    background: #fff;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    min-height: 700px;
    margin-top: 30px;
  }
}
</style>

