<template>
  <div class="search-wrapper">
    <!--企业人才库简历详情 -->
     <div class="resumup">
      <div class="details-head">
        <Row>
          <Col :span="18">
            <div class="grid-content bg-purple">
              <div class="details-top">
                <p>{{detailsedetailed.userName}}</p>
              </div>
            </div>
          </Col>
          <Col span="18">
            <div class="grid-content bg-purple">
              <div class="leftheight">
                <div class="details-cont">
                  <Row style="clear: both">
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>性别：</span><span>{{detailsedetailed.sex|codeformat}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>期望地点：</span><span>{{detailsedetailed.expectPlace|| `未填写`}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>毕业院校：</span><span>{{detailsedetailed.university|| `未填写`}}</span></p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>年龄：</span><span>{{detailsedetailed.age}}岁</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>学历：</span><span>{{detailsedetailed.degree| codeformat}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>电话：</span><span>{{detailsedetailed.phone}}</span></p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>工作经验：</span><span>{{detailsedetailed.workLength}}</span><span v-if="detailsedetailed.workLength"></span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>专业：</span><span>{{detailsedetailed.major}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>邮箱：</span><span>{{detailsedetailed.email}}</span></p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div class="personLiable1"> <span>简历类型： {{detailsedetailed.inWay|codeformat}}</span>&nbsp;&nbsp;渠道来源：<span>{{detailsedetailed.platId| codeformat}}</span></div>
                <!-- 简历json渲染部分结束 -->
              </div>
            </div>
          </Col>
          <Col span="6">
            <div class="grid-content bg-purple">
              <div class="rightbox1">
                <div class="rightone">
                  <div class="righttitle">
                    <Button type="primary" icon="document" @click="handleDownload">{{`调转简历`}}</Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <!-- 简历json渲染部分 -->
        <div class="details-bottom">
           <div class="downLoadResum_wrapper">
              <div class="downLoadResum">
                <Button style="margin-right:5px;"  type="primary" @click="clickImg(1)" size="mini" class="noisInster" v-if="isInstFlag===true"><Icon type="plus-circled"></Icon> 感兴趣</Button>
                <Button style="margin-right:5px;"  @click="clickImg(0)" size="mini" class="isInster" v-else><Icon type="android-star" size="16px"></Icon> 已感兴趣</Button>
                <Button type="primary" size="mini" @click="downLoadResum"><i class="el-icon-download"></i>下载简历</Button>
            </div>
          </div>
          <Tabs v-model="activeName" @tab-click="handleClick">
            <!-- 简历详情 -->
            <TabPane label="简历详情" name="1">
              <!-- 当是190003的时候用pdf预览  -->
              <div v-if="detailsedetailed.inWay== `190003`">
              <embed :src="detailsedetailed.resumePath" frameborder="0" id="pdfContainer" name="pdfContainer" class="pdf" v-if="resumePath">
               <div v-else>
                <div class="photoBox">
                  <img class="photoBox_img" src="../../assets/404/404.png">
                  <p>
                简历暂时无法预览，请下载简历查看！
                  </p>
                </div>
              </div>
              </div>
              <div v-else>
              <detailresume :detailinfo='detailinfo' ></detailresume>
              </div>
            </TabPane>
            <!-- 拨打记录 -->
            <TabPane label="拨打记录" name="3">
              <div class="callRecord" v-for="item in callRecordList">
                <p class="callRecord_type">
                  <span>{{item.dialResult === '140004'?'未接通':'接通'}}</span><span
                  >{{item[callValueForm_map[item.dialResult]]}}</span>
                </p>
                <p class="callRecord_man">
                  <span>{{item.dialPersonName}}</span><span
                  >{{item.createdDate | myDate}}</span>
                </p>
              </div>
              <!-- 拨打记录弹窗部分 -->
            </TabPane>
            <!-- 面试记录 -->
            <TabPane label="面试记录" name="4">
              <Collapse v-model="interviewactiveName" accordion>
                <Panel v-for="(item, index) in interviewRecordList" :key="item.id"  name="1">
                  <template slot="title">
                    <div class="interviewjob_box">
                      <div class="interviewjob">
                        <span>
                        招聘职位：{{item.jobName}}
                          <Tag type="danger" v-if="item.interviewStatus ==0">面试中</Tag>
                          <Tag type="success" v-if="item.interviewStatus ==1">通过</Tag>
                          <Tag type="info" v-if="item.interviewStatus ==2">不通过</Tag>
                        </span>
                          <Button type="text">详情</Button>
                      </div>
                        <div class="handler">
                          <p>
                            {{item.handlerName}} | {{item.interviewTime | myDate}} {{interviewConst[item.interviewTurnAll]}}轮
                          </p>
                        </div>
                    </div>
                  </template>
                  <div class="interviewRecordList">
                    <li v-for="items in interviewRecordList[index].interviewTurnEntities">
                      <span class="interviewr">{{interviewConst[items.count]}}面：{{items.interviewerName}} </span><span>| {{items.interviewComment}}&nbsp;&nbsp;</span>
                      <el-rate :value='item.code' disabled show-score text-color="#ff9900"></el-rate>
                    </li>
                  </div>
                </Panel>
            </Collapse>
            </TabPane>
            <!-- 操作记录 -->
            <TabPane label="操作记录" name="5">
                <div class="operation" v-for="(item,index) in handnum" :key="index">
                          <p class="opertitle" v-if="item.action ==210001">{{index + 1}}. {{'移入'+item.operName+'阶段'}}</p>
                          <p class="opertitle" v-if="item.action ==210011">{{index + 1}}. {{'从人才库调转简历到到简历库'}}</p>
                          <p class="opertitle" v-if="item.action ==210002">{{index + 1}}. {{`移动简历进入人才库`}}</p>
                          <p class="opertitle" v-if="item.action ==210003">{{index + 1}}. {{`评价简历`}}</p>
                          <p class="opertitle" v-if="item.action ==210004">{{index + 1}}. <span v-if="item.jobName"> {{`发送面试通知,绑定新职位`+ item.jobName}}</span> <span v-else> {{`发送了面试通知`}}</span></p>
                          <p class="opertitle" v-if="item.action ==210005">{{index + 1}}. <span v-if="item.jobName"> {{`发送offer,绑定新职位`+ item.jobName}}</span> <span v-else> {{`发送了offer`}}</span></p>
                          <p class="opertitle" v-if="item.action ==210006">{{index + 1}}. {{`放弃简历,自动流转`}}</p>
                          <p class="opertitle" v-if="item.action ==210007">{{index + 1}}. {{`录入了简历`}}</p>
                          <p class="opertitle" v-if="item.action ==210008">{{index + 1}}. {{`简历到期,自动流转`}}</p>
                          <p class="opertitle" v-if="item.action ==210009">{{index + 1}}. {{`简历到期,自动进入人才库`}}</p>
                          <p class="opertitle" v-if="item.action ==210010">{{index + 1}}. {{`分配简历给${item.concatPeople}`}}</p>
                          <p class="opertitle" v-if="item.action ==210012">{{index + 1}}. {{`${item.detail}`}}</p>
                          <p class="oprtpeop">操作人：{{item.operUserName}} {{item.createTime|timeFormat}} </p>
                        </div>
            </TabPane>
          </Tabs>

        </div>
      </div>
    </div>
    <Spin fix v-if="isShowLoading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
import { searchDetail, download } from '../../api/resumeSearchApi/resumedetails'
import { instertingResume } from '../../api/resumeSearchApi/resumesearch'
import {
    talentTurn
  } from '../../api/resumeSearchApi/distribute'
import { dialRecords, score, interviewRecords } from '../../api/resumeApi/resumelist'
import detailresume from '../resumeSearch/detailresume'
import { downloaResumeFromother } from '../../api/resumeApi/download'
import { SEARCHINFO } from '../../json/search'
export default {
  data() {
    return {
      isShowLoading: true,
      activeName: `1`,
      detailsedetailed: {},
      isloading: false,
      jobNames: [],
      deptIds: [],
      callValueForm_map: {
        '240002': 'refuseReason',
        '240003': 'nextDialTime',
        '240004': 'disConnectReason'
      },
      detailinfo: {},
      interviewRecordList: [],  //  面试记录的列表
      deptId: '',
      callRecordList: [], //  拨打记录的list数据
      info1: '确定',
      path: '',
      isturn: false,
      downloadLoading: false,
      formLabelWidth: '120px',
      dialogVisible: false,
      value5: 3,
      dialogVisible1: false,
      interviewactiveName: '1',
      handnum: [],
      resumePath: '',
        // fileName: '',
      jobinto: { name: '', region: '' },
      interviewStatuType: {
        0: 'warning',
        1: 'success',
        2: 'info'
      },
      interviewConst: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五'
      },
      isInsting: 0,
      isInstFlag: true,
      esId: '',
      pathResun: ''
    }
  },
  components: {
    detailresume
  },
  filters: { // 编码转文字
    capitalize: function(value) {
      return SEARCHINFO[value]
    },
    myDate(value) {
      var values = ''
      if (!value) {
        values = new Date()
      } else {
        values = new Date(value)
      }
      var year = values.getFullYear()
      var month = values.getMonth() + 1
      var date = values.getDate()
        // var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][values.getDay()]
      var hour = values.getHours() < 10 ? '0' + values.getHours() : values.getHours()
      var minute = values.getMinutes() < 10 ? '0' + values.getMinutes() : values.getMinutes()
      var second = values.getSeconds() < 10 ? '0' + values.getSeconds() : values.getSeconds()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second + ' '
    }
  },
  mounted() {
    if (this.$route.query.t) {
      window.sessionStorage.setItem(`Authorization`, this.$route.query.t)
      window.sessionStorage.setItem(`token_type`, this.$route.query.token_type)
      window.sessionStorage.setItem('roleId', this.$route.query.roleId)
      window.sessionStorage.setItem('loginCount', this.$route.query.loginCount)
      window.sessionStorage.setItem('userName', this.$route.query.userName)
      window.sessionStorage.setItem('usernameEmail', this.$route.query.usernameEmail)
    }
    this.getSearchDetail()
  },
  methods: {
    getSearchDetail() {
      this.isShowLoading = true
      searchDetail({ platResumeId: this.$route.query.platResumeId, platId: this.$route.query.platId, platSeekerId: this.$route.query.platSeekerId }).then(res => {
        this.isShowLoading = false
        this.pathResun = res.result.downloadPdfPath
        this.detailsedetailed = res.result
        this.detailinfo = this.detailsedetailed
        this.get_Score()
        this.resumePath = res.result.resumePath
        this.isInsting = res.result.isBeInterested
        this.esId = res.result.esId
        if (res.result.isBeInterested === 0) {
          this.isInstFlag = true
        } else if (res.result.isBeInterested === 1) {
          this.isInstFlag = false
        }
        // this.fileName = res.result.resumeName
        if (this.detailsedetailed.workLengthMax < 10) {
          if (this.detailsedetailed.workLengthMax === this.detailsedetailed.workLengthMin) {
            if (!this.detailsedetailed.workLengthMax === `0`) {
              this.detailsedetailed.workLength === `未填写`
            } else {
              this.detailsedetailed.workLength = this.detailsedetailed.workLengthMax + `年`
            }
          } else {
            this.detailsedetailed.workLength = this.detailsedetailed.workLengthMin + `-` + this.detailsedetailed.workLengthMax + `年`
          }
        } else {
          this.detailsedetailed.workLength = '10年以上'
        }
        this.get_interviewRecords()
        this.get_DialRecords()
      })
    },
    getInsterting(key) {
      instertingResume({
        esId: this.esId,
        isBeInterested: key
      }).then(res => {
        if (res.code === 200) {
          if (key === 0) {
            this.isInstFlag = true
          } else if (key === 1) {
            this.isInstFlag = false
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    clickImg(val) { // 是否感兴趣感兴趣
      this.getInsterting(val)
    },
    downLoadResum() { // 下载简历
     // var url = config.baseURL + '/resume/resumeDownload?platResumeId=' + this.detailinfo.platResumeId + '&platId=10007' + '&platSeekerId=' + this.detailinfo.platSeekerId
      download({
        platResumeId: this.detailinfo.platResumeId,
        platId: '10007',
        platSeekerId: this.detailinfo.platSeekerId
      }).then(res => {
        if (res.indexOf('200') !== -1) {
          this.isInstFlag = false
          this.getInsterting(1)
          this.$message.success('下载成功')
        } else {
          this.$message.error(res.message)
        }
      })
      window.open(this.pathResun)
    },
    handleDownload() { // 获取联系方式 这
      this.$confirm('调转后简历将被移动到简历管理的待处理阶段，是否调转？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        var a = { list: [{ platResumeId: this.detailsedetailed.platResumeId, platSeekerId: this.detailsedetailed.platSeekerId, deptId: '', jobId: '' }] }
        var b = JSON.stringify(a)
        talentTurn(b).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            setTimeout(() => {
              this.$router.push({ path: 'resumeSearch' })
            }, 1000)
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    get_interviewRecords() {  //  请求面试记录列表
      interviewRecords({
          // resumeFlowId: this.detailsedetailed.resumeFlowId,
        resumeId: this.detailsedetailed.resumeId
      }).then(res => {
        this.interviewRecordList = res.result
      })
    },
    handleClick() {
    },
    get_DialRecords() {
      dialRecords({   //  拨打记录列表
        resumeId: this.detailsedetailed.resumeId,
        seekerId: this.detailsedetailed.seekerId
      }).then(res => {
        if (res.code === 200) {
          this.callRecordList = res.result
        }
      })
    },
    get_Score() {
      score({ seekerId: this.detailsedetailed.seekerId, resumeId: this.detailsedetailed.resumeId }).then(res => {
        this.handledata = res.result.filter(function(item) {
          return item.action === `210003`
        })
        this.handnum = res.result
      })
    },
    download() {
      var url = /\.[^\.]+$/.exec(this.resumePath)
      if (this.fileName) {
        downloaResumeFromother(this.resumePath, this.fileName)
      } else {
        downloaResumeFromother(this.resumePath, this.detailsedetailed.userName + url[0])
      }
    },
       // 返回按钮
    routertototal() {
        // history.go(-1)
      this.$router.push({ path: '/layout/resumeSearch' })
    }
  }
}
</script>
<style lang="scss" src='./style2.scss'>
</style>
