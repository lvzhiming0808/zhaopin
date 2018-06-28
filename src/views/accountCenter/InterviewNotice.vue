<template>
  <div class="InterviewNotice-wrapper" id="account_Mould">
    <div class="InterviewNotice-head">
      <Button :disabled="isBtnDisabled" type="primary" id="accountMould_noticeadd" ref="addmodel" @click="createNewView" class="InterviewNotice-wrapper"><i class="el-icon-circle-plus-outline"></i> 新增模板</Button>
    </div>
    <div class="InterviewNotice-main" id="accountMould_notice">
      <div class="newtemplates" v-if="isCreateNewview">
        <div class="newtemplates-text newtemplates-text1">
          <el-form ref="ruleForm" :rules="rulesform" :label-position="labelPosition" :model="formLabelAlign">
            <el-form-item prop='templateName'>
              <b style="font-size:14px;color:red;">*</b><span>名称</span>
              <el-input v-model="formLabelAlign.templateName" :maxlength='50' placeholder="请输入模板名称最大支持50字"></el-input>
            </el-form-item>
            <el-form-item prop='templateContent'>
              <b style="font-size:14px;color:red;">*</b><span>敬语</span>
              <!-- <span class="number-limit">20/140</span> -->
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="formLabelAlign.templateContent" :maxlength='500' placeholder="请输入模板内容最大支持500字"></el-input>
              <span class="interview-fontnumber">{{formLabelAlign.templateContent.length}}/500</span>
            </el-form-item>
            <el-form-item prop='interviewSite'>
              <b style="font-size:14px;color:red;">*</b><span>面试地点</span>
              <el-input v-model="formLabelAlign.interviewSite" :maxlength='50' placeholder="请输入面试地点最大支持50字"></el-input>
            </el-form-item>
            <el-form-item prop='materious'>
              <span>携带材料</span>
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="formLabelAlign.materious" :maxlength='500' placeholder="请输入携带材料信息最大支持500字"></el-input>
              <span class="interview-fontnumber">{{formLabelAlign.materious.length}}/500</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="templates" id="accountMould_noticecard" v-for="(item,index) in tmpdata" :key="'tmpdata'+index" v-show="!isCreateNewview">
        <h3>{{item.templateName}}
          <!-- <span class="isMoren" v-if="item['enable']">默认</span> -->
          <Button type="primary"  v-if="item['enable']" >默认</Button>
          <span class="operation">
              <a href="javascript:;" @click="edit(item['id'])"><Button type="primary">编辑</Button></a>
              <!-- <a href="javascript:;"><Button type="error" @click="interviewDel(item['id'])">删除</Button></a> -->
              <a href="javascript:;"><Button type="error" @click="interviewDel(item['id'])">删除</Button></a>
              <a href="javascript:;" v-if="item['enable'] - 1" @click="SetDefault((item['id']))"><Button type="info">设为默认</Button></a>
          </span>
        </h3>
        
        <div class="templates-text">
          <p class="templates-text-title">{{item.templateContent}}</p>
          <p class="templates-text-area"><span>面试地点：</span>{{item.interviewSite}}</p>
          <p class="templates-text-datas"><span>携带资料：</span>{{item.materious}}</p>
        </div>
      </div>
      <div>
        <Modal
            v-model="modal1"
            title="确定删除该模板?"
            @on-ok="handleInterDelete"
            width="300">
            <p>确定删除该模板?</p>
          </Modal>
      </div>
      <h3 v-if="iscreateNewView"> <!--模板{{ind}} -->
          <span class="newtemplates-operation">
              <a href="javascript:;" @click="save"><Button type="primary">保存</Button></a>
              <a href="javascript:;" @click="NocreateNewView"><Button type="ghost">取消</Button></a>
            </span>
        </h3>
    </div>
  </div>
</template>
<script>
  import { iterviwetmp, addIterView, deleIterView, defaultIterView, edittmp, editTmpsave } from '../../api/AccountApi/accountCenter'

  export default {
    data() {
      return {
        delId: '',
        modal1: false,
        isBtnDisabled: false,
        modelId: '',  //  保存模板id
        iscreateNewView: false, //  控制按钮的的显示
        labelPosition: 'left',  // 表单域、标签位置
        formLabelAlign: { //  表单数据
          'interviewSite': '',
          'templateContent': '',
          'templateName': '',
          'materious': ''
        },
        isCreateNewview: false, //  控制编辑页面的显示
        tmpdata: [],  //  面试模板lis
        rulesform: {
          templateName: [
          { required: true, message: '请输入', trigger: 'blur' }
          ],
          templateContent: [
          { required: true, message: '请输入', trigger: 'blur' }
          ],
          interviewSite: [
          { required: true, message: '请输入', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      iterviwetmp().then(res => { //  获取面试模板lis
        this.tmpdata = res.result
      })
    },
    methods: {
      handleInterDelete() {
        deleIterView({ id: this.delId }).then(res => {
          iterviwetmp().then(res => {
            if (res.code === 200) {
              this.tmpdata = res.result
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          })
        })
      },
      interviewDel(id) {  //  删除
        // this.interviewID = id
        this.delId = id
        this.modal1 = true
      },
      createNewView() { //  新增模板
        this.modelId = ''
        this.isBtnDisabled = true
        this.isCreateNewview = true
        this.iscreateNewView = true
        this.formLabelAlign.templateName = ''
        this.formLabelAlign.templateContent = ''
        this.formLabelAlign.materious = ''
        this.formLabelAlign.interviewSite = ''
      },
      NocreateNewView() { //  取消
        this.isBtnDisabled = false
        this.isCreateNewview = false
        this.iscreateNewView = false
      },
      save() {  //  保存
        var issave = true
        this.$refs.ruleForm.validate(val => {
        })
        for (var k in this.formLabelAlign) {
          if (this.formLabelAlign[k] === '' && k !== 'materious') {
            this.$message.error('请填写完整')
            issave = false
            return false
          }
        }
        this.tmpdata.forEach(res => {
          if (this.modelId !== res.id) {
            if (res.templateName === this.formLabelAlign.templateName) {
              this.$message.error('重复模板名')
              issave = false
              return false
            }
          }
        })
        if (issave) {
          this.isBtnDisabled = true
          if (!this.formLabelAlign.id) {
            addIterView(this.formLabelAlign).then(res => {
              if (res.code === 200) {
                iterviwetmp().then(res => {
                  this.tmpdata = res.result
                })
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.NocreateNewView()
              }
            })
          } else {
            editTmpsave({
              id: this.formLabelAlign.id,
              templateName: this.formLabelAlign.templateName,
              templateContent: this.formLabelAlign.templateContent,
              materious: this.formLabelAlign.materious,
              interviewSite: this.formLabelAlign.interviewSite
            }).then(res => {
              if (res.code === 200) {
                this.formLabelAlign = { 'interviewSite': '',
                  'templateContent': '',
                  'templateName': '',
                  'materious': '' }
                this.isCreateNewview = false
                iterviwetmp().then(res => {
                  this.tmpdata = res.result
                })
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.NocreateNewView()
              }
            })
          }
        }
      }, // 保存面试通知模板
      edit(e) {  // 编辑简历模板
        this.modelId = e
        this.isCreateNewview = true
        this.iscreateNewView = true
        edittmp({ id: e }).then(res => {
          this.formLabelAlign = res.result
        })
      },
      SetDefault(e) {  // 设置为默认模板
        defaultIterView({ id: e }).then(res => {
          iterviwetmp().then(res => {
            this.tmpdata = res.result
          })
        })
      }
    }
  }

</script>
<style lang="scss" src="./InterviewNotice.scss"></style>
