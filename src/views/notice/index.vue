<template>
  <div class='resumup'>
    <div class='arrow-down'>
      <a onclick='javascript:history.go(-1);'><span><i class='el-icon-back'></i></span></a>
    </div>
    <div class='resum-head'>
      <el-tabs v-model='activeName' @tab-click='handleClick'>
        <el-tab-pane label='面试通知' name='first'>
          <div class='uptop'>
            <div class='morenselect'>
              <span>选择模板</span>
              <el-select v-model='value' placeholder='请选择' size='small' @change='select'>
                <el-option
                  v-for='item in tmpdata'
                  :key='item.id'
                  :label='item.templateName'
                  :value='item.id'>
                </el-option>
              </el-select>
            </div>
            <div class='mobanbg'>
              <el-form :model="tmpdata[n]" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
              <div class='mobancont'>
                <div class='cont'>
                   <el-form-item label="敬语" prop="templateContent">
                  <el-input
                    type='textarea'
                    :rows='5'
                    placeholder='请输入内容'
                    v-model='tmpdata[n].templateContent'
                    :maxlength='500' >
                  </el-input>
                </el-form-item>
                </div>
                <div class='cont'>
                   <el-form-item label="携带材料">
                  <el-input
                    type='textarea'
                    :rows='5'
                    placeholder='请输入内容'
                    :maxlength='50'
                    v-model='tmpdata[n].materious'>
                  </el-input>
                </el-form-item>
                </div>
                <div class='cont'>
                  <el-form-item label="面试地点" prop="interviewSite">
                   <el-input v-model='tmpdata[n].interviewSite' placeholder='请输入内容' :maxlength='50' size='small'></el-input>
                </el-form-item>
                </div>
                <div class='morenselect'>
                   <el-form-item label="面试部门" prop="selectedOptions">
                       <el-cascader
                    placeholder="可以搜索部门"
                    :options="deptIds"
                    filterable
                    v-model="tmpdata[n].selectedOptions"
                    @change ='getjoblist'
                      change-on-select></el-cascader>
                        </el-form-item>
                </div>
                <div class='cont cont1'>
                   <el-form-item label="面试职位" prop="position2">
                      <el-select placeholder="请选择"  v-model="tmpdata[n].position2" class="jobclass" @change='positionJobname'>
                  <el-option
                    v-for="item in jobNames"
                    :key="item.id"
                    :label="item.jobName"
                    :value="item.jobName">
                  </el-option>
                </el-select>
                        </el-form-item>
                </div>
                <div class='cont timePlugin'>
                    <el-form-item label="面试时间" prop="interviewTime">
                    <el-date-picker
                    v-model="tmpdata[n].interviewTime"
                    type="datetime"
                    size='small'
                    value-format ='yyyy-MM-dd HH:mm'
                    :picker-options="pickerOptions1"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                </div>
                <div class='cont'>
                    <el-form-item label="联系人" prop="contactPeople">
                    <el-input v-model='tmpdata[n].contactPeople' placeholder='请输入内容' size='small' :maxlength='50'></el-input>
                </el-form-item>
                </div>
                <div class='cont'>
                  <el-form-item label="联系电话" prop="telephone">
                      <el-input v-model='tmpdata[n].telephone' placeholder='请输入内容' size='small' :maxlength='50'></el-input>
                  </el-form-item>
                </div>
              </div>
            <el-form-item label="通知方式" prop="informType">
          <el-select v-model="tmpdata[n].informType" placeholder="请选择通知方式" >
      <el-option label="邮件通知" value="140002"></el-option>
          </el-select>
          </el-form-item>
               </el-form>
            </div>
          </div>
          <div class='upbottom'>
            <el-button type='primary' @click="open4('ruleForm')">确认</el-button>
            <router-link to="resume">
            <el-button type='info'>取消</el-button>
            </router-link>
          </div>
        </el-tab-pane>
      <!-- 这里是发送offer的模板 -->
        <el-tab-pane label='发送offer' name='all'>
          <div class='uptop'>
            <div class='morenselect'>
              <span>选择模板</span>
              <el-select v-model='value2' placeholder='请选择' size='small' @change='offerselect'>
                <el-option
                  v-for='item in offertmps'
                  :key='item.id'
                  :label='item.templateName'
                  :value='item.id'>
                </el-option>
              </el-select>
            </div>
            <div class='mobanbg'>
              <div class='mobancont'>
                   <el-form :model="offertmps[m]" :rules="offerrules" ref="offerruleForm" label-width="80px" class="demo-ruleForm">
                <div class='morenselect'>
                   <el-form-item label="录用部门" prop="selectedOptions">
                       <el-cascader
                    placeholder="可以搜索部门"
                    :options="deptIds"
                    filterable
                    v-model="offertmps[m].selectedOptions"
                    @change ='getjoblist'
                      change-on-select></el-cascader>
                        </el-form-item>
                </div>
                <div class='cont cont1'>
                   <el-form-item label="录用职位" prop="position">
                      <el-select placeholder="请选择"  v-model="offertmps[m].position" @change='positionJobnameOff' class="jobclass">
                  <el-option
                    v-for="item in jobNames"
                    :key="item.id"
                    :label="item.jobName"
                    :value="item.jobName">
                  </el-option>
                </el-select>
                        </el-form-item>
                </div>
                <div class='cont'>
                  <el-form-item label="基础薪资" prop="salary" >
                     <el-input v-model='offertmps[m].salary' :maxlength='50' placeholder='请输入内容' size='small'></el-input>
                        </el-form-item>
                </div>
                <div class='cont'>
                         <el-form-item label="其他福利" prop="welfare">
                          <el-input
                    type='textarea'
                    :rows='5'
                    placeholder='请输入内容'
                    :maxlength='100'
                    v-model='offertmps[m].welfare'>
                  </el-input>
                        </el-form-item>
                </div>
                <div class='cont'>
                   <el-form-item label="工作地点" prop="workSite">
                      <el-input v-model='offertmps[m].workSite' placeholder='请输入内容' size='small' :maxlength='50'></el-input>
                        </el-form-item>
                </div>
                <div class='cont'>
                   <el-form-item label="乘车路线" prop="busline">
                      <el-input v-model='offertmps[m].busline' placeholder='请输入内容' size='small' :maxlength='50'></el-input>
                        </el-form-item>
                </div>
                <div class='cont timePlugin'>
                    <el-form-item label="入职时间" prop="entryTime">
                    <el-date-picker
                    v-model="offertmps[m].entryTime"
                    type="datetime"
                    size='small'
                    value-format ='yyyy-MM-dd HH:mm'
                    :picker-options="pickerOptions1"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                </div>
                <div class='cont'>
                   <el-form-item label="携带材料">
                    <el-input
                    type='textarea'
                    :rows='5'
                    placeholder='请输入内容'
                    :maxlength='100'
                    v-model='offertmps[m].entryMaterials'>
                  </el-input>
                        </el-form-item>
                </div>
                <div class='cont'>
                  <el-form-item label="联系人" prop="contactPeople">
                    <el-input v-model='offertmps[m].contactPeople'  :maxlength='50' placeholder='请输入内容' size='small'></el-input>
                        </el-form-item>
                </div>
                <div class='cont'>
                   <el-form-item label="联系电话" prop="telephone">
                    <el-input v-model='offertmps[m].telephone' placeholder='请输入内容' size='small' :maxlength='50' type="tel"></el-input>
                        </el-form-item>
                </div>
                <div class='morenselect'>
                  <el-form-item label="通知方式" prop="informType">
             <el-select v-model="offertmps[m].informType" placeholder="请选择通知方式" >
             <!-- <el-option label="短信通知" value="140001"></el-option> -->
             <el-option label="邮件通知" value="140002"></el-option>
               </el-select>
              </el-form-item>
            </div>
              </el-form>
              </div>
            </div>
          </div>
          <div class='upbottom'>
            <el-button type='primary' @click="sendoffer('offerruleForm')">确认</el-button>
          <router-link to="resume">
              <el-button type='info'>取消</el-button>
          </router-link>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { resumetemplate, offertemplate } from '../../api/resumeSearchApi/notice'
  import { joblin } from '../../api/resumeSearchApi/total' // joblin
  import { interviewSend, offerSend } from '../../api/resumeSearchApi/distribute'
  import { deptlistAll } from '../../api/jobApi/jobMessage'
  export default {
    filters: {
      myDate(value) {
        var year = value.getFullYear()
        var month = value.getMonth() + 1
        var date = value.getDate()
        var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][value.getDay()]
        var hour = value.getHours() < 10 ? '0' + value.getHours() : value.getHours()
        var minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes()
        var second = value.getSeconds() < 10 ? '0' + value.getSeconds() : value.getSeconds()
        return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second + ' ' + day
      }
    },
    created() {
    },
    mounted() {
      deptlistAll().then(res => {
        this.allDept = res
        this.deptsAll(res)
      })
      this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
      // 获取模板
      resumetemplate().then(res => {
        this.tmpdata = res.result
        this.tmpdata.forEach((item, index) => {
          if (item.enable === 1) {
            this.n = index
            this.value = item.templateName
          }
          item.position = this.userinfo[0].jobTitle
        })
      })
      offertemplate().then(res => {
        this.offertmps = res.result
        this.offertmps.forEach((item, index) => {
          if (item.enable === 1) {
            this.m = index
            this.value2 = item.templateName
          }
          item.position = ''
        })
      })
      //  上面是create内容
      for (var i = 0; i < this.userinfo.length; i++) {
        this.uploadinfo['list'].push({})   //  生成几个空对象接收这个数据
      }
      for (var e = 0; e < this.userinfo.length; e++) {
        this.uploadinfoOffer['list'].push({})   //  生成几个空对象接收这个数据
      }
      for (let i = 0; i < this.userinfo.length; i++) {
        this.uploadinfo['list'][i].position = this.userinfo[i].jobTitle
        this.uploadinfo['list'][i].resumeId = this.userinfo[i].resumeId
        this.uploadinfo['list'][i].seekerId = this.userinfo[i].seekerId
        this.uploadinfo['list'][i].jobSeekerName = this.userinfo[i].jobSeekerName
        this.uploadinfo['list'][i].interviewSite = this.tmpdata[this.n].interviewSite
        this.uploadinfo['list'][i].interviewTime = this.tmpdata[this.n].interviewTime
        this.uploadinfo['list'][i].templateContent = this.tmpdata[this.n].templateContent
        this.uploadinfo['list'][i].contactPeople = this.tmpdata[this.n].contactPeople
        this.uploadinfo['list'][i].seekerPhone = this.userinfo[i].phone
        this.uploadinfo['list'][i].seekerEmail = this.userinfo[i].email
        this.uploadinfo['list'][i].resumeState = this.userinfo[i].resumeState
      }
    },
    methods: {
      positionJobname(val) {  //  获取jobid、发送面试通知
        for (const k of this.jobNames) {
          if (k.jobName === val) {
            this.jobId = k.id
            return false
          }
        }
      },
      positionJobnameOff(val) {
        for (const k of this.jobNames) {
          if (k.jobName === val) {
            this.jobIdOff = k.id
            return false
          }
        }
      },
      changeDate(dat) {
        var value = new Date(dat)
        var year = value.getFullYear()
        var month = value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1
        var date = value.getDate()
        var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][value.getDay()]
        var hour = value.getHours() < 10 ? '0' + value.getHours() : value.getHours()
        var minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes()
        // var second = value.getSeconds() < 10 ? '0' + value.getSeconds() : value.getSeconds()
        return year + '-' + month + '-' + date + '(' + day + ')' + hour + ':' + minute
      },
      open4(formname) {
        this.$refs[formname].validate((valid) => {
          if (valid === true) {
            for (let i = 0; i < this.userinfo.length; i++) {
              this.uploadinfo['list'][i].resumeId = this.userinfo[i].resumeId
              this.uploadinfo['list'][i].seekerId = this.userinfo[i].seekerId
              this.uploadinfo['list'][i].jobSeekerName = this.userinfo[i].jobSeekerName
              this.uploadinfo['list'][i].interviewSite = this.tmpdata[this.n].interviewSite
              this.uploadinfo['list'][i].materious = this.tmpdata[this.n].materious
              this.uploadinfo['list'][i].interviewTime = this.changeDate(this.tmpdata[this.n].interviewTime)
              this.uploadinfo['list'][i].templateContent = this.tmpdata[this.n].templateContent
              this.uploadinfo['list'][i].contactPeople = this.tmpdata[this.n].contactPeople
              this.uploadinfo['list'][i].telephone = this.tmpdata[this.n].telephone
              this.uploadinfo['list'][i].informType = this.tmpdata[this.n].informType
              this.uploadinfo['list'][i].position = this.tmpdata[this.n].position2
              this.uploadinfo['list'][i].seekerPhone = this.userinfo[i].phone
              this.uploadinfo['list'][i].seekerEmail = this.userinfo[i].email
              this.uploadinfo['list'][i].resumeState = this.userinfo[i].resumeState
              this.uploadinfo['list'][i].deptId = this.tmpdata[this.n].selectedOptions[this.tmpdata[this.n].selectedOptions.length - 1]
              this.uploadinfo['list'][i].jobId = this.jobId
              if (this.userinfo[i].email === '') {
                this.$message.error('该简历没有填写邮箱')
                return false
              }
            }
            this.$confirm('是否要发送面试通知', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              var a = JSON.stringify(this.uploadinfo.list)
              const len = this.uploadinfo['list'].length
              var b = JSON.parse(a).splice(0, len - 1)
              var c = JSON.stringify({ list: b })  // 获取当前 要向后端发送的数据
              interviewSend(c).then(res => {
                if (res.code === 200) {
                  window.localStorage.setItem('userinfo', '')
                  this.$message({
                    type: 'success',
                    message: res.message
                  })
                  history.go(-1)
                } else {
                  this.$message.error('发送失败')
                }
              })
            })
          } else {
            this.$message.error('请将表单填写完整')
          }
        })
      },
      handleClick() {
      },
      sendoffer(formname) {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            this.$confirm('是否要发送offer', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              for (let i = 0; i < this.userinfo.length; i++) {
                this.uploadinfoOffer['list'][i].resumeId = this.userinfo[i].resumeId
                this.uploadinfoOffer['list'][i].seekerId = this.userinfo[i].seekerId
                this.uploadinfoOffer['list'][i].jobSeekerName = this.userinfo[i].jobSeekerName
                this.uploadinfoOffer['list'][i].deptment = this.Offer_deptment
                // this.offertmps[this.m].selectedOptions[this.offertmps[this.m].selectedOptions.length - 1 ]  //  不用数据
                this.uploadinfoOffer['list'][i].position = this.offertmps[this.m].position
                this.uploadinfoOffer['list'][i].workSite = this.offertmps[this.m].workSite
                this.uploadinfoOffer['list'][i].entryTime = this.changeDate(this.offertmps[this.m].entryTime)
                this.uploadinfoOffer['list'][i].entryMaterials = this.offertmps[this.m].entryMaterials.replace(/\n/g, '<br>')
                this.uploadinfoOffer['list'][i].salary = this.offertmps[this.m].salary
                // this.uploadinfoOffer['list'][i].templateContent = this.offertmps[this.m].templateContent
                this.uploadinfoOffer['list'][i].contactPeople = this.offertmps[this.m].contactPeople
                this.uploadinfoOffer['list'][i].telephone = this.offertmps[this.m].telephone
                this.uploadinfoOffer['list'][i].informType = this.offertmps[this.m].informType
                this.uploadinfoOffer['list'][i].seekerPhone = this.userinfo[i].phone
                this.uploadinfoOffer['list'][i].seekerEmail = this.userinfo[i].email
                this.uploadinfoOffer['list'][i].busline = this.offertmps[this.m].busline
                this.uploadinfoOffer['list'][i].welfare = this.offertmps[this.m].welfare
                this.uploadinfoOffer['list'][i].resumeState = this.userinfo[i].resumeState
                this.uploadinfoOffer['list'][i].jobId = this.jobIdOff
                this.uploadinfoOffer['list'][i].deptId = this.offertmps[this.m].selectedOptions[this.offertmps[this.m].selectedOptions.length - 1 ]
                if (this.userinfo[i].email === '') {
                  this.$message.error('该简历没有填写邮箱')
                  return false
                }
              }
              var a = JSON.stringify(this.uploadinfoOffer.list)
              const len = this.uploadinfoOffer['list'].length
              var b = JSON.parse(a).splice(0, len - 1)
              var c = JSON.stringify({ list: b })  // 获取当前 要向后端发送的数据
              offerSend(c).then(res => {
                if (res.code === 200) {
                  window.localStorage.setItem('userinfo', '')
                  this.$message({
                    type: 'success',
                    message: res.message
                  })
                  history.go(-1)
                } else {
                  this.$message.error('发送失败')
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已经取消发送'
              })
            })
          } else {
            this.$message.error('请输入正确的信息')
          }
        })
      },
      select(val) {
        for (let i = 0; i < this.tmpdata.length; i++) {
          if (this.tmpdata[i].id === val) {
            this.n = i
          }
        }
      },
      getjoblist(e) {
        this.deptId = e[e.length - 1 ]
        joblin({ deptId: e[e.length - 1 ] }).then(res => {
          this.jobNames = res
          deptlistAll().then(res => {        // 获取部门与id的对照表
            var deptment = res.filter(item => {
              return item.value === this.deptId
            })
            this.deptment = deptment.label
            // 这里是获取到职位的名字信息
            var Offer_deptment = []
            e.forEach(val => {
              Offer_deptment[Offer_deptment.length] = res.filter(item => {
                return item.value === val
              })
            })
            this.Offer_deptment = Offer_deptment.map(res => {
              return res[0].label
            }).join('/')
          })
        })
      },
      offerselect(val) {
        for (let i = 0; i < this.offertmps.length; i++) {
          if (this.offertmps[i].id === val) {
            this.m = i
          }
        }
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
            it.deptIds = tempAry
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
      }
    },
    data() {
      var tel = (rule, value, callback) => {
        if (!/^1[3|4|5|7|9|8][0-9]\d{8}$/.test(value)) {
          return callback(new Error('您输入的号码有误'))
        } else {
          callback()
        }
      }
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 86400000
          }
        },
        activeName: 'first',
        props: {
          label: 'label',
          value: 'label',
          children: 'children'
        },
        offerrules: { //  这里是发送offer的验证
          templateContent: [
            { required: true, message: '请输入offer通知的内容', trigger: 'blur' }
          ],
          selectedOptions: [{ required: true, message: '请选择录用部门', trigger: 'change' }],
          salary: [{ required: true, message: '请输入基础的薪资', trigger: 'blur' }],
          workSite: [{ required: true, message: '您的输入有误', trigger: 'blur' }],
          // entryMaterials: [{ required: true, message: '请输入内容', trigger: 'blur', maxlength: 50 }],
          contactPeople: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
          telephone: [
            { required: true, validator: tel, message: '您输入的手机号码有误', trigger: 'blur' }
          ],
          position: [{ required: true, message: '请选择职位', trigger: 'change' }],
          informType: [{ required: true, message: '请选择通知方式', trigger: 'change' }],
          entryTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        rules: {  //  这里是面试通知的验证
          templateContent: [
            { required: true, message: '请输入面试通知的内容', trigger: 'blur' }
          ],
          interviewSite: [
            { required: true, message: '请输入面试地址', trigger: 'blur' }
          ],
          contactPeople: [
            { required: true, message: '请输入联系人的方式', trigger: 'blur' }
          ],
          telephone: [
            { required: true, validator: tel, message: '您输入的手机号码有误', trigger: 'blur' }
          ],
          informType: [
            { required: true, message: '请选择联系方式', trigger: 'change' }
          ],
          position2: [
            { required: true, message: '请输选择职位', trigger: 'change' }
          ],
          selectedOptions: [{ required: true, message: '请选择录用部门', trigger: 'change' }],
          interviewTime: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ]
        },
        tmpdata: [
          {
            id: 1,
            templateName: '',
            templateContent: '',
            interviewTime: null,
            interviewSite: '',
            contactPeople: '',
            telephone: '',
            informType: null,
            comments: null,
            enable: 1,
            position: '',
            lastUpdatedDate: 1511848193000,
            createdTime: 1511847499000
          }
        ],
        jobId: '',  //  存储jobId面试通知
        jobIdOff: '', //  存储jobId发送offer
        allDept: [],  //  组织架构没有排序数据
        userinfo: [],
        flag: true,
        deptment: '',
        selectedOptions: [],
        uploadinfo: {
          list: [{
            'contactPeople': '',
            'informType': 140001,
            'interviewSite': '',
            'interviewTime': '',
            'jobSeekerName': '',
            'resumeId': '',
            'seekerId': '',
            'telephone': '',
            'templateContent': ''
          }]
        },
        uploadinfoOffer: {
          list: [{
            'seekerId': '18222021',
            'resumeId': '18222021',
            'jobSeekerName': '我是张三',
            'templateContent': 'xxx您好，恭喜您通过我们的初试，现邀请您参加我们的复试...',
            'deptment': '前端事业部',
            'position': 'Java开发',
            'workSite': '武汉市洪山区光谷梦工场5栋1502',
            'salary': '200000',
            'entryTime': '2017-12-10',
            'entryMaterials': '身份证，户口本，学历证，毕业证，结婚证，离婚证',
            'contactPeople': '贾栋',
            'telephone': '1234567890',
            'informType': '140001'
          }]
        },
        deptIds: [],
        offertmps: [{
          comment: '',
          contactPeople: '',
          createdTime: '',
          deptment: '',
          enable: 1,
          entryMaterials: '',
          entryTime: '',
          informType: '140001',
          lastUpdatedDate: '',
          id: 1,
          position: '',
          salary: 0,
          telephone: '',
          templateContent: '',
          templateName: '',
          workSite: '',
          welfare: '',
          busline: ''
        }],
        jobNames: [],
        position: '',
        value: '', // 面试模板
        value2: '', // offer模板
        value3: '', // 录用部门选项
        textarea: '', // 输入的值
        input: '',
        valueview: '',
        n: 0,
        m: 0,
        Offer_deptment: ''
      }
    }
  }
</script>
<style lang='scss' src='./style.scss'></style>
