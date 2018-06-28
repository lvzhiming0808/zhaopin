<template>
    <div class="PositionDetails-wrapper" id="job_Details">
        <div class="PositionDetails-wrapper-main">
            <div class="PositionDetails-wrapper-main-left">
                <h2>{{list.jobName}}
                </h2>
                <div class="PositionDetails-main-left-title">
                    <div class="PositionDetails-main-left-title-content">
                        <span>{{list.salaryPeriodName}}</span
                        >/<span>{{list.workPlace}}</span
                        >/<span>{{list.workLengthName}}</span
                        >/<span>{{list.degreeName}}</span
                        >/<span>{{list.jobCategory | jobPropertyIds}}</span>
                    </div>
                </div>
                <div class="PositionDetails-main-left-list">
                    <div class="PositionDetails-list-one">
                        <h3 style="clear: both;">职位描述<span class="under-line"></span></h3>
                        <div class="Positioncontent" v-html="text1"></div>
                    </div>
                    <div class="PositionDetails-Job-highlights PositionDetails-list-one">
                        <h3>职位亮点<span class="under-line"></span></h3>
                           <ul class="PositionDetails-Job-highlights-list">
                               <li v-for="(item,index) in this.arr" :key="index">{{item}}</li>
                           </ul>
                    </div>
                    <div class="PositionDetails-work-place PositionDetails-list-one">
                        <h3>工作地点<span class="under-line"></span></h3>
                           <div class="PositionDetails-work-place-content">
                               {{list.workPlace}}：{{list.workPlace | workPlacesList}}{{list.workSite}}
                           </div>
                    </div>
                    <div class="PositionDetails-work-place PositionDetails-list-one all_publishChannel">
                        <h3>发布渠道<span class="under-line"></span>
                          <Tooltip  class="publish_item" placement="top" content="点击发布渠道的图标，可对单渠道进行操作" >
                              <Icon type="information-circled" class="item_tips"></Icon>
                          </Tooltip>
                        </h3>
                        <div v-for="(items,index) in list.jobChannels" :key="index" class="publishChannelsBody" @click="publishChannel(items.platform,items.channelStatus)" :class="{noClick:items.channelStatus===265000||items.channelStatus===264000}">
                              <span class="publishChannel_51 publishChannels" v-show="items.platform==='10005'">51</span>
                              <span class="publishChannel_zhi publishChannels" v-show="items.platform==='10001'">智</span>
                              <span class="publishChannel_Boss publishChannels" v-show="items.platform==='10004'"><i>Boss</i></span>
                              <span class="publishChannel_lie publishChannels" v-show="items.platform==='10003'">猎</span>
                              <span class="publishChannel_58 publishChannels" v-show="items.platform==='10002'">58</span>
                              <span class="publishChannel_lagou publishChannels" v-show="items.platform==='10006'"><i>拉勾</i></span>
                              <b :class="{noClick1:items.channelStatus===265000||items.channelStatus===264000}">{{items.channelStatus|channelStatus}}</b>
                        </div>
                    </div>
                    <div class="punlishNocontent">
                      <p class="publishChannelCommet" v-for="(item,index) in list.jobChannels" :key="index"><span>{{item.platform|statusPlant}} : </span> {{item.comment}}</p>
                    </div>
                </div>
                <Modal
                  title="当前职位待办项"
                  v-model="dialogVisible"
                  width="300"
                  class="models"
                  :before-close="handleClose">
                  <div class="dealtWith">
                    <div class="eachRouter">
                        <router-link :to="{path:'/layout/resume',query: {name: 60001, jobName: list.jobName, jobId: list.id}}" v-if="this.btns.waitOperateNum!==0"> <span >待处理<i class="okClick">{{this.btns.waitOperateNum}}</i></span></router-link>
                        <span v-if="this.btns.waitOperateNum===0">待处理<i>{{this.btns.waitOperateNum}}</i></span>
                    </div>
                    <div class="eachRouter">
                        <router-link :to="{path:'/layout/resume',query: {name: 60010, jobName: list.jobName, jobId: list.id}}" v-if="this.btns.interviewing!==0"><span>面试中<i class="okClick">{{this.btns.interviewing}}</i></span></router-link>
                        <span v-if="this.btns.interviewing===0">面试中<i>{{this.btns.interviewing}}</i></span>
                    </div>
                    <div class="eachRouter">
                      <router-link :to="{path:'/layout/resume',query: {name: 60008, jobName: list.jobName, jobId: list.id}}" v-if="this.btns.waitEntryNum!==0"><span>待入职<i class="okClick">{{this.btns.waitEntryNum}}</i></span></router-link>
                      <span v-if="this.btns.waitEntryNum===0">待入职<i>{{this.btns.waitEntryNum}}</i></span>
                    </div>
                    
                  </div>
                  <span v-if="this.delBtnType===false">
                    <p>* 当前渠道简历未处理完成，无法删除，请处理完成简历后再删除</p>
                  </span>
                  <p v-if="isShow===false">* 删除后不可恢复，请确认后进行操作</p>
                  <span slot="footer" class="dialog-footer">
                    <Button type="primary" :disabled="key.disable===true" :class="{primary:key.disable===false}" @click="simpleOption(key.buttonType,key.disable)" v-for="(key,index) in this.btns.jobOperateButtons" :key="index">{{key.buttonName}}</Button>
                    <Button type="primary" @click="dialogVisible = false">取消</Button>
                  </span>
                </Modal>
            </div>
            <div class="PositionDetails-wrapper-main-right">
                <div class="PositionDetails-number-applicants">
                    <el-progress type="circle" :percentage="this.allpercentage" id="jobList_statistics">已完成</el-progress>
                    <div class="PositionDetails-number-peoples">
                        <p>招聘人数：{{list.number || 0}}</p>
                        <p>已入职：{{wateFinishPre.entryNum || 0}}</p>
                        <!-- list.ownNumber -->
                        <p>待入职：{{wateFinishPre.waitEntryNum || 0}}</p>
                    </div>
                </div>
                <div class="PositionDetails-main-right-bottom">
                    <div class="PositionDetails-needDealt" id="jobList_agency">
                        <h4>
                            <span class="needDealt-text">待办</span>
                            <span class="needDealt-line"></span>
                        </h4>
                        
                        <div class="needDealt-content">
                            <span><router-link :to="{path:'/layout/resume',query: {name: 60001, jobName: list.jobName, jobId: list.id}}">待处理：<i>{{wateFinish.waitOpreNum ||0}}</i></router-link></span>
                            <span><router-link :to="{path:'/layout/resume',query: {name: 60010, jobName: list.jobName, jobId: list.id}}">面试中：<i>{{wateFinish.interviewing ||0}}</i></router-link></span>
                            <span><router-link :to="{path:'/layout/resume',query: {name: 60008, jobName: list.jobName, jobId: list.id}}">待入职：<i>{{wateFinish.waitEntryNum ||0}}</i></router-link></span>
                        </div>
                    </div>
                    <div class="PositionDetails-needDealt PositionDetails-operation" id="jobList_operation">
                        <h4>
                            <span class="needDealt-text">操作</span>
                            <span class="needDealt-line"></span>
                            <Tooltip placement="top" class="item">
                                <Icon type="information-circled" class="item_tips"></Icon>
                                <div slot="content">
                                  <p>该操作指向全部渠道，点击发布渠道的图标，</p>
                                  <p>可对单渠道进行操作</p>
                              </div>
                            </Tooltip>
                        </h4>
                        <div class="needDealt-content operation-text positionDetails_span">
                          <template>
                            <Button v-show="false" type="text" @click="opendel"></Button>
                          </template>
                            <span v-for="(key,inds) in list.jobOperateButtons" :key="inds">
                              <span class="spanWrapper" v-if="key.disable===false" @click="channelOption(key.buttonType,$event,list.id,list.jobCode,list.isRefresh,list.jobName,list.publishUserId,list.publishState)">{{key.buttonName}}</span>
                              <span class="disableOption" v-if="key.disable===true" >{{key.buttonName}}</span>             
                            </span>
                        </div>
                    </div>
                    <div class="PositionDetails-needDealt PositionDetails-PublishingChannel" id="jobList_channel">
                        <h4>
                            <span class="needDealt-text">面试流程</span>
                            <span class="needDealt-line" style="width:127px"></span>
                        </h4>
                        <div v-for="item in list.interviewTurnJobs" class="interview-flow needDealt-content PublishingChannel-text interviewConst">
                            <span class="interview-number">{{interviewConst[item.count]}}</span>
                            <span class="interview-name">{{item.interviewerName}}</span>
                        </div>
                    </div>
                </div>
                <span class="allMessage">
                  <Modal
                    v-model="modal3"
                    title="提示"
                    @on-ok="okModal3"
                    width="300"
                  >
                    <p>确认下线该职位?</p>
                  </Modal>
                   <Modal
                    v-model="modal4"
                    title="提示"
                    @on-ok="okModal4"
                    width="300"
                  >
                    <p>确认上线线该职位?</p>
                  </Modal>
                  <Modal
                    v-model="modal5"
                    title="提示"
                    @on-ok="okModal5"
                    width="300"
                  >
                    <p>确定删除该岗位?</p>
                  </Modal>
                  <Modal
                      v-model="dialogVisibleAll"
                      title="提示"
                      width="300"
                      :before-close="handleCloseAll">
                      <p class="jobName">职位名称：{{list.jobName}}</p>
                      <p class="jobName" v-if="JsonSendSucess.length!==0"><span class="JsonSendSucess"></span>{{titlesUccess}}：<span v-for="(item,ind) in JsonSendSucess" :key="ind">{{item|statusPlant}}<span v-if="ind!==JsonSendSucess.length-1">、</span></span></p>
                      <p class="jobName" v-if="JsonsendFail.length!==0"><span class="JsonsendFail"></span> {{titleError}}：<span v-for="(item,ind) in JsonsendFail" :key="ind">{{item|statusPlant}}<span v-if="ind!==JsonsendFail.length-1">、</span></span></p>
                      <p class="jobName" v-if="JsonWait.length!==0"><span class="Jsonsending"></span> {{titleWait}}：<span v-for="(item,ind) in JsonWait" :key="ind">{{item|statusPlant}}<span v-if="ind!==JsonWait.length-1">、</span></span></p>
                      <span slot="footer" class="dialog-footer">
                        <Button style="margin:0 auto;" type="primary" @click="handleCloseAllSure">确 定</Button>
                      </span>
                    </Modal>
                </span>
            </div> 
        </div>
        <Spin fix v-if="isShowLoading">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
    </div>
</template>
<script>
import { detail } from '../../api/jobApi/jobIndex'
import { getResumeInfo } from '../../api/jobApi/positionDetails'
import { Refresh, outLine, getResumeInfoPre, deletAll, getChannelOption, delet, goOnLine } from '../../api/jobApi/jobIndex'
// import { Refresh } from '../../api/jobIndex'
// rePublish  重新发布的api
export default{
  data() {
    return {
      isShowLoading: true,
      JsonWait: [],
      titleWait: '',
      JsonSendSucess: [],
      JsonsendFail: [],
      titlesUccess: '',
      titleError: '',
      isShow: false,
      delBtnType: false,
      platform: '',
      dialogVisibleAll: false,
      dialogVisible: false,
      btns: [], // 单渠道操作按钮
      queryobj: '',
      list: {},
      arr: [],
      jobDutyList: [],
      allpercentage: +'',
      wateFinish: {},
      wateFinishPre: {},
      publishChanel: [],
      text1: [],
      text2: [],
      url: '',
      map:
      { 10001: require('@/assets/zl-logo.png'),
        10002: require('@/assets/58-logo.png'),
        10003: require('@/assets/lieping-logo.png'),
        10004: require('@/assets/boss-logo.png'),
        10005: require('@/assets/qiancheng-logo.png'),
        10006: require('@/assets/lagou-logo.png')
      },
      interviewConst: {
        1: '一面',
        2: '二面',
        3: '三面',
        4: '四面',
        5: '五面'
      },
      refresh: '',
      modal3: false,
      modal4: false,
      modal5: false
    }
  },
  filters: {
    channelStatus(status) {
      switch (status) {
        case 261000:
          return '发布中'
        case 262000:
          return '已下线'
        case 263000:
          return '已到期'
        case 264000:
          return '已删除'
        case 265000:
          return '待审核'
        case 266000:
          return '未通过'
      }
    },
    status(status) {
      switch (status) {
        case 130001:
          return '已下线'
        case 130002:
          return '发布中'
        case 130003:
          return '已到期'
        case 130005:
          return '待审核'
      }
    },
    workPlaces(status1) {
      switch (status1) {
        case '0':
          return '北京'
        case '1':
          return '武汉'
      }
    },
    jobPropertyIds(status2) {
      switch (status2) {
        case '20001':
          return '全职'
        case '20002':
          return '兼职'
        case '20003':
          return '实习'
      }
    },
    workPlacesList(status3) {
      switch (status3) {
        case 0:
          return '北京市'
        case 1:
          return '武汉市'
      }
    },
    publishImgs(state4) {
      switch (state4) {
        case 10001:
          return '../../assets/zhilian-logo.png'
        case 10002:
          return '../../assets/58-logo.png'
        case 10005:
          return '../../assets/qiancheng-logo.png'
        case 10004:
          return '../../assets/boss-logo.png'
        case 10006:
          return '../../assets/lagou-logo.png'
      }
    },
    statusPlant(status) {
      switch (status) {
        case '10001':
          return '智联招聘'
        case '10002':
          return '58同城'
        case '10003':
          return '猎聘'
        case '10004':
          return 'BOSS直聘'
        case '10005':
          return '前程无忧'
        case '10006':
          return '拉勾网'
      }
    }
  },
  methods: {
    channelOption(buttonType, event) {
      this.platform = ''
      if (buttonType === 272000) { // 下线
        this.outlineEvent()
      } else if (buttonType === 274000) { // 编辑
        this.$router.push({ path: 'newCreates2', query: { id: this.list.id, publishState: this.list.publishState, isEdit: true }})
      } else if (buttonType === 273000) { // 刷新
        this.refreshDele()
      } else if (buttonType === 275000) { // 删除
        this.opendel()
      } else if (buttonType === 271000) { // 上线
        this.goOnLineWork()
      }
    },
    publishChannel(val, status) {
      this.platform = val
      if (status === 265000 || status === 264000) {
        return false
      } else {
        getChannelOption({
          jobId: this.list.id,
          platform: val
        }).then(res => {
          this.btns = res.result
          if (res.code === 200) {
            this.dialogVisible = true
            if (res.result.interviewing === 0 && res.result.waitEntryNum === 0 && res.result.waitOperateNum === 0) {
              this.delBtnType = true
              this.isShow = false
            } else {
              this.delBtnType = false
              this.isShow = true
            }
          }
        })
      }
    },
    simpleOption(btnType, isClick) { // 单渠道操作
      if (isClick === false) {
        if (btnType === 272000) { // 下线
          this.dialogVisible = false
          this.outlineEvent()
        } else if (btnType === 273000) { // 刷新
          this.refreshDele()
        } else if (btnType === 275000) { // 删除
          this.dialogVisible = false
          this.silmpleDel()
        } else if (btnType === 271000) { // 上线
          this.goOnLineWork()
        }
      } else {
        return false
      }
    },
    handleCloseAll() {
      this.dialogVisibleAll = false
    },
    handleCloseAllSure() {
      this.dialogVisibleAll = false
      this.$router.push({ path: 'job' })
    },
    handleClose() {
      this.dialogVisible = false
    },
    goOnLineWork() { // 上线
      this.JsonSendSucess = []
      this.JsonsendFail = []
      this.JsonWait = []
      this.dialogVisible = false
      this.modal4 = true
    },
    okModal4() {
      goOnLine({
        id: this.list.id,
        platform: this.platform || ''
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisibleAll = true
          this.titlesUccess = '上线成功'
          this.titleError = '上线失败'
          this.titleWait = '待审核'
          this.outLineOption = JSON.parse(res.message).result
          this.outLineOption.map((item, index) => {
            if (item.code === 200) {
              this.JsonSendSucess.push(item.platId)
            } else if (item.code === 500) {
              this.JsonsendFail.push(item.platId)
            } else if (item.code === 202) {
              this.JsonWait.push(item.platId)
            }
          })
        } else {
          this.dialogVisibleAll = false
          this.$message.error(res.message)
        }
      })
    },
    refreshDele() {  //  点击刷新
      Refresh({
        id: this.list.id,
        platform: this.platform || ''
      }).then((res) => {
        this.dialogVisible = false
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '刷新成功!'
          })
          this.$router.push({ path: 'PositionDetails', query: { 'id': this.list.id,
            'refreshs': this.list.refreshs,
            'jobCode': this.list.jobCode,
            'editId': this.list.editId,
            'jobName': this.list.jobName,
            'publishUserId': this.list.publishUserId,
            'time': new Date().getTime() }})
        } else {
          this.$message.error(res.message)
        }
      })
    },
    outlineEvent(val, stat) {  //  点击下线
      this.JsonSendSucess = []
      this.JsonsendFail = []
      this.JsonWait = []
      this.modal3 = true
    },
    okModal3() {
      outLine({
        id: this.list.id,
        jobName: this.list.jobName,
        publishUserId: this.list.publishUserId,
        platform: this.platform
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisibleAll = true
          this.titlesUccess = '下线成功'
          this.titleError = '下线失败'
          this.titleWait = '待审核'
          this.outLineOption = JSON.parse(res.message).result
          this.outLineOption.map((item, index) => {
            if (item.code === 200) {
              this.JsonSendSucess.push(item.platId)
            } else if (item.code === 500) {
              this.JsonsendFail.push(item.platId)
            } else if (item.code === 202) {
              this.JsonWait.push(item.platId)
            }
          })
        } else {
          this.dialogVisibleAll = false
          this.$message.error(res.message)
        }
      })
    },
    // 渠道包删除
    opendel() { // deletAll
      this.JsonSendSucess = []
      this.JsonsendFail = []
      this.JsonWait = []
      deletAll({
        id: this.list.id,
        platform: ''
      }).then(res => {
        this.btns = res.result
        this.dialogVisible = true
        if (res.code === 200) {
          if (res.result.interviewing === 0 && res.result.waitEntryNum === 0 && res.result.waitOperateNum === 0) {
            this.delBtnType = true
            this.isShow = false
          } else {
            this.delBtnType = false
            this.isShow = true
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    silmpleDel() { // 单渠道删除
      this.modal5 = true
    },
    okModal5() {
      delet({
        id: this.list.id,
        platform: this.platform
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisibleAll = true
          this.titlesUccess = '删除成功'
          this.titleError = '删除失败'
          this.titleWait = '待审核'
          this.jobNames = this.list.jobName
          this.outLineOption = JSON.parse(res.message).result
          this.outLineOption.map((item, index) => {
            if (item.code === 200) {
              this.JsonSendSucess.push(item.platId)
            } else if (item.code === 500) {
              this.JsonsendFail.push(item.platId)
            } else if (item.code === 202) {
              this.JsonWait.push(item.platId)
            }
          })
        } else {
          this.dialogVisibleAll = false
          this.$message.error(res.message)
        }
      })
    },
    toIndexPage() {
      // this.$router.go(-1)
      this.$router.push({ path: './job', query: { state: this.$route.query.state }})
    }
  },
  created() {
    this.isShowLoading = true
    var obj = this.$route.query
    this.queryobj = obj
    this.refresh = obj.refreshs
    getResumeInfoPre({
      id: obj.id
    }).then(res => {
      this.wateFinishPre = res
    })
    getResumeInfo({
      id: obj.id
    }).then(res => {
      this.wateFinish = res
    })
    detail({
      id: obj.id
    }).then(res => {
      this.list = res.result
      this.isShowLoading = false
      this.arr = res.result.jobSternName.split(',')
      this.text1 = res.result.jobDesc.replace(/\n/g, '<br>')
      this.text2 = res.result.jobDuty.replace(/\n/g, '<br>')
      this.publishChanel = res.result.publishWay.split(',')
      this.jobDutyList = res.result.jobDuty.split('\n')
      this.allpercentage = Math.round(((this.wateFinishPre.waitEntryNum + this.wateFinishPre.entryNum) / res.result.number || 0) * 100)
      // this.allpercentage = Math.round(((this.wateFinishPre.waitEntryNum || 0 + this.wateFinishPre.entryNum || 0) / res.number || 0) * 100)
    })
  }
}
</script>
<style lang="scss" src="./PositionDetails.scss"></style>

