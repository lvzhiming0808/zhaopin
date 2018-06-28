<template>
<div class="interview">
  <div class="header-wrapper" >
      <img
        class="logo"
        :src="logo" />
  </div>
  <el-main>
     <div class="zpmain-wrapper">
       <header class="header1">
         <span>
           简历详情
         </span>
       </header>
			<!-- <zp-main></zp-main> -->
    <div class="resume">
     <div class="resumup">
      <div class="details-head">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">

                <div class="header">   <p>{{detailsedetailed.jobSeekerName}}<span>负责人：{{detailsedetailed.handleUserName}}</span> </p> </div>
            </div>
          </el-col>
          <el-col :span="23">
            <div class="grid-content bg-purple detail">
              <div class="leftheight">
                <div class="details-cont">
                  <el-row :gutter="20" class="mb12">
                      <el-col :span="21">
                        <div class="grid-content bg-purple wordbreak" >
                           <span class="fl">
                            投递职位：
                         </span>
                          <span v-for='item in detailsedetailed.jobList' class="work">
                             <span class="jobname">
                                {{item.jobName}}
                                </span>
                                <span   v-bind:class="{ 'publishState': item.publishState === '130002', 'timeout': item.publishState === '130001'|| item.publishState === '130003' || item.publishState === '130004' }">
                              {{item.publishState |codeformat}}
                                </span>
                          </span>
                        </div>
                          </el-col>
                </el-row>
                  <el-row style="clear: both">
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>性别：</span><span>{{detailsedetailed.sex|codeformat}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>期望地点：</span><span>{{detailsedetailed.expectPlace|| `未填写`}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>毕业院校：</span><span>{{detailsedetailed.university|| `未填写`}}</span></p>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>年龄：</span><span>{{detailsedetailed.age}}岁</span></p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>学历：</span><span>{{detailsedetailed.degree| codeformat}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>电话：</span><span>{{detailsedetailed.phone}}</span></p>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>工作经验：</span><span>{{detailsedetailed.workLength}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>专业：</span><span>{{detailsedetailed.major}}</span></p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>邮箱：</span><span>{{detailsedetailed.email}}</span></p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="personLiable1"> <span>简历类型： {{detailsedetailed.inWay|codeformat}}</span>&nbsp;&nbsp;渠道来源：<span>{{detailsedetailed.resumeFrom| codeformat}}</span></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="details-bottom1">
<el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 简历详情 -->
            <el-tab-pane label="简历详情" name="1">
              <detailresume :detailinfo='detailsedetailed' v-cloak v-if="detailsedetailed.inWay === `190002`||detailsedetailed.inWay === `190001`||detailsedetailed.inWay === `190005`"></detailresume>
              <iframe :src="path" v-cloak frameborder="0" id="pdfContainer" name="pdfContainer" class="pdf" v-else-if="path" ></iframe>
              <div v-else>
                <div class="photoBox" v-cloak>
                  <img class="photoBox_img" src="../../assets/404/404.png">
                  <p>
                简历暂时无法预览，请下载简历查看！
                  </p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="拨打记录" name="3">
              <div class="callRecord" v-for="item in callRecordList">
                <p class="callRecord_type">
                  <!-- item.dialResult === '240004'?'未接通':'接通' -->
                  <span>{{callmessage_map[item.dialResult]}}</span><span  v-if="item.dialResult != '240001'"
                  >{{item.dialResult === '240003'?myDate(item[callValueForm_map[item.dialResult]]) : '&nbsp;&nbsp;' + (item[callValueForm_map[item.dialResult]] || '')}}</span>
                </p>
                <p class="callRecord_man">
                  <span>{{item.dialPersonName}}</span><span
                  >{{item.createdDate | myDate}}</span>
                </p>
              </div>
              <!-- 拨打记录弹窗部分 -->
            </el-tab-pane>
            <!-- 面试记录 -->
            <el-tab-pane label="面试记录" name="4">
    <el-collapse v-model="interviewactiveName" accordion v-if="interviewRecordList.length" >
    <el-collapse-item v-for="(item, index) in interviewRecordList" :key="item.id"  :name="index" class="interviewRecordList111">
    <template slot="title">
      <div class="interviewjob_box">
        <div class="interviewjob">
          <span>
          招聘职位：{{item.jobName}}
          </span>
            <el-tag type="danger" v-if="item.interviewStatus ==0">面试中</el-tag>
            <el-tag type="success" v-if="item.interviewStatus ==1">通过</el-tag>
            <el-tag type="info" v-if="item.interviewStatus ==2">不通过</el-tag>
            <el-button type="text">详情</el-button>
            <!-- <el-button type="text" v-if="item.interviewStatus == '0'" @click.stop="endingInterview(index)" >结束面试</el-button>
            <el-button type="text" v-if="item.interviewStatus == '0'" @click.stop="interRecordIndex(index)" >添加面试</el-button> -->
        </div>
          <div class="handler">
            <p>
              {{item.handlerName}} | {{item.interviewTime | myDate}} {{interviewConst[item.interviewTurnAll]}}轮
            </p>
          </div>
      </div>
    </template>
    <div class="interviewRecordList">
      <li v-for="(items,indexs) in interviewRecordList[index].interviewTurnEntities">
        <span class="interviewr">{{interviewConst[items.count]}}面：{{items.interviewerName}} </span>
        <div class="interscore" v-if="items.result != '0'">
          <span>| {{items.interviewComment}}&nbsp;&nbsp;</span>
          <el-rate :value='items.score' disabled show-score text-color="#ff9900"></el-rate>
        </div>
        <span class="feedbackTime">{{items.feedbackTime | myDate}}</span>
        <p class="interview_del">{{items.interviewTime | myDate}}
          <span>
            <i v-if="items.isFeedback == '1'&& items.interviewerId==interviewrId && items.result != '3' " @click="addinterFeed_index(index,indexs)" >反馈</i>
            <!-- <i v-if="items.isFeedback == '0' && items.result == '0'"  @click="delInterview(index,indexs)">删除面试</i> -->
          </span>
        </p>
      </li>
    </div>
    </el-collapse-item>
    </el-collapse>
    <!-- 添加面试记录的弹窗面试记录的弹窗 -->
      <!-- 反馈弹窗部分 -->
            <el-dialog
        class="interFeed_head"
        title="面试反馈"
        :visible.sync="interFeedVisible"
        width="30%"
        center>
        <el-form :model="interFeedFrom" label-width="120px" class="demo-ruleForm">
          <!-- :rules="interRules" ref="interFeedRef" -->
        <div  class="interFeed_body">
            <el-form-item label="到访" prop="visited">
              <el-radio-group v-model="interFeedFrom.visited">
                <el-radio label="1">到访</el-radio>
                <el-radio label="0">未到访</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="评分" prop="code">
            <el-rate show-text v-model="interFeedFrom.code" :texts='texts'></el-rate>
            </el-form-item>
            <el-form-item label="面试反馈(选填)" prop="feedRecord">
            <el-input :maxlength="500" :rows="4" type="textarea" v-model="interFeedFrom.feedRecord"></el-input>
            </el-form-item>
        </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="interFeed(1)">通  过</el-button>
          <el-button type="primary" @click="interFeed(2)">不通过</el-button>
        </span>
      </el-dialog>
            </el-tab-pane>
            <!-- 操作记录 -->
            <el-tab-pane label="操作记录" name="5">
                <div class="operation" v-for="(item,index) in handnum" :key="index">
                          <p class="opertitle" v-if="item.action ==210001">{{index + 1}}. {{'移入'+item.operName+'阶段'}}</p>
                          <p class="opertitle" v-if="item.action ==210011">{{index + 1}}. {{'从人才库调转简历到到简历库'}}</p>
                          <p class="opertitle" v-if="item.action ==210002">{{index + 1}}. {{`移动简历进入人才库`}}</p>
                          <p class="opertitle" v-if="item.action ==210003">{{index + 1}}. {{`评价简历`}}</p>
                          <p class="opertitle" v-if="item.action ==210004">{{index + 1}}. <span v-if="item.jobName"> {{`发送面试通知,绑定新职位`+ item.jobName}}</span> <span v-else> {{`发送了面试通知`}}</span></p>
                          <!-- <p class="opertitle" v-if="item.action ==210004 && itm">{{index + 1}}. {{`发送了面试通知`}}</p> -->
                          <p class="opertitle" v-if="item.action ==210005">{{index + 1}}. <span v-if="item.jobName"> {{`发送offer,绑定新职位`+ item.jobName}}</span> <span v-else> {{`发送了offer`}}</span></p>
                          <p class="opertitle" v-if="item.action ==210006">{{index + 1}}. {{`放弃简历,自动流转`}}</p>
                          <p class="opertitle" v-if="item.action ==210007">{{index + 1}}. {{`录入了简历`}}</p>
                          <p class="opertitle" v-if="item.action ==210008">{{index + 1}}. {{`简历到期,自动流转`}}</p>
                          <p class="opertitle" v-if="item.action ==210009">{{index + 1}}. {{`简历到期,自动进入人才库`}}</p>
                          <p class="opertitle" v-if="item.action ==210010">{{index + 1}}. {{`分配简历给${item.concatPeople}`}}</p>
                          <p class="opertitle" v-if="item.action ==210012">{{index + 1}}. {{`${item.detail}`}}</p>
                          <p class="oprtpeop">操作人：{{item.operUserName}} {{item.createTime|timeFormat}} </p>
                        </div>
            </el-tab-pane>
          </el-tabs>
          <div class="downrum" @click="download">
            <el-button type="primary" size="mini"><i class="el-icon-download"></i>下载简历</el-button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!-- <router-view :key="key"></router-view> -->
  </div>
  </el-main>

</div>
</template>
<script>
import { downloaResumeFromother } from '../../api/resumeApi/download'
import { detailinterviewr, score, interviewRecords, dialRecords, saveInterviewTurn } from '../../api/resumeApi/resumelist'
import { insertDialRecord } from '../../api/resumeApi/resumelist'
import detailresume from '../../views/resumeSearch/detailresume.vue'
export default {
  mounted() {
    // 在这里定义一个参数进行设置token
    this.interviewrId = this.$route.query.interviewrId
    if (this.$route.query.token) {
      window.sessionStorage.setItem(`Authorization`, this.$route.query.token)
      window.sessionStorage.setItem(`token_type`, `bearer`)
      this.activeName = this.$route.query.tabIndex
    }
    detailinterviewr({
      resumeId: this.$route.query.resumeId,
      seekerId: this.$route.query.seekerId
    }).then(res => {
      if (res.code === -1) {
        return false
      }
      if (res.result.resumeDetail) {
        this.detailsedetailed = JSON.parse(res.result.resumeDetail)
      }
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
      this.detailsedetailed = res.result
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
      this.fileName = res.result.resumeName
      this.path = res.result.pdfPath
        // 下载用的简历地址
      this.resumePath = res.result.resumePath
      score({ seekerId: this.detailsedetailed.seekerId, resumeId: this.detailsedetailed.resumeId }).then(res => {
        this.handledata = res.result.filter(function(item) {
          return item.action === `210003`
        })
        this.handnum = res.result
      })
      this.get_interviewRecords()
      this.get_DialRecords()  //  拨打记录
    })
  },
  data() {
    return {
      a: '',
      interviewrId: '',
      handnum: [],
      interviewactiveName: '4',
      texts: ['差', '差', '良', '良', '优'], //  评分显示文字
      activeName: '1',
      interviewRecordList: [],  //  面试记录的列表
      callRecordVisible: false, //  拨打记录弹窗
      callRecordRadio: 'callValue1', //  拨打记录的选项值
      callRecordList: [], //  拨打记录的list数据
      detailsedetailed: {},
      interRecordVisible: false, //  添加面试弹窗
      interFeedVisible: false, // 反馈弹窗
      InterviewPeople: {  //  添加记录面试官信息
        interviewerName: '',
        interviewerId: ''
      },
      interFeedFrom: {},  //  面试反馈
      interviewTimeDate: '',  //  面试时间
      add_interRecordIndex: '', //  添加面试的索引
      interFeed_index: {  //  存储反馈索引
        val: '',
        vals: ''
      },
      path: '',
      callValueForm: {
        '240002': '', //  拨打记录、拒绝面试
        '240003': '', //  拨打记录、再联系
        '240004': '' //  拨打记录、未接通
      },
      callValueForm_map: {
        '240002': 'refuseReason',
        '240003': 'nextDialTime',
        '240004': 'disConnectReason'
      },
      callmessage_map: {
        '240001': '确认面试',
        '240002': '拒绝面试',
        '240003': '再联系',
        '240004': '未接通'
      },
      calloptions: [  //  拒绝面试
        ['距离太远', '距离太远'],
        ['已确定工作计划', '已确定工作计划'],
        ['薪资太低', '薪资太低'],
        ['职业规划', '职业规划'],
        ['其它', '其它']
      ],
      calloptions2: [ //  未接通
        ['对方未接', '对方未接'],
        ['关机', '关机'],
        ['对方拒接', '对方拒接'],
        ['空号', '空号'],
        ['不在服务区', '不在服务区']
      ],
      interviewConst: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五'
      },
      interviewStatu: {
        0: '面试中',
        1: '通过',
        2: '不通过'
      },
      interviewStatuType: {
        0: 'warning',
        1: 'success',
        2: 'info'
      },
      options2: [
        {
          // 人才分类
          value: 150001,
          label: '一般人才'
        },
        {
          value: 150002,
          label: '高级人才'
        }
      ],
      talentpool: '',
      options3: [
        {
          // 人才库类型
          value: 160001,
          label: '人才储备'
        }
        // {
        //   value: 160002,
        //   label: '已淘汰'
        // },
        // {
        //   value: 160003,
        //   label: '黑名单'
        // }
      ],
      reason: '',
      options4: [
        {
          // 入库原因
          value: 170001,
          label: '综合条件不匹配'
        },
        {
          value: 170002,
          label: '薪酬不匹配'
        },
        {
          value: 170003,
          label: '候选人放弃'
        },
        {
          value: 170004,
          label: '职位已下架'
        },
        {
          value: 170005,
          label: '无法联系'
        },
        {
          value: 170006,
          label: '材料不充足'
        },
        {
          value: 170007,
          label: '人员储备'
        },
        {
          value: 170008,
          label: '背景不匹配'
        },
        {
          value: 170009,
          label: '其他'
        }
      ],
      logo: require('@/assets/logo.png')
    }
  },
  components: {
    detailresume
  },
  filters: {
    myDate(val) {
      if (!val) {
        return
      }
      var values = new Date(val)
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
  methods: {
    // tab切换
    handleClick(tab, event) {
    },
    interFeed(e) {  //  反馈操作
      saveInterviewTurn({
        isVisit: this.interFeedFrom.visited,
        score: this.interFeedFrom.code,
        interviewComment: this.interFeedFrom.feedRecord,
        result: e,
        id: this.interviewRecordList[this.interFeed_index.val].interviewTurnEntities[this.interFeed_index.vals].id,
        interviewRecordId: this.interviewRecordList[this.interFeed_index.val].id,
        count: this.interviewRecordList[this.interFeed_index.val].interviewTurnEntities[this.interFeed_index.vals].count,
        resumeId: this.interviewRecordList[this.interFeed_index.val].resumeId,
        operUserId: this.interviewRecordList[this.interFeed_index.val].handlerId,
        seekerId: this.$route.query.seekerId,
        resumeFlowId: this.detailsedetailed.resumeFlowId,
        seekerName: this.detailsedetailed.jobSeekerName,
        jobName: this.interviewRecordList[this.interFeed_index.val].jobName,
        interviewerName: this.interviewRecordList[this.interFeed_index.val].interviewTurnEntities[this.interFeed_index.vals].interviewerName
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '反馈成功',
            type: 'success'
          })
          this.interFeedVisible = false
          this.get_interviewRecords()
          for (var key in this.interFeedFrom) {
            this.interFeedFrom[key] = ''
          }
        } else {
          this.$message({
            message: '反馈失败',
            type: 'error'
          })
        }
      })
    },
    get_DialRecords() {
      dialRecords({   //  请求拨打记录列表
        resumeId: this.resumeId,
        seekerId: this.seekerId
      }).then(res => {
        if (res.code === 200) {
          this.callRecordList = res.result
        }
      })
    },
    get_interviewRecords() {  //  请求面试记录列表
      interviewRecords({
        resumeFlowId: this.detailsedetailed.resumeFlowId,
        resumeId: this.detailsedetailed.resumeId
      }).then(res => {
        this.interviewRecordList = res.result
      })
    },
    addinterFeed_index(val, vals) {
      this.interFeed_index = {
        val: val,
        vals: vals
      }
      this.interFeedVisible = true
    },
    add_callRecord() {  //  添加拨打记录
      insertDialRecord({
        resumeId: this.resumeId,
        seekerId: this.seekerId,
        dialResult: this.callRecordRadio,
        dialPersonId: window.sessionStorage.roleId,
        dialPersonName: window.sessionStorage.userName,
        refuseReason: this.callValueForm['240002'],
        nextDialTime: new Date(this.callValueForm['240003'] || 1970 - 1 - 1).getTime(),
          // this.callValueForm['240003'] || 1970 - 1 - 1
        disConnectReason: this.callValueForm['240004']
      }).then(res => {
        if (res.code === 200) {
          this.callRecordVisible = false
          this.get_DialRecords()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      })
    },
    download() {
      var url = /\.[^\.]+$/.exec(this.resumePath)
      if (this.fileName) {
        downloaResumeFromother(this.resumePath, this.fileName)
      } else {
        downloaResumeFromother(this.resumePath, this.detailsedetailed.jobSeekerName + url[0])
      }
    }
  }
}
</script>
<style lang="scss" scoped src='./style3.scss'>
</style>

