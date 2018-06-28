<template>
  <div class="newcreate-wrapper" id="job_Add">
      <!-- <Modal
        v-model="modal1"
        title="提示"
        @on-ok="goIndexPage"
        width="300">
        <p>是否退出，退出后的信息将不保留?</p>
    </Modal>
    <div class="sanjiao" @click="modal1 = true">
        <span class="newcreate-sanjiao"></span>
        <Icon type="chevron-left"></Icon>
    </div> -->
    <div class="sign" v-show="false">
    </div>
      <h2 class="newcreate-header">新招聘需求<span v-if="suibian"></span></h2>
      <div class="newcreate-main">
          <!-- 职位信息 -->
          <jobMessage ref="jobmessage" :workList="objects"></jobMessage>
          <!-- 发布地点/工作地址 -->
          <publishPlace ref="publishplace" :workList="objects"></publishPlace>
          <!-- 所属部门/发放月数 -->
          <mounthOrdempart ref="mounthOrdempart" :workList="objects"></mounthOrdempart>
          <!-- 职位描述/添加职位标签-->
          <jobDirection ref="jobdirection" :workList="objects"></jobDirection>
          <!-- 职位亮点 -->
          <jobLights ref="joblight" :workList="objects"></jobLights>
          <!--截止日期/简历接收设置 -->
           <endTime ref="endTime" :workList="objects" :resumeSend="resumeSend"></endTime>
           <!-- 发布渠道 -->
           <publishChannel ref="publishChannelss" :workList="objects"></publishChannel>

           <div class="add-allBtns" id="add-allBtns">
               <Button type="primary" :loading="addNeedLoading" ref="newNeed" v-if="publishState !== 130002" @click="addNeed('add')">发布</Button>
               <Button type="primary" :loading="saveLoading" ref="save" v-if="!RsendEvent" @click="addNeed('save')">保存</Button>
               <Button @click="modal1 = true">取消</Button>
           </div>
      </div>
        <!-- 弹出框提示 -->
        <Modal
          v-model="dialogVisible"
          title="提示"
          :before-close="handleClose">
          <p>发布职位：{{nowMessage.jobName || " "}}</p>
          <p v-if="JsonSendSucess"><span class="JsonSendSucess"></span>发布成功：{{JsonSendSucess}}</p>
          <p v-if="JsonsendFail"><span class="JsonsendFail"></span> 发布失败：{{JsonsendFail}}</p>
          <p v-if="Jsonsending"><span class="Jsonsending"></span> 待审核：{{Jsonsending}}</p>
          <span slot="footer" class="dialog-footer">
            <Button style="margin:0 auto;" type="primary" @click="handleClose">确 定</Button>
          </span>
        </Modal>
  </div>
</template>
<script>
import { newNeed, saveEditLocal } from '../../api/jobApi/newCreat' //  新招聘的发布的api
import { detail } from '../../api/jobApi/jobIndex' //  获取简历的api
import jobMessage from './newCreatxq/jonMessage'
import publishPlace from './newCreatxq/publishPlace'
import mounthOrdempart from './newCreatxq/mounthOrdempart'
import jobDirection from './newCreatxq/jobdirection'
import jobLights from './newCreatxq/jobLifhts'
import endTime from './newCreatxq/endTime'
import publishChannel from './newCreatxq/publishChannel'
import { saveEdit } from '../../api/jobApi/positionDetails'  //  编辑后发布的api
export default{
  components: {
    jobMessage,
    publishPlace,
    jobDirection,
    jobLights,
    endTime,
    publishChannel,
    mounthOrdempart
  },
  data() {
    return {
      modal1: false,
      nowMessage: '', //  当前表数据
      JsonSendSucess: '', //  成功message
      JsonsendFail: '', //  失败message
      Jsonsending: '', // 待审核发布中
      dialogVisible: false,
      suibian: false,
      addNeedLoading: false,  //  发布加载中
      saveLoading: false, //  保存
      objects: {},
      newObjects: {
        deadline: new Date(),
        receiveEmail: '',
        jobDesc: '',
        jobDuty: '',
        jobSternName: '',
        jobStern: '',
        jobName: '',
        jobCategory: '',
        degreeId: '',
        workLength: '',
        number: '',
        salaryPeriod: '',
        feedbackTime: '',
        publishWay: '',
        publishCity: '',
        workPlace: '',
        workSite: '',
        deptIds: '',
        jobDeptName: '',
        jobDeptId: '',
        payMonth: '',
        acceptSetting: ''
      },
      id: '', //  这里存储的是id值
      resumeSend: '',
      RsendEvent: '',  // 这里存储的是，是否是重新发布的
      publishState: '',  //  这里是他的状态，为在线，下线 ， 到期
      isRefJobMessage: this.$store.state.RegExpJob_disable.isRefJobMessage, //  这里是jobMessage的表单有没验证过
      publishChannelObj: {
        '10005': '前程无忧',  // 前程无忧
        '10001': '智联招聘', // 智联招聘
        '10006': '拉勾网',  // 拉勾网
        '10004': 'BOSS直聘',  // BOSS直聘
        '10002': '58同城',  // 58同城
        '10003': '猎聘' // 猎聘
      }
    }
  },
  created() {
    var obj = this.$route.query
    this.id = obj.id || ''
    this.RsendEvent = obj.RsendEvent || ''
    this.publishState = Number(obj.publishState) || ''
    if (this.id === '') {
      this.id = ''
      this.objects = this.newObjects
    } else {
      this.objects = this.newObjects
      detail({  //  获取简历的所有数据的api
        id: obj.id
      }).then(res => {
        this.objects = res.result  // 简历的所有数据
        if (res.result.acceptSetting === 0) {
          this.resumeSend = '0'
        } else {
          this.resumeSend = '1'
        }
        this.$store.commit('set_allJobCreatMessage', res.result)
        this.$store.commit('set_nowMessage', res.result.id)
        this.$store.commit('set_nowMessage_publishUserId', res.result.publishUserId)
        this.$store.commit('set_publishState', res.result.publishState)
      })
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.$router.push('job')
    },
    error_sign() {
      this.$message.error('请输入完整信息！')
    },
    goIndexPage() { // 回退到上一个页面
      this.id = ''
      this.$store.commit('set_Professional_false')
      this.$store.commit('set_jobStern_false')
      this.$store.commit('set_IsinterviewData_false')
      this.$router.go(-1)
    },
    cancel() { // 取消
      this.$confirm('是否退出，退出后的信息将不保留?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.id = ''
        this.$store.commit('set_Professional_false')
        this.$store.commit('set_jobStern_false')
        this.$store.commit('set_IsinterviewData_false')
        this.$router.go(-1)
      })
    },
    addNeed(val) {
      this.$store.commit('set_IsinterviewData')
      this.$store.commit('set_RefJobMessage_validate')  // job 的验证
      this.$store.commit('set_RefJobMessageOnly_validate')  // 仅对jobmessage验证
      this.$store.commit('set_RefpublishChannelOnly_validate')  // 仅对publish验证
      this.$store.commit('set_RefRefpublishPlaceOnly_validate')  // 仅对publishPlace验证
      this.$store.commit('set_RefRefdeptIdOnly_validate')  // 仅对所属部门验证
      if (this.$store.state.RegExpJob_disable.IsinterviewData) {  // 仅对jobmessage验证
        this.$message.error('请按要求填写')
        return false
      }
      if (!this.$store.state.RegExpJob_disable.RefJobMessageOnly_validate) {  // 仅对jobmessage验证
        this.$message.error('请按要求填写')
        return false
      }
      if (!this.$store.state.RegExpJob_disable.RefpublishChannelOnly_validate) {  // 仅对publish验证
        this.$message.error('请按要求填写')
        return false
      }
      if (!this.$store.state.RegExpJob_disable.RefRefpublishPlaceOnly_validate) {  // 仅对publish验证
        this.$message.error('请按要求填写')
        return false
      }
      if (this.$store.state.sendJob.jobdirection.jobDesc.replace(/\s/g, '').length < 50) { //  对jobdirection的jobDesc的字数验证
        this.$message.error('请按要求填写')
        return false
      }
      if (this.$store.state.sendJob.openMounths.payMonth < 12 || this.$store.state.sendJob.openMounths.payMonth > 36 || Number.isInteger(Number(this.$store.state.sendJob.openMounths.payMonth)) === false) { //  发放月份
        this.$message.error('请按要求填写')
        return false
      }
      // if (this.$store.state.sendJob.openMounths.jobDeptId === '') { //  对jobdirection的jobDesc的字数验证
      //   this.$message.error('请按要求填写')
      //   return false
      // }
      if (this.RsendEvent) {
        //  新发布
        // this.names = this.$store.state.sendJob.nowMessage.jobName
        this.$store.commit('set_nowMessageId')
        this.$store.commit('mixMessage')
        var tableData1 = this.$store.state.sendJob.nowMessage
        this.nowMessage = tableData1
        if (tableData1.jobLable === '') {
          this.$store.commit('set_Professional_true')
        } else {
          this.$store.commit('set_Professional_false')
        }
        if (tableData1.jobStern === '') {
          this.$store.commit('set_jobStern_true')
        } else {
          this.$store.commit('set_jobStern_false')
        }
        if (new Date() > new Date(tableData1.deadline)) {
          this.$message.error('当前时间已到期，请重新选择')
          return false
        }
        if (this.$store.state.RegExpJob_disable.IsSameTime && !tableData1.receiveEmail) {
          this.$message.error('请填写邮箱')
          return false
        }
        for (var key in tableData1) {
          key
          if (key !== 'receiveEmail' && key !== 'tele58' && key !== 'jobDuty') {
            if (tableData1[key] === '' || tableData1[key] === null) {
              this.error_sign()
              return false
            }
          }
        }
        if (JSON.stringify(tableData1) === '{}') {
          this.error_sign()
          return false
        }
        this.addNeedLoading = true
        this.$refs.newNeed.$el.children[0].innerText = '发布中'
        var interviewCountObj = this.$store.state.RegExpJob_disable.interviewData  //  拼接面试流程数据interviewCounts
        tableData1.interviewTurnJobs = interviewCountObj
        newNeed(
          tableData1
        ).then(res => {
          if (res.code === 200) {
            this.addNeedLoading = false
            var confMessage = JSON.parse(res.message).result
            var sendSucess = []
            var sendFail = []
            var sending = []
            for (var key of confMessage) {
              if (key.code === 200) {
                sendSucess.push(this.publishChannelObj[key.platId])
              } else if (key.code === 202) {
                sending.push(this.publishChannelObj[key.platId])
              } else {
                sendFail.push(this.publishChannelObj[key.platId])
              }
            }
            var JsonSendSucess = sendSucess.join('、')
            var JsonsendFail = sendFail.join('、')
            var Jsonsending = sending.join('、')
            this.JsonSendSucess = JsonSendSucess
            this.JsonsendFail = JsonsendFail
            this.Jsonsending = Jsonsending
            this.dialogVisible = true
            this.$refs.newNeed.$el.children[0].innerText = '发布'
            this.id = ''
            this.RsendEvent = ''
            this.publishState = ''
            this.$store.commit('set_Professional_false')
            this.$store.commit('set_jobStern_false')
            // this.$store.commit('set_Professional_false')
            // this.$store.commit('set_jobStern_false')
            // this.$router.push('job') //  路由跳转
            this.$store.commit('set_IsSameTime', '1')
            this.$store.commit('set_IsinterviewData_false')
          } else {
            this.$message.error(res.message)
            this.$refs.newNeed.$el.children[0].innerText = '发布'
            this.addNeedLoading = false
          }
        })
        return false
      } else {
        // 编辑再发布
       // this.$store.commit('set_nowMessageId')
        // this.names = this.$store.state.sendJob.nowMessage.jobName

        this.$store.commit('mixMessage')
        var tableData2 = this.$store.state.sendJob.nowMessage
        this.nowMessage = tableData2
        var interviewCountObj2 = this.$store.state.RegExpJob_disable.interviewData  //  拼接面试流程数据interviewCounts
        tableData2.interviewTurnJobs = interviewCountObj2  //  拼接面试流程数据interviewCounts
        if (tableData2.jobLable === '') {
          this.$store.commit('set_Professional_true')
        } else {
          this.$store.commit('set_Professional_false')
        }
        if (tableData2.jobStern === '') {
          this.$store.commit('set_jobStern_true')
        } else {
          this.$store.commit('set_jobStern_false')
        }
        if (new Date() > new Date(tableData2.deadline)) {
          this.$message.error('当前时间已到期，请重新选择')
          return false
        }
        if (this.$store.state.RegExpJob_disable.IsSameTime && !tableData2.receiveEmail) {
          this.$message.error('请填写邮箱')
          return false
        }
        for (var k in tableData2) {
          k
          if (k !== 'receiveEmail' && k !== 'tele58' && k !== 'jobDuty') {
            if (tableData2[k] === '' || tableData2[k] === null) {
              this.error_sign()
              return false
            }
          }
        }
        if (val === 'add' || this.publishState === 130002) {
          if (val === 'add') {
            this.addNeedLoading = true
            this.$refs.newNeed.$el.children[0].innerText = '发布中'
          }
          if (this.publishState === 130002) {
            this.saveLoading = true
            this.$refs.save.$el.children[0].innerText = '保存中'
          }
          saveEdit(
        tableData2
      ).then(res => {
        if (res.code === 200) {
          if (val === 'add') {
            this.addNeedLoading = false
            this.$refs.newNeed.$el.children[0].innerText = '发布'
          }
          if (this.publishState === 130002) {
            this.saveLoading = false
            this.$refs.save.$el.children[0].innerText = '保存'
          }
          this.addNeedLoading = false
          this.id = ''
          this.RsendEvent = ''
          this.publishState = ''
          this.$store.commit('set_Professional_false')
          this.$store.commit('set_jobStern_false')
          this.$store.commit('set_IsSameTime', '1')
          this.$store.commit('set_IsinterviewData_false')
          this.dialogVisible = true

          var confMessage = JSON.parse(res.message).result
          var sendSucess = []
          var sendFail = []
          var sending = []
          for (var key of confMessage) {
            if (key.code === 200) {
              sendSucess.push(this.publishChannelObj[key.platId])
            } else if (key.code === 202) {
              sending.push(this.publishChannelObj[key.platId])
            } else {
              sendFail.push(this.publishChannelObj[key.platId])
            }
          }
          var JsonSendSucess = sendSucess.join('、')
          var JsonsendFail = sendFail.join('、')
          var Jsonsending = sending.join('、')
          this.JsonSendSucess = JsonSendSucess
          this.JsonsendFail = JsonsendFail
          this.Jsonsending = Jsonsending
          // this.$router.push('job')
        } else {
          this.$message.error(res.message)
          if (val === 'add') {
            this.addNeedLoading = false
            this.$refs.newNeed.$el.children[0].innerText = '发布'
          }
          if (this.publishState === 130002) {
            this.saveLoading = false
            this.$refs.save.$el.children[0].innerText = '保存'
          }
        }
      })
        } else {
          this.saveLoading = true
          this.$refs.save.$el.children[0].innerText = '保存中'
          saveEditLocal(
        tableData2
      ).then(res => {
        if (res.code === 200) {
          this.saveLoading = false
          this.$refs.save.$el.children[0].innerText = '保存'
          this.id = ''
          this.RsendEvent = ''
          this.publishState = ''
          this.$store.commit('set_Professional_false')
          this.$store.commit('set_jobStern_false')
          this.$store.commit('set_IsSameTime', '1')
          this.$store.commit('set_IsinterviewData_false')
          this.$router.push('job')
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 800
          })
        } else {
          this.$message.error(res.message)
          this.saveLoading = false
          this.$refs.save.$el.children[0].innerText = '保存'
        }
      })
        }
      }
    }
  }
}
</script>
<style lang="scss" src="./newCreates.scss"></style>
