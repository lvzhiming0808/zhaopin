<template>
  <div class="resumedetails">
    <Form ref="ruleForm" :rules="rulesform" :model="detailsedetailed" :label-width="60" >
    <!--简历编辑-->
    <div class="resumup">
      <div class="details-head">
        <Row>
          <Col span="18" style="padding-top:7px;">
            <div class="grid-content bg-purple">
              <div class="detailEditing-top">
                <p>
                  <b v-for="itName in detailsedetailed.jobList">{{itName.jobName}}
                    <Tag color="green" :class="{ JobPublis: itName.publishState != '130002' }">{{itName.publishState | codeformat}}</Tag>
                  </b>
                </p>
                <div class="personLiable">负责人：<span>{{detailsedetailed.handleUserName}}</span></div>
              </div>
            </div>
          </Col>
          <Col :span="18">
            <div class="grid-content bg-purple">
              <div class="leftheight">
                <div class="details-cont">
                    <Row>
                      <Col span="8">
                        <FormItem prop='jobSeekerName'  label="姓名">
                          <Input 
                            v-model="detailsedetailed.jobSeekerName" 
                            :minlength='2' 
                            :maxlength="50" 
                            style="width:180px">
                          </Input>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem prop='sex'  label="性别">
                          <Select v-model="detailsedetailed.sex" placeholder="请选择"  style="width:180px">
                            <Option
                              v-for="item in sexlist"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </Option>
                          </Select>
                        </FormItem>
                      </Col>  
                      <Col span="8">
                        <FormItem label="期望地点">
                          <Cascader 
                            :data="options10" 
                            change-on-select
                            v-model="detailsedetailed.expectPlace_arr"
                            @on-change="test"
                            style="width:180px"
                            >
                          </Cascader>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8">
                        <FormItem prop='university'  label="毕业院校">
                          <Input 
                            :maxlength="50" 
                            v-model="detailsedetailed.university" 
                            style="width:180px">
                          </Input>
                        </FormItem>
                      </Col>
                       <Col span="8">
                        <FormItem prop='age'  label="年龄">
                          <Input 
                          :minlength='1' 
                          :maxlength="3" 
                          v-model="detailsedetailed.age"
                          style="width:180px"
                          >
                          </Input>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem  label="学历">
                          <Select v-model="detailsedetailed.degree" placeholder="请选择" style="width:180px">
                            <Option
                              v-for="item in degreelist"
                              :key="item[0]"
                              :label="item[1]"
                              :value="item[0]">
                            </Option>
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8">
                        <FormItem prop='phone'  label="电话">
                          <Input 
                            :minlength='8' 
                            :maxlength="20" 
                            v-model="detailsedetailed.phone" 
                            style="width:180px"
                            >
                          </Input>
                        </FormItem>
                      </Col>
                       <Col span="8">
                        <FormItem prop='workLength'  label="工作经验">
                          <Input 
                            :minlength='0' 
                            :maxlength="10" 
                            v-model="detailsedetailed.workLength"
                            style="width:180px"
                            >
                          </Input>
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem prop='major'  label="专业">
                         <Input 
                          style="width:180px" 
                          :minlength='0' 
                          :maxlength="50" 
                          v-model="detailsedetailed.major" 
                          >
                          </Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8">
                        <FormItem prop='email'  label="邮箱">
                          <Input
                           style="width:180px" 
                           :minlength='0' 
                           :maxlength="50" 
                           v-model="detailsedetailed.email"        
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                </div>
                <div class="downrum">
                  <Button type="primary" @click="download"><Icon type="ios-download-outline"></Icon> 下载简历</Button>
                </div>
                <div class="personLiable"><span>简历渠道：{{detailsedetailed.resumeFrom | codeformat}}</span> <span>简历来源：{{detailsedetailed.flowType|codeformat}}</span>
                </div>
                <div class="upbottom">
                  <Button type="primary"  @click="setBtn"> 确定</Button>
                  <Button type="ghost"  @click="resBtn" v-if="resumeState != '60011'">取消</Button>
                </div>
                <div class="details-bottom">
                  <iframe v-if="detailsedetailed.pdfPath" :src="detailsedetailed.pdfPath" frameborder="0" id="pdfContainer" name="pdfContainer" class="pdf"></iframe>
                  <detailresume v-else-if="detailsedetailed.resumeDetail" :detailinfo='detailinfo'></detailresume>
                  <div v-else>
                    <div class="photoBox">
                          <img class="photoBox_img" src="../../assets/404/404.png">
                          <p>
                        简历暂时无法预览，请下载简历查看！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col :span="6" v-if="resumeState == '60011'">
            <div class="grid-content bg-purple">
              <div class="rightbox">
                <div class="rightone-info">
                  信息待确认
                </div>
              </div>
            </div>
          </Col>
          <Col :span="6" v-if="resumeState != '60011'">
            <div class="grid-content bg-purple">
              <div class="rightbox">
                <div class="rightone">
                  <!-- 遮罩 -->
                  <div class="righttitle">
                      <span class="el-dropdown-link">
                        <a style="color:#ccc;">{{resumeState | codeformat}}</a>
                      </span>
                  </div>
                  <div class="rithtlise">
                    <Row>
                      <Col :span="12">
                        <div class="grid-content bg-purple">
                          <Button disabled type="text" @click="dialogFormVisible1 = true">面试通知</Button>
                          <Modal title="简历评价" v-model="dialogFormVisible1">
                            <Form :model="form">
                              <div class="recommender">
                                <FormItem label="简历评级" :rules="[{ required: true, message: '评价不能为空'},
                                  { type: 'number', message: '必须为整数'}]">
                                  <Input size="small" class="timeyes" placeholder="请输入"
                                            v-model="form.score"></Input>
                                  <span>（10.00）</span>
                                </FormItem>
                              </div>
                              <div class="recommender">
                                <FormItem label="简历评价">
                                  <Input type="textarea" v-model="form.desc" class="beizhu"
                                            placeholder="请输入"></Input>
                                </FormItem>
                              </div>
                            </Form>
                            <div slot="footer" class="dialog-footer">
                              <Button @click="dialogFormVisible1 = false" size="small">取 消</Button>
                              <Button type="primary" @click="submitscore" size="small">确 定</Button>
                            </div>
                          </Modal>
                        </div>
                      </Col>
                      <Col :span="12">
                        <div class="grid-content bg-purple">
                          <Button disabled type="text" @click="dialogFormVisible3 = true">分配</Button>
                          <Modal title="进入人才库" v-model="dialogFormVisible3">
                            <Form :model="form">
                              <div class="yiruku">
                                <Radio v-model="radio4" label="1">企业人才库</Radio>
                                <Radio v-model="radio4" label="2">高管人才库</Radio>
                              </div>
                              <div class="block recommender">
                                <span class="demonstration">移入</span>
                                <Select v-model="value" placeholder="请选择" size="small">
                                  <Option
                                    v-for="item in options3"
                                    :key="detailsedetailed.value"
                                    :label="detailsedetailed.label"
                                    :value="detailsedetailed.value">
                                  </Option>
                                </Select>
                              </div>
                              <div class="recommender">
                                <span class="demonstration">入库原因</span>
                                <Select v-model="value" placeholder="请选择" size="small">
                                  <Option
                                    v-for="item in options4"
                                    :key="detailsedetailed.value"
                                    :label="detailsedetailed.label"
                                    :value="detailsedetailed.value">
                                  </Option>
                                </Select>
                              </div>
                              <div class="recommender">
                                <FormItem label="备注">
                                  <Input type="textarea" v-model="form.desc" class="beizhu"
                                            placeholder="请输入"></Input>
                                </FormItem>
                              </div>
                            </Form>
                            <div slot="footer" class="dialog-footer">
                              <Button @click="dialogFormVisible3 = false" size="small">取 消</Button>
                              <Button type="primary" @click="dialogFormVisible3 = false" size="small">确 定</Button>
                            </div>
                          </Modal>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col :span="12">
                        <div class="grid-content bg-purple-light">
                          <Button disabled type="text" @click="dialogFormVisible4 = true" v-if="$checkRole('distribution')">发送offer</Button>
                          <Modal title="分配简历" :visible.sync="dialogFormVisible4">
                            <Form :model="form">
                              <div class="block recommender">
                                <span class="demonstration">分配给</span>
                                <Cascader
                                  placeholder="添加新推荐人/可搜索"
                                  :options="options"
                                  size="small"
                                  filterable
                                  change-on-select
                                ></Cascader>
                                <Cascader
                                  placeholder="常用推荐人/可搜索"
                                  :options="options"
                                  size="small"
                                  filterable
                                  change-on-select
                                ></Cascader>
                              </div>
                              <p class="randompeop">*简历将随机分配给选择人员</p>
                            </Form>
                            <div slot="footer" class="dialog-footer">
                              <Button @click="dialogFormVisible4 = false" size="small">取 消</Button>
                              <Button type="primary" @click="dialogFormVisible4 = false" size="small">确 定</Button>
                            </div>
                          </Modal>
                        </div>
                      </Col>
                      <Col :span="12">
                        <div class="grid-content bg-purple">
                          <Button disabled type="text">放弃</Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="rightone mt25">
                  <!-- 遮罩 -->
                  <div class="rightone_mask"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    </Form>
  </div>
</template>

<script>
  import { details, evaluate, upload } from '../../api/resumeApi/resumelist'
  import detailresume from '@/views/resumeSearch/detailresume'
  import { downloaResumeFromother } from '../../api/resumeApi/download'
  import type from '../../json/job'
  import { CITYS } from '../../json/resume_city'
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
          this.detailsedetailed.age = 100
        } else {
          callback()
        }
        if (value < 0) {
          this.detailsedetailed.age = 1
        } else {
          callback()
        }
      }
      const validatephone = (rule, value, callback) => {
        if (!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(value)) || value === '') {
          callback(new Error('请输入正确的手机号码'))
        }
        if (!/^[0-9]+$/.test(value) && value !== '') {
          callback(new Error('必须为整数'))
        } else {
          callback()
        }
      }
      const validateworkLength = (rule, value, callback) => {
        if (value === '') {
          callback()
        }
        if (!(/^[0-9]+$/.test(value) || /^[0-9]+\-[0-9]+$/.test(value))) {
          callback(new Error('不符合要求，请输入整数'))
        } else {
          callback()
        }
      }
      return {
        a: [],
        b: [],
        detailinfo: '',
        adress: '',
        options10: [],
        expectPlace: [],
        defaultprops: {
          value: 'label',
          label: 'label',
          children: 'children'
        },
        resume: require('@/assets/resume.png'),
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        radio4: true,
        value: '',
        path: '',
        handledata: [],
        resumeId: '',
        seekerId: '',
        resumeState: '',
        sexlist: '',  //  性别的字段
        degreelist: '', //  学历的字段
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          score: ''
        },
        formLabelWidth: '120px',
        activeName: 'first',
        value2: null,
        detailsedetailed: {
          expectPlace_arr: []
        },
        options: '',
        options4: '',
        options3: '',
        rulesform: {
          jobSeekerName: [
            { required: true, min: 2, max: 50, message: '长度在 2 到 50 个字', trigger: 'blur' }
          ],
          age: [
            { required: true, validator: validateage, trigger: 'blur' }
          ],
          phone: [
            { required: true, validator: validatephone, trigger: 'blur' }
          ],
          workLength: [
            { validator: validateworkLength, trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
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
    watch: {
      detailsedetailed: {
        deep: true,
        handler: function(val, oldVal) {
        }
      }
    },
    components: {
      detailresume
    },
    created() {
      this.sexlist = type.CONST_REQUIRE_SEX //  性别
      this.degreelist = type.CONST_REQUIRE_DEGREE //  学历
      var obj = this.$route.query
      this.resumeId = obj.resumeId
      this.seekerId = obj.seekerId
      this.resumeState = obj.resumeState
      this.options10 = CITYS
      details({
        resumeId: obj.resumeId,
        seekerId: obj.seekerId
      }).then(res => {
        this.detailsedetailed = res.result
        this.detailinfo = JSON.parse(res.result.resumeDetail)
        this.detailsedetailed.workLength = this.detailsedetailed.workLengthMin + '-' + this.detailsedetailed.workLengthMax
        this.path = res.result.pdfPath
        this.dowResumePath = res.result.resumePath
        this.sexlist.forEach(val => {
          if (val.label === res.result.sex) {
            this.detailsedetailed.sex = val.value
          }
        })
        this.degreelist.forEach(val => {  // 学历转换
          if (val.label === res.result.degree) {
            this.detailsedetailed.degree = val.value
          }
        })
        if (this.detailsedetailed.expectPlace) {
          this.detailsedetailed.expectPlace_arr = this.detailsedetailed.expectPlace.split(',') || []
        }
      })
    },
    methods: {
      handleClick(tab, event) {
      },
      submitscore() {
        evaluate({
          evaluateContent: this.form.desc,
          evaluateScore: this.form.score,
          resumeId: this.detailsedetailed.resumeId,
          seekerId: this.detailsedetailed.seekerId
        }).then(res => {
          alert(res.message)
        })
        this.dialogFormVisible1 = false
      },
      resBtn() {               // 取消编辑
        this.$router.push({ path: 'activeSend', query: { resumeId: this.resumeId, seekerId: this.seekerId, resumeState: this.resumeState }})
      },
      setBtn() {               // 更新简历
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var updata = this.detailsedetailed
            if ((/^[0-9]+$/.test(updata.workLength))) {
              updata.workLength = updata.workLength + '-' + updata.workLength
            }
            if (/^[0-9]+\-[0-9]+$/.test(updata.workLength)) {
              var workLength_arr = updata.workLength.split('-')
              workLength_arr.sort((a, b) => {
                return a - b
              })
              updata.workLength = workLength_arr.join('-')
            }
            if (updata.workLength === '') {
              updata.workLength = ''
              updata.workLengthMin = ''
              updata.workLengthMax = ''
            }
            if (updata.age === '') {
              delete updata.age
            }
            upload(
            updata
          ).then(res => {
            if (res.code === 200) {
              this.$router.push({ path: 'activeSend', query: { resumeId: this.resumeId, seekerId: this.seekerId, resumeState: this.resumeState }})
            } else {
              this.$message.error('提交失败')
            }
          })
          } else {
            return false
          }
        })
      },
      test(val) { //  期望地点的修改
        this.detailsedetailed.expectPlace = val.join(',')
      },
      add(val, vals) {
        for (let j = 0, length1 = val.length; j < length1; j++) {
          for (let i = 0, length2 = vals.length; i < length2; i++) {
            if (val[j] === vals[i].value) {
              this.add(val.splice(0, 1), vals[i].children)
            }
          }
        }
      },
      download() {
        var url = /\.[^\.]+$/.exec(this.dowResumePath)
        if (this.fileName) {
          downloaResumeFromother(this.dowResumePath, this.fileName)
        } else {
          downloaResumeFromother(this.dowResumePath, this.detailsedetailed.jobSeekerName + url[0])
        }
      },
      // 返回按钮
      routertototal(event, resumeState) {
        this.$router.push({ path: '/layout/resume', query: { name: resumeState }})
      }
    }
  }
</script>
<style lang="scss" src="./style2.scss"></style>
<style lang="scss" src="./detail.scss" scoped></style>
