<template>
  <div class='notice-resumup'>
    <a onclick='javascript:history.go(-1);'>
      <div class='arrow-down'>
        <span><Icon type="chevron-left"></Icon></span>   
      </div>
    </a>
    <h3 class="notice_title">面试通知</h3>
    <div class='resum-head'>
          <div class='uptop' v-if="isView">
            <div class='morenselect'>
              <span>选择模板</span>
              <Select v-model='value' placeholder='请选择' style="width:200px" @on-change='select'>
                <Option
                  v-for='item in tmpdata'
                  :key='item.id'
                  :label='item.templateName'
                  :value='item.id'>
                </Option>
              </Select>
            </div>
            <Form :model="tmpdata[n]" :rules="rules" ref="ruleForm" :label-width="80" class="demo-ruleForm">
            <div class='mobanbg'>
              <div class='mobancont'>
                <div class='cont'>
                   <FormItem label="敬语" prop="templateContent">
                    <Input
                      type='textarea'
                      :rows='5'
                      placeholder='请输入内容'
                      v-model='tmpdata[n].templateContent'
                      :maxlength='500' >
                    </Input>
                  </FormItem>
                </div>
                <div class='cont'>
                   <FormItem label="携带材料">
                      <Input
                        type='textarea'
                        :rows='5'
                        placeholder='请输入内容'
                        :maxlength='50'
                        v-model='tmpdata[n].materious'>
                      </Input>
                    </FormItem>
                </div>
                <div class='cont cont1'>
                  <FormItem label="面试职位" prop="jobmodel">
                        <el-select v-model="tmpdata[n].jobmodel" filterable :disabled="sendinter_urlData.interviewStatus == '0'" @change='positionJobname' placeholder="请选择">
                        <el-option
                          v-for="item in listJobData"
                          :label="item.jobName"
                          :key='item.id'
                          :value="item.id">
                          <span style="float: left; color: #2d8cf0;">{{ item.jobName }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.publishUserName }}</span>
                        </el-option>
                      </el-select>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="面试地点" prop="interviewSite">
                   <Input v-model='tmpdata[n].interviewSite' placeholder='请输入内容' :maxlength='50'>
                   </Input>
                  </FormItem>
                </div>
                <div class='cont timePlugin'>
                  <FormItem label="面试时间" prop="interviewTime">
                    <el-date-picker
                    v-model="tmpdata[n].interviewTime"
                    type="datetime"
                    value-format ='yyyy-MM-dd HH:mm'
                    :picker-options="pickerOptions1"
                    placeholder="选择日期时间">
                    </el-date-picker>
                  </FormItem>
              </div>
                <div class='cont'>
                  <FormItem label="联系人" prop="contactPeople">
                    <Input v-model='tmpdata[n].contactPeople' placeholder='请输入内容' :maxlength='50'>
                    </Input>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="联系电话" prop="telephone">
                      <Input v-model='tmpdata[n].telephone' placeholder='请输入内容' :maxlength='50'>
                      </Input>
                  </FormItem>
                </div>
              </div>
            </div>
            <FormItem label="通知方式" prop="informType">
              <Select v-model="tmpdata[n].informType" placeholder="请选择通知方式" style="width:200px;" >
                <Option label="邮件通知" value="140001"></Option>
              </Select>
            </FormItem>
            </Form>
            <!-- 这里是面试流程 -->
          <div class="interviewbox" v-if="sendinter_urlData.interviewStatus != '0'">
            <h3>
              面试流程<span @click="addInterview"><Icon type="plus-circled"></Icon> 新增面试</span>
            </h3>
            <div class="interview" v-for="(item, index) in addInterviewData">
              <Row style="line-height:30px;">
                <Col span="1">
                  <span class="interviewConst">{{interviewConst[index + 1]}}</span>
                </Col>
                <Col span="6">
                  <depart v-on:sendman="sendman" :addIndex='index' :interviewData='interviewData'></depart>
                </Col>
                <Col span="2">
                  <b class="delInter" v-if="index" @click="delInterview(index)">
                  <Icon type="trash-a"></Icon> 删除</b>
                </Col>
              </Row>
            </div>
              <p class="tips" style="color:red;font-size:12px;margin:0px 0px 0px 40px;" v-if="this.$store.state.RegExpJob_disable.IsinterviewData">请选择完整</p>
          </div>
          </div>
          <!-- 这里是预览的模板 -->
          <div class='uptop2' v-else>
            <div class="uptop2_head">
              <span>收件人</span>
              <Input
              v-model="userinfo[0].email"
              :disabled="true"
              style="width:200px;"
              ></Input>
            </div>
            <div class='interContent'>
              <span class='interContent-title'>内容</span>
            <div class="main" style="width: 750px;height: 100%;margin-left: 46px;position: relative;overflow: hidden;line-height: 25px;">
                <img style=" width: 100%;" src='@/assets/sendInterModel/headmini.png'>
                <div class="content" style="box-sizing: border-box;padding: 0px 45px;width: 100%;margin-top: -100px;background-image:url(data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADfSURBVDhPdZKBEsMgCEP9/0+21s5gn4tsepdSQwLoWVprT+/90brve0G84Fzg5cMIeV3XMsCrqKLzbehKTlAkgxy64iOyXEBuQZyMEOrs3Rl7GV4+OBk9KTFAJLD3XHER/7kL46ETH8ZNNKJG1r8X8qMoxq1CONyovFZX7i0Ul/Ov6qkbXFwOG0SKGFc+6baO/y7BO8EprjMKItTJu0XBk9GTtdaBfUyBgmAakwhQcC9apzESJmRsN7lGWMajeACh4NyPkaouco64GXNX9noxOTfPeIDE4zOf24jf7u35APZhVAwRRBs/AAAAAElFTkSuQmCC);background-repeat: repeat;">
                    <h3 style="text-align: center;margin: 48px 0px;">尚德机构面试通知</h3>
                    <h4 style="margin: 12px 0px;">尊敬的{{userinfo[0].jobSeekerName}}先生/女生，您好</h4>
                    <p style="margin: 0px;font: 14px '微软雅黑';text-indent: 2em;word-break: break-all;line-height: 25px;">{{tmpdata[n].templateContent}}</p>
                    <ul style="list-style: none;padding: 0px;margin: 0px;font: 14px '微软雅黑';line-height: 25px;">
                        <li style="line-height: 25px;">面试岗位：{{sendinter_urlData.jobName || jobName}}</li>
                        <li style="line-height: 25px;">面试时间：{{tmpdata[n].interviewTime}}</li>
                        <li style="line-height: 25px;">携带材料：{{tmpdata[n].materious}}</li>
                        <li style="line-height: 25px;">面试联系人：{{tmpdata[n].contactPeople}}</li>
                        <li style="line-height: 25px;">联系方式：{{tmpdata[n].telephone}}</li>
                        <li style="line-height: 25px;">面试地点：{{tmpdata[n].interviewSite}}</li>
                        <li style="line-height: 25px;">温馨提示：出行注意安全。</li>
                        <li style="line-height: 25px;">预祝您面试成功！我们不见不散</li>
                    </ul>
                    <div class="line_left" style="width: 10px;height: 100%;position: absolute;left: 0px;top: 248px;background-image: repeating-linear-gradient(45deg,#277DA3 0%,#277DA3 5%, rgba(0, 0, 0, 0) 5%,rgba(0, 0, 0, 0) 10%,#BC4F3A 10%, #BC4F3A 15%, #BC4F3A 20%,#BC4F3A 25%, rgba(0, 0, 0, 0) 25%,rgba(0, 0, 0, 0) 30%,#277DA3 30%, #277DA3 35%);"></div>
                    <div class="line_right" style="width: 10px;height: 100%;position: absolute;right: 0px;top: 248px;background-image: repeating-linear-gradient(-45deg,#277DA3 0%,#277DA3 5%, rgba(0, 0, 0, 0) 5%,rgba(0, 0, 0, 0) 10%,#BC4F3A 10%, #BC4F3A 15%, #BC4F3A 20%,#BC4F3A 25%, rgba(0, 0, 0, 0) 25%,rgba(0, 0, 0, 0) 30%,#277DA3 30%, #277DA3 35%);"></div>
                    <div class="footer" style="text-align:center;width: 100%;height: 95px;box-sizing: border-box;padding: 25px 0px 0px 0px;position: relative;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAAlCAYAAAC+liCKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3N2MzMjZkMS1kZDAzLTQzNjEtYTRkZC01YmRhMDQ1NTdhYTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjIyRDQ2NkJGNTBCMTFFNzlCMjZERDgyQjkxRUFEM0IiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjIyRDQ2NkFGNTBCMTFFNzlCMjZERDgyQjkxRUFEM0IiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGQxMzRjM2UtYzkwYS00MDA4LTkxNWQtMWJkNWNiMTlkNTg5IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGM2YzQ1YjMtN2IyYy0xYzRmLTkzNDktYjc1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">
                        <div class="line_bottom" style="width: 100%;height: 10px;background-image: repeating-linear-gradient(-45deg,#277DA3 0%,#277DA3 5%, rgba(0, 0, 0, 0) 5%,rgba(0, 0, 0, 0) 10%,#BC4F3A 10%, #BC4F3A 15%, #BC4F3A 20%,#BC4F3A 25%, rgba(0, 0, 0, 0) 25%,rgba(0, 0, 0, 0) 30%,#277DA3 30%, #277DA3 35%);position: absolute;left: 0px;bottom: 0px;"></div>
                    </div>
                </div>
            </div>
          </div>
          </div>
          <!-- 预览模板结束 -->
          <div class='upbottom' v-if="isView">
            <Button type='primary' @click="preview('ruleForm')">预览</Button>
            <router-link to="resume">
            <Button type='info'>取消</Button>
            </router-link>
          </div>
          <div class='upbottom' v-else>
            <Button type='primary' :loading="sendLoading"  @click="sendInterview('ruleForm')">确认</Button>
            <Button type='info' @click="isView = true">取消</Button>
          </div>
    </div>
  </div>
</template>

<script>
  import { resumetemplate, listWithPublishName, getInterviewCountsById } from '../../api/resumeSearchApi/notice'
  import { interviewSend } from '../../api/resumeSearchApi/distribute'
  import depart from '@/views/job/newCreatxq/depart.vue'
  // import { joblin } from '../../api/resumeSearchApi/total' // joblin
  export default {
    created() {
      this.userinfo = JSON.parse(window.localStorage.getItem('userinfo')) //  取出保存在本地的简历信息数据
      listWithPublishName().then(res => {
        this.listJobData = res.result
      })
      this.sendinter_urlData = this.$route.query || {}  //  取url的数据、面试状态
      if (this.sendinter_urlData.interviewStatus !== '0') {  //  不在面试中，则显示面试流程
        this.addInterviewData.push('1')
        this.interviewData.push({
          interviewerId: window.sessionStorage.roleId,
          interviewerName: window.sessionStorage.userName
        })
      }
    },
    mounted() {
      // 获取模板
      resumetemplate().then(res => {
        this.tmpdata = res.result
        this.tmpdata.forEach((item, index) => {
          if (item.enable === 1) {
            this.n = index
            this.value = item.id
          }
          if (this.sendinter_urlData.interviewStatus === '0') {  //  如果发了是在面试中、默认模板为面试职位
            item.jobmodel = this.sendinter_urlData.jobName
          }
          item.position = this.userinfo[0].jobTitle
        })
      })
      for (var i = 0; i < this.userinfo.length; i++) {
        this.uploadinfo['list'].push({})   //  生成几个空对象接收这个数据
      }
      for (let i = 0; i < this.userinfo.length; i++) {
        this.uploadinfo['list'][i].position = this.userinfo[i].jobTitle
        this.uploadinfo['list'][i].resumeId = this.userinfo[i].resumeId
        this.uploadinfo['list'][i].seekerId = this.userinfo[i].seekerId
        this.uploadinfo['list'][i].jobSeekerName = this.userinfo[i].jobSeekerName
        this.uploadinfo['list'][i].interviewSite = this.tmpdata[this.n].interviewSite
        // this.uploadinfo['list'][i].interviewTime = (this.tmpdata[this.n].interviewTime).getTime() || ''
        this.uploadinfo['list'][i].templateContent = this.tmpdata[this.n].templateContent
        this.uploadinfo['list'][i].contactPeople = this.tmpdata[this.n].contactPeople
        this.uploadinfo['list'][i].seekerPhone = this.userinfo[i].phone
        this.uploadinfo['list'][i].seekerEmail = this.userinfo[i].email
        this.uploadinfo['list'][i].resumeState = this.userinfo[i].resumeState
        this.uploadinfo['list'][i].resumeFlowId = this.userinfo[i].resumeFlowId
      }
    },
    components: {
      depart
    },
    methods: {
      // 在这里获取监听一个方法去获取传入的对象值
      sendman(a) {
        for (var i = 0; i < this.addInterviewData.length; i++) {
          if (i === a[0].addIndex) {
            this.interviewData[i] = {
              interviewerId: a[0].id,
              interviewerName: a[0].name || ''
            }
          }
        }
        this.$store.commit('set_interviewData', this.interviewData)
        this.$store.commit('set_IsinterviewData')
      },
      // 这里需要获取值后分别进行赋值
      addInterview() {  //  添加面试select选择框
        if (this.addInterviewData.length < 5) {
          this.addInterviewData.push(this.addInterviewData.length + 1)
          this.interviewData.push('')
          this.$store.commit('set_interviewData', this.interviewData)
          this.$store.commit('set_IsinterviewData')
        }
      },
      delInterview(e) { //  删除面试流程数据  结束
        this.addInterviewData = this.addInterviewData.filter((val, index) => {  //  排序select
          return e !== index
        })
        this.interviewData = this.interviewData.filter((val, index) => {  //  存储的面试官排序
          return e !== index
        })
        this.$store.commit('set_interviewData', this.interviewData)
        this.$store.commit('set_IsinterviewData')
      },
      preview(formname) { //  表单验证
        this.$refs[formname].validate((valid) => {
          if (valid) {
            this.isView = false
          } else {
            this.$message.error('请将表单填写完整')
          }
        })
      },
      positionJobname(val) {  //  获取jobid、发送面试通知
        for (const k of this.listJobData) {
          if (k.id === val) {
            this.jobName = k.jobName
          }
        }
        getInterviewCountsById({  //  关联的面试流程数据
          jobId: val
        }).then(res => {
          this.addInterviewData = []
          this.interviewData = []
          if (res.code === 200) {
            for (var key of res.result) {
              this.addInterviewData.push(this.addInterviewData.length)
              this.interviewData[key.count - 1] = { 'interviewerId': key.interviewerId, 'interviewerName': key.interviewerName }
            }
          }
        })
      },
      sendInterview(formname) { //  发送面试通知
        this.sendLoading = true
        var interviewFlowLists = []
        var interviewDat = this.$store.state.RegExpJob_disable.interviewData
        if (this.sendinter_urlData.interviewStatus !== '0') {
          interviewFlowLists = interviewDat.map((res, index) => {
            return {
              interviewRound: index + 1,
              interviewerId: res.interviewerId,
              interviewerName: res.interviewerName
            }
          })
        }
        for (let i = 0; i < this.userinfo.length; i++) {
          this.uploadinfo['list'][i].resumeId = this.userinfo[i].resumeId
          this.uploadinfo['list'][i].seekerId = this.userinfo[i].seekerId
          this.uploadinfo['list'][i].jobSeekerName = this.userinfo[i].jobSeekerName
          this.uploadinfo['list'][i].interviewSite = this.tmpdata[this.n].interviewSite
          this.uploadinfo['list'][i].materious = this.tmpdata[this.n].materious
          this.uploadinfo['list'][i].interviewTime = (new Date(this.tmpdata[this.n].interviewTime)).getTime()
          this.uploadinfo['list'][i].templateContent = this.tmpdata[this.n].templateContent
          this.uploadinfo['list'][i].contactPeople = this.tmpdata[this.n].contactPeople
          this.uploadinfo['list'][i].telephone = this.tmpdata[this.n].telephone
          this.uploadinfo['list'][i].informType = this.tmpdata[this.n].informType
          this.uploadinfo['list'][i].position = this.jobName || this.sendinter_urlData.jobName
          this.uploadinfo['list'][i].seekerPhone = this.userinfo[i].phone
          this.uploadinfo['list'][i].seekerEmail = this.userinfo[i].email
          this.uploadinfo['list'][i].resumeState = this.userinfo[i].resumeState
          this.uploadinfo['list'][i].jobId = this.tmpdata[this.n].jobmodel
          this.uploadinfo['list'][i].resumeFlowId = this.userinfo[i].resumeFlowId
          this.uploadinfo['list'][i].interviewFlowList = interviewFlowLists
          if (this.sendinter_urlData.interviewStatus === '0') {
            this.uploadinfo['list'][i].jobId = this.sendinter_urlData.jobId
            this.uploadinfo['list'][i].position = this.sendinter_urlData.jobName
          }
          if (this.userinfo[i].email === '') {
            this.sendLoading = false
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
              this.sendLoading = false
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
          this.sendLoading = false
        })
      },
      handleClick() {
      },
      select(val) {
        for (let i = 0; i < this.tmpdata.length; i++) {
          if (this.tmpdata[i].id === val) {
            this.n = i
          }
        }
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
        sendLoading: false, //  加载
        sendinter_urlData: {},  //  面试中的状态jobid
        addInterviewData: [],  //  添加面试
        interviewData: [],  //  存储几面的面试官
        interviewConst: {
          1: '一面',
          2: '二面',
          3: '三面',
          4: '四面',
          5: '五面'
        },
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
          jobmodel: [
            { required: true, message: '请输选择职位', trigger: 'change' }
          ],
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
            informType: '140001',
            comments: null,
            enable: 1,
            position: '',
            lastUpdatedDate: 1511848193000,
            createdTime: 1511847499000
          }
        ],
        jobName: '',  //  存储jobId面试通知
        jobIdOff: '', //  存储jobId发送offer
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
        jobNames: [],
        position: '',
        value: '', // 面试模板
        value3: '', // 录用部门选项
        textarea: '', // 输入的值
        input: '',
        valueview: '',
        n: 0,
        listJobData: [],
        isView: true  //  面试预览的界面
      }
    }
  }
</script>
<style lang='scss' src='./style.scss'></style>
