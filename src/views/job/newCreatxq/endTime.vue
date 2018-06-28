

<template>
  <div>
    <Form ref="ruleForm" :rules="rulesform" :model="jonMessages" >
      <div class="newcreate-jobInformation Closing-date">
        <FormItem label="截止日期" prop='deadline' class="newcreate-jobInformation-title">
        <!-- <DatePicker
            id="jobAdd_bydata"
            :disabled="isdisabled_publish"
            @on-change="changeTime"
            v-model="jonMessages.deadline"
            type="date"
            placeholder="选择日期"
            style="width:200px;"
            :picker-options="pickerOptions0">
        </DatePicker> -->
        <DatePicker :value="timeData" :options="options3" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        <p v-if="new Date() > new Date(jonMessages.deadline)" style="color:red;font:12px '微软雅黑';margin-top:4px;">当前时间已到期，请重新选择</p>
        </FormItem>
    </div>
    <div class="newcreate-jobInformation Resume-reception">
      <FormItem label="简历接收" prop='deadline' class="Resume-reception-title">
        <Row>
            <Select v-model="jonMessages.acceptSetting" placeholder='同时转发到邮箱' class="jobAdd_receiveSet" @on-change="sameTimeOrno" style="width:200px;" id="jobAdd_receiveSet">
              <Option
                v-for="item in SameTimeList"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]"
                >
              </Option>
            </Select>
            <Input  v-if="ISemail" placeholder="请输入邮箱" v-model="emails" class="input-with-select" style="width:225px;margin-left:50px"></Input>
            <Button class="addBtn" v-if="ISbtn" @click="addEmails" type="primary">添加</Button>
        </Row>   
      </FormItem>
      <p class="tips" style="color:red;font-size:12px;margin:10px 0 0 10px;" v-if="isEmaiss">请输入正确的邮箱格式</p>
      <p class="tips" v-if="isaddEmail" style="font-size:14px;color:red;margin:5px 0px 0px 5px;">不能重复添加</p>
      <ul class="Resume-reception-place">
          <Tag color="blue" v-for="tag in dynamicTags" :key="tag" :name="item" closable @on-close="handleClose(tag)">{{tag}}</Tag>
      </ul> 
    </div>
    </Form>
  </div>
</template>
<script>
import Jobjs from '../../../json/job'
import { getusernameKey } from '@/utils/auth'
export default{
  data() {
    const changeDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择日期'))
      }
    }
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      timeData: '',
      isaddEmail: false,
      isdisabled_publish: false,  //  是否禁用表格
      tablelist: '',  //  原数据
      jonMessages: {    //  该组件的所有数据
        deadline: '',
        receiveEmail: this.emails,
        acceptSetting: '1'
      },
      ISemail: false,
      ISbtn: false,
      isdate: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      SameTimeList: [], // // 简历接收
      emails: '',
      dynamicTags: [], // 简历接收
      inputValue: '',
      isEmaiss: false,
      rulesform: {
        deadline: { type: 'date', required: true, message: '请选择日期', validator: changeDate }
      }
    }
  },
  mounted() {
    this.$store.commit('set_endTime', this.jonMessages)
    this.emails = getusernameKey()
    this.SameTimeList = Jobjs.CONST_SAMETIMETO_EMALI//  简历接收设置
    this.$store.commit('set_RefendTime', this.$refs.ruleForm)  //  获取dom
    this.jonMessages.deadline = this.tablelist.deadline || this.retime(new Date())
    this.changeTime()
  },
  methods: {
    open4() {
      this.$message.error('最多只能添加五个邮箱！')
    },
    sameTimeOrno() { // 发送到邮箱
      if (this.jonMessages.acceptSetting === '0') {
        this.ISemail = true
        this.ISbtn = true
      } else {
        this.ISemail = false
        this.ISbtn = false
        this.isEmaiss = false
        this.dynamicTags = []
        this.$store.state.sendJob.endTime.receiveEmail = ''
      }
      this.$store.commit('set_IsSameTime', this.jonMessages.acceptSetting)
    },
    addEmails() { // 点击添加邮箱 ||||| 验证邮箱格式
      var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (reg.test((this.emails).trim())) {
        for (var i = 0; i < this.dynamicTags.length; i++) {
          if (this.dynamicTags[i] === (this.emails).trim()) {
            this.isaddEmail = true
            return false
          }
        }
        if (this.dynamicTags.length > 4) {
          this.open4()
          return false
        }
        this.dynamicTags.push((this.emails).trim())
        this.jonMessages.receiveEmail = this.dynamicTags.join(',')
        this.isEmaiss = false
        this.isaddEmail = false
      } else {
        this.isEmaiss = true
      }
    },
    handleClose(tag) { // 删除邮箱
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.jonMessages.receiveEmail = this.dynamicTags.join(',')
    },
    settablelist() {
      this.jonMessages.deadline = new Date(this.tablelist.deadline)	  //  截止日期
      this.jonMessages.deadline = this.tablelist.deadline
      this.jonMessages.receiveEmail = this.tablelist.receiveEmail	  //  邮箱
      this.jonMessages.acceptSetting = this.tablelist.acceptSetting// 简历接收设置类型
      this.emails = getusernameKey()
      if (this.tablelist.receiveEmail !== null) {
        this.dynamicTags = this.tablelist.receiveEmail.split(',') || []
      }
      if (this.dynamicTags[0] === '') {
        this.dynamicTags.splice(0, 1)
      }
      if (this.tablelist.publishState === 130002 || this.tablelist.publishState === 130006) {
        this.isdisabled_publish = true
        this.jonMessages.deadline = this.tablelist.deadline
      } else if (this.tablelist.publishState !== 130002 && Boolean(this.$route.query.isEdit)) {
        this.jonMessages.deadline = this.tablelist.deadline
      } else {
        this.jonMessages.deadline = this.retime(new Date())
      }
    },
    retime(val) {
      var date = new Date(val)
      var y = 1900 + date.getYear()
      var m = '0' + (date.getMonth() + 2)
      var d = '0' + date.getDate()
      // m === '013' ? m = '01' : m  //  延长一个月
      if (m === '013') {
        m = '01'
        y += 1
      }
      return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
    },
    retimechange(val) {
      var date = new Date(val)
      var y = 1900 + date.getYear()
      var m = '0' + (date.getMonth() + 1)
      var d = '0' + date.getDate()
      // m === '013' ? m = '01' : m  //  这个是不延长时间
      if (m === '013') {
        m = '01'
        y += 1
      }
      return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
    },
    changeTime() {
      this.timeData = this.Format(new Date(), 'yyyy-MM-dd')
      if (this.jonMessages.deadline === '') {
        this.isdate = true
        return false
      } else {
        this.jonMessages.deadline = this.retimechange(this.jonMessages.deadline)
        this.isdate = false
      }
    },
    Format(date, fmt) {
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      return fmt
    }
  },
  props: ['workList', 'resumeSend'],
  watch: {  //  监测接收数据
    workList(val) {
      //  把原数据给data的tablelist
      this.tablelist = val
      this.settablelist()
    },
    resumeSend(val) {
      if (val === '0') {
        this.jonMessages.acceptSetting = '0'
      } else {
        this.jonMessages.acceptSetting = '1'
        this.$store.state.sendJob.endTime.receiveEmail = ''
      }
    },
    jonMessages: {
      deep: true,
      handler: function(val, oldVal) {
        this.$store.commit('set_endTime', val)
      }
    }
  }
}
</script>
<style lang="scss" src="../newCreates.scss"></style>
