<template>
  <div class="home-wrapper" id="homeMenu">
    <div class="home-wrapper-head" id="dataStatistics">
      <span class="home-wrapper-head-text">数据统计</span>
      <div class="toggle-week">
        <Button id="home_Tswkdata" ref="tsweek" :class="isWeekFlag==='tsweek' ? 'butbg' : ''" @click="tsweek">本周</Button>
        <Button id="home_Lastwkdata" :class="isWeekFlag==='lsweek' ? 'butbg' : ''" ref='lsweek' @click="lsweek">上周</Button>
      </div>
    </div>
    <div class="data-charts">
      <div class="ivu-row">
        <div v-for="(item,index) in datasum" :key="'datasum'+index" class="ivu-col ivu-col-span-xs-24 ivu-col-span-sm-12 ivu-col-span-md-6">
          <router-link :to="{path:item.url}">
            <div class="ivu-card ivu-card-bordered">
              <div class="ivu-card-body">
                <div class="infor-card-con">
                  <div class="infor-card-icon-con ivu-col ivu-col-span-8">
                    <div class="height-100 ivu-row-flex ivu-row-flex-middle ivu-row-flex-center">
                      <icon-svg class="ivu-icon" :icon-class='item.icon'/>
                    </div>
                  </div> 
                  <div class="height-100 ivu-col ivu-col-span-16 ivu-col2">
                    <div class="height-100 ivu-row-flex ivu-row-flex-middle ivu-row-flex-center">
                        <div class="infor-card-count user-created-count">
                          <p class="text-p">
                            <span id="user_created_count">{{item.num}}</span>
                            <span></span>
                          </p>
                          <p class="infor-intro-text">{{item.cardName}}</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div> 
      </div>
    </div>
    <div class="date-charts" id="calendar">
      <span class="date-head-text">日程表</span>
      <div class="date-main">
        <Row>
            <Col span="12">
              <div class="grid-content bg-purple choice">
                <div class="block checkdate">
                  <DatePicker 
                      type="date" 
                      placeholder="选择日期" 
                      v-model="value1" 
                      style="width: 200px"  
                      @on-change="value1Change(2)">
                  </DatePicker>
                </div>
                <div class="godate">
                  <Button @click="godate(1)" type="ghost"> <Icon type="refresh"></Icon>返回今天</Button>
                </div>
              </div>
            </Col>
        </Row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <div class="clear">
                <vue-event-calendar
                  id="home_allEvent"
                  :events="demoEvents"
                  @day-changed="handleDayChanged"
                  @month-changed="handleMonthChanged">
                </vue-event-calendar>
                <div class="ceear_occupy" v-show="home_occupy">
                  <img src="../../assets/img_zhanwei.png" width="26%" style="position: absolute;top: 3px;right: 12%;">
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 引导页 -->
    <div class="guide-page">
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        >
        <div>
          <ul>
            <li v-show="guideFirst">
              <div class="guide-main">
                <div class="guide-top">
                  <img src="../../assets/guide-page1.png" alt="">
                </div>
                <div class="guide-bot">
                  <h1>消息通知</h1>
                  <h3>随时关注消息提醒，以免好的人才流走哦～</h3>
                  <el-button @click="nextPageFirst" type="primary">下一步</el-button>
                  <dl>
                    <dt class="active"></dt>
                    <dt></dt>
                    <dt></dt>
                    <dt></dt>
                  </dl>
                </div>
              </div>
            </li>
            <li v-show="guideSecond">
              <div class="guide-main">
                <div class="guide-top">
                  <img src="../../assets/guide-page2.png" alt="">
                </div>
                <div class="guide-bot">
                  <h1>职位管理</h1>
                  <h3>戳这里一键发布职位到各大招聘网站，坐等主投高质简历</h3>
                  <el-button @click="nextPageSecond" type="primary">下一步</el-button>
                  <dl>
                    <dt ></dt>
                    <dt class="active"></dt>
                    <dt></dt>
                    <dt></dt>
                  </dl>
                </div>
              </div>
            </li>
            <li v-show="guideThird">
              <div class="guide-main">
                <div class="guide-top">
                  <img src="../../assets/guide-page3.png" alt="">
                </div>
                <div class="guide-bot">
                  <h1>简历搜寻</h1>
                  <h3>各大招聘网站任你搜，速速下载简历吧</h3>
                  <el-button @click="nextPageThird" type="primary">下一步</el-button>
                  <dl>
                    <dt ></dt>
                    <dt ></dt>
                    <dt class="active"></dt>
                    <dt></dt>
                  </dl>
                </div>
              </div>
            </li>
            <li v-show="guideFourth">
              <div class="guide-main">
                <div class="guide-top">
                  <img src="../../assets/guide-page4.png" alt="">
                </div>
                <div class="guide-bot">
                  <h1>简历管理</h1>
                  <h3>简历太多太杂？不要慌，自动整合去重，让你的简历流动起来</h3>
                  <el-button  @click="nextPageFourth"  type="primary">立即体验</el-button>
                  <dl>
                    <dt ></dt>
                    <dt ></dt>
                    <dt></dt>
                    <dt class="active"></dt>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
    <Spin fix v-if="isShowLoading"  style="position: absolute;">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
import { getHomeInfo, getIncidentByDate } from '../../api/homeApi/home'
export default {
  data() {
    return {
      isShowLoading: true,
      value1: new Date(), //  当前时间
      demoEvents: [ //  日历展示数据的格式
        // {
        //   date: '2017/11/29',
        //   title: '面试',
        //   desc: '张三-产品经理'
        // }
      ],
      datasum: [],  //  存储数据统计数据
      dialogVisible: false,
      guideFirst: true,
      guideSecond: false,
      guideThird: false,
      guideFourth: false,
      home_occupy: false,
      isFlag: false,
      isWeekFlag: 'tsweek',
      month2: '',
      str3: '',
      a: 'home_zxs'
    }
  },
  created() {
    this.isFlag = true
    this.isShowLoading = true
    getHomeInfo({ type: 1 }).then(res => {  //  获取本周数据
      this.isShowLoading = false
      this.datasum = res.result
    })
    this.godate() //  显示当天的事项
    this.guide()  //  引导页的方法
  },
  mounted() {
    if (this.demoEvents.length === 0) {
      this.home_occupy = true
    } else {
      this.home_occupy = false
    }
    this.date_hover()
  },
  methods: {
    guide() { // 引导页
      if (sessionStorage.getItem('loginCount') === '0') {
        this.dialogVisible = true
      } else {
        this.dialogVisible = false
      }
    },
    date_hover() {  //  修改日历控件的hover，click功能
      this.$nextTick(() => {
        var date_num = document.querySelectorAll('.date-num')
        for (var i = 0; i < date_num.length; i++) {
          date_num[i].parentNode.classList.remove('date_num_hover')
          date_num[i].classList.remove('date_num_active')
          date_num[i].onclick = ''
          if (/[0-9]/.test(date_num[i].innerText)) {
            date_num[i].parentNode.classList.add('date_num_hover')
            // date_num[i].parentNode.children.classList.remove('date_num_active')
            date_num[i].onclick = function() {
              var date_nums = document.querySelectorAll('.date_num_active')
              for (var i = 0; i < date_nums.length; i++) {
                date_nums[i].classList.remove('date_num_active')
              }
              this.classList.add('date_num_active')
              this.setAttribute('data-attr', this.innerText)
            }
          }
        }
      })
    },
    crtTimeFtt(val) { //  格式化时间,展示数据渲染的时候使用
      var date = new Date(val)
      return (
        date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      )
    },
    handleMonthChanged(month) { // 发送数据请求当前哪些天有demoevent数据并渲染
      this.getByDate(month)
      this.date_hover()
    },
    handleDayChanged(day) { // 发送请求获取当前的天的数据  传递date
      this.$EventCalendar.toDate(day.date)
      if (day.events.length > 0) {
        this.home_occupy = false
      } else {
        this.home_occupy = true
      }
    },
    value1Change(val) {
      // 日历下拉选择时间
      var year = this.value1.getFullYear()
      var month = this.value1.getMonth() + 1
      this.month2 = this.value1.getMonth() + 1
      if (month.toString().length === 1) {
        month = '0' + month
      }
      var day = this.value1.getDate()
      var str = year + '/' + month + '/' + day
      this.str3 = year + '/' + this.month2 + '/' + day
      var str2 = year + '-' + month
      this.getByDate(str2, val).then(res => {
        if (res) {
          this.$EventCalendar.toDate(str)
          this.date_hover()
        }
      })
    },
    godate(val) {  //  这里是返回今天
      var data = new Date()
      var year = data.getFullYear()
      var month = data.getMonth() + 1
      this.month2 = data.getMonth() + 1
      if (month.toString().length === 1) {
        month = '0' + month
      }
      var day = data.getDate()
      var str = year + '/' + month + '/' + day
      this.str3 = year + '/' + this.month2 + '/' + day
      var str2 = year + '-' + month
      this.getByDate(str2, val).then((res) => {
        if (res) {
          this.$EventCalendar.toDate(str)
          this.date_hover()
        }
      })
    },
    tsweek() {  //  请求本周数据
      this.isShowLoading = true
      this.isWeekFlag = 'tsweek'
      getHomeInfo({ type: 1 }).then(res => {
        this.isShowLoading = false
        if (res.code === 200) {
          this.datasum = res.result
        } else {
          this.$message.error(res.message)
        }
      })
      //  发送数据请求获取本周的数据做限制判断数据是否已经是本周的数据如果是就跳出不请求
    },
    lsweek() {  //  请求上周数据
      this.isShowLoading = true
      this.isWeekFlag = 'lsweek'
      getHomeInfo({ type: 0 }).then(res => {
        this.isShowLoading = false
        if (res.code === 200) {
          this.datasum = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getByDate(date, val) { //  获取月数据
      var mounthNow = new Promise((resolve, reject) => {
        getIncidentByDate({ date: date }).then(res => {
          var dateObj = []
          res.forEach(element => {
            dateObj.unshift({
              date: this.crtTimeFtt(element.time),
              title: element.incidentName,
              desc: element.person + '-' + element.jobName
            })
          })
          this.demoEvents = dateObj
          if (this.isFlag) {
            for (let i = 0, length1 = this.demoEvents.length; i < length1; i++) {
              if (this.demoEvents[i].date === this.str3) {
                this.home_occupy = false
                break
              } else {
                this.home_occupy = true
              }
            }
          } else {
            if (val === 1) {
              for (let i = 0, length1 = this.demoEvents.length; i < length1; i++) {
                if (this.demoEvents[i].date === this.str3) {
                  this.home_occupy = false
                  break
                } else {
                  this.home_occupy = true
                }
              }
            } else if (val === 2) {
              for (let i = 0, length1 = this.demoEvents.length; i < length1; i++) {
                if (this.demoEvents[i].date === this.str3) {
                  this.home_occupy = false
                  break
                } else {
                  this.home_occupy = true
                }
              }
            } else {
              this.demoEvents.length > 0 ? this.home_occupy = false : this.home_occupy = true
            }
          }
          this.isFlag = false
          resolve('true')
        })
      })
      return mounthNow
    },
    nextPageFirst() {
      this.guideFirst = false
      this.guideSecond = true
    },
    nextPageSecond() {
      this.guideSecond = false
      this.guideThird = true
    },
    nextPageThird() {
      this.guideThird = false
      this.guideFourth = true
    },
    nextPageFourth() {
      this.guideFourth = false
      this.dialogVisible = false
      sessionStorage.setItem('loginCount', '1')
    }
  }
}
</script>
<style lang="scss" src="./home.scss"></style>
<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>

