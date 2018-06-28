<template>
  <div class="communicate-wrapper" id="account_Channel">
    <!--渠道管理 -->
    <div class="sChannel">
      <span>选择渠道</span>
      <Select v-model="platValue" style="width:200px" placeholder="请选择" @on-change="channpalt">
          <Option 
            v-for="item in channeselect" 
            :value="item.platId" 
            :label="item.platName"
            :key="item.platId">
          </Option>
      </Select>
      <Button type="primary" @click="newaddcont('newuser')" class="sC-button"><Icon type="ios-plus-outline"></Icon> 新增渠道账号</Button>
      <Modal v-model="modal1" title="新增渠道账号">
          <Form ref="newuser" :model="newuser" :rules="ruleNewuser" :label-width="90">
            <FormItem label="渠道" prop='platValues'>
              <Select v-model="platValue" disabled style="width:300px" placeholder="请选择">
                  <Option 
                    v-for="item in channeselect" 
                    :value="item.platId" 
                    :label="item.platName"
                    :key="item.platId">
                  </Option>
              </Select>
            </FormItem>

            <FormItem label="部门" prop="deptName">
              <p @click="isTree=true">
                  <Input 
                    type="text" 
                    placeholder="EHR组织架构" 
                    v-model="newuser.deptName" 
                    style="width:300px">
                  </Input>
              </p>
              <SearchTree 
                  style="width:300px;overflow: auto;" 
                  v-if="isTree" 
                  @Searchsendman="Searchsendman" 
                  :FirstName="FirstName" 
                  :FirstId="FirstId" 
                  :personType="personType" 
                  :leafNode="leafNode">
              </SearchTree>
            </FormItem>
            <FormItem label="会员名" prop="accountName" v-if="vipnameShow">
                <Input type="text" placeholder="请输入会员名" v-model="newuser.accountName" style="width:300px"> </Input>
            </FormItem>

            <FormItem label="登陆方式" v-if="fangshiShow">
              <Select v-model="newuser.type" placeholder="请选择" style="width:300px" @on-change="choice">
                <Option 
                  v-for="item in fangshilist" 
                  :value="item.value" 
                  :key="item.value">{{ item.label }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="用户名" prop="account" v-if="usernameShow">
                <Input type="text" autocomplete="off" placeholder="请输入用户名" v-model="newuser.account" style="width:300px"> </Input>
            </FormItem>

            <FormItem label="手机号" prop="mobile" v-if="newphoneShow">
                <Input type="text" :disabled="disaBled" placeholder="请输入用户名" v-model="newuser.mobile" style="width:300px"> </Input>
            </FormItem>

            <FormItem label="密码" prop="password" v-if="passwordShow" >
                <Input type="password" placeholder="请输入密码" v-model="newuser.password" style="width:300px"></Input>
            </FormItem>

            <FormItem label="短信验证码" prop="password"  v-if="yanzhengmaShow">
              <Input v-model="newuser.password" style="width:200px" placeholder="请输入验证码">
              </Input>
              <Button v-if="show" @click="getCode"  style="background: #2d8cf0; color:#fff">发送验证码</Button>
              <Button disabled v-if="!show" class="count">{{count}} 秒</Button>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="primary" @click="newsusser('ruleNewuser')">确定</Button>
            <Button type="ghost"  @click="newacolue('newuser')" style="margin-left: 8px">取消</Button>
          </div>
          <Spin fix v-if="isShowLoading2"  style="position: absolute;">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
          </Spin>
      </Modal>
    </div>

    <div class="communicate-main">
      <div class="channelTable" style="width: 100%;">
        <Table border :columns="columns1" :data="channelList" style="overflow-x:hidden;"></Table>
        <Modal
            v-model="again"
            title="重新登录"
           >
            <Form ref="againform" :model="againform" :rules="agsinrule" :label-width="90">
            <FormItem label="渠道" prop='platValues'>
              <Select v-model="platValue" disabled  style="width:300px" placeholder="请选择">
                  <Option 
                    v-for="item in channeselect" 
                    :value="item.platId" 
                    :label="item.platName"
                    :key="item.platId">
                  </Option>
              </Select>
            </FormItem>

            <FormItem label="部门">
              <p @click="isTree=true">
                  <Input 
                    type="text" 
                    placeholder="EHR组织架构" 
                    :readonly='true' 
                    v-model="againform.deptName" 
                    style="width:300px">
                  </Input>
              </p>
              <SearchTree 
                  style="width:300px;overflow: auto;" 
                  v-if="isTree" 
                  @Searchsendman="Searchsendman2" 
                  :FirstName="FirstName" 
                  :FirstId="FirstId" 
                  :personType="personType" 
                  :leafNode="leafNode">
              </SearchTree>
            </FormItem>

            <FormItem label="会员名" prop="accountName" v-if="vipnameShow">
                <Input type="text" disabled placeholder="请输入会员名" v-model="againform.accountName" style="width:300px"> </Input>
            </FormItem>

            <FormItem label="登陆方式" v-if="fangshiShow">
              <Select v-model="againform.type" placeholder="请选择" style="width:300px" @on-change="choice2">
                <Option 
                  v-for="item in fangshilist" 
                  :value="item.value" 
                  :key="item.value">{{ item.label }}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="用户名" prop="account" v-if="usernameShow" >
                <Input type="text" disabled placeholder="请输入用户名" v-model="againform.account" style="width:300px"> </Input>
            </FormItem>

            <FormItem label="手机号" prop="mobile" v-if="newphoneShow">
                <Input type="text" disabled placeholder="请输入用户名" v-model="againform.mobile" style="width:300px"> </Input>
            </FormItem>

            <FormItem label="密码" prop="password" v-if="passwordShow">
                <Input type="password" placeholder="请输入密码" v-model="againform.password" style="width:300px"></Input>
            </FormItem>

            <FormItem label="短信验证码" prop="password"  v-if="yanzhengmaShow">
              <Input v-model="againform.password" style="width:200px" placeholder="请输入验证码"></Input>
              <Button  v-show="show" @click="getCode2"  style="background: #2d8cf0; color:#fff">发送验证码</Button>
              <Button disabled v-show="!show" class="count">{{count}} 秒</Button>
            </FormItem>
          </Form>
            <div slot="footer">
              <Button type="primary" @click="againsusser('agsinrule')">确定</Button>
              <Button type="ghost" @click="again=false" style="margin-left: 8px">取消</Button>
            </div>
            <Spin fix v-if="isShowLoading3"  style="position: absolute;">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
          </Spin>
        </Modal>
        <div class="pages">
        <Page 
          :total="total"
          @on-change="handleCurrentChange"
          :page-size="size"
          show-total>
         </Page>
        </div>
      </div>
    </div>
    <Spin fix v-if="isShowLoading"  style="position: absolute;">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
  import { channellist, channeselect, addnewchannel, sendoutNum, addResult, senResult } from '../../api/AccountApi/accountCenter'
  import SearchTree from './communicateTree'
  import * as types from '../../store/modules/accentCenter/actionTypes'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      SearchTree
    },
    data() {
      const validatephone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'))
        }
        if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7]))\d{8}$/.test(value))) {
          callback(new Error('请输入正确的手机号码'))
        }
        if (!/^[0-9]+$/.test(value) && value !== '') {
          callback(new Error('必须为数字'))
        } else {
          callback()
        }
      }
      const validateuser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        }
        if (!/^[a-zA-Z0-9_\u4e00-\u9fa5_-]+$/.test(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validateusername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入会员名'))
        }
        if (!/^[a-zA-Z0-9_\u4e00-\u9fa5_-]+$/.test(value)) {
          callback(new Error('请输入正确的会员名'))
        } else {
          callback()
        }
      }
      const validateorg = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入'))
        }
        if (!/^[a-zA-Z0-9\_\u4e00-\u9fa5]+$/.test(value)) {
          callback(new Error('请输入正确的格式'))
        } else {
          callback()
        }
      }
      return {
        SearchorgId: '',
        show: true,
        count: '',
        timer: null,
        isShowLoading: true,
        isShowLoading2: false,
        isShowLoading3: false,
        modal1: false,
        again: false,
        fangshiShow: false,
        vipnameShow: false,
        yanzhengmaShow: false,
        newphoneShow: false,
        usernameShow: true,
        passwordShow: true,
        disaBled: false,
        okButton: false, // 添加验证码是否点击
        FirstName: '', // 属于树组件
        FirstId: 0,
        personType: 0,
        leafNode: 0,
        currentPage1: 1, // 当前页
        platValue: '',
        ajaxObj: {
          platId: '',
          pageNum: 1,
          size: 20
        },
        total: 0,
        size: 0,
        columns1: [
          {
            title: '渠道账户名称',
            key: 'account'
          },
          {
            title: '绑定部门',
            key: 'deptName'
          },
          {
            title: '在线职位数',
            key: 'onLineJobNum'
          },
          {
            title: '剩余简历下载',
            key: 'downloadNum'
          },
          {
            title: '剩余职位刷新',
            key: 'refreshNum'
          },
          {
            title: '渠道点数/币数',
            key: 'balance'
          },
          {
            title: '关联用户',
            key: 'userNum'
          },
          {
            title: '是否登录',
            key: 'login'
          },
          {
            title: '添加关联用户',
            key: 'userNum',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.userMange(params.index, params.row.id, params.row.platId, params.row.deptName, params.row.balance, params.row.downloadNum, params.row.refreshNum, params.row.account)
                    }
                  }
                }, '关联'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.againform.deptName = params.row.deptName
                      this.againform.account = params.row.account
                      this.againform.accountName = params.row.accountName
                      this.againform.mobile = params.row.account
                      this.againform.deptId = params.row.deptId
                      this.reLanding()
                    }
                  }
                }, '重登')
              ])
            }
          }
        ],
        channelList: [{
          account: '',
          deptName: '',
          onLineJobNum: '',
          downloadNum: '',
          refreshNum: '',
          balance: '',
          userNum: '',
          status: '启用',
          login: ''
        }],
        channelId: '',
        newuser: {  // 添加渠道
          platId: '', // 渠道id
          account: '', // 账号
          deptName: '', // 部门名称
          deptId: '', // 部门id
          type: 0, // 登录方式
          password: '', // 密码
          mobile: '', // 手机号
          accountName: '', // 会员名称
          isNewAdd: 1 // 是否有部门
        },
        ruleNewuser: {   // 添加渠道
          deptName: [
            { required: true, validator: validateorg, trigger: 'blur,change' }
          ],
          account: [
            { required: true, validator: validateuser, trigger: 'blur' }
          ],
          accountName: [
            { required: true, validator: validateusername, trigger: 'blur' }
          ],
          mobile: [
            { required: true, validator: validatephone, trigger: 'blur,change' }
          ],
          password: [
            { required: true, message: '请输入', trigger: 'blur' }
          ]
        },
        againform: { // 重新登录
          platId: '', // 渠道id
          account: '', // 账号
          deptName: '', // 部门名称
          deptId: '', // 部门id
          type: 0, // 登录方式
          password: '', // 密码
          mobile: '', // 手机号
          accountName: '', // 会员名称
          deleted: 0, // 是否删除
          isNewAdd: 0 // 是否有部门
        },
        agsinrule: { // 重新登录验证
          account: [
            { required: true, validator: validateuser, trigger: 'blur' }
          ],
          accountName: [
            { required: true, validator: validateusername, trigger: 'blur' }
          ],
          mobile: [
            { required: true, validator: validatephone, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入', trigger: 'blur' }
          ]
        },
        isTree: false,
        channeselect: [],
        type: '',
        fangshilist: [
          {
            value: 0,
            label: '密码登陆'
          },
          {
            value: 1,
            label: '短信登录'
          }
        ],
        radio2: 3,
        ismark: false
      }
    },
    mounted() {
      this[types.HANDEL_ORGLEFTLIST]().then(res => {
        if (this.orgLeftList.length > 0) {
          this.FirstId = this.orgLeftList[0].id
          this.FirstName = this.orgLeftList[0].organizationName
          this.personType = this.orgLeftList[0].personType
          this.leafNode = this.orgLeftList[0].leafNode
        }
      })
      this.isShowLoading = true
      if (JSON.parse(localStorage.getItem('comAjaxObj')) === null) {
        this.ajaxObj.platId = 10001
      } else {
        this.ajaxObj = JSON.parse(localStorage.getItem('comAjaxObj'))
      }
      channeselect(this.ajaxObj).then(res => {
        this.channeselect = res.result
        this.platValue = this.ajaxObj.platId
      })
    },
    computed: {
      ...mapGetters('accentCenter', [
        'orgLeftList',
        'detaliList'
      ])
    },
    methods: {
      ...mapActions('accentCenter', [
        types.HANDEL_ORGLEFTLIST,
        types.HANDEL_ORGDEATIL
      ]),
      Searchsendman(a) {
        this.newuser.deptName = a.name
        this.SearchorgId = a.id
      },
      Searchsendman2(a) {
        this.againform.deptName = a.name
        this.SearchorgId = a.id
      },
      channpalt(val) {
        this.newuser.account = ''
        this.newuser.deptName = ''
        this.newuser.password = ''
        this.newuser.mobile = ''
        this.newuser.accountName = ''
        this.newuser.type = 0
        this.isShowLoading = true
        this.ajaxObj.platId = val
        channellist(this.ajaxObj).then(res => {
          this.isShowLoading = false
          this.channelList = res.result.list
          this.channelList.map(item => {
            if (item.login === true) {
              item.login = '在线'
            } else if (item.login === false) {
              item.login = '离线'
            }
          })
          this.size = res.result.pageSize
          this.total = res.result.total
          if (this.ajaxObj.platId === 10005) { // 前程渠道
            this.vipnameShow = true
            this.newphoneShow = false
          } else {
            this.vipnameShow = false
          }
          if (this.ajaxObj.platId === 10004) {  // boss渠道
            this.fangshiShow = true
            this.usernameShow = false
            this.newphoneShow = true
          } else {
            this.fangshiShow = false
            this.usernameShow = true
            this.newphoneShow = false
            this.yanzhengmaShow = false
            this.passwordShow = true
          }
        })
        localStorage.setItem('comAjaxObj', JSON.stringify(this.ajaxObj))
      },
      newsusser(index, id, platId) { //  新增渠道
        this.$refs.newuser.validate((valid) => {
          if (valid) {
            if (this.platValue === 10004 && this.newuser.type === 1 && this.okButton === false) {
              this.$Message.error('请先发送验证码')
              return false
            } else {
              this.isShowLoading2 = true
              this.newuser.platId = this.platValue
              this.newuser.deptId = this.SearchorgId
              addnewchannel(this.newuser).then(res => {
                if (res.code === 200) {
                  this.newuser.platId = this.platValue
                  if (this.newuser.platId === 10004 && this.newuser.type === 0) {
                    this.newuser.account = this.newuser.mobile
                  }
                  this.okButton = false
                  var timer = null
                  timer = setInterval(() => {
                    if (window.location.hash === '#/login') {
                      clearInterval(timer)
                      return false
                    }
                    addResult(this.newuser.platId, this.newuser.account, this.newuser.mobile).then(res => {
                      if (res.code === 200) {
                        this.isShowLoading2 = false
                        this.$Message.success(res.message)
                        this.modal1 = false
                        channellist(this.ajaxObj).then(res => {
                          if (res.code === 200) {
                            this.size = res.result.pageSize
                            this.total = res.result.total
                            this.channelList = res.result.list
                            this.channelList.map(item => {
                              if (item.login === true) {
                                item.login = '在线'
                              } else if (item.login === false) {
                                item.login = '离线'
                              }
                            })
                            document.documentElement.scrollTop = 0
                          } else {
                            this.$message.error(res.message)
                          }
                        })
                        clearInterval(timer)
                      } else if (res.code === 201) {
                        this.isShowLoading2 = true
                      // this.$Message.success(res.message)
                      } else if (res.code === 203) {
                        this.isShowLoading2 = false
                        this.modal1 = true
                        this.$Message.error(res.message)
                        clearInterval(timer)
                      } else if (res.code === 500) {
                        this.isShowLoading2 = false
                        this.$Message.error(res.message)
                        this.modal1 = false
                        clearInterval(timer)
                      }
                    })
                  }, 3000)
                } else {
                  this.$Message.error(res.message)
                  this.isShowLoading2 = false
                }
              })
            }
          } else {
            this.$Message.error('请填写必填项')
            this.isShowLoading2 = false
          }
        })
      },
      getCode() {  // 添加渠道发送验证码
        this.okButton = true
        if (this.newuser.mobile === '') {
          this.$Message.error('手机号不能为空')
        } else if (this.newuser.deptName === '') {
          this.$Message.error('部门不能为空')
        } else {
          this.isShowLoading2 = true
          this.newuser.platId = this.platValue
          this.newuser.deptId = this.SearchorgId
          this.newuser.account = this.newuser.mobile
          sendoutNum(this.newuser.platId, this.newuser.account, this.newuser.mobile).then(res => {
            if (res.code === 200) {
              this.newuser.platId = this.platValue
              this.disaBled = true
              var timer = null
              timer = setInterval(() => {
                if (window.location.hash === '#/login') {
                  clearInterval(timer)
                  return false
                }
                senResult(this.newuser.platId, this.newuser.mobile).then(res => {
                  if (res.code === 200) {
                    this.isShowLoading2 = false
                    this.$Message.success(res.message)
                    clearInterval(timer)
                  } else if (res.code === 201) {
                    this.isShowLoading2 = true
                    this.$Message.success(res.message)
                  } else if (res.code === 203) {
                    this.isShowLoading2 = false
                    this.$Message.error(res.message)
                    clearInterval(timer)
                  } else if (res.code === 500) {
                    this.isShowLoading2 = false
                    this.$Message.error(res.message)
                    clearInterval(timer)
                  }
                })
              }, 3000)
            } else {
              this.$Message.error(res.message)
            }
          })
          const TIME_COUNT = 60
          if (!this.timer) {
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
        }
      },
      choice(val) { // 添加渠道选择登录方式
        if (+this.newuser.type === 1) {
          this.yanzhengmaShow = true
          this.passwordShow = false
          this.newuser.password = ''
        } else {
          this.yanzhengmaShow = false
          this.passwordShow = true
          this.newuser.password = ''
        }
      },
      choice2(val) {  // 重新登录选择登录方式
        if (+this.againform.type === 1) {
          this.yanzhengmaShow = true
          this.passwordShow = false
          this.newuser.password = ''
        } else {
          this.yanzhengmaShow = false
          this.passwordShow = true
          this.newuser.password = ''
        }
      },
      userMange(index, id, platId, deptName, balance, downloadNum, refreshNum, account) {
        this.ajaxObj.channelId = id
        this.ajaxObj.platId = platId
        this.ajaxObj.deptName = deptName
        this.ajaxObj.balance = balance
        this.ajaxObj.downloadNum = downloadNum
        this.ajaxObj.refreshNum = refreshNum
        this.ajaxObj.account = account
        this.$router.push({
          path: 'userMange',
          query: {
            channelId: this.ajaxObj.channelId,
            platId: this.ajaxObj.platId,
            deptName: this.ajaxObj.deptName,
            balance: this.ajaxObj.balance,
            downloadNum: this.ajaxObj.downloadNum,
            refreshNum: this.ajaxObj.refreshNum,
            pageNum: this.ajaxObj.pageNum,
            size: this.ajaxObj.size,
            account: this.ajaxObj.account
          }
        }) //  userMange的一个路由模块
      },
      reLanding() {
        this.again = true
        this.againform.password = ''
        this.show = true
      },
      newaddcont(name) {
        this.modal1 = true
        this.$refs[name].resetFields()
        this.disaBled = false
      },
      newacolue(name) {
        this.modal1 = false
        this.disaBled = false
        this.$refs[name].resetFields()
      },
      againsusser(index, id, platId) { // 重登确定
        this.$refs.againform.validate((valid) => {
          if (valid) {
            this.isShowLoading3 = true
            this.againform.platId = this.platValue
            this.againform.deptId = this.SearchorgId
            addnewchannel(this.againform).then(res => {
              if (res.code === 200) {
                this.againform.platId = this.platValue
                var timer = null
                timer = setInterval(() => {
                  if (window.location.hash === '#/login') {
                    clearInterval(timer)
                    return false
                  }
                  addResult(this.againform.platId, this.againform.account, this.againform.mobile).then(res => {
                    if (res.code === 200) {
                      this.isShowLoading3 = false
                      this.$Message.success(res.message)
                      this.again = false
                      clearInterval(timer)
                      channellist(this.ajaxObj).then(res => {
                        if (res.code === 200) {
                          this.size = res.result.pageSize
                          this.total = res.result.total
                          this.channelList = res.result.list
                          this.channelList.map(item => {
                            if (item.login === true) {
                              item.login = '在线'
                            } else if (item.login === false) {
                              item.login = '离线'
                            }
                          })
                          document.documentElement.scrollTop = 0
                        } else {
                          this.$message.error(res.message)
                        }
                      })
                    } else if (res.code === 201) {
                      this.isShowLoading3 = true
                    } else if (res.code === 202) {
                      this.isShowLoading3 = false
                      this.again = true
                      this.$Message.error(res.message)
                      clearInterval(timer)
                    } else if (res.code === 203) {
                      this.isShowLoading3 = false
                      this.again = true
                      this.$Message.error(res.message)
                      clearInterval(timer)
                    } else if (res.code === 500) {
                      this.isShowLoading3 = false
                      this.again = false
                      this.$Message.error(res.message)
                      clearInterval(timer)
                      channellist(this.ajaxObj).then(res => {
                        if (res.code === 200) {
                          this.size = res.result.pageSize
                          this.total = res.result.total
                          this.channelList = res.result.list
                          this.channelList.map(item => {
                            if (item.login === true) {
                              item.login = '在线'
                            } else if (item.login === false) {
                              item.login = '离线'
                            }
                          })
                          document.documentElement.scrollTop = 0
                        } else {
                          this.$message.error(res.message)
                        }
                      })
                    }
                  })
                }, 3000)
              } else {
                this.$Message.error(res.message)
                this.isShowLoading3 = false
              }
            })
          } else {
            this.$Message.error('请填写必填项')
            this.isShowLoading3 = false
          }
        })
      },
      getCode2() {  // 重新登陆发送验证码
        if (this.againform.mobile === '') {
          this.$Message.error('手机号不能为空')
        } else {
          this.isShowLoading3 = true
          this.againform.platId = this.platValue
          this.againform.deptId = this.SearchorgId
          this.againform.account = this.againform.mobile
          sendoutNum(this.againform.platId, this.againform.account, this.againform.mobile).then(res => {
            if (res.code === 200) {
              this.againform.platId = this.platValue
              var timer = null
              timer = setInterval(() => {
                if (window.location.hash === '#/login') {
                  clearInterval(timer)
                  return false
                }
                senResult(this.againform.platId, this.againform.mobile).then(res => {
                  if (res.code === 200) {
                    this.isShowLoading3 = false
                    this.$Message.success(res.message)
                    clearInterval(timer)
                  } else if (res.code === 201) {
                    this.isShowLoading3 = true
                    this.$Message.success(res.message)
                  } else if (res.code === 203) {
                    this.isShowLoading3 = false
                    this.$Message.error(res.message)
                    clearInterval(timer)
                  } else if (res.code === 500) {
                    this.isShowLoading3 = false
                    this.$Message.error(res.message)
                    clearInterval(timer)
                  }
                })
              }, 3000)
            }
          })
          const TIME_COUNT = 60
          if (!this.timer) {
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
        }
      },
      handleCurrentChange(val) {
        val ? this.ajaxObj.pageNum = val : ''
        channellist(this.ajaxObj).then(res => {
          if (res.code === 200) {
            this.size = res.result.pageSize
            this.total = res.result.total
            this.channelList = res.result.list
            this.channelList.map(item => {
              if (item.login === true) {
                item.login = '在线'
              } else if (item.login === false) {
                item.login = '离线'
              }
            })
            document.documentElement.scrollTop = 0
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
.ivu-table td{
    text-align: center;
}
  .communicate-wrapper {
    padding-top: 20px;
    overflow: hidden;
    position: relative;
    .ivu-spin-main{
        top:200px !important;
      }
    .sChannel{
      margin-bottom: 10px;
      .sChannel-form{
        width: 50%;
        float: left;
      }
      .sC-button{
        margin: 0px 10px 0px 0px;
        float: right;
      }
    }
    .communicate-main {
      background: #fff;
      display: flex;
      clear: both;
      padding: 10px;
      box-sizing: border-box;
      .pages {
        float: right;
        margin-top: 30px;
        .number {
          border: 1px solid #d1dbe5;
        }
        .more {
          border: 1px solid #d1dbe5;
        }
      }
      }
    .PersonneManagement-wrapper-head {
      // height: 50px;
      // margin-top: 20px;
      .PersonneManagement-head-title {
          display: inline-block;
          border-left: 2px solid #2d8cf0;
          height: 14px;
          font-size: 16px;
          padding-left: 8px;
          line-height: 14px;
      }
    }
    }
    .PersonneManagement-mark {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(155, 155, 155, 0.7);
      z-index: 1111;
      .mark-content {
        width: 538px;
        height: 500px;
        background: #fff;
        border-radius: 6px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -250px 0 0 -266px;
        padding: 10px;
        box-sizing: border-box;
        h3 {
          height: 50px;
          text-align: center;
          line-height: 50px;
          position: relative;
          font-size: 16px;
          color: #202020;
          font-weight: normal;
          border-bottom: 1px solid #eaeef2;
          span {
            position: absolute;
            right: 0px;
            font-size: 20px;
            color: #ececec;
            font-weight: bold;
            top: 12px;
          }
        }
        .jobInformation-lists {
          padding-top: 39px;
        }
      }
    }
</style>

