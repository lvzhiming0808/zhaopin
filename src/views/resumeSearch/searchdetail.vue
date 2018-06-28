<template>
 <div class="search-wrapper">
   <!--简历详情-->
    <div class="resumup">
      <div class="details-head">
        <Row>
          <Col span="18" style="padding-left: 25px; padding-right: 25px;">
            <div class="grid-content bg-purple">
              <div class="details-top">
                <p>{{detailinfo.userName}}</p>
              </div>
            </div>
            <div class="grid-content bg-purple">
              <div class="leftheight">
                <div class="details-cont">
                  <p class="d-name">{{'简历状态'}}&nbsp;<span class="currentState">{{detailinfo.currentState |codeformat}}</span><span>
                    <Tag type="danger"  v-if="detailinfo.isbrandSchool == 110001" >985</Tag></span>
                    <span><Tag v-if="detailinfo.isbrandSchool == 110002" >211</Tag></span>
                    <span><Tag v-if="detailinfo.isbrandCompany" >211</Tag></span>
                  </p>
                  <Row style="clear: both">
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>性别：</span><span>{{detailinfo.sex |codeformat}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>期望地点：</span><span>{{detailinfo.expectAddress}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>毕业院校：</span><span>{{detailinfo.university}}</span></p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>年龄：</span><span>{{detailinfo.age}}岁</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>学历：</span><span>{{detailinfo.degree |codeformat}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>电话：</span><span>{{detailinfo.phone}}</span></p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic" v-if="detailinfo.workLengthMin===detailinfo.workLengthMax"><span>工作经验:{{detailinfo.workLengthMax}}年</span></p>
                        <p class="basic" v-else><span>工作经验：</span><span>{{detailinfo.workLength}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple-light">
                        <p class="basic"><span>专业：</span><span>{{detailinfo.major}}</span></p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="grid-content bg-purple">
                        <p class="basic"><span>邮箱：</span><span>{{detailinfo.email}}</span></p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div class="personLiable">渠道来源：<span>{{detailinfo.platId|codeformat}}</span></div>

              </div>
            </div>
          </Col>
          <Col :span="6">
            <div class="grid-content bg-purple">
              <div class="rightbox">
                <div class="rightone">
                  <div class="righttitle">
                    <Button v-show="isTrueInfo" type="primary"  icon="document" @click="handleDownload" :loading="ispending">{{info}}</Button>
                    <Button v-show="isSaysBoss" type="primary"  icon="document" @click="handleDownload" :loading="ispending">{{infoBoss}}</Button>
                    <Button v-show="isAlreadySays" type="info" disabled  icon="document" :loading="ispending">{{infoBoss}}</Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <div style="clear:both"></div>
          <div class="downLoadResum_wrapper">
              <div class="downLoadResum">
                <Button style="margin-right:5px;" type="primary" @click="clickImg(1)" class="noisInster" v-if="isInstFlag===true"><Icon type="plus-circled"></Icon> 感兴趣</Button>
                <Button style="margin-right:5px;" @click="clickImg(0)" class="isInster" v-else><Icon type="android-star" size="16px"></Icon> 已感兴趣</Button>
                <Button type="primary" @click="downLoadResum"><i class="el-icon-download"></i>下载简历</Button>
            </div>
          </div>
           <div class="details-bottom">
              <detailresume :detailinfo='detailinfo'>
              </detailresume>
            </div>
        </Row>
      </div>
    </div>
    <Spin fix v-if="isShowLoading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
 </div>
</template>
<script>
  import { searchDetail, download } from '../../api/resumeSearchApi/resumedetails'
  import { getConcat, instertingResume } from '../../api/resumeSearchApi/resumesearch'
  import detailresume from '../resumeSearch/detailresume'
  import { SEARCHINFO } from '../../json/search'
  export default {
    data() {
      return {
        isShowLoading: true,
        platId: '',
        downloadStatus: '',
        greetStatus: '',
        ispending: false,
        detailinfo: {},
        selectedOptions: [],
        isloading: false,
        info: '获取联系方式',
        infoBoss: '打招呼',
        jobNames: [],
        deptIds: [],
        deptId: '',
        info1: '确定',
        downloadLoading: false,
        formLabelWidth: '120px',
        dialogVisible: false,
        dialogVisible1: false,
        isTrueInfo: true,
        isSaysBoss: false,
        isAlreadySays: false,
        jobinto: { name: '', region: '' },
        isInsting: 0,
        esId: '',
        fileName: '',
        seekerName: '',
        insterYse: false,
        noinsterYse: true,
        isInstFlag: true,
        pathResun: ''
      }
    },
    components: {
      detailresume
    },
    mounted() {
      if (this.$route.query.t) {
        window.sessionStorage.setItem(`Authorization`, this.$route.query.t)
        window.sessionStorage.setItem(`token_type`, this.$route.query.token_type)
        window.sessionStorage.setItem('roleId', this.$route.query.roleId)
        window.sessionStorage.setItem('loginCount', this.$route.query.loginCount)
        window.sessionStorage.setItem('userName', this.$route.query.userName)
        window.sessionStorage.setItem('usernameEmail', this.$route.query.usernameEmail)
      }
      this.handeleSearchDetail()
    },
    methods: {
      handeleSearchDetail() {
        this.isShowLoading = true
        const _this = this
        searchDetail({ platResumeId: _this.$route.query.platResumeId, platId: _this.$route.query.platId, platSeekerId: _this.$route.query.platSeekerId }).then(res => {
          this.isShowLoading = false
          this.pathResun = res.result.downloadPdfPath
          this.platId = res.result.platId
          this.isInsting = res.result.isBeInterested
          if (res.result.isBeInterested === 0) {
            this.isInstFlag = true
          } else if (res.result.isBeInterested === 1) {
            this.isInstFlag = false
          }
          this.esId = res.result.esId
          this.fileName = res.result.resumeName
          this.seekerName = res.result.resumeName
          _this.detailinfo = res.result
          _this.downloadStatus = res.result.downloadStatus
          _this.greetStatus = res.result.greetStatus
          if (+_this.downloadStatus === 0 && +this.platId === 10004) {
            _this.isTrueInfo = false
            _this.isAlreadySays = false
            _this.isSaysBoss = true
          } else if (+_this.downloadStatus === 10 && +this.platId === 10004) {
            _this.isTrueInfo = false
            _this.isSaysBoss = false
            _this.isAlreadySays = true
            _this.infoBoss = '等待回复'
          } else {
            _this.isSaysBoss = false
            _this.isAlreadySays = false
            _this.isTrueInfo = true
          }
          if (_this.detailinfo.workLengthMax < 10) {
            if (_this.detailinfo.workLengthMax === _this.detailinfo.workLengthMin) {
              if (!_this.detailinfo.workLengthMax === `0`) {
                _this.detailinfo.workLength === `未填写`
              } else {
                _this.detailinfo.workLength = _this.detailinfo.workLengthMax + `年`
              }
            } else {
              _this.detailinfo.workLength = _this.detailinfo.workLengthMin + `-` + _this.detailinfo.workLengthMax + `年`
            }
          } else {
            _this.detailinfo.workLength = '10年以上'
          }
        })
      },
      getInsterting(key) {
        instertingResume({
          esId: this.esId,
          isBeInterested: key
        }).then(res => {
          if (res.code === 200) {
          //  this.handeleSearchDetail()
            if (key === 0) {
              this.isInstFlag = true
            } else if (key === 1) {
              this.isInstFlag = false
            }
          } else {
            this.$message.error(res.message)
          }
        })
      },
      clickImg(val) { // 是否感兴趣感兴趣
        this.getInsterting(val)
      },
      downLoadResum() { // 下载简历
       // var url = config.baseURL + '/resume/resumeDownload?platResumeId=' + this.detailinfo.platResumeId + '&platId=' + this.detailinfo.platId + '&platSeekerId=' + this.detailinfo.platSeekerId
        download({
          platResumeId: this.detailinfo.platResumeId,
          platId: this.detailinfo.platId,
          platSeekerId: this.detailinfo.platSeekerId
        }).then(res => {
          if (res.indexOf('200') !== -1) {
            this.isInstFlag = false
            this.getInsterting(1)
            this.$message.success('下载成功')
          } else {
            this.$message.error(res.message)
          }
        })
        window.open(this.pathResun)
      },
      handleDownload() { // 获取联系方式 这
        if (+this.platId === 10004 || +this.platId === 10006 && +this.greetStatus === 1) {
          this.handleSays()
        } else if (+this.platId === 10004 || +this.platId === 10006 && +this.greetStatus === 2) {
          this.handleOneHundred()
        } else {
          this.handeleContactInfo()
        }
      },
      handleSays() {
        const _this = this
        _this.$confirm('确定后，会自动给求职者打招呼，当求职者回复后，自动向求职者索要简历和联系电话。\r\n\r\n是否确定打招呼？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          getConcat({
            greetType: 2,
            retry: 1,
            deptId: '',
            jobId: '',
            platform: _this.detailinfo.platId,
            extraData: _this.detailinfo.extraData,
            platSeekerId: _this.detailinfo.platSeekerId,
            platResumeId: _this.detailinfo.platResumeId,
            esId: _this.detailinfo.esId
          }).then(res => {
            if (res.code === 200) {
              _this.isSaysBoss = false
              _this.isAlreadySays = true
              _this.infoBoss = '等待回复'
            } else if (res.code === 10020) {
              _this.isSaysBoss = false
              _this.isAlreadySays = true
              _this.infoBoss = '等待回复'
              _this.$confirm('该简历已经打完招呼了！！', '提示', {
                confirmButtonText: '确定'
              }).then(() => {})
            }
          })
        })
      },
      handleOneHundred() {
        const _this = this
        _this.$confirm('您今天打招呼的次数已经超过100个，请明天再来！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {})
      },
      handeleContactInfo() {
        const _this = this
        _this.$confirm('获取联系方式将扣除下载点数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          _this.info = '获取联系方式中'
          _this.ispending = true
          getConcat({
            retry: 1,
            deptId: '',
            jobId: '',
            platform: _this.detailinfo.platId,
            extraData: _this.detailinfo.extraData,
            platSeekerId: _this.detailinfo.platSeekerId,
            platResumeId: _this.detailinfo.platResumeId,
            esId: _this.detailinfo.esId
          }).then(res => {
            switch (res.code) {
              case 200:
                _this.$message.success('简历下载成功')
                _this.$router.push({ name: '简历详情', query: { resumeId: res.result.resumeId, seekerId: res.result.seekerId }})
              // this.relevancejob = false
                break
              case 10004:
                _this.$message.error(`${SEARCHINFO[_this.detailinfo.platId]}的下载次数已使用完,本次获取将无法完成,请及时处理！`)
                _this.ispending = false
                _this.info = '获取联系方式'
                break
              case 10006:
              // 这里是后期可能会需要重试先按照职能试一次来操作
                _this.ispending = false
                _this.$message.error(res.message)
                _this.info = '获取联系方式'
                break
              case 10008:
              // 这里是后期可能会需要重试先按照职能试一次来操作
                _this.ispending = false
                _this.$message.error(res.message)
                _this.info = '获取联系方式'
                break
              default:
                _this.ispending = false
                _this.info = '获取联系方式'
                _this.$message.error(res.message)
                break
            }
          })
        })
      },
      // 返回按钮
      routertototal() {
        // history.go(-1)
        this.$router.push({ path: '/layout/resumeSearch' })
      }
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
