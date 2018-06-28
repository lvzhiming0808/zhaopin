<template>
  <div class='notice-resumup'>
    <a onclick='javascript:history.go(-1);'>
      <div class='arrow-down'> 
        <span><Icon type="chevron-left"></Icon></span> 
      </div>
    </a>
    <h3 class="notice_title">发送offer</h3>
    <div class='resum-head'>
          <div class='uptop' v-if="isView">
            <div class='morenselect'>
              <span>选择模板</span>
              <Select v-model='value2' placeholder='请选择' style="width:200px;" @on-change='offerselect'>
                <Option
                  v-for='item in offertmps'
                  :key='item.id'
                  :label='item.templateName'
                  :value='item.id'>
                </Option>
              </Select>
            </div>
            <div class='mobanbg'>
              <div class='mobancont'>
                   <Form :model="offertmps[m]" filterable  :rules="offerrules" ref="offerruleForm" :label-width="80" class="demo-ruleForm">
                      <div class='cont cont1'>
                        <FormItem label="录用职位" prop="position">
                          <Select class="noticeJob" v-model="offertmps[m].position"  @on-change='positionJobnameOff' placeholder="请选择">
                              <Option                        
                                v-for="item in listblishName"
                                :key='item.id'
                                :label="item.jobName"
                                :value="item.id">
                                <span style="float: left; color: #2d8cf0;">{{ item.jobName }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.publishUserName }}</span>
                              </Option>
                          </Select>
                        </FormItem>
                      </div>
                <div class='cont'>
                  <FormItem label="基础薪资" prop="salary" >
                     <Input v-model='offertmps[m].salary' placeholder='请输入内容'></Input>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="绩效薪资" prop="achievementsSalary">
                     <Input v-model='offertmps[m].achievementsSalary' placeholder='请输入内容'></Input>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="试用期" prop="probation" >
                     <Input v-model='offertmps[m].probation' placeholder='请输入内容'></Input>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="其他福利" prop="welfare">
                    <Input
                      type='textarea'
                      :rows='5'
                      placeholder='请输入内容'
                      :maxlength='100'
                      v-model='offertmps[m].welfare'>
                    </Input>
                  </FormItem>
                </div>
                <div class='cont'>
                   <FormItem label="工作地点" prop="workSite">
                      <Input v-model='offertmps[m].workSite' placeholder='请输入内容' :maxlength='50'>
                      </Input>
                    </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="乘车路线" prop="busline">
                      <Input v-model='offertmps[m].busline' placeholder='请输入内容' :maxlength='50'>
                      </Input>
                  </FormItem>
                </div>
                <div class='cont timePlugin'>
                  <FormItem label="入职时间" prop="entryTime">
                    <el-date-picker
                      v-model="offertmps[m].entryTime"
                      type="datetime"
                      size='small'
                      value-format ='yyyy-MM-dd HH:mm'
                      :picker-options="pickerOptions1"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="携带材料">
                    <Input
                      type='textarea'
                      :rows='5'
                      placeholder='请输入内容'
                      :maxlength='100'
                      v-model='offertmps[m].entryMaterials'>
                    </Input>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="联系人" prop="contactPeople">
                    <Input v-model='offertmps[m].contactPeople'  :maxlength='50' placeholder='请输入内容'>
                    </Input>
                  </FormItem>
                </div>
                <div class='cont'>
                  <FormItem label="联系电话" prop="telephone">
                    <Input v-model='offertmps[m].telephone' placeholder='请输入内容'  :maxlength='50' type="tel">
                    </Input>
                  </FormItem>
                </div>
                <div class='morenselect'>
                  <FormItem label="通知方式" prop="informType">
                    <Select v-model="offertmps[m].informType" placeholder="请选择通知方式" >
                    <!-- <el-option label="短信通知" value="140001"></el-option> -->
                      <Option label="邮件通知" value="140001"></Option>
                    </Select>
                  </FormItem>
                </div>
              </Form>
              </div>
            </div>
          </div>
          <!-- 面试预览的部分 -->
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
              <img style=" width: 100%;" src="@/assets/sendInterModel/headmini.png">
              <div class="content" style="box-sizing: border-box;padding: 0px 45px;width: 100%;margin-top: -100px;background-image:url(data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADfSURBVDhPdZKBEsMgCEP9/0+21s5gn4tsepdSQwLoWVprT+/90brve0G84Fzg5cMIeV3XMsCrqKLzbehKTlAkgxy64iOyXEBuQZyMEOrs3Rl7GV4+OBk9KTFAJLD3XHER/7kL46ETH8ZNNKJG1r8X8qMoxq1CONyovFZX7i0Ul/Ov6qkbXFwOG0SKGFc+6baO/y7BO8EprjMKItTJu0XBk9GTtdaBfUyBgmAakwhQcC9apzESJmRsN7lGWMajeACh4NyPkaouco64GXNX9noxOTfPeIDE4zOf24jf7u35APZhVAwRRBs/AAAAAElFTkSuQmCC);background-repeat: repeat;">
                  <h3 style="text-align: center;margin: 48px 0px;">尚德机构聘用意向书</h3>
                  <h4 style="margin: 12px 0px;">尊敬的{{userinfo[0].jobSeekerName}}先生/女生，您好</h4>
                  <p style="margin: 0px;font: 14px '微软雅黑';text-indent: 2em;word-break: break-all;line-height: 25px;">
                      我们非常诚挚的邀请您加入尚德机构，一起去打造一家新锐的互联网大学。期望我们能一起度过一段难忘的旅程，在思想的墙上砸出一个洞，照进一束光，去照亮和影响更多人。
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      我们聘用您担任{{jobNameOff}}一职，共同参与公司的发展。我们为这个职位提供的是：
                  </p>
                  <ul style="list-style: none;padding: 0px;margin: 0px;font: 14px '微软雅黑';line-height: 25px;">
                      <li style="line-height: 25px;">1.基本工资：税前{{offertmps[m].salary}}元/月。</li>
                      <li v-if="offertmps[m].achievementsSalary" style="line-height: 25px;">2.绩效薪资：税前{{offertmps[m].achievementsSalary}}元/月。</li>
                      <li v-if="!offertmps[m].achievementsSalary" style="line-height: 25px;">2.绩效薪资：无。</li>
                      <li style="line-height: 25px;">3.试用期：{{offertmps[m].probation}}。</li>
                      <li style="line-height: 25px;">4.{{offertmps[m].welfare}}</li>
                  </ul>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      我们期望您的入职时间是{{changeDate(offertmps[m].entryTime)}}。
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      联系人：{{offertmps[m].contactPeople}}    联系电话：{{offertmps[m].telephone}}
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      在您入职当日，请您提供如下的入职资料：
                  </p>
                  <ul style="list-style: none;padding: 0px;margin: 0px;font: 14px '微软雅黑';line-height: 25px;">
                      <li style="line-height: 25px;">{{offertmps[m].entryMaterials}}</li>
                  </ul>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      公司地址：{{offertmps[m].workSite}}
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      公司的详细乘车路线：
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      {{offertmps[m].busline}}
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      最后热诚的欢迎您，作为尚德机构产品经理，加入尚德大家庭！
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      在您详阅附件后，请以邮件回复确认，尚德翘首以盼，为您做好准备，便于您尽快融入。
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      若有任何不明确或需进一步沟通解释之处，请您随时和我们联系。
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      我们也希望在未来，携手共进，共创佳绩！！
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      谨启！
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      职业培训领跑者！
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      学习是一种信仰！
                  </p>
                  <p style="font: 14px '微软雅黑';word-break: break-all;line-height: 25px;">
                      尚德机构
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
          <!-- 面试预览结束 -->
          <div class='upbottom' v-if="isView">
            <Button type='primary' @click="preview('offerruleForm')">预览</Button>
            <router-link to="resume">
            <Button type='info'>取消</Button>
            </router-link>
          </div>
          <div class='upbottom' v-else>
            <Button type='primary' :loading="sendLoading" @click="sendoffer('offerruleForm')">确认</Button>
            <Button type='info' @click="isView = true">取消</Button>
          </div>
    </div>
  </div>
</template>

<script>
  import { offertemplate, listWithPublishName } from '../../api/resumeSearchApi/notice'
  import { offerSend } from '../../api/resumeSearchApi/distribute'
  export default {
    data() {
      var tel = (rule, value, callback) => {
        if (!/^1[3|4|5|7|9|8][0-9]\d{8}$/.test(value)) {
          return callback(new Error('您输入的号码有误'))
        } else {
          callback()
        }
      }
      var validateSalary = (rule, value, callback) => {
        if (value !== '') {
          if (!/^[1-9][0-9]*$/.test(value)) {
            callback(new Error('请输入非0开头数字值'))
          } else {
            if (value.length > 10) {
              callback(new Error('不能超过10位数'))
            } else {
              callback()
            }
          }
        }
      }
      var validateachievementsSalary = (rule, value, callback) => {
        if (value !== null) {
          if (!/^[1-9][0-9]*$/.test(value)) {
            callback(new Error('请输入非0开头数字值'))
          } else {
            if (value.length > 10) {
              callback(new Error('不能超过10位数'))
            } else {
              callback()
            }
          }
        } else {
          callback()
        }
      }
      var validateprobation = (rule, value, callback) => {
        if (value !== '') {
          if (value.length > 50) {
            callback(new Error('不能超过50个字符'))
          } else {
            callback()
          }
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
          salary: [
            { required: true, message: '请输入基础的薪资', trigger: 'blur' },
            { validator: validateSalary, trigger: 'blur' }],
          achievementsSalary: [
            { validator: validateachievementsSalary, trigger: 'blur' }
          ],
          probation: [{ required: true, message: '请输入试用的时间', trigger: 'blur' },
           { validator: validateprobation, trigger: 'blur' }],
          workSite: [{ required: true, message: '您的输入有误', trigger: 'blur' }],
          // entryMaterials: [{ required: true, message: '请输入内容', trigger: 'blur', maxlength: 50 }],
          contactPeople: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
          telephone: [
            { required: true, validator: tel, message: '您输入的手机号码有误', trigger: 'blur' }
          ],
          position: [{ required: true, message: '请选择职位', trigger: 'change' }],
          entryTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        sendLoading: false,
        listblishName: [],  //  所有的职位信息
        jobId: '',  //  存储jobId面试通知
        jobNameOff: '', //  存储jobId发送offer
        userinfo: [],
        flag: true,
        deptment: '',
        selectedOptions: [],
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
          salary: '',
          telephone: '',
          templateContent: '',
          templateName: '',
          workSite: '',
          welfare: '',
          busline: '',
          achievementsSalary: '',
          probation: ''
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
        Offer_deptment: '',
        isView: true,
        sendinter_urlData: {}
      }
    },
    created() {
      listWithPublishName().then(res => {
        this.listblishName = res.result
      })
      this.sendinter_urlData = this.$route.query || {}  //  取url的数据、面试状态
    },
    mounted() {
      this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
      // 获取模板
      offertemplate().then(res => {
        this.offertmps = res.result
        this.offertmps.forEach((item, index) => {
          if (item.enable === 1) {
            this.m = index
            this.value2 = item.id
          }
          item.position = ''
        })
      })
      //  上面是create内容
      for (var e = 0; e < this.userinfo.length; e++) {
        this.uploadinfoOffer['list'].push({})   //  生成几个空对象接收这个数据
      }
    },
    methods: {
      preview(formname) { //  预览
        this.$refs[formname].validate((valid) => {
          if (valid) {
            this.isView = false
          }
        })
      },
      positionJobnameOff(val) { //  根据id提取jobname
        for (const k of this.listblishName) {
          if (k.id === val) {
            this.jobNameOff = k.jobName
            return false
          }
        }
      },
      changeDate(dat) { //  转换时间格式
        var value = new Date(dat)
        var year = value.getFullYear()
        var month = value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1
        var date = value.getDate()
        var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][value.getDay()]
        var hour = value.getHours() < 10 ? '0' + value.getHours() : value.getHours()
        var minute = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes()
        return year + '-' + month + '-' + date + '(' + day + ')' + hour + ':' + minute
      },
      handleClick() {
      },
      sendoffer(formname) { //  发送offer
        // this.$refs[formname].validate((valid) => {
        //   if (valid) {
        this.sendLoading = true
        this.$confirm('是否要发送offer', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          for (let i = 0; i < this.userinfo.length; i++) {
            this.uploadinfoOffer['list'][i].resumeId = this.userinfo[i].resumeId
            this.uploadinfoOffer['list'][i].seekerId = this.userinfo[i].seekerId
            this.uploadinfoOffer['list'][i].jobSeekerName = this.userinfo[i].jobSeekerName
            // this.uploadinfoOffer['list'][i].deptment =  this.Offer_deptment
            // this.offertmps[this.m].selectedOptions[this.offertmps[this.m].selectedOptions.length - 1 ]  //  不用数据
            this.uploadinfoOffer['list'][i].position = this.jobNameOff
            // this.uploadinfoOffer['list'][i].workSite = this.offertmps[this.m].workSiteoffertmps[this.m].position
            this.uploadinfoOffer['list'][i].workSite = this.offertmps[this.m].workSite
            this.uploadinfoOffer['list'][i].entryTime = (new Date(this.offertmps[this.m].entryTime)).getTime()
            // this.changeDate(this.offertmps[this.m].entryTime)原时间格式
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
            this.uploadinfoOffer['list'][i].jobId = this.offertmps[this.m].position
            this.uploadinfoOffer['list'][i].interviewRecordId = this.sendinter_urlData.interviewRecordId || ''
            this.uploadinfoOffer['list'][i].resumeFlowId = this.userinfo[i].resumeFlowId
            this.uploadinfoOffer['list'][i].achievementsSalary = this.offertmps[this.m].achievementsSalary
            this.uploadinfoOffer['list'][i].probation = this.offertmps[this.m].probation
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
        })
      },
      offerselect(val) {
        for (let i = 0; i < this.offertmps.length; i++) {
          if (this.offertmps[i].id === val) {
            this.m = i
          }
        }
      }
    }
  }
</script>
<style lang='scss' src='./style.scss'></style>
