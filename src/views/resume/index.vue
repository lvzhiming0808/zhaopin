<template>
	<div class="resume-wapper">
    <div class="resum-bg" ref ='pending'> 
      <div class="leftbox">
        <div class="leftb" id="reume_Total">
          <router-link :to="{path:'resume',query: {name: 60000}}" :class="{routeractive: +state ===60000}">
            <Button type="text" class="text" v-cloak>总数（{{resumelistTextLeft[60000]}}）</Button>
          </router-link>
        </div>
        <div class="leftb" id="reume_Confirmed">
          <router-link :to="  {path:'resume',query: {name: 60011}}" :class="{routeractive: +state ===60011}">
            <Button type="text" class="text" v-cloak>待确认（{{resumelistTextLeft[60011]}}）</Button>
          </router-link>
        </div>
        <div class="leftb" id="reume_Pending">
          <router-link :to="{path:'resume',query: {name: 60001}}" :class="{routeractive: +state ===60001}">
            <Button type="text" class="text" v-cloak>待处理（{{resumelistTextLeft[60001]}}）</Button>
          </router-link>
        </div>
         <div class="leftb" id="reume_Pending">
          <router-link :to="{path:'resume',query: {name: 60010}}" :class="{routeractive: +state ===60010}">
            <Button type="text" class="text" v-cloak>面试中（{{resumelistTextLeft[60010]}}）</Button>
          </router-link>
        </div>
        <div class="leftb" id="reume_Entry">
          <router-link :to="{path:'resume',query: {name: 60008}}" :class="{routeractive: +state ===60008}">
            <Button type="text" class="text" v-cloak>待入职（{{resumelistTextLeft[60008]}}）</Button>
          </router-link>
        </div>
        <div class="leftb" id="reume_Already">
          <router-link :to="{path:'resume',query: {name: 60009}}" :class="{routeractive: +state ===60009}">
            <Button type="text" class="text" v-cloak>已入职（{{resumelistTextLeft[60009]}}）</Button>
          </router-link>
        </div>
      </div>
      <div class='rightbg' id='checkall'>
        <div class='branch'>
          <div class='branchleft'>
            <div class='ball'>
              <Select v-model="classfic"  @on-change="getrusumebyclass" style="width:100px;">
                <Option
                  v-for="item in classnum"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                   style="overflow: hidden;"
                  >
                </Option>
              </Select>
              <Select v-model="matching"  @on-change="PreciseMatching" v-show="+ajaxdata.resumeState === 60011 && +ajaxdata.inWay === 190001 || +ajaxdata.resumeState === 60001 && +ajaxdata.inWay === 190001" style="width:100px">
                <Option
                  v-for="item in PreciseMatchingObj"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </Option>
              </Select>
              <Tag color="blue" v-for="tag in dynamicTags" :disable-transitions='false' :key="tag" :name="item" closable @on-close="handleClose2(tag)"> {{tag}}</Tag>
            </div>
          </div>
          <div class='branchright'>
            <div class="branchright-head">
                <span class='rebut'>
                  <icon-svg icon-class='screen'/>
                </span>
                <Button type="text" @click="modal1 = true" style="padding:3px;color:#2d8cf0;font-size: 14px;">筛选</Button>
                <Modal
                    v-model="modal1"
                    title="筛选"
                    >
                    <Form  :model="form1" ref="ruleForm" :label-width="80" :rules="ruleInline">
                      <FormItem label="应聘岗位" prop="jobTitle">
                        <Input v-model="form1.jobTitle" placeholder="请输入应聘职位" style="width:300px"></Input>
                      </FormItem>
                      <FormItem label="薪资待遇"  prop="salary">
                        <Input 
                          v-model="form1.salary" 
                          placeholder="例：10-20" 
                          style="width:290px">
                        </Input> k
                      </FormItem>
                      <FormItem label="工作经验">
                        <Select v-model="form1.workLength" placeholder="请选择" style="width:300px;">
                          <Option :label='item.label' :value='item.keys' v-for='(item,index) in optionworklength'
                          :key='index'></Option>
                        </Select>
                      </FormItem>
                      <FormItem label="最高学历">
                        <Select v-model="form1.degree" placeholder="请选择" style="width:300px;">
                          <Option :label='item.label' :value='item.keys' v-for='(item,index) in degrees'
                          :key='index'></Option>
                        </Select>
                      </FormItem>
                      <FormItem label="工作地点">
                        <Select v-model="form1.expectPlace" placeholder="请选择" style="width:300px;">
                          <Option :label='item.label' :value='item.keys' v-for='(item,index) in expectPlaces'
                          :key='index'></Option>
                        </Select>
                      </FormItem>
                      <FormItem label="年龄" prop='age'>
                        <Input v-model="form1.age" placeholder="例：22-25" style="width:300px"></Input>
                      </FormItem>
                      <FormItem label="负责人">
                        <p @click="isTree=true">
                            <Input 
                              type="text" 
                              v-model="form1.SearchorgName" 
                              placeholder="EHR组织架构" 
                              :readonly='true' 
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
                    </Form >
                    <div slot="footer">
                        <Button type="primary" @click="sureSuccess('ruleForm')">确定</Button>
                        <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px">重置</Button>
                    </div>
                </Modal>
                <Input v-model="jobSeekerName"  @keyup.enter.native="search" icon="search" placeholder="搜索/姓名" style="width: 200px;"></Input>
                <router-link to="resumeUpload">
                  <Button type="primary"><Icon type="ios-plus-outline"></Icon> 新简历录入</Button>
                </router-link>
            </div>
            <div class='secrr' id="resume_Search">
              <div style="margin: 15px 20px 0px 0px">
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div class='allgo' v-if="ajaxdata.resumeState">
          <Row>
            <Col span="12" style="padding-top:7px;">
              <Checkbox  :indeterminate='isIndeterminate' v-model='checkAllSelect' v-show="isSelectAll" >全选</Checkbox >
            </Col>
            <Col span="12">
              <Row type="flex" justify="end" class="code-row-bg">
                 <Col span="4">
                  <Button type='text' @click='abandon' v-show="isGiveUp"><a>放弃</a></Button>
                  <Modal
                        v-model="modal2"
                        title="进入人才库"
                        @on-ok="modal3 = true"
                        >
                        <Form  :model="form" ref="ruleForm" :label-width="80">
                          <div style="height: 30px;">
                            <span style="color:#f60;height: 30px;">*</span> 您共选择了<span>{{abandonnum}}</span>份简历，<span>{{talentnum}}</span>份简历可直接进入人才库，<span>{{ abandonnum - talentnum}}</span>份简历放弃后不可处理！
                          </div>
                          <FormItem label="人才分类">
                            <Select v-model='talentType' placeholder='请选择' style="width:300px;">
                              <Option
                                v-for='item in talentClass'
                                :key='item.value'
                                :label='item.label'
                                :value='item.value'>
                              </Option>
                            </Select>
                          </FormItem>
                          <FormItem label="移入">
                            <Select v-model="talentpool" placeholder="请选择" style="width:300px;">
                              <Option
                                v-for='item in talentTypes'
                                :key='item.value'
                                :label='item.label'
                                :value='item.value'>
                              </Option>
                            </Select>
                          </FormItem>
                          <FormItem label="入库原因">
                            <Select v-model="reason" placeholder="请选择" style="width:300px;">
                              <Option
                                v-for='item in talentReson'
                                :key='item.value'
                                :label='item.label'
                                :value='item.value'>
                              </Option>
                            </Select>
                          </FormItem>
                          <FormItem label="备注">
                            <Input type="textarea" v-model="comments" placeholder="请输入" style="width:300px"></Input>
                          </FormItem>
                        </Form >
                    </Modal>
                    <div class="modal-togiveUp">
                      <Modal
                          v-model="modal3"
                          title="放弃"
                          @on-ok="giveUpto"
                          width="300"
                          >
                          <Form  :model="form" ref="ruleForm" :label-width="80">
                            <span>您选择{{abandonnum}}份简历放弃后将不可操作,确认放弃？</span>
                          </Form>
                      </Modal>
                    </div>
                 </Col>
                 <Col span="4">
                  <Button type='text' @click='allot' v-if="isAllot"><a>分配</a></Button>
                  <Modal
                        v-model="modal4"
                        title="分配简历"
                        @on-ok="addpeop"
                        >
                        <Form :model="form" ref="ruleForm" :label-width="80">
                          <div class="box-container">
                            <div class="getinterivews">
                              <div style="display:flex;height:40px;line-height:40px">
                                 <span>分配给</span>
                                 <p @click="isTrees=true">
                                    <Input v-model="orgName" placeholder="EHR组织架构" :readonly="true" width="225" style="margin-left:20px"></Input>
                                 </p>
                              </div>
                                <TreeCom v-if="isTrees" @sendman="sendman" :FirstName="FirstName" :FirstId="FirstId" :personType="personType" :leafNode="leafNode"></TreeCom>
                            </div>
                          </div>
                        </Form >
                    </Modal>
                 </Col>
              </Row> 
            </Col>
          </Row>
        </div>
        <div class='rightbox'>
          <div class="resume_occupy" v-show="+resumelistText.length===0">
            <img src="../../assets/img_zhanwei.png">
          </div>
          
            <div class='right-cont' v-for='(item,index) in resumelistText' :key='index' id="resume_List">
              <Card :bordered="false"> 
                <Row>
                  <Col span="1">
                    <div class='grid-content bg-purple check'>
                      <Checkbox :indeterminate='isIndeterminate' v-model='item.selected' @on-change='changeSelect(index)'
                                :value='index'></Checkbox >
                    </div>            
                  </Col>
                  <div class='listneir' @click='toresumedetails($event,item.resumeState,item.resumeId,item.seekerId,item.num,item.inWay,item.platId)'>
                    <Col span='2' class="headphoto">
                      <div class='grid-content bg-purple' >
                        <i v-if="item.flowTag == '240015'"></i>

                        <div class="ineup" v-if="item.num">
                          <p class="inup1">{{item.num}}</p>
                          <p>排队中</p>
                        </div>
                        <img
                          class='right-head'
                          :src='item.photoPath||headuser' :onerror="defaultImg"/>
                        <span class='svg-container sex'>
                          <icon-svg :icon-class='item.sexIcon'/>
                        </span>
                      </div>
                    </Col>
                    <Col span="21">
                      <div class='grid-content bg-purple'>
                          <div class='right-list-top'>
                            <Row class='mt'>
                              <span class="users">
                                  <span class='username' style="text-align: left;">{{item.jobSeekerName}}</span>
                                  <span class="tag">
                                    <Tag color="green" v-if="item.flowTag =='240001'">{{item.flowTag | codeformat}}</Tag>
                                    <!-- 拒绝 -->
                                    <Tag color="yellow" v-if="item.flowTag =='240002'">{{item.flowTag|codeformat }}</Tag>
                                    <!-- 再联系 -->
                                    <Tag color="red"  v-if="item.flowTag =='240003'">{{item.flowTag|codeformat}}</Tag>
                                    <!-- 未接通 -->
                                    <Tag color="red" v-if="item.flowTag =='240004'">{{item.flowTag|codeformat}}</Tag>
                                    <Tag color="yellow" v-if="item.flowTag ==='240016'&& item.interviewRoundResult==='0'&&item.resumeState!= 60008" >{{item.interviewNowRound|capitalize}}：{{item.interviewRoundResult|codeformat}}</Tag>
                                    <Tag color="blue" v-if="item.flowTag ==='240016'&& (item.interviewRoundResult!=`0`)&&item.resumeState!= 60008" >{{item.interviewNowRound|capitalize}}</Tag>
                                    <Tag color="yellow" v-if="item.flowTag ==='240017'&& item.interviewRoundResult==='0'&&item.resumeState!= 60008" >{{item.interviewRoundResult|codeformat}}</Tag>
                                    <Tag color="green" v-if="item.flowTag ==='240017'&& item.interviewRoundResult==='1'&&item.resumeState!= 60008" >{{item.interviewRoundResult|codeformat}}</Tag>
                                    <!-- </div> -->
                                  </span>
                              </span>
                            </Row>
                            <Row class="mt rem-bort">
                                <span class='age'>{{item.age}}岁</span>
                                  <span class='job' :title ='item.jobTitle' v-if="item.jobTitle">{{item.jobTitle}}</span>
                                  <span class='workLength'>{{item.workLengthMax}}年</span>
                                  <span class='school'>{{item.degree|codeformat}}</span>
                                  <span class='salary'>{{item.expectSalaryMin}}-{{item.expectSalaryMax}}k</span>
                            </Row>
                            <Row class='xiangxi'>
                              <Col span="12" style="text-align: left;">
                                <span class="expectPlace" :title="item.expectPlace">
                                  <icon-svg icon-class='address' style="color: #2d8cf0;"/> {{item.expectPlace}}
                                </span>
                                <span>|</span>
                                <span v-if="item.jobList.length>0">{{item.jobList[0].jobName}}
                                  <Tag :class="{ 'publishState': item.jobList[0].publishState === '130002', 'timeout': item.jobList[0].publishState === '130001'|| item.jobList[0].publishState === '130003' || item.jobList[0].publishState === '130004' || item.jobList[0].publishState === '130005' || item.jobList[0].publishState === '130006' }" color="green">
                                    {{item.jobList[0].publishState |codeformat}}
                                  </Tag>
                                </span>
                              </Col>
                              <Col span="12" style="text-align: right;">
                                <span>负责人：{{item.handleUserName}} </span>
                                <span>简历来源：{{item.resumeFrom | codeformat}}</span>
                              </Col>
                            </Row>
                            <Row class='ersonppeop'>
                              <p>{{item.askTime|askTime}}</p>
                              <p class='rumsource'>{{item.flowType | codeformat}}</p>
                            </Row>
                          </div>
                        </div>
                    </Col>
                  </div>
                </Row>
              </Card>
            </div>
          
          <div class='right-cont' style="border: none" v-show="resumelistText.length!==0">
            <div class='rightfanye'>
              <div class='block approval-pagination'>
                <Page 
                  :page-size='20'
                   @on-change='pageChange'
                  :current="pageOption.pageNum"
                  :total='pageOption.total' 
                  show-total>
                </Page>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <Spin fix v-if="isShowLoading" style="position: absolute;">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
	</div>
</template>
<script>
  import { numList } from '../../api/resumeApi/resumelist'
  import { allotTo, move, giveUp, queryAbandon, resumeList } from '../../api/resumeApi/resumelist'
  import { SEARCHINFO } from '../../json/search'
  import { OPTIONWORKLENGTH, DEGREES, TALENTCLASS, TALENTPOOLS, TALENTRESON, EXPEACTPLACES } from '../../store/modules/resumegolobal/resumegolobal'
  // import { organizationDetails } from '../../api/AccountApi/accountCenter'// 账号管理部门列表及详情
  import TreeCom from './TreeCom'
  import SearchTree from './SearchTree'
  import * as types from '../../store/modules/accentCenter/actionTypes'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isShowLoading: true,
        ehrMan: '',
        dataList: [{}],
        isSelectAll: false,
        isGiveUp: false,
        isAllot: false,
        resumelistTextLeft: {},
        state: 60000,
        isMam: false,
        FirstId: 0,
        FirstName: '',
        personType: 0,
        leafNode: 0,
        orgId: 0,
        orgName: '',
        orgList: '',
        isTrees: false,
        isTree: false,
        resumePersonList: [],
        isSuccClick: false,
        matching: 'ALL',
        expectPlaces: EXPEACTPLACES,
        checkAllSelect: false,
        roleId: '3',
        dynamicTags: [],
        abandonnum: 0,
        isIndeterminate: false,
        headuser: require('@/assets/headuser.jpg'),
        defaultImg: 'this.src="' + require('@/assets/headuser.jpg') + '"',
        // 分配给的谁
        oper: '',
        togiveUp: false,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        talents: [],
        queueList: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // 简历搜索的姓名
        jobSeekerName: '',
        salaryShow: '',
        form1: {
          jobTitle: '', // 简历名称
          degree: '', // 学历
          expectPlace: '', // 工作地点
          workLength: '', // 工作经验
          ageStart: '', // 最小年龄
          ageend: '', // 最小年龄
          salary: '', // 薪资待遇
          isDistribute: '', // 是否分配
          isBrandUniversity: '', // 学校类别
          isBrandCompany: '', // 学校类别
          age: '',
          SearchorgName: ''
        },
        SearchorgId: 0,
        talentClass: TALENTCLASS,
        talentTypes: TALENTPOOLS,
        talentReson: TALENTRESON,
        optionworklength: OPTIONWORKLENGTH,
        degrees: DEGREES,
        resumelistText: [],
        talentType: 150001,
        reason: '',
        comments: '',
        classnum: [{
          value: 190007,
          label: '所有类型'
        }, {
          value: 190001,
          label: '主动投递'
        }, {
          value: 190002,
          label: '搜索下载'
        }, {
          value: 190003,
          label: '简历上传'
        }, {
          value: 190006,
          label: '人才库调转'
        }, {
          value: 190004,
          label: '其他'
        }],
        PreciseMatchingObj: [
          {
            value: 'PRECISE_MATCHING',
            label: '精准匹配'
          },
          {
            value: 'NOT_PRECISE_MATCHING',
            label: '非精准匹配'
          },
          {
            value: 'ALL',
            label: '全部'
          }
        ],
        talentpool: '',
        enterStage: '',
        talentnum: '',
        noresumes: '',
        salaryShowMin: '',
        salaryShowMax: '',
        giveupnum: 0,
        classfic: 190007,
        giveuparr: [],
        resume: [], // 可以放弃的简历
        noresume: [], // 不能放弃的简历
        iterviews: [], // 被选中的简历
        map: SEARCHINFO,
        map2: SEARCHINFO,
        alotList: [],
        pageOption: {
          pageNum: 1,
          size: 20,
          total: 0
        },
        ajaxdata: {
          page: 1,
          size: 20,
          resumeState: this.$route.query.name || '',
          inWay: 190007
        },
        resume_occupy_arrive: true,
        resume2_occupy_arrive: false,
        ruleInline: {
          jobTitle: [
            { max: 10, message: '最多输入10位数', trigger: 'blur,change' }
          ],
          age: [
            { max: 7, message: '最多7位数例：100-100', trigger: 'blur,change' }
          ],
          salary: [
            { max: 20, message: '薪资过高最多15位数例：100000000-100000000', trigger: 'blur,change' }
          ]
        }
      }
    },
    components: {
      TreeCom,
      SearchTree
    },
    filters: {
      capitalize: function(value) {
        var num = value - 1
        var a = ['一面', '二面', '三面', '四面', '五面']
        return a[num]
      },
      // 应聘的样式标记
      datafilter: function(value) {
        var obj = { 190001: '应聘日期', 190002: '下载日期', 190003: '上传日期', 190006: ` 调转日期` }
        if (obj[value]) {
          return obj[value]
        } else {
          return `应聘日期`
        }
      }
    },
    computed: {
      ...mapGetters('accentCenter', [
        'orgLeftList',
        'detaliList'
      ])
    },
    mounted() {
      const routeObj = this.$route.query
      if (this.$route.fullPath.indexOf('name') > 0) {
        +routeObj.name !== 60000 && +routeObj.name !== 60011 && +routeObj.name !== 60009 ? this.isGiveUp = true : ''
        if (+routeObj.name !== 60000 && +routeObj.name !== 60011) {
          this.isSelectAll = true
          this.isAllot = true
        }
      } else {
        this.isSelectAll = false
        this.isGiveUp = false
        this.isAllot = false
      }
      if (this.$route.query.name) {
        this.state = this.$route.query.name
      }
      this[types.HANDEL_ORGLEFTLIST]().then(res => {
        if (this.orgLeftList.length > 0) {
          this.FirstId = this.orgLeftList[0].id
          this.FirstName = this.orgLeftList[0].organizationName
          this.personType = this.orgLeftList[0].personType
          this.leafNode = this.orgLeftList[0].leafNode
        }
      })
      this.roleId = sessionStorage.roleId
      if (this.$route.query.jobName) {
        this.form1.jobTitle = this.$route.query.jobName || ''
        this.form1.jobId = this.$route.query.jobId || ''
        this.sureSuccess()
        return false
      }
      if (localStorage.getItem('resumeAjaxdata')) {
        this.ajaxdata = JSON.parse(localStorage.getItem('resumeAjaxdata'))
        this.jobSeekerName = this.ajaxdata.jobSeekerName
        this.classfic = this.ajaxdata.inWay
        if (+this.$route.query.name === 60011 && +this.ajaxdata.inWay === 190001 || +this.$route.query.name === 60001 && +this.ajaxdata.inWay === 190001) {
          if (this.ajaxdata.matchEnums) {
            this.matching = this.ajaxdata.matchEnums
          } else {
            this.ajaxdata.matchEnums = 'PRECISE_MATCHING'
            this.matching = 'PRECISE_MATCHING'
          }
        } else {
          this.ajaxdata.matchEnums = ''
        }
      } else {
        this.ajaxdata = this.ajaxdata
      }
      if (this.$route.query.SearchorgName || this.$route.query.operUserIds) {
        this.ajaxdata.SearchorgName = this.$route.query.SearchorgName
        this.ajaxdata.operUserIds = this.$route.query.operUserIds
        localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
      }
      if (this.$route.query.name) {
        this.ajaxdata.resumeState = this.$route.query.name
      } else {
        this.ajaxdata.resumeState = 60000
      }
      var arr = []
      if (this.ajaxdata.salary) {
        this.ajaxdata.salary = this.ajaxdata.salary.split('-').map(item => item + 'k').join('-')
      }
      for (var key in this.ajaxdata) {
        if (key !== 'size' && key !== 'page' && this.ajaxdata[key] && key !== 'jobId' && key !== 'resumeState' && key !== 'inWay' && key !== 'jobSeekerName' && key !== 'matchEnums' && key !== 'isSuccClick' && key !== 'operUserIds') {
          if (key !== 'ageMax' && key !== 'ageMin') {
            arr.push(this.ajaxdata[key])
          } else {
            if (key === 'ageMin') {
              arr.push(`${this.ajaxdata[key]}-${this.ajaxdata['ageMax']}`)
            } else {
              arr.push('')
            }
          }
        }
      }
      if (arr.length === 0) {
        this.ajaxdata.isSuccClick = false
        setTimeout(() => {
          localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        }, 100)
      }
      var a = this.map
      var arr2 = []
      arr.forEach(function(item) {
        if (item) {
          if (typeof (item) === 'string') {
          // 当arr里面存的是字符串的时候
            arr2.push(item)
          } else {
            arr2.push(a[item])
          }
        }
      })
      this.dynamicTags = arr2
      this.form1.jobId = ''
      this.dialogFormVisible = false
      numList(this.ajaxdata).then(res => { // 简历数量
        this.resumelistTextLeft = res.result
        localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
      })
      const _this = this
      setTimeout(function() {
        _this.$refs.left.$el.style.height = _this.$refs.pending.offsetHeight + 'px'
      }, 500)
      this.getResumelist(this.ajaxdata)
    },
    methods: {
      ...mapActions('accentCenter', [
        types.HANDEL_ORGLEFTLIST,
        types.HANDEL_ORGDEATIL
      ]),
      // ...mapMutations('PendingTreatment', [
      //   types.HANDEL_CLASSFIC,
      //   types.HANDEL_MATCHING,
      //   types.HANDEL_PAGE,
      //   types.HANDEL_SIZE,
      //   types.HANDEL_RESUMESTATE,
      //   types.HANDEL_INWAY,
      //   types.HANDEL_MATCHENUMS
      // ]),
      // 全局请求列表
      getResumelist(obj) {
        if (obj.salary) {
          obj.salary = obj.salary.split('-').map(item => {
            return item.split('k')[0] * 1000
          }).join('-')
        }
        resumeList(obj).then(res => {
          this.isShowLoading = true
          if (res.result.list.length > 0) {
            this.resume_occupy_arrive = false
            this.resume2_occupy_arrive = false
          } else if (res.result.list.length === 0 && this.ajaxdata.isSuccClick) {
            this.resume2_occupy_arrive = true
            this.resume_occupy_arrive = false
          } else if (res.result.list.length === 0 && this.ajaxdata.jobSeekerName) {
            this.resume2_occupy_arrive = true
            this.resume_occupy_arrive = false
          } else if (res.result.list.length === 0 && this.ajaxdata.inWay !== 190007) {
            this.resume2_occupy_arrive = true
            this.resume_occupy_arrive = false
          } else {
            this.resume_occupy_arrive = true
            this.resume2_occupy_arrive = false
          }
        // res.result.list.length > 0 ? this.resume2_occupy_arrive = false : this.resume2_occupy_arrive = true
        // res.result.list.length > 0 ? this.resume_occupy_arrive = false : this.resume_occupy_arrive = true
          if (res.result.size === 0) {
            this.pageOption = JSON.parse(JSON.stringify({ pageNum: 1, size: 20, total: 0 }))
          } else {
            const { pageNum, size, total } = res.result
            this.pageOption = JSON.parse(JSON.stringify({ pageNum, size, total }))
          }
          this.isShowLoading = false
          this.resumelistText = res.result.list.map(item => {
            item.selected = false
            if (item.sex === '70001') {
              item.sexIcon = 'sex-man'
            } else if (item.sex === '70002') {
              item.sexIcon = 'sex-woman'
            }
            if (item.expectSalaryMin === item.expectSalaryMax && item.expectSalaryMin === 0) {
              item.expectSalary = '面议'
            } else {
              item.expectSalary = item.expectSalaryMin + '-' + item.expectSalaryMax
            }
            if (item.workLengthMax < 10) {
              if (item.workLengthMax === item.workLengthMin) {
                if (!item.workLengthMax === `0`) {
                  item.workLength === `未填写`
                } else {
                  item.workLength = item.workLengthMax + `年`
                }
              } else {
                item.workLength = item.workLengthMin + `-` + item.workLengthMax + `年`
              }
            } else {
              item.workLength = '10年以上'
            }
          // 如果max = min 且max < 10的时候 显示 max值
          // 如果max !=min 且max < 10的时候 显示min -max
          // 如果max>= 10 显示 10年及以上
            return item
          })
        })
      },
    // 分页逻辑
      pageChange(value) {
        this.ajaxdata.resumeState = this.$route.query.name
        this.ajaxdata.page = value
        localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        this.getResumelist(this.ajaxdata)
        if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = 0
        } else {
          document.body.scrollTop = 0
        }
      },
      changeSelect(index) {
        let ret = true
        this.resumelistText.forEach(item => {
          if (!item.selected) {
            ret = false
          }
        })
        this.checkAllSelect = ret
      },
    // 关闭放弃的页面
      handleClose() {
        this.togiveUp = false
      },
    // 删除标签的逻辑
      handleClose2(tag) {
        var map = this.map
        var str = tag
      // this.form1.salary = this.form1.salary.split('-').map(item => item / 1000 + 'k').join('-')
        for (var key in this.ajaxdata) {
          if (tag === this.ajaxdata['SearchorgName']) {
            delete this.ajaxdata['SearchorgName']
            delete this.ajaxdata['operUserIds']
          }
          if (tag === map[this.ajaxdata[key]]) {
            delete this.ajaxdata[key]
            this.form1[key] = ''
          }
          if (tag === this.ajaxdata[key]) {
            delete this.ajaxdata[key]
            this.form1[key] = ''
          }
          if (key === 'jobId') {
            delete this.ajaxdata[key]
          }
        }
        if (this.form1.age === str) {
          delete this.ajaxdata['ageMax']
          delete this.ajaxdata['ageMin']
          this.form1.age = ''
        }
        if (tag === this.ajaxdata.ageMin + `-` + this.ajaxdata.ageMax) {
          delete this.ajaxdata['ageMax']
          delete this.ajaxdata['ageMin']
          this.form1.age = ''
        }
        if (str.substr(-1, 1) === 'k') {
          delete this.ajaxdata['salary']
          this.form1.salary = ''
        }
        localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        this.$router.push({ path: 'resume', query: { name: this.$route.query.name, time: +new Date() }})
      },
    // 移入阶段
      handleCommand(command) {
        this.iterviews = this.resumelistText.filter(function(item) {
        // 筛选出已经被选中的简历
          return item.selected
        })
        var flag = this.iterviews.every(function(item) {
          return item.num === 0
        })
        if (this.iterviews.length && flag) {
          var arr1 = []
          this.iterviews.forEach(function(item) {
            arr1.push({
              resumeId: item.resumeId,
              resumeState: command,
              seekerId: item.seekerId
            })
          })
          var a = JSON.stringify({ resumeList: arr1 })
          move(a).then(res => {
            if (res.code === 200) {
              this.$message({
                message: `移入${SEARCHINFO[command]}成功`,
                type: 'success'
              })
              this.$router.push({ path: 'resume', query: { name: this.$route.query.name, time: +new Date() }})
            }
          })
        } else {
          this.$message.error('你没有选择简历,或者选择的简历正在排队中请重新选择')
        }
      },
    // 重置按钮
      resetForm(form1) {
        this.form1 = {
          jobTitle: '', // 简历名称
          degree: '', // 学历
          expectPlace: '', // 工作地点
          workLength: '', // 工作经验
          ageStart: '', // 最小年龄
          ageend: '', // 最小年龄
          salary: '', // 薪资待遇
          isDistribute: '', // 是否分配
          isBrandUniversity: '', // 学校类别
          isBrandCompany: '', // 学校类别
          age: '',
          SearchorgName: ''
        }
        this.$refs[form1].resetFields()
        this.SearchorgId = ''
        this.isTree = false
      },
    // 提交筛选的按钮
      sureSuccess(formname) {
        this.isSuccClick = true
        this.salaryShow ? this.form1.salary = this.salaryShow.split('-').map(item => item * 1000).join('-') : ''
        if (/^([0-9]{1,})-([0-9]{1,})$/.test(this.form1.salary) || this.form1.salary === '') {
          if (/^([0-9]{1,})-([0-9]{1,})$/.test(this.form1.age) || this.form1.age === '') {
          // this.form1.salary = this.form1.salary.split('-').map(item => item / 1000 + 'k').join('-')
            this.dynamicTags = []
            var obj = {}
            if (this.form1.age) {
              var str = this.form1.age
              var arr2 = str.split('-')
              if (arr2[0] < 18) {
                obj['ageMin'] = 18
              } else {
                obj['ageMin'] = arr2[0]
              }
              if (arr2[1] < 18) {
                obj['ageMax'] = 18
              } else {
                obj['ageMax'] = arr2[1]
              }
            }
            for (var key in this.form1) {
              if (this.form1[key] && key !== 'age') {
                obj[key] = this.form1[key]
              }
            }
            obj['page'] = 1
            obj['size'] = 20
            obj['resumeState'] = this.$route.query.name
            obj['inWay'] = this.classfic
            obj['matchEnums'] = this.matching
            obj['isSuccClick'] = this.isSuccClick
            obj['operUserIds'] = this.SearchorgId
            this.ajaxdata = obj
          // this.getResumelist(this.ajaxdata)
            var arr = []
          // this.form1.salary = this.form1.salary.split('-').map(item => item / 1000 + 'k').join('-')
            for (const key in this.form1) {
              if (key !== 'size' && key !== 'page' && this.form1[key] && key !== 'jobId') {
                arr.push(this.form1[key])
              }
            }
            var arr1 = []
            var a = this.map
            arr.forEach(function(item) {
              if (typeof (item) === 'string') {
                arr1.push(item)
              } else {
                arr1.push(a[item])
              }
            })
          // this.dynamicTags = arr1
            this.form1.jobId = ''
            this.dialogFormVisible = false
            localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
            this.$router.push({ path: 'resume', query: { name: this.$route.query.name, time: +new Date() }})
          } else {
            this.$message.error('您输入的年龄范围格式有误,格式应为 数字-数字')
          }
        } else {
          this.$message.error('您输入的薪资有误,格式为数字-数字')
        }
      },
    // 分配列表的逻辑
      allot() {
        this.isTrees = false
        this.isMam = true
        this.orgName = ''
        this.iterviews = this.resumelistText.filter(item => {
          return item.selected
        })
        if (this.iterviews.length) {
          this.modal4 = true
        // sysUsers().then(res => {
        //   this.resumePersonList = res.result
        // })
        // allotlist().then(res => {
        //   this.alotList = res.sort(function compareFunction(param1, param2) {
        //     return param1.userName.localeCompare(param2.userName, 'zh')
        //   })
        // })
        } else {
          this.$message.error('请选择简历')
        }
      },
      sendman(a) {
        this.orgName = a.name
        this.orgId = a.id
      },
      Searchsendman(a) {
        this.form1.SearchorgName = a.name
        this.SearchorgId = a.id
      },
      // 分配的逻辑
      addpeop() {
        var arr = []
        this.iterviews.forEach(item => {
          arr.push({
            operUserId: this.orgId,
            resumeId: item.resumeId,
            seekerId: item.seekerId,
            currOperUserId: item.operUserId,
            resumeState: item.resumeState,
            deptId: ''
          })
        })
        var a = JSON.stringify({
          'resumeList': arr
        })
        if (arr.length && this.orgName) {
          allotTo(a).then(res => {
            if (res.code === 200) {
              this.$message.success('分配成功')
              this.dialogFormVisible4 = false
              this.$router.push({ path: 'resume', query: { name: this.$route.query.name, time: +new Date() }})
            }
          })
        } else {
          this.dialogFormVisible4 = false
          this.$message.error('请选择简历')
        }
      // } else {
      //   this.$message.error('请选择简历3')
      // }
      },
      // 发送面试通知和offer的逻辑
      // 放弃的逻辑
      giveUpto() {
        var resumeLists = []
      // var arr = this.resume
        for (let i = 0; i < this.iterviews.length; i++) {
          resumeLists.push({
            resumeId: this.iterviews[i].resumeId,
            seekerId: this.iterviews[i].seekerId,
            num: this.iterviews[i].num,
            num_2: this.iterviews[i].num_2,
            poolType: '',
            esId: this.iterviews[i].esId,
            talentType: '',
            enterStage: this.iterviews[i].resumeState,
            comments: '',
            reason: ''
          })
        }
        var c = JSON.stringify({ resumeList: resumeLists })
        giveUp(c).then(res => {
          this.dialogFormVisible3 = false
          this.$router.push({ path: 'resume', query: { name: this.$route.query.name, time: +new Date() }})
          this.$message({
            message: res.message,
            type: 'success'
          })
        })
      // }
      }, // 单个放弃
      giveup() {
        var resumeLists = []
      // var arr = this.resume
        for (let i = 0; i < this.iterviews.length; i++) {
          resumeLists.push({
            resumeId: this.iterviews[i].resumeId,
            seekerId: this.iterviews[i].seekerId,
            num: this.iterviews[i].num,
            num_2: this.iterviews[i].num_2,
            esId: this.iterviews[i].esId,
            poolType: this.talentpool,
            talentType: this.talentType,
            enterStage: this.iterviews[i].resumeState,
            comments: this.comments,
            reason: this.reason
          })
        }
        if (resumeLists.length === 0) {
          this.$message.error('请选择简历')
          this.dialogFormVisible3 = false
        } else {
          var c = JSON.stringify({ resumeList: resumeLists })
          giveUp(c).then(res => {
            this.dialogFormVisible3 = false
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.$router.push({ path: 'resume', query: { name: this.$route.query.name, time: +new Date() }})
            } else {
              this.$message.error(res.message)
            }
          })
        }
      },
      getrusumebyclass(val) {
        this.ajaxdata.inWay = this.classfic
      // this.ajaxdata.matchEnums = 'PRECISE_MATCHING'
        if (+this.ajaxdata.resumeState === 60011 && +this.ajaxdata.inWay === 190001 || +this.ajaxdata.resumeState === 60001 && +this.ajaxdata.inWay === 190001) {
          this.ajaxdata.matchEnums = 'PRECISE_MATCHING'
        } else {
          this.ajaxdata.matchEnums = ''
        }
        localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        // this.$router.push({ path: 'pendingTreatment', query: { name: this.$route.query.name, time: +new Date() }})
        numList(this.ajaxdata).then(res => { // 简历数量
          this.resumelistTextLeft = res.result
          localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        })
        const _this = this
        setTimeout(function() {
          _this.$refs.left.$el.style.height = _this.$refs.pending.offsetHeight + 'px'
        }, 500)
        this.getResumelist(this.ajaxdata)
      },
      PreciseMatching(val) {
        this.ajaxdata.matchEnums = this.matching
        localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        // this.$router.push({ path: 'pendingTreatment', query: { name: this.$route.query.name, time: +new Date() }})
        numList(this.ajaxdata).then(res => { // 简历数量
          this.resumelistTextLeft = res.result
          localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        })
        const _this = this
        setTimeout(function() {
          _this.$refs.left.$el.style.height = _this.$refs.pending.offsetHeight + 'px'
        }, 500)
        this.getResumelist(this.ajaxdata)
      },
      // 简历放弃
      abandon() {
        this.iterviews = this.resumelistText.filter(function(item) {
          return item.selected
        })
      // 得到选中的简历
        this.abandonnum = this.iterviews.length
      // 得到选中简历的个数
        if (this.iterviews.length) {
        // 当简历有选中的时候
          var queryArr = []
          this.iterviews.forEach(function(item) {
            queryArr.push({
              resumeId: item.resumeId,
              seekerId: item.seekerId
            })
          })
      // 查询排队人数
          queryAbandon({ resumeList: queryArr }).then(res => {
          // var resumeaban = res.result.resumeList
            this.talents = res.result.resumeList.filter(function(item) {
              return item.flag
            })
            this.queueList = res.result.resumeList.filter(function(item) {
              return !item.flag
            })
            this.giveupnum = this.queueList.length
            this.talentnum = this.talents.length
          })
        // 如果可以放弃到人才库的为0
          if (this.talents) {
            this.modal2 = true
          // this.togiveUp = true
          } else {
            this.modal3 = true
          }
        } else {
          this.$message.error('请选择简历')
        }
      },
    // 进入简历详情页的逻辑
      toresumedetails(event, resumeState, resumeId, seekerId, num, inWay, platId) {
      // 跳转到简历详情
        event.preventDefault()
        if (+resumeState === 60011) {
          if (num === 0) {
            this.$router.push({ path: 'detailEditing', query: { resumeId: resumeId, seekerId: seekerId, resumeState: resumeState }})
          } else {
            this.$message.error('你查看简历正在排队不可查看')
          }
        } else {
          if (num === 0) {
            this.$router.push({ path: 'activeSend', query: { resumeId: resumeId, seekerId: seekerId, platId: platId, resumeState: resumeState }})
          } else {
            this.$message.error('你查看简历正在排队不可查看')
          }
        }
      },
    // 简历搜索的逻辑
      search() {
        this.ajaxdata.isSuccClick = true
        this.ajaxdata.jobSeekerName = this.jobSeekerName
        localStorage.setItem('resumeAjaxdata', JSON.stringify(this.ajaxdata))
        this.$router.push({ path: 'resume', query: { name: this.$route.query.name, time: +new Date() }})
      // this.getResumelist(this.ajaxdata)
      }
    },
    watch: {
      checkAllSelect(old, newu) {
        const all =
          this.resumelistText.filter(item => item.selected).length === this.resumelistText.length
        if (this.checkAllSelect) {
          this.resumelistText.forEach(item => {
            item.selected = true
          })
        } else {
          if (all) {
            this.resumelistText.forEach(item => {
              item.selected = false
            })
          }
        }
      }
    }
  }
</script>
<style lang="scss" src="./style.scss">

</style>

