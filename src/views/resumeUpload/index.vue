<template>
<Form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" id="resumeAdd_form">
    <div class="resumup">
      <Steps :current="active" style="margin-bottom:10px;margin-left: 20%;margin-top: 10px;">
        <Step title="简历上传"></Step>
        <Step title="信息确认"></Step>
      </Steps>
      <div class="resum-head">
        <Tabs v-model="activeName">
          <div class="update" v-show="isShow2">
            <div class="uptop">
              <div class="morenselect" id="resumeAdd_source">
                <span>渠道来源</span>
                <Select v-model="value1" placeholder="请选择" style="width:200px">
                  <Option
                    v-for="item in resumesrcs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </Option>
                </Select>
              </div>
              <div class="morenselect mt25 bumen" id="resumeAdd_position">
                <span>应聘职位</span>
                <Select placeholder="请选择"  style="width:200px" v-model="name" @change="jobchange">
                  <Option
                    v-for="item in jobNames"
                    :key="item.id"
                    :label="item.jobName"
                    :value="item.id">
                    <span style="float: left">{{ item.jobName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.publishUserName }}</span>
                  </Option>
                </Select>
              </div>
            </div>
            <div class="upcont">
              <Row id="resumeAdd_upload">
                <Col span="24">
                  <div class="grid-content bg-purple upleft">
                    <Upload
                      ref="upload"
                      multiple
                      class="upload-demo"
                      :action="uploadUrl"
                      :headers="head"
                      :before-upload="beforeAvatarUpload"
                      :on-success="test"
                      :on-change="handleChange"
                      :file-list="fileList"
                      >
                    <Button type="primary">点击上传</Button>
                      <div slot="tip" >最多上传1份</div>
                      <div slot="tip">支持doc/docx/txt/pdf/html/mht格式，最大10M</div>
                    </Upload>
                  </div>
                </Col>
              </Row>
            </div>
            <div class="upbottom">
              <Button  type="info" plain disabled  v-show="infoshow"> 信息确认</Button>
              <Button type="primary"  @click="next"  v-show="!infoshow"> 信息确认</Button>
              <Button type="warning"  @click="centerDialogVisible = true">取消</Button>
              <Modal
                title="提示"
                v-model="centerDialogVisible"
                width="20%"
                center>
                确定取消上传？
                <span slot="footer" class="dialog-footer">
                  <Button type="primary" @click ='gopending'>确 定</Button>
                  <Button @click="centerDialogVisible = false">取 消</Button>
                </span>
              </Modal>
            </div>
          </div>
          <div class="manualbox" v-show="isShow">
            <positioninfo :analysisinfo = "analysisinfo" :platId ='value1' :isShow ='isShow' :analisysPath ='analisysPath'  :seekerId= 'seekerId' :resumeId= 'resumeId' :resumePath='resumePath' :pdfPath='pdfPath' :deptIdss='deptId' :name='name' ></positioninfo>
          </div>
        </Tabs>
      </div>
    </div>
    </Form>
</template>
<script>
  import positioninfo from '../manuallist/positioninfo.vue'
  import { listWithPublishName } from '../../api/resumeSearchApi/notice'
  export default {
    components: {
      positioninfo
    },
    mounted() {
      listWithPublishName().then(res => {
        this.jobNames = res.result
      })
    }, // 获取部门数据
    watch: {
      name: function(newQuestion, oldQuestion) {
        if (this.value1 !== '' && this.name !== '' && this.size !== '') {
          this.infoshow = false
        }
      }
    },
    methods: {
      jobchange() {
        if (this.value1 !== '' && this.name !== '' && this.size !== '') {
          this.infoshow = false
        }
      },
      test(options) {
        // if (options.result.pdfPath) {
        this.pdfPath = options.result.pdfPath
        if (this.pdfPath.indexOf('?') !== -1) {
          var str = this.pdfPath.substr(this.pdfPath.indexOf('?') + 1)
          var arr = str.split('=')
          if (arr[1] === '') {
            this.pdfPath = false
          }
        }
        // } else {
        //   this.pdfPath = '../../../static/pdf.html'
        // }
        this.analisysPath = options.result.analisysPath
        this.resumePath = options.result.resumePath
        this.seekerId = options.result.seekerId
        this.resumeId = options.result.resumeId
        if (this.value1 !== '' && this.name !== '' && this.size !== '') {
          this.infoshow = false
        }
      },
      gopending() {
        this.$router.push({ path: '/layout/resume', query: { name: this.$route.query.name, time: +new Date() }})
      },
      // 上传前对文件的格式、大小的判断
      beforeAvatarUpload(file, fileList) {
        const extension = file.name.substring(file.name.lastIndexOf('.') + 1) === 'doc'
        const extension2 = file.name.substring(file.name.lastIndexOf('.') + 1) === 'txt'
        const extension3 = file.name.substring(file.name.lastIndexOf('.') + 1) === 'html'
        const extension4 = file.name.substring(file.name.lastIndexOf('.') + 1) === 'pdf'
        const extension5 = file.name.substring(file.name.lastIndexOf('.') + 1) === 'docx'
        const extension6 = file.name.substring(file.name.lastIndexOf('.') + 1) === 'mht'
        const extension7 = this.$refs.upload.fileList.length >= 1
        this.size = file.size
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
          this.$message({
            message: '上传模板只能是 doc、docx、txt、html、pdf 、mht 格式!',
            type: 'warning'
          })
          // return false
          this.fileList = []
          return extension && extension2 && extension3 && extension4 && extension5 && extension6 && isLt2M
        }
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 10MB!',
            type: 'warning'
          })
          this.size = ''
          this.fileList = []
          return extension && extension2 && extension3 && extension4 && extension5 && extension6 && isLt2M
        }
        if (extension7) {
          this.$message({
            message: '只能上传一份简历！',
            type: 'warning'
          })
          return extension && extension2 && extension3 && extension4 && extension5 && extension6 && extension7 && isLt2M
        }
      },
      handleChange(files, fileList) {
        this.fileList = fileList.slice(-1)
      },
      gorouter() {
        this.$router.push({ path: '/layout/resumeUpload', query: { name: this.$route.query.name, time: +new Date() }})
      },
      next() {
        if (this.value1 !== '' && this.name !== '' && this.size !== '') {
          this.infoshow = false
          if (this.active++ > 2) this.active = 0
          this.isShow2 = false
          this.isShow = true
          this.isShow3 = false
        } else {
          this.$message({
            type: `error`,
            message: '请将信息输入完整'
          })
        }
      }
    },
    save() {
      this.$set('oldVal', this.newVal)
    },
    cancel() {
      this.$set('newVal', this.oldVal)
    },
    data() {
      return {
        infoshow: true,
        fileupbtn: true,
        searchdata: {},
        pdfPath: '',
        fileList: [],
        uploadList: [],
        ruleForm: {
          value1: '',
          selectedOptions: '',
          name: ''
        },
        analysisinfo: {},
        rules: {
        },
        head: {
          'Authorization': window.sessionStorage.Authorization,
          'token-type': window.sessionStorage.token_type },
        size: '',
        name: '',
        jobNames: [],
        Id: '',
        resumePath: '',
        resumeId: '',
        seekerId: '',
        centerDialogVisible: false,
        uploadUrl: process.env.baseURL + '/resume/file/upload',
        isShow: false,
        isShow2: true,
        active: 1,
        activeName: 'first',
        map: {
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
        },
        deptId: '',
        analisysPath: '', // 简历解析用的路径
        resumesrcs: [{
          value: '10001',
          label: '智联招聘'
        }, {
          value: '10002',
          label: '58同城'
        }, {
          value: '10003',
          label: '猎聘网'
        }, {
          value: '10004',
          label: 'boss直聘'
        }, {
          value: '10005',
          label: '前程无忧'
        }, {
          value: '10006',
          label: '拉勾网'
        }, {
          value: '10007',
          label: '企业人才库'
        }, {
          value: '10008',
          label: '内推'
        }, {
          value: '10009',
          label: '自荐'
        }, {
          value: '10010',
          label: '自我挖掘'
        }, {
          value: '10011',
          label: '猎头推荐'
        }],  // 选择简历来源用的数据
        value1: '', // 来源
        value2: '', // 人才分类
        value3: '', // 应聘职位
        selectedOptions: [], // 选择部门时用的数组
        deptIds: [
        ], // 组织机构假数据
        workPlaces: [
        ] // 工作地点
      }
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
