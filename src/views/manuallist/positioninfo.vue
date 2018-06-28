<template>
<Form ref="ruleForm" :rules="rulesform" :model="jonMessages" :label-width="80" class="forms1">
  <div class="positioninfo" id="esumeAdd_confirm">
    <Row type="flex" class="row-bg" justify="space-between">
      <Col span="8"><div class="grid-content bg-purple">
        <div class="cont">
            <FormItem label="姓名" prop='jobSeekerName'>
              <Input v-model="jonMessages.jobSeekerName" placeholder="请输入内容" :maxlength="50" style="width:200px;"></Input>
            </FormItem>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="grid-content bg-purple-light">
          <div class="cont cont2">
            <FormItem label="性别" prop='sex'>
            <Select v-model="jonMessages.sex" placeholder="请选择" style="width:200px;" >
              <Option
                v-for="item in sexlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </Option>
            </Select>
            </FormItem>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="grid-content bg-purple">
          <div class="cont">
            <FormItem label="年龄" prop='age'>
            <Input :maxlength="3" v-model="jonMessages.age" placeholder="请输入内容" style="width:200px;"></Input>
            </FormItem>
          </div>
        </div>
      </Col>
    </Row>
    <Row type="flex" class="row-bg" justify="space-between">
      <Col span="8">
        <div class="grid-content bg-purple-light">
          <div class="cont cont2 cont3">
            <FormItem label="期望地点" prop='expectPlace'>
               <Select v-model="jonMessages.expectPlace" style="width:200px" @on-change="test">
                  <Option v-for="item in options10" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </div>
          <span class="expect">{{expectPlaces}}</span>
        </div>
      </Col>
      <Col span="8">
        <div class="grid-content bg-purple-light">
          <div class="cont">
            <FormItem label="电话号码" prop='phone'>
            <Input v-model="jonMessages.phone" placeholder="请输入内容" :maxlength="50" style="width:200px"></Input>
            </FormItem>
          </div>
        </div>
      </Col>
      <Col span="8">
        <div class="grid-content bg-purple">
          <div class="cont">
            <FormItem label="电子邮箱" prop='email'>
            <Input v-model="jonMessages.email" placeholder="请输入内容" :maxlength="50" style="width:200px"></Input>
            </FormItem>
          </div>
        </div>
      </Col>
    </Row>
    <Row type="flex" class="row-bg" justify="space-between">
      <Col span="8"><div class="grid-content bg-purple">
        <div class="cont">
          <FormItem label="学校" prop='university'>
          <Input v-model="jonMessages.university" placeholder="请输入内容" :maxlength="50"  style="width:200px"></Input>
          </FormItem>
        </div>
      </div></Col>
      <Col span="8">
        <div class="grid-content bg-purple">
          <div class="cont">
            <FormItem label="专业" prop='major'>
            <Input v-model="jonMessages.major" placeholder="请输入内容" :maxlength="50"  style="width:200px"></Input>
            </FormItem>
          </div>
        </div>
      </Col>
      <Col span="8"><div class="grid-content bg-purple">
        <div class="cont cont2">
          <FormItem label="学历" prop='degree'>
          <Select v-model="jonMessages.degree" placeholder="请选择" style="width:200px">
            <Option
              v-for="item in degreelist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
          </FormItem>
        </div>
      </div>
      </Col>
    </Row>
    <Row type="flex" class="row-bg" justify="space-between">
      <Col span="8"><div class="grid-content bg-purple">
        <div class="cont">
          <FormItem label="工作经验" prop='workLength'>
          <Input v-model="jonMessages.workLength" :maxlength="3" placeholder="请输入内容"  style="width:200px"></Input>
          </FormItem>
        </div>
        </div>
      </Col>
      <Col span="8">
        <div class="grid-content bg-purple">
        </div>
      </Col>
    </Row>
    <div class="upbottom">
      <Button type="primary"  @click="psuccess" >保存</Button>
      <Button type="warning"  @click="quxiao=true">取消</Button>
    </div>
    <Modal
      title="提示"
      v-model="quxiao"
      width="300"
      @on-ok="quxiaole"
      >
      <span>是否退出，退出后的信息将不保留？</span>
    </Modal>
    <Row>
      <div class="cont">
        <p style=" line-height:40px; text-align: left;color: #ccc; margin-left: 10px">渠道来源：<span>{{platId|capitalize}}</span></p>
      </div>
    </Row>
    <div class="enclosure">
        <embed :src="pdfPath" v-if="pdfPath" width="100%"  height="500px">
        <div v-else>
            <div class="photoBox">
              <img class="photoBox_img" src="../../assets/404/404.png">
              <p>
            简历上传成功，暂时无法预览，请填写基本信息后保存！
          </p>
        </div>
      </div>
    </div>
  </div>
  </Form>
</template>
<script>
  import { preservation, analysis } from '../../api/resumeApi/resumelist'
  import Teolece from '../../json/twolevel'
  export default {
    data() {
      const validateage = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入'))
        }
        if (!/^[0-9]+$/.test(value) && value !== '') {
          callback(new Error('必须为整数'))
        }
        if (value > 100) {
          this.jonMessages.age = 100
        } else {
          callback()
        }
        if (value < 0) {
          this.jonMessages.age = 1
        } else {
          callback()
        }
      }
      const validatephone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入'))
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
      const validateworkLength = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入'))
        }
        if (Number(value) === 0) {
          callback(new Error('不能为零'))
        }
        if (!/^[0-9]+$/.test(value) && value !== '') {
          callback(new Error('必须为数字'))
        }
        if (value > 100) {
          this.jonMessages.workLength = 100
        }
        if (value < 0) {
          this.jonMessages.workLength = 1
        } else {
          callback()
        }
      }
      return {
        quxiao: false,
        a: 1,
        info: {},
        options: [
          {
            label: '北京',
            value: 'beijing'
          }
        ],
        expectPlaces: '',
        selectedOptions3: '',
        activeName: 'first',
        sexlist: [{
          value: '70001',
          label: '男'
        }, {
          value: '70002',
          label: '女'
        }],
        degreelist: [{
          value: '50001',
          label: '不限'
        }, {
          value: '50002',
          label: '中专'
        }, {
          value: '50003',
          label: '高中'
        }, {
          value: '50004',
          label: '大专'
        }, {
          value: '50005',
          label: '本科'
        }, {
          value: '50006',
          label: '硕士'
        }, {
          value: '50007',
          label: '博士'
        }],
        jonMessages: {  //  所有信息
          jobSeekerName: '',  // 姓名
          sex: '70001',  // 性别
          age: '',  // 年龄
          phone: '', // 手机号
          workLength: '',  // 工作经验
          degree: '',  // 学历
          email: '',  // 邮箱
          major: '',  // 专业
          university: '',  // 学校
          expectPlace: '' //  期望地点
        },
        input: '',
        // expectPlace: [],
        adress: '',
        uploadyesList: [],
        jobSeekerName: '',  // 姓名
        sex: '70001',  // 性别
        age: '',  // 年龄
        phone: '', // 手机号
        workLength: '',  // 工作经验
        degree: '',  // 学历
        email: '',  // 邮箱
        major: '',  // 专业
        university: '',  // 学校
        options10: [],
        defaultprops: {
          value: 'label',
          label: 'label',
          children: 'cities'
        },
        analysisexp: '',
        rulesform: {
          jobSeekerName: [  //  姓名
            { required: true, message: '请输入', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字', trigger: 'blur' }
          ],
          sex: [  //  性别
            { required: true, message: '请选择', trigger: 'change' }
          ],
          age: [  //  年龄
            { required: true, validator: validateage, trigger: 'blur,change' }
          ],
          expectPlace: [  //  期望地点
            { required: true, message: '请选择', trigger: 'change' }
          ],
          phone: [  //  电话
            { required: true, validator: validatephone, trigger: 'blur' }
          ],
          email: [  //  邮箱
            { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          university: [  //  学校
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          major: [  //  专业
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          degree: [  //  学历
            { required: true, message: '请选择', trigger: 'change' }
          ],
          workLength: [  //  工作经验
            { required: true, validator: validateworkLength, trigger: 'blur,change' }
          ]
        }
      }
    },
    props: ['platId', 'isShow', 'seekerId', 'resumeId', 'pdfPath', 'resumePath', 'analisysPath', 'deptIdss', 'name'],
    watch: {
      platId: function(val, oldval) {
      },
      isShow: function(val, oldval) {
        if (val) {
          analysis({
            resumePath: this.analisysPath,
            resumeId: this.resumeId,
            seekerId: this.seekerId
          }).then(res => {
            this.jonMessages.jobSeekerName = res.result.jobSeekerName
            this.jonMessages.age = res.result.age
            this.jonMessages.degree = res.result.degree
            this.jonMessages.email = res.result.email
            this.expectPlaces = res.result.expectPlace
            this.jonMessages.jobSeekerName = res.result.jobSeekerName
            this.jonMessages.phone = res.result.phone
            this.jonMessages.sex = res.result.sex
            this.jonMessages.university = res.result.university
            this.jonMessages.workLength = res.result.workLength
          })
        }
      }
    },
    mounted() {
      this.options10 = Teolece.data().provs.map((item) => ({
        value: item.value,
        label: item.label,
        cities: Teolece.methods.getProv().filter(i => {
          if (i.prov === item.value) {
            return i
          }
        })
      }))
    },
    filters: {
      capitalize: function(value) {
        var map = {
          10001: '智联招聘',
          10002: '58同城',
          10003: '猎聘网',
          10004: 'BOSS直聘',
          10005: '前程无忧',
          10006: '拉勾网',
          10007: '其他',
          10008: '内推',
          10009: '自荐',
          10010: '自我挖掘',
          10011: '猎头推荐'
        }
        return map[value]
      }
    },
    methods: {
      psuccess() {
        var a = {
          jobSeekerName: this.jonMessages.jobSeekerName,
          sex: this.jonMessages.sex,
          age: this.jonMessages.age,
          phone: this.jonMessages.phone,
          workLengthMax: this.jonMessages.workLength,
          workLengthMin: this.jonMessages.workLength,
          degree: this.jonMessages.degree,
          email: this.jonMessages.email,
          major: this.jonMessages.major,
          university: this.jonMessages.university,
          expectPlace: this.adress,
          seekerId: this.seekerId,
          resumeId: this.resumeId,
          resumePath: this.resumePath,
          platId: this.platId,
          jobId: this.name,
          expectSalaryMax: 999999,
          expectSalaryMin: 0,
          deptId: this.deptIdss,
          pdfPath: this.pdfPath
          // analisysPath: analisysPath
        }
        this.$refs.ruleForm.validate((valid) => { //  验证
          if (valid) {
            preservation(a).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                }) // 保存成功
                setTimeout(this.$router.push({
                  path: '/layout/resume'
                }), 2000)
              } else {
                this.$message({
                  message: '简历保存失败',
                  type: 'warning'
                }) // 编辑保存
                return
              }
            })
          }
        })
      },
      quxiaole() {
        this.$router.push({ path: '/layout/resumeUpload', query: { name: this.$route.query.name, time: +new Date() }})
      },
      test(val) {
        this.adress = val
      }
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
