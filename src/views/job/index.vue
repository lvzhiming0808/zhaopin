<template>
	<div class='job-wrapper' id="jobMenu">
    <!-- 导航栏 -->
    <div class="job_nav" ref="jobNav">
      <div class="leftb">
        <router-link v-for="(item,index) in JobListCount" :key="index" :to="{path:'job', query:{state: item.id}}" :class="{routeractive: +state === item.id}">
          <Button type="text" class="text">{{item.name}}（{{item.num}}）</Button>
        </router-link>
      </div>
      <!-- 导航栏 -->
    </div>
		<div class="job-wrapper-main" ref="wrapperMain">
			<div class="job-wrapper-main-top">
				<div class="job-main-top-left">
          <Select v-model="isPersonal" @on-change="publishChange" style="width:200px" placeholder="请选择">
              <Option 
                v-for="item in publishOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </Option>
          </Select>
          <Tag color="blue" v-for="tag in dynamicTags" :key="tag" :name="item" closable @on-close="handleClose(tag)">{{tag|capitalize}}</Tag>
				</div>
				<div class="job-main-top-right">
          <span class='rebut'>
            <icon-svg icon-class='screen'/>
          </span>
          <Button type="text" @click="modal1 = true" style="padding:3px;color:#2d8cf0;font-size: 14px;">筛选</Button>
          <Modal
              v-model="modal1"
              title="筛选"
              @on-ok="sureSuccess">
              <Form  :model="form1" ref="form1" id="job_Screen">
                <FormItem label="发布渠道">
                  <Select v-model="publishWay" placeholder="请选择">
                     <Option  :label="item['label']" :value="item['value']" v-for="(item,index) in publishWays" :key="index"></Option >
                  </Select>
                </FormItem>
              </Form >
          </Modal>
          <Input v-model="searchWork"  @keyup.enter.native="searchList" @on-click="searchList" icon="search" placeholder="搜索岗位" style="width: 200px;"></Input>
          <router-link :to="{path:'./newCreates2', query:{RsendEvent: true,newNeed:true}}">
            <Button type="primary"><Icon type="ios-plus-outline"></Icon> 新招聘需求</Button>
          </router-link>
				</div>
			</div>
       <div class="job_occupy" v-if="joblistText.length===0">
        <img src="../../assets/img_zhanwei.png">
       </div>
			<div id="job_List" class="job-wrapper-main-bottom">
				<!-- 职位列表 -->
          <div id="jobList_card" @click="toPositionDetails($event, item.id, item.isRefresh, item.jobCode, item.editId, item.jobName, item.publishUserId)" class="job-wrapper-main-bottom-list" v-for="(item,index) in joblistText" :key="index" :data-id="item.id" :data-code="item.jobCode">
          <Card :bordered="false">
              <div class="job-wrapper-main-bottom-list-head">
                <h3>{{item.jobName}}</h3>
                <div class="status-all" v-if="item.publishState!==130005">
                  <span v-for="(key,inds) in item.jobOperateButtons" :key="inds" class="spanWrapper">
                    <span v-if="key.disable===false" @click="channelOption(key.buttonType,$event,item.id,item.jobCode,item.isRefresh,item.jobName,item.publishUserId,item.publishState)">{{key.buttonName}}</span>
                    <span class="disable" v-if="key.disable===true" >{{key.buttonName}}</span>             
                  </span>
                </div>
                <div class="audited" v-else>
                  <span class="auditedTip">!</span>
                  <span>可在职位详情页中对单独渠道进行操作</span>
                </div>
              </div>
              <div class="job-main-bottom-list-text">
                <!-- 原数据item.deptName、item.salaryPeriod、item.workPlace、item.workLength、item.degreeId  -->
                <span>招聘人数：{{item.number}}</span
                ><span>待处理：{{item.waitOpreNum}}</span
                ><span>面试中：{{item.interviewing}}</span
                ><span>待入职：{{item.waitEntryNum}}</span
                ><span>已入职：{{item.entryNum}}</span>
              </div>
              <div class="publishingMode">
                <div class="publishChannelsBody" v-for="(items,ind) in item.jobChannels" :key="ind">
                    <span class="publishChannel_zhi publishChannels" v-show="items.platform==='10001'">智</span>
                    <span class="publishChannel_Boss publishChannels" v-show="items.platform==='10004'"><i>Boss</i></span>
                    <span class="publishChannel_51 publishChannels" v-show="items.platform==='10005'">51</span>
                    <span class="publishChannel_lie publishChannels" v-show="items.platform==='10003'">猎</span>
                    <span class="publishChannel_58 publishChannels" v-show="items.platform==='10002'">58</span>
                    <span class="publishChannel_lagou publishChannels" v-show="items.platform==='10006'"><i>拉勾</i></span>
                    <b>{{items.channelStatus|channelStatus}}</b>
                </div>
                <span class="publishingMode-people">
                  <span class="people-name">{{item.lastestrecord}}</span>
                </span>
              </div>
          </Card>
          </div>

			</div>
			<div class="pages" v-if="joblistText.length!==0">
        <Page 
					 @on-change="handleCurrentChange"
					 :current="currentPage1"
					:page-size="20"
					:total="AllSizes" 
          show-total>
        </Page>
			</div>
		</div>
    <!-- 筛选模块 -->
    <!-- 删除 -->
    <span class="delDilog">
      <!-- 下线 -->
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
        <p>确认上线该职位?</p>
      </Modal>
      <Modal
        title="当前职位待办项"
        v-model="dialogVisibleDel"
        class="models"
        width="300"
        :before-close="handleCloseDel">
          <div class="dealtWith">
            <div class="eachRouter">
            <router-link :to="{path:'/layout/resume',query: {name: 60001, jobName: this.jobNames, jobId: this.delId}}"> <span v-if="this.deletAllObj.waitOperateNum!==0">待处理<i class="okClick">{{this.deletAllObj.waitOperateNum}}</i></span></router-link>
            <span v-if="this.deletAllObj.waitOperateNum===0">待处理<i>{{this.deletAllObj.waitOperateNum}}</i></span>
            </div>
            <div class="eachRouter">
            <router-link :to="{path:'/layout/resume',query: {name: 60010, jobName: this.jobNames, jobId: this.delId}}"><span v-if="this.deletAllObj.interviewing!==0">面试中<i class="okClick">{{this.deletAllObj.interviewing}}</i></span></router-link>
            <span v-if="this.deletAllObj.interviewing===0">面试中<i>{{this.deletAllObj.interviewing}}</i></span>
            </div>
            <div class="eachRouter">
            <router-link :to="{path:'/layout/resume',query: {name: 60008, jobName: this.jobNames, jobId: this.delId}}"><span v-if="this.deletAllObj.waitEntryNum!==0">待入职<i class="okClick">{{this.deletAllObj.waitEntryNum}}</i></span></router-link>
            <span v-if="this.deletAllObj.waitEntryNum===0">待入职<i>{{this.deletAllObj.waitEntryNum}}</i></span>
            </div>
          </div>
        <span v-if="this.delBtnType===false">
          <p>当前渠道简历未处理完成，无法删除，请处理完成简历后再删除</p>
          <p>您可先对职位进行下线处理</p>
        </span>
        <span v-else>
          <p>删除后不可恢复，请确认后进行操作</p>
        </span>
        <span slot="footer" class="dialog-footer">
          <Button type="primary" v-for="(key,ind) in this.deletAllObj.jobOperateButtons" :key="ind" :disabled="key.disable"  @click="DelSure(key.buttonType,key.disable)">{{key.buttonName}}</Button>
          <Button type="primary" @click="dialogVisibleDel = false">取消</Button>
        </span>
      </Modal>
    </span>
    <span class="allMessage">
      <Modal
          v-model="dialogVisible"
          width="300"
          title="提示" 
          :mask-closable='false'
          :before-close="handleCloseAll">
          <p class="jobName">职位名称：{{this.jobNames}}</p>
          <p class="jobName" v-if="JsonSendSucess.length!==0"><span class="JsonSendSucess"></span>{{titlesUccess}}：<span v-for="(item,ind) in JsonSendSucess" :key="ind">{{item|statusPlant}}<span v-if="ind!==JsonSendSucess.length-1">、</span></span></p>
          <p class="jobName" v-if="JsonsendFail.length!==0"><span class="JsonsendFail"></span> {{titleError}}：<span v-for="(item,ind) in JsonsendFail" :key="ind">{{item|statusPlant}}<span v-if="ind!==JsonsendFail.length-1">、</span></span></p>
          <p class="jobName" v-if="JsonWait.length!==0"><span class="Jsonsending"></span> {{titleWait}}：<span v-for="(item,ind) in JsonWait" :key="ind">{{item|statusPlant}}<span v-if="ind!==JsonWait.length-1">、</span></span></p>
          <span slot="footer" class="dialog-footer">
            <Button style="margin:0 auto;" type="primary" @click="handleCloseAllSure">确 定</Button>
          </span>
        </Modal>
    </span>
    <Spin fix v-if="isShowLoading" style="position: absolute;">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
import { SEARCHINFO } from '../../json/search'
import { PUBLISHSTATES, PUBLISHWAYS, OPTIONWORKLENGTH, DEGREES, SALARYPERIODS } from '../../store/modules/resumegolobal/resumegolobal'
import { jobList, Refresh, outLine, getJobListCount, getJobStatus, deletAll, goOnLine, delet } from '../../api/jobApi/jobIndex'
// delet单个渠道删除deletAll
import * as types from '../../store/modules/Jobmanagement/actionTypes'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isShowLoading: true,
      flags: false,
      modal_loading: true,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      JsonWait: [],
      titleWait: '',
      titlesUccess: '',
      titleError: '',
      jobNames: '',
      outLineOption: [],
      dialogVisible: false,
      JsonSendSucess: [],
      JsonsendFail: [],
      deletAllObj: {},
      dialogVisibleDel: false,
      delBtnType: false,
      delId: '',
      statusOption: '',
      jobLeftList: [],
      state: 130000,  //  控制导航栏颜色显示
      // isPersonal: '0001',  //  筛选我发布的职位
      ajaxdata: {},
      ajaxdataCount: {},  //  获取总数的统计
      publishStates: PUBLISHSTATES, // 发布状态列表
      selectedOptions: [], // 选择部门时用的数组
      deptlistlists: [], // 组织机构假数据
      workPlaces: [ // 工作地点
        {
          value: '北京',
          label: '北京'
        }, {
          value: '湖北',
          label: '湖北',
          children: [
            { 'value': '武汉',
              label: '武汉' }
          ]
        }
      ],
      publishOptions: [
        {
          value: '0001',
          label: '我发布的职位'
        }, {
          value: '0002',
          label: '全部门职位'
        }
      ],
      JobListCount: '', //  统计数据
      publishWays: PUBLISHWAYS, // 发布渠道
      workLengths: OPTIONWORKLENGTH,
         // 工作年限
      degreeIds: DEGREES,  // 学历列表
      salaryPeriods: SALARYPERIODS,
      workplace: [],
      AllSizes: 0,
      joblistText: [],
      dialogFormVisible: false,
      map: SEARCHINFO,
      allDept: [],
      deptNameobj: {},
      form1: {},
      currentText: {}
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
        case '10006':
          return '拉勾网'
        case '10005':
          return '前程无忧'
      }
    },
    capitalize: function(value) {
      if (typeof (value) === 'number') {
        return SEARCHINFO[value]
      } else {
        return value
      }
    }
  },
  updated() {
    var jobNav = this.$refs.jobNav  //  控制样式的长度
    var wrapperMain = this.$refs.wrapperMain
    jobNav.style.height = wrapperMain.offsetHeight + 'px'
    console.dir(wrapperMain)
  },
  computed: {
    dynamicTags: {
      get() {
        return this.$store.state.Jobmanagement.dynamicTags
      },
      set(value) {
        this[types.SAVE_DYNAMICTAGS](value)
      }
    },
    searchWork: {
      get() {
        return this.$store.state.Jobmanagement.searchWork
      },
      set(value) {
        this[types.SEARCH_WORK](value)
      }
    },
    isPersonal: {
      get() {
        return this.$store.state.Jobmanagement.isPersonal
      },
      set(value) {
        this[types.HANDEL_ISPERSONAL](value)
      }
    },
    currentPage1: {
      get() {
        return this.$store.state.Jobmanagement.currentPage1
      },
      set(value) {
        this[types.PAGE_NUMBER](value)
      }
    },
    publishWay: {
      get() {
        return this.$store.state.Jobmanagement.publishWay
      },
      set(value) {
        this[types.HANDEL_PUBLISHCHANNEL](value)
      }
    },
    deptId: {
      get() {
        return this.$store.state.Jobmanagement.deptId
      },
      set(value) {
        this[types.HANDEL_DEPTID](value)
      }
    }
  },
  mounted() {
    this.state = this.$route.query.state || 130000  //  切换tabe
    this.getAllSearch()
  },
  methods: {
    channelOption(buttonType, event, id, code, isRefresh, jobName, publishUserId, publishState) {
      event.stopPropagation()
      event.preventDefault()
      this.delId = id
      if (buttonType === 272000) { // 下线
        this.outlineEvent(event, id, jobName)
      } else if (buttonType === 274000) { // 编辑
        this.editList(event, id, code, publishState)
      } else if (buttonType === 273000) { // 刷新
        this.refreshDele(event, id)
      } else if (buttonType === 275000) { // 删除
        this.deleList(event, id, jobName)
      } else if (buttonType === 271000) { // 上线
        this.goOnLineWork(id, jobName)
      }
    },
    ...mapMutations('Jobmanagement', [
      types.HANDEL_PUBLISHCHANNEL,
      types.HANDEL_DEPTID,
      types.HANDEL_ISPERSONAL,
      types.SEARCH_WORK,
      types.PAGE_NUMBER,
      types.SAVE_DYNAMICTAGS
    ]),
    del() {},
    handleCloseAll() {
      this.dialogVisible = false
    },
    handleCloseAllSure() {
      this.dialogVisible = false
      this.getAllSearch()
    },
    getAllSearch() {
      this.isShowLoading = true
      jobList({
        'publishState': this.$route.query.state,
        'isPersonal': this.isPersonal,
        'publishWay': this.publishWay || '',
        jobName: this.searchWork || '',
        page: this.currentPage1,
        size: 20
      }).then((res) => {
        this.isShowLoading = false
        this.AllSizes = +res.result.total
        this.joblistText = res.result.list
        if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = 0
        } else {
          document.body.scrollTop = 0
        }
      })

      getJobStatus()
      .then(res => {
        this.jobLeftList = res.result
      })
      getJobListCount({
        isPersonal: this.isPersonal,
        jobName: this.searchWork,
        page: this.currentPage1,
        publishWay: this.publishWay
      }).then(res => {
        if (res.code === 200) {
          this.JobListCount = res.result
        }
      })
    },
    publishChange() {   //  发布职位的筛选
      jobList({
        'publishState': this.$route.query.state,
        'isPersonal': this.isPersonal,
        'publishWay': this.publishWay || '',
        jobName: this.searchWork || '',
        page: this.currentPage1,
        size: 20
      }).then((res) => {
        this.AllSizes = +res.result.total
        this.joblistText = res.result.list
        if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = 0
        } else {
          document.body.scrollTop = 0
        }
      })

      getJobStatus()
    .then(res => {
      this.jobLeftList = res.result
    })
      getJobListCount({
        isPersonal: this.isPersonal,
        jobName: this.searchWork,
        page: this.currentPage1,
        publishWay: this.publishWay
      }).then(res => {
        if (res.code === 200) {
          this.JobListCount = res.result
        }
      })
    },
    deptsAll(ary, data) {   //  json渲染树结构
      var datas = ''
      var it = this
      if (data) {
        datas = data
      } else {
        datas = (function(ary) {
          var tempAry = []
          var idList = []
          ary.forEach(function(item) {
            idList.push(item.value)
          })
          function deb(value, idList) {
            var flag = true
            for (var ida in idList) {
              if (value === idList[ida]) {
                flag = false
              }
            }
            return flag
          }
          for (var i = 0, len = ary.length; i < len; i++) {
            if (ary[i].parentId === undefined || (ary[i].parentId !== undefined && deb(ary[i].parentId, idList))) {
              var obj = {
                label: ary[i].label,
                value: ary[i].value
              }
              tempAry.push(obj)
            }
          }
          it.deptlistlists = tempAry
          return tempAry
        }(ary))
      }
      var temp = 0
      if (datas.constructor === Array) {
        for (var i = 0, len = datas.length; i < len; i++) {
          for (var j = 0, lenA = ary.length; j < lenA; j++) {
            if (ary[j].parentId === datas[i].value) {
              var obj = {
                label: ary[j].label,
                value: ary[j].value
              }
              datas[i].children = datas[i].children || []
              datas[i].children.push(obj)
              temp++
            }
          }
        }
      }
      if (temp > 0) {
        if (datas.constructor === Array) {
          for (var n = 0, lenB = datas.length; n < lenB; n++) {
            datas[n].children = this.deptsAll(ary, datas[n].children ? datas[n].children : [])
            if (datas[n].children.length === 0) {
              delete datas[n].children
            }
            // delete datas[n].value
          }
        }
      } else {
        for (var n2 = 0, lenB2 = datas.length; n2 < lenB2; n2++) {
          // delete datas[n2].value
        }
      }
      return datas
    },
    goOnLineWork(id, jobName) { // 上线
      this.JsonSendSucess = []
      this.JsonsendFail = []
      this.JsonWait = []
      this.jobNames = jobName
      this.modal4 = true
    },
    okModal4() {
      goOnLine({
        id: this.delId
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = true
          this.modal4 = false
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
          this.dialogVisible = false
          this.$message.error(res.result)
        }
      })
    },
    deleList(event, id, jobName) { // 点击删除
      this.JsonSendSucess = []
      this.JsonsendFail = []
      this.JsonWait = []
      this.jobNames = jobName
      this.dialogVisibleDel = true
      event.stopPropagation()
      deletAll({
        id: this.delId
      }).then(res => {
        this.deletAllObj = res.result
        if (res.result.interviewing === 0 && res.result.waitEntryNum === 0 && res.result.waitOperateNum === 0) {
          this.delBtnType = true
        } else {
          this.delBtnType = false
        }
      })
    },
    DelSure(butType, isClick) {
      if (isClick === false) {
        if (butType === 272000) { // 下线
          this.dialogVisibleDel = false
          this.outlineEvent(event, this.delId, this.jobNames)
        } else if (butType === 275000) { // 删除
          if (!this.flags) {
            this.flags = true
            delet({
              id: this.delId
            }).then(res => {
              if (res.code === 200) {
                this.flags = false
                this.dialogVisibleDel = false
                this.dialogVisible = true
                this.titlesUccess = '删除成功'
                this.titleError = '删除失败'
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
                this.dialogVisible = false
                this.$message.error(res.result)
              }
            })
          }
        } else { // 取消
          this.dialogVisibleDel = false
        }
      } else {
        return false
      }
    },
    handleCloseDel() {
      this.dialogVisibleDel = false
    },
    handleClose(tag) {     // 点击tag标签删除该标签
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$store.state.dynamicTags = []
      this.publishWay = ''
      this.getAllSearch()
    },
    handleCurrentChange(value) {  // 点击前后分页请求
      this[types.PAGE_NUMBER](value)
      this.getAllSearch()
    },
    searchList() { // 搜索框
      this.getAllSearch()
    },
    outlineEvent(event, id, jobName) { // 点击下线
      this.JsonSendSucess = []
      this.JsonsendFail = []
      this.JsonWait = []
      this.jobNames = jobName
      event.stopPropagation()
      this.modal3 = true
    },
    okModal3() {
      outLine({
        id: this.delId
      }).then(res => {
        if (res.code === 200) {
          this.modal3 = false
          this.dialogVisible = true
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
          this.dialogVisible = false
          this.$message.error(res.result)
        }
      })
    },
    RsendEvent(event, id, code, editId, stayus) { // 重新发布
      event.stopPropagation() //  重新发布
      this.$router.push({ path: './newCreates2', query: { id: id, RsendEvent: true, newNeed: true }})
    },
    refreshDele(event, id) { // 点击刷新
      event.stopPropagation()
      Refresh({
        id: id
      }).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '刷新成功',
            type: 'success'
          })
          this.getAllSearch()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    editList(event, id, code, publishState) { // 点击编辑的时候
      event.stopPropagation()
      this.$router.push({ path: './newCreates2', query: { id: id, publishState: publishState, isEdit: true }})
    },
    toPositionDetails(event, id, refresh, jobCode, editId, jobName, publishUserId) { // 跳转到职位详情
      event.preventDefault()
      event.stopPropagation()
      this.$router.push({ path: './PositionDetails', query: { 'id': id, 'refreshs': refresh, 'jobCode': jobCode, 'editId': editId, 'jobName': jobName, 'publishUserId': publishUserId, 'state': this.$route.query.state }})
    },
    sureSuccess() { // 筛选点击确定
      if (this.publishWay !== '') {
        this.getAllSearch()
      } else {
        this.dialogFormVisible = false
      }
      // 获取部门的列表对象
      var arr = []
      if (this.publishWay) {
        arr.push(SEARCHINFO[this.publishWay])
      } else {
        arr.push(this.deptNameobj.label)
      }
      this.dynamicTags = arr
      this.dialogFormVisible = false
    },
    resetAll() { // 清空
      // this.form1 = {
      //   deptId: [],
      //   workplace: [],
      //   degreeId: '',
      //   'publishState': '',
      //   'publishWay': '',
      //   'salaryPeriod': '',
      //   'workLength': ''
      // }
      this.publishWay = ''
      this.dynamicTags = []
    }
  }
}
</script>
<style lang='scss' src='./jobIndex.scss'></style>
