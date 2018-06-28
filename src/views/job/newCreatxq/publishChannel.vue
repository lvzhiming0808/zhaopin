<template>
  <div class="newcreate-jobInformation Publishing-channel">
    <h3><b style="font-size:14px;color:#F56C6C;font-weight:normal;">* </b>发布渠道<span class="under-line"></span></h3>
    <Form ref="ruleForm" :rules="rulesform" :model="jonMessages" >
    <FormItem prop='checkListChannel' class="newcreate-jobInformation-title">
      <CheckboxGroup ref="checkbox" v-model="jonMessages.checkListChannel" @on-change="changeclick">
          <Checkbox v-for="(item, index) in publishList" :key="index" :data-id="item.platId" :disabled="isdisabled_publish || item.status!==1" :label="item.platId.toString()">{{item.platName}}<span class="needPublish">{{item.message}}</span></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem v-if="checked58" prop='tele58' label="58同城:" class="tele58">
      <span>手机号码</span>
      <Input style="width: 180px" :minlength='8' :maxlength="20" v-model="jonMessages.tele58" size="mini" placeholder="请填写手机号码"></Input>
    </FormItem>
    </Form>
    <div class="interviewbox">
      <h3>
        <b style="font-size:14px;color:#f56c6c;font-weight:normal;">* </b>面试流程 <Button type="primary" @click="addInterview">新增面试</Button><span class="under-line"></span>
      </h3>
      <div class="interview" v-for="(item, index) in addInterviewData">
        <Row>
          <Col span="2" style="text-aling:cent">
            <span class="interviewConst">{{interviewConst[index + 1]}}</span>
          </Col>
          <Col span="6">
             <depart v-on:sendman="sendman" :addIndex='index' :interviewData='interviewData'></depart>
          </Col>
          <Col span="2">
            <Button type="error" class="delInter" v-if="index" @click="delInterview(index)"><icon-svg icon-class='delInterview'/>删除</Button>
          </Col>
        </Row>       
        <!-- 获取部门的值 -->  
      </div>
      <p class="tips" style="color:red;font-size:12px;margin:10px 0 0 0px;" v-if="this.$store.state.RegExpJob_disable.IsinterviewData">请选择完整</p>
    </div>
</div>
</template>
<script>
import depart from './depart.vue'
import * as types from '@/store/modules/Jobmanagement/actionTypes'
import { mapGetters, mapActions } from 'vuex'
export default{
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
    return {
      isdisabled_publish: false,
      nums: 10, // 58剩余职位
      addInterviewData: [],  //  添加面试
      interviewModel: {}, //  每个model里面的change数据
      interviewData: [],  //  存储几面的面试官
      interviewConst: {
        1: '一面',
        2: '二面',
        3: '三面',
        4: '四面',
        5: '五面'
      },
      checkboxObj: {
        '10005': false,  // 前程无忧
        '10001': false, // 智联招聘
        '10006': false,  // 拉勾网
        '10004': false,  // BOSS直聘
        '10002': false,  // 58同城
        '10003': false // 猎聘
      },
      publishMessage: '需审核',
      checked58: false,
      tablelist: '',  //  原数据
      jonMessages: {    //  该组件的所有数据
        publishWay: '',
        tele58: '',
        checkListChannel: []  // 这个是自定义的
      },
      rulesform: {
        tele58: [{ validator: validatephone, trigger: 'blur' }],
        checkListChannel: [{ type: 'array', required: true, message: '请至少选择一个发布渠道', trigger: 'change' }]
      }
    }
  },
  created() {
    for (var k in this.checkboxObj) {
      this.checkboxObj[k] = false
    }
    var objId = this.$route.query.id  //  根据id来判断面试流程初始化
    if (!objId) {
      this.addInterviewData.push('1')
      this.interviewData.push({
        interviewerId: '',
        interviewerName: ''
      })
    }
  },
  mounted() {
    if (this.$route.query.newNeed) {
      this[types.HANDEL_PUBLISHLIST]()
    }
    if (this.$route.query.isEdit) { //  占时要求进入编辑页面所有禁用]
      if (this.publishList.length === 0) {
        this[types.HANDEL_PUBLISHLIST]().then(() => {
          this.publishList.map((item, index) => {
            this.checkboxObj[item.platId] = true
          })
        })
      } else {
        this.publishList.map((item, index) => {
          this.checkboxObj[item.platId] = true
        })
      }
    }
    this.$store.commit('set_publishChannel', this.jonMessages)
    this.$store.commit('set_RefpublishChannel', this.$refs.ruleForm)  //  获取dom
    this.$store.commit('set_interviewData', this.interviewData)
  },
  // 引入了一个部门组织结构的组件
  components: {
    depart
  },
  computed: {
    ...mapGetters('Jobmanagement', [
      'publishList'
    ])
  },
  methods: {
    ...mapActions('Jobmanagement', [
      types.HANDEL_PUBLISHLIST
    ]),
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
    settablelist() {
      this.jonMessages.publishWay = this.tablelist.publishWay
      this.jonMessages.tele58 = this.tablelist.tele58
      var interviewTurnJobsData = this.workList.interviewTurnJobs || [] //  面试流程回显示
      for (var key of interviewTurnJobsData) {
        this.addInterviewData.push(this.addInterviewData.length)
        this.interviewData[key.count - 1] = { 'interviewerId': key.interviewerId, 'interviewerName': key.interviewerName }
      }
      if (this.tablelist.publishState === 130002 || this.tablelist.publishState === 130006) {
        this.isdisabled_publish = true
      }
      this.jonMessages.checkListChannel = this.tablelist.publishWay.split(',') || []
      for (var val of this.jonMessages.checkListChannel) {
        if (val === '10002') {
          this.checked58 = true
          return false
        } else {
          this.checked58 = false
        }
      }
    },
    changeclick() {
      if (this.jonMessages.checkListChannel.indexOf('10002') !== -1) {
        this.checked58 = true
      } else {
        this.checked58 = false
      }
      this.jonMessages.checkListChannel.forEach((el, index) => {
        if (el === '') {
          this.jonMessages.checkListChannel.splice(index, 1)
        }
      })
      this.jonMessages.publishWay = this.jonMessages.checkListChannel.join(',')	  //  发布渠道
    },
    check58(val) {
      this.checked58 = val
    }
  },
  props: ['workList'],
  watch: {  //  监测接收数据
    workList(val) {
      //  把原数据给data的tablelist
      this.tablelist = val
      this.settablelist()
    },
    jonMessages: {
      deep: true,
      handler: function(val, oldVal) {
        this.$store.commit('set_publishChannel', val)
      }
    }
  }
}
</script>
<style lang="scss" src="../newCreates.scss"></style>
