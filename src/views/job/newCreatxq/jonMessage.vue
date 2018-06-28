<template>
<div class="newcreate-jobInformation">
    <h3>职位信息<span class="under-line"></span></h3>
    <Form ref="ruleForm" :model="jonMessages" :rules="rulesform"  :label-width="80">
      <Row>
        <Col span="8">
          <FormItem label="工作性质" prop='jobCategory'>
              <Select v-model="jonMessages.jobCategory" placeholder="请选择" style="width:200px" >
                  <Option :label="item[1]" :value="item[0]" v-for="(item,index) in form.workNatures" :key="index"></Option >
              </Select>
            </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="职位名称"  prop='jobName'>
            <Input style="width:200px"  v-model="jonMessages.jobName" placeholder="2-20个字" :disabled="isdisabled_publish"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="职能类别" prop='jobPropertyId_model'>
            <Cascader  
              placeholder="可以搜索职能" 
              :data="optionslists" 
              v-model="jonMessages.jobPropertyId_model" 
              style="width:200px" 
              :filterable="true"
              @on-change="jobPropertyId_change">
            </Cascader>
          </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="8">
          <FormItem label="最低学历" prop='degreeId'>
              <Select v-model="jonMessages.degreeId" placeholder="请选择" style="width:200px" >
                  <Option :label="item[1]" :value="item[0]" v-for="(item,index) in form.educationList" :key="index"></Option >
              </Select>
            </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="工作年限" prop='workLength'>
              <Select v-model="jonMessages.workLength" placeholder="请选择" style="width:200px" >
                  <Option :label="item[1]" :value="item[0]" v-for="(item,index) in form.workYearsList" :key="index"></Option >
              </Select>
            </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="招聘人数" prop='number'>
            <Input style="width:200px"  v-model="jonMessages.number" placeholder="请输入1-3位数字"></Input>
          </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="8">
          <FormItem label="薪资待遇" prop="salaryPeriod">
              <Select v-model="jonMessages.salaryPeriod" placeholder="请选择" style="width:200px" >
                  <Option :label="item[1]" :value="item[0]" v-for="(item,index) in form.salaryList" :key="index"></Option >
              </Select>
            </FormItem>
        </Col>
    </Row>
  </Form>
</div> 
</template>
<script>
import Jobjs from '../../../json/job'
import { propertylist, deptlistAll } from '../../../api/jobApi/jobMessage'
// deptlist 需求部门的api  deptlistAll 所有没归类的数据
export default{
  data() {
    const validateDuty = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatenumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入'))
      }
      if (Number(value) === 0) {
        callback(new Error('不能为零'))
      }
      if (!/^[0-9]+$/.test(value) && value !== '') {
        callback(new Error('必须为数字'))
      }
      if (value.length > 3) {
        callback(new Error('请输入1-3位数字'))
      }
      if (value < 0) {
        this.jonMessages.number = 1
      } else {
        callback()
      }
    }
    return {
      deptlistJson: '', //  存储的是所有没归类部门数据
      tablelist: '',  // 存的元数据
      jonMessages: {  // 存的本页面的数据
        jobPropertyIds: '',
        jobName: '',
        jobCategory: '',
        degreeId: '',
        workLength: '',
        number: '',
        salaryPeriod: '',
        // deptIds: '',
        jobPropertyId_model: [] // 这里开始是自己添加的
        // deptId_model: [],
        // deptName: ''  //  返回最后一个数据部门id
      },
      isdisabled_publish: false,
      optionslists: [], //  职能类别
      deptlistlists: [],  //  需求部门
      options: [], // 部门
      form: {
        salaryList: [], // 薪资
        workNatures: [], // 工作性质
        workYearsList: [] // 工作年限
      },
      rulesform: {
        jobCategory: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        jobName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字', trigger: 'blur' }
        ],
        jobPropertyId_model: [
          { required: true, validator: validateDuty, trigger: 'change' }
        ],
        deptId_model: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        degreeId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        workLength: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        number: [
          { required: true, validator: validatenumber, trigger: 'change' }
        ],
        salaryPeriod: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      value1: [],
      data: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }]
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
        this.$store.commit('set_jonMessage', val)
      }
    }
  },
  mounted() {
    deptlistAll().then(res => {  //  没有排序的部门数据
      this.deptlistJson = res
      this.deptsAll(res)
    })
    this.$store.commit('set_jonMessage', this.jonMessages)
    propertylist().then(res => {
      this.optionslists = res
    })
    this.form.salaryList = Jobjs.CONST_REQUIRE_SALARY_GX  // 薪资
    this.form.workNatures = Jobjs.arrEmploymenttype // 工作性质
    this.form.educationList = Jobjs.CONST_REQUIRE_DEGREE  // 学历
    this.form.workYearsList = Jobjs.CONST_REQUIRE_EXPERIENCE  //  工作年限
    this.$store.commit('set_RefJobMessage', this.$refs.ruleForm)  //  获取dom
  },
  methods: {
    jobPropertyId_change(val) { //  多级架构职能类别
      // this.jonMessages.jobPropertyIds = this.jonMessages.jobPropertyId_model.join(',')
      this.jonMessages.jobPropertyIds = val.join(',')
    },
    deptId_change() {
      this.jonMessages.deptIds = this.jonMessages.deptId_model.join(',')
      for (var i = 0, len = this.deptlistJson.length; i < len; i++) {
        if (this.deptlistJson[i].value === this.jonMessages.deptId_model[this.jonMessages.deptId_model.length - 1]) {
          this.jonMessages.deptName = this.deptlistJson[i].label
          return
        }
      }
    },
     // 这块是这个组件的所有数据,要传到主组件里面去
    settablelist() {
      this.jonMessages.jobCategory = this.tablelist.jobCategory  //  工作性质
      this.jonMessages.jobName = this.tablelist.jobName // 职位名称
      this.jonMessages.jobPropertyIds = this.tablelist.jobPropertyIds // 职能类别
      this.jonMessages.degreeId = this.tablelist.degreeId // 学历
      this.jonMessages.workLength = this.tablelist.workLength // 工作年限
      this.jonMessages.number = this.tablelist.number  //  招聘人数
      this.jonMessages.salaryPeriod = this.tablelist.salaryPeriod  //  薪资待遇
      this.jonMessages.deptIds = this.tablelist.deptIds //  需求部门
      this.jonMessages.jobPropertyId_model = this.jonMessages.jobPropertyIds.split(',')
      // this.jonMessages.deptId_model = this.jonMessages.deptIds.split(',')
      this.jonMessages.deptName = this.tablelist.deptName  //  职位名字
      if (this.tablelist.publishState === 130002 || this.tablelist.publishState === 130006) {
        this.isdisabled_publish = true
      }
    },
    deptsAll(ary, data) {
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
          it.deptlistlists = tempAry
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
  }
}
</script>
<style lang="scss" src="../newCreates.scss"></style>

 