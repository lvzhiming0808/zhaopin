<template>
<div class="main" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
       <div slot="top" class="logo-con">
        <img v-show="!shrink"  src="../../assets/logo.png" key="max-logo" />
        <img v-show="shrink" src="../../assets/logo-min.png" key="min-logo" />
      </div>
      <SideBar></SideBar>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
        <div class="main-header">
            <div class="navicon-con">
                <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-180' : '0') + 'deg)'}" type="text" @click="toggleClick">
                  <icon-svg icon-class='layoutopen' style="font-size:16px;"/>
                </Button>
            </div>
            <div class="header-middle-con">
                <div class="publishChannelsBody-wrapper">
                    <div class="publishChannelsBody" v-for="(items,ind) in jobChannels" :key="ind" @click="LoginUP(items.loginStatus,items.platId,items.account)" :class="{disableds:items.loginStatus!==400}">
                        <span class="publishChannel_51 publishChannels" v-show="items.platId==='10005'">51</span>
                        <span class="publishChannel_zhi publishChannels" v-show="items.platId==='10001'">智</span>
                        <span class="publishChannel_Boss publishChannels" v-show="items.platId==='10004'"><i>Boss</i></span>
                        <span class="publishChannel_lie publishChannels" v-show="items.platId==='10003'">猎</span>
                        <span class="publishChannel_58 publishChannels" v-show="items.platId==='10002'">58</span>
                        <!-- <span class="publishChannel_lagou publishChannels" v-show="items.platId==='10006'"><i>拉勾</i></span> -->
                        <!-- <div>{{items.channelStatus|channelStatus}}</div> -->
                        <b :style="items.loginStatus|channelStatus"></b>
                    </div>
                </div>
            </div>
            <div class="header-avator-con">
                <div class="message-con" @click="messagekai">
                    <Tooltip :content="'您有'+result+'条未读消息'"  placement="bottom">
                        <Badge :count="result" dot>
                            <Icon type="ios-bell" :size="22"></Icon>
                        </Badge>
                    </Tooltip>
                </div>
                <div class="user-dropdown-menu-con">
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown transfer trigger="click">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ userName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                              <router-link to="/login">
                                <DropdownItem name="ownSpace">退出登录</DropdownItem>
                              </router-link>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                </div>
            </div>
        </div>
      <div class="Iscrller">
        <NavBar></NavBar>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
        <div class="single-page">
          <zp-main></zp-main>
        </div>
    </div> 
    <Modal
        v-model="modal1"
        :mask-closable="false"
        :title="this.plantId|statusPlant">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="140" v-if="needPhone">
            <FormItem label="手机号：" prop="phone">
                <Input type="text" v-model="formCustom.phone" style="width:265px" :disabled="this.num!==''"></Input>
            </FormItem>
            <FormItem label="短信验证：" prop="passCode">
               <Input v-model="formCustom.passCode" style="width:265px" placeholder="请输入验证码">
                  <Button slot="append" v-if="show" @click="getCode"  style="background: #2d8cf0; color:#fff;height:auto">{{infoMessage}}</Button>
                  <!-- <Button slot="append" v-show="show" @click="getCode"  style="background: #2d8cf0; color:#fff;height:auto">重新发送</Button> -->
                  <span slot="append" v-else class="count" @click="revertSend">{{count}} 秒</span>
              </Input>
              <!-- <p style="color:red">{{codeMessage}}</p> -->
            </FormItem>
        </Form>
        <div class="error" v-if="needError">{{this.plantId|statusPlant1}}渠道账号异常，请联系管理员</div>
        <div slot="footer" :class="{centers:needError===true}">
            <Button type="text" size="large" @click="modal1=false" v-if="needPhone===true">取消</Button>
            <Button type="primary" size="large" @click="ok('formCustom')">确定</Button>
        </div>
         <Spin fix v-if="isShowLoading" style="position: absolute;">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
    </Modal>
</div>
</template>
<script>
import { ZpMain } from '@/views/layout'
import BackToTop from '@/components/BackToTop'
import { magessnum } from '../../api/resumeSearchApi/total.js'
import { loginUserInfo, channelLogin, AccountLogin, AccountLoginResult, sendAuthCode, AuthCodeResult } from '../../api/loginApi/user.js'
import { GLOBALROUTE } from '../../json/globalLeftRoute'
import SideBar from '@/components/sidebar.js'
import NavBar from '@/components/navbar.js'
export default {
  name: 'layout',
  components: {
    ZpMain,
    BackToTop,
    SideBar,
    NavBar
  },
  data() {
    const validatephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入'))
      }
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码'))
      }
      if (!/^[0-9]+$/.test(value) && value !== '') {
        callback(new Error('必须为数字'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        if (!/^[0-9]+$/.test(value)) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
    }
    return {
      count: '',
      codeMessage: '',
      infoMessage: '发送验证码',
      show: true,
      isShowLoading: false,
      modal1: false,
      plantId: '',
      account: '',
      valStatus: '',
      needError: false,
      needPhone: false,
      okButton: false,
      formCustom: {
        phone: '',
        passCode: ''
      },
      ruleCustom: {
        phone: [
          { required: true, validator: validatephone, trigger: 'blur' }
        ],
        passCode: [
          { required: true, validator: validateCode, trigger: 'blur' }
        ]
      },
      jobChannels: [],
      currentNavPath: '',
      navArr: [
        {
          name: '主页',
          fullPath: '/layout/home',
          path: '/layout/home',
          fromPath: ''
        }
      ],
      isPathFlag: false,
      result: '',
      active: '',
      route_arr: [],
      open: [],
      value: '',
      userName: sessionStorage.getItem('userName'),
      activeIndex: '/',
      isnav_secondary: false,
      iscollapse: false,
      isaccount: 0,
      myBackToTopStyle: {
        right: '50px',
        bottom: '150px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1' // 按钮的背景颜色
      },
      theme: 'dark',
      shrink: false,
      urlList: [],
      num: ''
    }
  },
  filters: {
    channelStatus(status) {
   //   0：未绑定，200：已登录，201：登录中，400：离线
      switch (status) {
        case 400:
          return 'background:red'// 红色，掉线
        case 200:
          return 'background:green'
        case 0:
          return 'background:#ccc'
        case 201:
          return 'background:#FACD48'
        default :
          return 'background:green'
      }
    },
    statusPlant(status) {
      switch (status) {
        case '10001':
          return '智联招聘断线重连'
        case '10002':
          return '58同城断线重连'
        case '10003':
          return '猎聘断线重连'
        case '10004':
          return 'BOSS直聘断线重连'
        case '10005':
          return '前程无忧断线重连'
        case '10006':
          return '拉勾网断线重连'
      }
    },
    statusPlant1(status) {
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
  beforeMount() {
    this.getActive(this.$route.name)
    channelLogin().then(res => {
      this.jobChannels = res.result
    })
  },
  mounted() {
    magessnum({
      readStatus: 0
    })
    .then(res => { })// 消息数量
    var b
    a()
    var it = this
    // 解决轮询消息登陆页报错问题
    function a() {
      b = setInterval(() => {
        if (window.location.hash === '#/login') {
          clearInterval(b)
          return false
        }
        channelLogin().then(res => {
          it.jobChannels = res.result
         // console.log('渠道登录状态轮询', it.jobChannels)
        })
        magessnum({
          readStatus: 0
        }).then(res => {
          // 消息数量
          it.result = res.result
        })
      }, 3000)
    }
    loginUserInfo().then(res => {
      this.urlList = res.result.loginUser.sysResources
    })
    this.isaccount = sessionStorage.getItem('roleId')
  },
  watch: {
    '$route': 'getPath'  // 监听事件
  },
  methods: {
    LoginUP(val, id, account) {
      this.formCustom.phone = ''
      this.formCustom.passCode = ''
      if (val === 400) {
       // this.modal1 = true
        this.plantId = id
        this.valStatus = val
        this.account = account
        AccountLogin({
          'account': account,
          'platId': id,
          'mobile': '',
          'smsCode': ''
        }).then(res => {
          if (res.code === 200) {
            this.modal1 = true
            this.isShowLoading = true
            this.getLoginResult()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    getLoginResult() {
      var timer = null
      timer = setInterval(() => {
        if (window.location.hash === '#/login') {
          clearInterval(timer)
          return false
        }
        AccountLoginResult(this.plantId, this.account).then(res => {
          if (res.code === 500) {
            this.isShowLoading = false
           // this.$message.error(res.message)
            this.needError = true
            this.needPhone = false
            clearInterval(timer)
          } else if (res.code === 200) {
            this.$message.success('登录成功')
            this.isShowLoading = false
            this.modal1 = false
            clearInterval(timer)
          } else if (res.code === 202) {
            this.num = res.result.phoneNum
            this.formCustom.phone = res.result.phoneNum
            this.isShowLoading = false
            this.needError = false
            this.needPhone = true
            clearInterval(timer)
          } else if (res.code === 201) {
            this.isShowLoading = true
          }
        })
      }, 3000)
    },
    revertSend() {
      if (this.infoMessage === '重新发送') {
        this.show = false
        this.getCode()
      }
    },
    getAuthCode() {
      var timer1 = null
      timer1 = setInterval(() => {
        if (window.location.hash === '#/login') {
          clearInterval(timer1)
          return false
        }
        AuthCodeResult(this.plantId, this.formCustom.phone).then(res => {
          if (res.code === 500) {
            this.okButton = false
            this.show = true
            this.isShowLoading = false
            this.$message.error(res.message)
            this.infoMessage = '重新发送'
            clearInterval(timer1)
          } else if (res.code === 200) {
            this.isShowLoading = false
            this.okButton = true
            this.$message.success('验证码发送成功')
            clearInterval(timer1)
          } else if (res.code === 201) {
            this.isShowLoading = true
          } else {
            this.isShowLoading = true
          }
        })
      }, 3000)
    },
    ok(name) {
      if (this.needError === true) {
        this.modal1 = false
      } else {
        if (this.num === '') {
          this.$refs[name].validate((valid) => {
            if (valid) {
              if (this.okButton === false) {
                this.$message.warning('请先获取验证码')
                return false
              } else {
                if (this.formCustom.phone !== '' && this.formCustom.passCode !== '' && this.okButton === true) {
                  this.isShowLoading = true
                  AccountLogin({
                    'account': this.account,
                    'platId': this.plantId,
                    'mobile': this.formCustom.phone,
                    'smsCode': this.formCustom.passCode
                  }).then(res => {
                    if (res.code === 200) {
                      this.getOkLoginResult()
                    } else {
                      this.isShowLoading = false
                      this.$message.error(res.message)
                    }
                  })
                }
              }
            }
          })
        } else {
          if (this.okButton === false) {
            this.$message.warning('请先获取验证码')
            return false
          } else {
            if (this.formCustom.phone !== '' && this.formCustom.passCode !== '' && this.okButton === true) {
              this.isShowLoading = true
              AccountLogin({
                'account': this.account,
                'platId': this.plantId,
                'mobile': this.formCustom.phone,
                'smsCode': this.formCustom.passCode
              }).then(res => {
                if (res.code === 200) {
                  this.getOkLoginResult()
                } else {
                  this.isShowLoading = false
                  this.$message.error(res.message)
                }
              })
            }
          }
        }
      }
    },
    getOkLoginResult() {
      var timer2 = null
      timer2 = setInterval(() => {
        if (window.location.hash === '#/login') {
          clearInterval(timer2)
          return false
        }
        AccountLoginResult(this.plantId, this.account).then(res => {
          if (res.code === 500) {
            this.codeMessage = ''
            this.isShowLoading = false
            this.modal1 = false
            this.$message.error(res.message)
            clearInterval(timer2)
          } else if (res.code === 200) {
            this.codeMessage = ''
            this.modal1 = false
            this.$message.success('登录成功')
            this.isShowLoading = false
            clearInterval(timer2)
          } else if (res.code === 202) {
            this.codeMessage = ''
            this.isShowLoading = false
            this.formCustom.phone = res.result.phoneNum
            clearInterval(timer2)
          } else if (res.code === 201) {
            this.codeMessage = ''
            this.isShowLoading = true
          } else if (res.code === 203) {
            this.$Message.error(res.message)
            this.isShowLoading = false
            clearInterval(timer2)
          }
        })
      }, 3000)
    },
    getSeconds() {
      const TIME_COUNT = 240
      if (!this.show) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    getCode() { // 发送验证码发送验证码
      if (this.num === '') {
        if (this.formCustom.phone === '') {
          this.$Message.error('手机号不能为空')
        } else if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.formCustom.phone))) {
          this.$Message.error('请输入正确的手机号码')
        } else {
          this.show = false
          sendAuthCode(this.plantId, this.account, this.formCustom.phone).then(res => {
            if (res.code === 200) {
              this.getAuthCode()
            } else if (res.code === 500) {
              this.$message.error(res.message)
            }
          })
          this.getSeconds()
        }
      } else {
        this.show = false
        sendAuthCode(this.plantId, this.account, this.formCustom.phone).then(res => {
          if (res.code === 200) {
            this.getAuthCode()
          } else if (res.code === 500) {
            this.$message.error(res.message)
          }
        })
        this.getSeconds()
      }
    },
    getPath() {
      this.getActive(this.$route.name)
      this.isPathFlag = this.$route.path.indexOf('place') > -1
    },
    getActive(val) {
      for (let i = 0; i < GLOBALROUTE.length; i++) {
        if (GLOBALROUTE[i].name === val) {
          this.route_arr = GLOBALROUTE[i].activeName.split('-')
        }
      }
      if (this.route_arr.length > 1) {
        this.active = this.route_arr[0] + '-' + this.route_arr[1]
      } else {
        this.active = this.route_arr[0]
      }
      this.open = [this.route_arr[0]]
    },
    messagekai() {
      this.isPathFlag ? this.$router.push({ path: '../message' }) : this.$router.push({ path: './message' })
    },
    toggleClick() {
      this.shrink = !this.shrink
    }
  },
  beforeUpdate: function() {
    this.activeIndex = this.$route.matched[1].path
  }
}
</script>
<style lang="less">
@import "./main.less";
</style>
