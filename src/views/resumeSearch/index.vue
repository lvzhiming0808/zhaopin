<template>
  <div class="search-wrapper">
    <div class="search-cont">
          <div style="padding: 20px 60px 0px 60px;">
            <Input icon="search" :maxlength='20' placeholder="可搜索职位，多个关键词请用空格隔开" v-model="keyword" @on-change="setformdata" @keyup.enter.native="submitForm" class="inputbord" clearable prefix-icon="el-icon-search">
            </Input>
          </div>
          <div class="search-mian" id="resumeSearchMenu">
          <Form  ref="form" :model="searchobj" :rules="rules" :label-width="80">
              <Row>
                <Col span="8" style="display:flex">
                  <FormItem label="年龄" prop="ageMin">
                    <Input v-model="ageMin" :maxlength='3' style="width:90px;"></Input>
                  </FormItem> 
                  <span class="zhi">至</span>
                  <FormItem prop="ageMax" class="labelnone">
                    <Input v-model="ageMax" :maxlength='3'  style="width:90px;"></Input>  
                  </FormItem> 
                </Col>
                <Col span="8">
                  <FormItem label="性别" prop="sex">
                    <Select v-model="sex" placeholder="请选择" style="width:200px">
                      <Option v-for="item in sexlist" :key="item.value" :label="item.label" :value="item.value">
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="期望地点" prop="sex" class="text-overflow">
                      <Cascader 
                        :data="expectPlaces" 
                        :options="expectPlaces" 
                        :props="defaultprops" 
                        placeholder="请选择"  
                        v-model="expectPlace"
                        change-on-select 
                        style="width:200px;">
                      </Cascader>
                    </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                <FormItem label="学历" prop="degrees">
                    <Select v-model="degree" placeholder="请选择" style="width:200px">
                      <Option v-for="item in degrees" :key="item.keys" :label="item.label" :value="item.keys"></Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="求职状态" prop="currentState">
                    <Select v-model="currentState" placeholder="请选择" style="width:200px">
                      <Option v-for="item in currentStates" :key="item.keys" :label="item.label" :value="item.keys">
                        </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="更新时间" prop="updateDate">
                    <Select v-model="updateDate" placeholder="请选择" style="width:200px">
                      <Option v-for="item in updateDates" :key="item.id" :label="item.label" :value="item.keys">
                        </Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                 <FormItem label="居住地" prop="sex" class="text-overflow">
                  <Cascader 
                    :data="livePlaces" 
                    v-model="resideAddress" 
                    change-on-select  
                    style="width:200px;">
                  </Cascader>
                  </Cascader>
                </FormItem>
                </Col>
                <Col span="8" style="display:flex">
                  <FormItem label="工作年限" prop="workLengthMin">
                    <Input v-model="workLengthMin" :maxlength='3' style="width:90px;"></Input>
                  </FormItem> 
                  <span class="zhi">至</span>
                  <FormItem label="" prop="workLengthMax" class="labelnone">
                    <Input v-model="workLengthMax" :maxlength='3'  style="width:90px" ></Input>
                  </FormItem> 
                </Col>
                <Col span="8" style="display:flex">
                  <FormItem label="期望薪资" prop="salaryMin">
                    <Input v-model="salaryMin" :maxlength='3' style="width:90px;"></Input>
                  </FormItem> 
                  <span class="zhi">至</span>
                 <FormItem label="" prop="salaryMax" class="labelnone">
                    <Input v-model="salaryMax" :maxlength='3'  style="width:90px"></Input>&nbsp;K
                  </FormItem> 
                </Col>
              </Row>
              <Row>
                <Col span="24" class="seachbtn" style="text-align: center; margin-left:0px;">
                    <Button type="primary" @click="submitForm('form')">搜索</Button>
                    <Button loading v-if="isloading">搜索中</Button>
                    <Button @click="resetForm('form')" style="margin-left: 8px">重置</Button>
                </Col>
              </Row>
          </Form>
      </div>
      <div class="search-bottom">
        <p id="resumeSearchMenutotalCount" class="resumeSearchMenutotalCount">共搜到<span>{{AllListNumber}}</span>条</p>
        <div class="search-result">
          <Tabs v-model="activeName" :animated="false" @on-click="handleClick" size="small">
            <TabPane v-for="(item,index) in CountList" :name="item.platId.toString()" :count="item.count" :label="`${item.channelName}(${item.count})`" :key="index">
              <img style="display:block;margin:20px auto" v-if="item.count===0" src="../../assets/img_zhanwei.png" alt="">
              <div v-else class="right-cont r-mt" v-for="(item,index) in resumeListAll" :key="index" v-loading="listLoading">
                <div class="right-cont-top" @click="taggelEvent(index,$event)" >
                <Card :bordered="false"> 
                  <Row class="card-top">
                    <div class='listneir'>
                      <Col span="2">
                        <div class="grid-content bg-purple" style="padding-top: 15px;">
                          <div class="ineup" v-if="item.status === `180001`">
                            <p>已入职</p>
                          </div>
                          <div class="header-logo">
                              <img class="right-head" :src="item.headerImg || headuser" :onerror="defaultImg"/>
                          </div>
                              <span class="sex svg-container">
                                <icon-svg v-if="item.sex==='70001'" icon-class='sex-man'/>
                                <icon-svg v-else-if="item.sex==='70002'" icon-class='sex-woman'/>
                                <icon-svg v-else icon-class='sex-unknown'/>
                              </span>
                        </div>
                      </Col>
                      <Col span="22">
                        <div class="grid-content bg-purple">
                          <div class="right-list-top">
                            <Row class="mt user">
                              <span v-if="item.userName" class="username">{{item.userName}}</span>
                              <span class="job titles" v-if="activeName!=='talent'" >{{item.currentState |codeformat}}</span>
                            </Row>
                            <Row class="mt">
                              <span class="university titles" :title="item.expectJob" v-if="item.expectJob" v-html="item.expectJob1"></span>
                              <span class="age titles">{{item.age}}岁</span>
                              <span class="major titles">{{item.workLength}}</span>
                              <span class="degree titles" v-if="item.degree">{{item.degree|codeformat}}</span>
                            </Row>
                            <div class="xiangxi">
                              <span style="color: #2D8DF0"><i class="el-icon-location-outline"></i></span>
                              <span v-if="item.expectAddress" class="expectAddress">{{item.expectAddress}}</span>
                              <span class="updateDate titles"> 更新于:{{item.updateDate}} </span>
                              <Tag type="danger"  v-if="item.isbrandCompany">名企</Tag>
                              <Tag type="danger"  v-if="item.isbrandSchool == 110001">985</Tag>
                              <Tag v-if="item.isbrandSchool == 110002">211</Tag>
                            </div>
                            <div class="seeresume" @click='toresumedetails($event,item)'>
                              <Button type="primary">查看简历</Button>
                            </div>
                          </div>
                        </div>
                      </Col>
                  </div>
                  </Row>
                  <Row class="card-bot" v-for="(n,i) in cardFlag" :key="'cardFlag'+i" :class="n === index ? 'show' : 'hide'">
                    <Col span="2">
                      <div style="visibility: hidden;">展开</div>
                    </Col>
                    <Col span="22">
                      <div class="all_content"> 
                          <div class="highest-education" v-if="item.educationList.length>0">
                            <span class="first-name">最高学历:</span>
                            <span class="all_content_tags">{{item.educationList[0].educationTime}}</span>
                            <span class="all_content_tags">{{item.educationList[0].university}}</span>
                            <span class="" >{{item.degree|codeformat}}</span>
                            <span>|</span>
                            <span class="all_content_tags">{{item.educationList[0].major}}</span>
                          </div>
                          <div class="highest-education" v-if="item.educationList.length<=0">
                            <span class="first-name">最高学历:</span>
                            <span class="all_content_tags">无</span>
                          </div>
                          <div class="workest" v-if="item.workExpList.length>0">
                            <span class="first-name">最近工作:</span>
                            <span class="all_content_tags">{{item.workExpList[0].year}}</span>
                            <span class="all_content_tags">{{item.workExpList[0].company}}</span>
                            <span class="all_content_tags">{{item.workExpList[0].position}}</span>
                            <div class="work-content" v-for="(items,ind) in item.workExpList[0].desc" :key="'work'+ind">
                              <p>{{items}}</p>
                            </div>
                          </div>
                          <div class="highest-education" v-if="item.workExpList.length<=0">
                            <span class="first-name">最近工作:</span>
                            <span class="all_content_tags">无</span>
                          </div>
                      </div>
                    </Col>
                  </Row>
                  </Card> 
                </div>
              </div>
              <div class="fl" v-if="item.count!==0">
              <Page
                background @on-change='pagechange($event)'
                layout=" total,prev, pager, next"
                :current ='currentPage'
                show-total
                :page-size="20" :total="totles">
              </Page>
              </div>
            </TabPane>
            </Tabs>
        </div>
      </div>
    </div>
  <Spin fix v-if="isShowLoading" style="position: absolute;">
    <Icon type="load-c"  size=18 class="demo-spin-icon-load"></Icon>
    <div>Loading</div>
  </Spin>
  </div>
</template>
<script>
import { channelData, channelCount } from '../../api/resumeSearchApi/distribute'
import { UPDATEDATE, DEGREESFORSEARCH, CURRENTSTATE, SEXLIST, SROUCE } from '../../store/modules/resumegolobal/resumegolobal'
import { CITYS } from '../../json/resume_city'
import * as types from '../../store/modules/resumeSearch/actionTypes'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
     // 正则表单
    var checkAgeMin = (rule, value, callback) => {
      if (this.ageMax) {
        if (value === '') {
          callback(new Error('请输入起始值'))
        } else {
          if (this.ageMin * 1 >= this.ageMax * 1) {
            callback(new Error('必须小于截止值'))
          }
        }
      }
      if (/^0+/.test(value)) {
        callback(new Error('请输入正整数'))
      }
      if (!/^[0-9]+$/.test(value) && value !== '') {
        callback(new Error('请输入正整数'))
      }
      if (value < 18 && value !== '') {
        callback(new Error('必须年满18岁'))
      }
      if (value > 100) {
        this.ageMin = 100
      } else {
        callback()
      }
    }
    var checkAgeMax = (rule, value, callback) => {
      if (/^0+/.test(value)) {
        callback(new Error('请输入正整数'))
      }
      if (!/^[0-9]+$/.test(value) && value !== '') {
        callback(new Error('请输入正整数'))
      }
      if (value < 18 && value !== '') {
        callback(new Error('必须年满18岁'))
      }
      if (this.ageMin) {
        if (value === '') {
          callback(new Error('请输入截止值'))
        } else {
          if (value * 1 <= this.ageMin * 1) {
            callback(new Error('必须大于起始值'))
          }
        }
      }
      if (value > 100) {
        this.ageMax = 100
      } else {
        callback()
      }
    }
    var ValworkLengthMin = (rule, value, callback) => {
      if (this.searchobj.workLengthMax) {
        if (value === '') {
          callback(new Error('请输入起始值'))
        } else {
          if (this.searchobj.workLengthMin * 1 >= this.searchobj.workLengthMax * 1) {
            callback(new Error('必须小于截止值'))
          } else {
            callback()
          }
        }
      }
      if (/^0+/.test(value)) {
        callback(new Error('请输入正整数'))
      }
      if (!/^[0-9]+$/.test(value) && value !== '') {
          // this.searchobj.workLengthMin = 0
        callback(new Error('请输入正整数'))
      }
      if (value > 100) {
        this.searchobj.workLengthMin = 100
      } else {
        callback()
      }
    }
    var ValworkLengthMax = (rule, value, callback) => {
      if (/^0+/.test(value)) {
        callback(new Error('请输入正整数'))
      }
      if (!/^[0-9]+$/.test(value) && value !== '') {
          // this.searchobj.workLengthMax = 0
        callback(new Error('请输入正整数'))
      }
      if (this.searchobj.workLengthMin) {
        if (value === '') {
          callback(new Error('请输入截止值'))
        } else {
          if (value * 1 <= this.searchobj.workLengthMin * 1) {
            callback(new Error('必须大于起始值'))
          }
        }
      }
      if (value > 100) {
        this.searchobj.workLengthMax = 100
      } else {
        callback()
      }
    }
    var ValsalaryMin = (rule, value, callback) => {
      if (this.searchobj.salaryMax) {
        if (value === '') {
          callback(new Error('请输入起始值'))
        } else {
          if (this.searchobj.salaryMin * 1 >= this.searchobj.salaryMax * 1) {
            callback(new Error('必须小于截止值'))
          }
        }
      }
      if (!/^[0-9]+$/.test(value) && value !== '') {
        callback(new Error('请输入正整数'))
      } else if (!/^\d{0,8}$/.test(value)) {
        callback(new Error('请输入小于8位的数值'))
      } else {
        callback()
      }
      if (this.searchobj.salaryMax) {
        if (this.searchobj.salaryMin * 1 > this.searchobj.salaryMax * 1) {
          callback(new Error('必须小于最大值'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var ValsalaryMax = (rule, value, callback) => {
      if (!/^[0-9]+$/.test(value) && value !== '') {
        callback(new Error('请输入正整数'))
      } else if (!/^\d{0,8}$/.test(value)) {
        callback(new Error('请输入小于8位的数值'))
      }
      if (this.searchobj.salaryMin) {
        if (value === '') {
          callback(new Error('请输入截止值'))
        } else {
          if (this.searchobj.salaryMin * 1 >= this.searchobj.salaryMax * 1) {
            callback(new Error('必须大于起始值'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
      if (this.searchobj.salaryMax) {
        if (this.searchobj.salaryMin * 1 > this.searchobj.salaryMax * 1) {
          callback(new Error('必须大于最小值'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      isShowLoading: true,
      rules: {
        ageMin: [{
          validator: checkAgeMin,
          trigger: ['blur', 'change']
        }],
        ageMax: [{
          validator: checkAgeMax,
          trigger: ['blur', 'change']
        }],
        workLengthMin: [{
          validator: ValworkLengthMin,
          trigger: ['blur', 'change']
        }],
        workLengthMax: [{
          validator: ValworkLengthMax,
          trigger: ['blur', 'change']
        }],
        salaryMin: [{
          validator: ValsalaryMin,
          trigger: ['blur', 'change']
        }],
        salaryMax: [{
          validator: ValsalaryMax,
          trigger: ['blur', 'change']
        }]
      },
      cardFlag: [],
      count_all: 0,
      sexlist: SEXLIST,
      selectedOptions: [], // 部门的选项
        // expectPlace: CONSTCITY,
      srouceResume: {},
      degrees: DEGREESFORSEARCH, // 学历
      expectPlaces: [], // 求职的地址
      defaultprops: {
        value: 'label',
        label: 'label',
        children: 'children'
      },
      currentlist: {},
      currentStates: CURRENTSTATE,
      updateDates: UPDATEDATE,
      checkedCities1: [],
      headuser: require('@/assets/headuser.jpg'),
      defaultImg: 'this.src="' + require('@/assets/headuser.jpg') + '"',
      livePlaces: CITYS,
      sources: SROUCE,
      jobsrc: [
        '10001',
        '10002',
        '10007',
        '10004',
        '10005',
        '10003'
      ],
      checkedCities: ['10001',
        '10002',
        '10007',
        '10004',
        '10005',
        '10003'
      ],
      isIndeterminate: true,
      salaryMinShow: '',
      salaryMaxShow: '',
      listindex: '', // 不同的平台下的列表列表条数
      checkAll: true,
        // count_lagou: 0,
      searchFormData: {},
      isloading: false,
      listLoading: false,
      expectJobheight_58: [],
      serch_occupy_arrive: true,
      isImgFlag: false,
        // activeNames: 'first1'
      CountList: [], // 数量
      resumeListAll: [],
      AllListNumber: 0,
      totles: 0
    }
  },
  mounted() {
    this.$route.query.platId ? this.activeName = this.$route.query.platId : ''
    this.expectPlaces = CITYS
    this.livePlaces = CITYS
    this.resuleListNumber(this.activeName, this.currentPage)
    this.resuleListAll(this.activeName, this.currentPage)
  },
  computed: {
    ...mapGetters('resumeSearch', [
      'searchobj'
    ]),
    activeName: {
      get() {
        return this.$store.state.resumeSearch.activeName
      },
      set(value) {
        this[types.HANDEL_ACTIVENAME](value)
      }
    },
    currentPage: {
      get() {
        return this.$store.state.resumeSearch.pages.currentPage
      },
      set(value) {
        this[types.CHANGE_CURRENTPAGE](value)
      }
    },
    keyword: {
      get() {
        return this.$store.state.resumeSearch.searchobj.keyword
      },
      set(value) {
        this[types.HANDEL_KEYWORD](value)
      }
    },
    ageMin: {
      get() {
        return this.$store.state.resumeSearch.searchobj.ageMin
      },
      set(value) {
        this[types.HANDEL_AGEMIN](value)
      }
    },
    ageMax: {
      get() {
        return this.$store.state.resumeSearch.searchobj.ageMax
      },
      set(value) {
        this[types.HANDEL_AGEMAX](value)
      }
    },
    sex: {
      get() {
        return this.$store.state.resumeSearch.searchobj.sex
      },
      set(value) {
        this[types.HANDEL_SEX](value)
      }
    },
    expectPlace: {
      get() {
        return this.$store.state.resumeSearch.searchobj.expectPlace
      },
      set(value) {
        this[types.HANDEL_EXPECTPLACE](value)
      }
    },
    degree: {
      get() {
        return this.$store.state.resumeSearch.searchobj.degree
      },
      set(value) {
        this[types.HANDEL_DEGREE](value)
      }
    },
    currentState: {
      get() {
        return this.$store.state.resumeSearch.searchobj.currentState
      },
      set(value) {
        this[types.HANDEL_CURRENTSTATE](value)
      }
    },
    updateDate: {
      get() {
        return this.$store.state.resumeSearch.searchobj.updateDate
      },
      set(value) {
        this[types.HANDEL_UPDATEDATE](value)
      }
    },
    resideAddress: {
      get() {
        return this.$store.state.resumeSearch.searchobj.resideAddress
      },
      set(value) {
        this[types.HANDEL_RESIDEADDRESS](value)
      }
    },
    workLengthMin: {
      get() {
        return this.$store.state.resumeSearch.searchobj.workLengthMin
      },
      set(value) {
        this[types.HANDEL_WORKLENGTHMIN](value)
      }
    },
    workLengthMax: {
      get() {
        return this.$store.state.resumeSearch.searchobj.workLengthMax
      },
      set(value) {
        this[types.HANDEL_WORKLENGTHMAX](value)
      }
    },
    salaryMin: {
      get() {
        return this.$store.state.resumeSearch.searchobj.salaryMin
      },
      set(value) {
        this[types.HANDEL_SALARYMIN](value)
      }
    },
    salaryMax: {
      get() {
        return this.$store.state.resumeSearch.searchobj.salaryMax
      },
      set(value) {
        this[types.HANDEL_SALARYMAX](value)
      }
    },
    platId: {
      get() {
        return this.$store.state.resumeSearch.searchobj.platId
      },
      set(value) {
        this[types.HANDEL_PLATID](value)
      }
    }
  },
  methods: {
    ...mapMutations('resumeSearch', [
      types.HANDEL_KEYWORD,
      types.HANDEL_AGEMIN,
      types.HANDEL_AGEMAX,
      types.HANDEL_SEX,
      types.HANDEL_EXPECTPLACE,
      types.HANDEL_DEGREE,
      types.HANDEL_CURRENTSTATE,
      types.HANDEL_RESIDEADDRESS,
      types.HANDEL_UPDATEDATE,
      types.HANDEL_WORKLENGTHMIN,
      types.HANDEL_WORKLENGTHMAX,
      types.HANDEL_SALARYMIN,
      types.HANDEL_SALARYMAX,
      types.CHANGE_CURRENTPAGE,
      types.HANDEL_ACTIVENAME,
      types.HANDEL_PLATID
    ]),
    containsEvent(index) {
      for (var i = 0; i < this.cardFlag.length; i++) {
        if (this.cardFlag[i] === index) {
          this.cardFlag.splice(i, 1)
          return true
        }
      }
      return false
    },
    taggelEvent(ind, event) {
      !this.containsEvent(ind) ? this.cardFlag.push(ind) : ''
    },
    search() { // 搜索发送请求
      this.searchFormData.keyword = this.searchobj.keyword
      this.searchFormData.page = 1
      this.ajax(this.searchFormData)
    },
    setformdata() {
      this.searchFormData.keyword = this.searchobj.keyword
    },
      // 按钮切换的时候会改变当前页并重新请求一次数据防止分页数据不正确
    handleClick(val, event) {
      this.cardFlag = []
      this.isShowLoading = true
      this.platId = val
      this[types.HANDEL_ACTIVENAME](this.platId)
      this[types.CHANGE_CURRENTPAGE](1)
      this.resuleListNumber(val, 1)
      this.resuleListAll(val, 1)
    },
    resetForm(searchobj) {
      this.$refs[searchobj].resetFields()
      this.salaryMinShow = ''
      this.salaryMaxShow = ''
      this.ageMin = ''
      this.ageMax = ''
      this.sex = '70000'
      this.expectPlace = ['不限']
      this.degree = 50001
      this.currentState = 220000
      this.updateDate = 80000
      this.resideAddress = ['不限']
      this.workLengthMin = ''
      this.workLengthMax = ''
      this.salaryMin = ''
    },
    resuleListAll(val, page) {
      var NumberObj = {
        'page': page,
        'size': 20,
        'platId': val,
        'sex': this.sex,
        'degree': this.degree,
        'currentState': this.currentState,
        'updateDate': this.updateDate,
        'workLengthMin': this.workLengthMin,
        'workLengthMax': this.workLengthMax,
        'salaryMin': this.salaryMin || 0,
        'salaryMax': this.salaryMax || 999999,
        'ageMin': this.ageMin || 0,
        'ageMax': this.ageMax || 99,
        'resideAddress': this.resideAddress.toString(),
        'expectPlace': this.expectPlace.toString(),
        'isBrandCompany': '',
        'isBrandUniversity': '',
        'keyword': this.keyword
      }

      NumberObj.sex === '70000' ? NumberObj.sex = '' : ''
      NumberObj.expectPlace === '不限' ? NumberObj.expectPlace = '' : ''
      NumberObj.degree === 50001 ? NumberObj.degree = '' : ''
      NumberObj.currentState === 220000 ? NumberObj.currentState = '' : ''
      NumberObj.updateDate === 80000 ? NumberObj.updateDate = '' : ''
      NumberObj.resideAddress === '不限' ? NumberObj.resideAddress = '' : ''

      channelData(NumberObj).then(res => {
        this.isShowLoading = false
        this.resumeListAll = res.result.list.map(item => {
          if (item['searchListHighlight'] && item['searchListHighlight']['expectJob']) {
            item.expectJob1 = item['searchListHighlight']['expectJob']
          } else {
            item.expectJob1 = item.expectJob
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
          return item
        })
      })
    },
    resuleListNumber(val, page) {
      var NumberObj = {
        'page': page,
        'size': 20,
        'platId': val,
        'sex': this.sex,
        'degree': this.degree,
        'currentState': this.currentState,
        'updateDate': this.updateDate,
        'workLengthMin': this.workLengthMin,
        'workLengthMax': this.workLengthMax,
        'salaryMin': this.salaryMin || 0,
        'salaryMax': this.salaryMax || 999999,
        'ageMin': this.ageMin || 0,
        'ageMax': this.ageMax || 99,
        'resideAddress': this.resideAddress.toString(),
        'expectPlace': this.expectPlace.toString(),
        'isBrandCompany': '',
        'isBrandUniversity': '',
        'keyword': this.keyword
      }

      NumberObj.sex === '70000' ? NumberObj.sex = '' : ''
      NumberObj.expectPlace === '不限' ? NumberObj.expectPlace = '' : ''
      NumberObj.degree === 50001 ? NumberObj.degree = '' : ''
      NumberObj.currentState === 220000 ? NumberObj.currentState = '' : ''
      NumberObj.updateDate === 80000 ? NumberObj.updateDate = '' : ''
      NumberObj.resideAddress === '不限' ? NumberObj.resideAddress = '' : ''

      channelCount(NumberObj).then(res => {
        this.CountList = res.result.list
        this.AllListNumber = res.result.total
        res.result.list.map(item => {
          if (+val === item.platId) {
            this.totles = item.count
          }
        })
      })
    },
    submitForm() {
      this.isShowLoading = true
      this.$refs.form.validate((val) => {
        if (val) {
          this.resuleListNumber(this.activeName, this.currentPage)
          this.resuleListAll(this.activeName, this.currentPage)
        }
      })
    },
      // 跳转到简历详情
    toresumedetails(event, item) {
      if (item.fromEsIndex === 'SearchIndex') {
        this.$router.push({
          path: 'searchdetail',
          query: {
            platId: item.platId,
            platSeekerId: item.platSeekerId,
            platResumeId: item.platResumeId,
            t: window.sessionStorage.getItem('Authorization'),
            loginCount: window.sessionStorage.getItem('loginCount'),
            roleId: window.sessionStorage.getItem('roleId'),
            token_type: window.sessionStorage.getItem('token_type'),
            userName: window.sessionStorage.getItem('userName'),
            usernameEmail: window.sessionStorage.getItem('token_type')
          }
        })
      } else if (item.fromEsIndex === 'TalentIndex') {
        this.$router.push({
          path: 'talentdetails',
          query: {
            platId: `10007`,
            platSeekerId: item.platSeekerId,
            platResumeId: item.platResumeId,
            t: window.sessionStorage.getItem('Authorization'),
            loginCount: window.sessionStorage.getItem('loginCount'),
            roleId: window.sessionStorage.getItem('roleId'),
            token_type: window.sessionStorage.getItem('token_type'),
            userName: window.sessionStorage.getItem('userName'),
            usernameEmail: window.sessionStorage.getItem('token_type')
          }
        })
      }
    },
    onSelected(val) {
    },
    pagechange(val, e) {
      this.cardFlag = []
      this[types.CHANGE_CURRENTPAGE](val)
      this.resuleListNumber(this.activeName, val)
      this.resuleListAll(this.activeName, val)
    }
  }
}
</script>
<style lang="scss" src="./search.scss">
</style>
