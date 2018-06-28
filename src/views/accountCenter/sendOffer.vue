<template>
  <div class="InterviewNotice-wrapper" id="accountMould_offer">
      <div class="InterviewNotice-head">
          <Button :disabled="isBtnDisabled" type="primary" id="accountMould_offeradd" ref="addmodel" @click="createNewView"><i class="el-icon-circle-plus-outline"></i> 新增模板</Button>
      </div>
      <div class="InterviewNotice-main">
        <div class="newtemplates" v-if="isCreateNewview">
          <!-- 原按钮的的位置 -->
          <div class="newtemplates-text">
              <el-form ref="ruleForm" :rules="rulesform" :label-position="labelPosition" :model="formLabelAlign">
                <el-form-item  prop='templateName'>
                  <b style="font-size:14px;color:red;">*</b><span>名称</span>
                  <el-input v-model="formLabelAlign.templateName" :maxlength='50' placeholder="请输入模板名称最大支持50字"></el-input>
                </el-form-item>
                <el-form-item  prop='welfare'>
                  <b style="font-size:14px;color:red;">*</b><span>其他福利</span>
                  <!-- <span class="number-limit">20/140</span> -->
                   <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" :maxlength='100' v-model="formLabelAlign.welfare" placeholder="请输入模板内容最大支持100字"></el-input>
                   <!-- <span class="interview-fontnumber">{{formLabelAlign.welfare.length}}/500</span> -->
                </el-form-item>
                <el-form-item  prop='workSite'>
                  <b style="font-size:14px;color:red;">*</b><span>工作地点</span>
                  <el-input v-model="formLabelAlign.workSite" :maxlength='50' placeholder="请输入工作地点最大支持50字"></el-input>
                </el-form-item>
                <el-form-item  prop='busline'>
                  <span>乘车路线</span>
                  <el-input v-model="formLabelAlign.busline" :maxlength='50' placeholder="请输入乘车路线最大支持50字"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>携带材料</span>
                   <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" :maxlength='500' v-model="formLabelAlign.entryMaterials" placeholder="请输入携带材料信息最大支持500字"></el-input>
                   <span class="interview-fontnumber">{{formLabelAlign.entryMaterials.length}}/500</span>
                </el-form-item>
             </el-form>
          </div>
          <h3>
            <span class="newtemplates-operation">
              <a href="javascript:;" @click="save"><Button type="primary">保存</Button></a>
              <a href="javascript:;" @click="NocreateNewView"><Button type="ghost">取消</Button></a>
            </span>
          </h3>
        </div>
        <div class="templates" v-for="(item,index) in tmpData" :key="'tmpData'+index" v-show="!isCreateNewview" id="accountMould_offercard">
          <h3>{{item.templateName}}
            <Button type="primary" v-if="item.enable">默认</Button>
            <span class="operation">
              <a href="javascript:;" @click="editoffer(item['id'])"><Button>编辑</Button></a>
              <a href="javascript:;"><Button type="error" @click="clickdel(item.id)">删除</Button></a>
              <a href="javascript:;" v-if="item.enable-1" @click="SetDefault((item['id']))"><Button type="info">设为默认</Button></a>
            </span>
           
          </h3>
          <div class="templates-text"> 
            <p class="templates-text-title">
              工作地点：{{item.workSite}}
            </p>
            <div class="templates-ziliao">
              <p class="templates-text-title">
              携带材料：{{item.entryMaterials}}
            </p>
            </div>
          </div>
        </div>
        <div>
          <Modal
              v-model="modal2"
              title="确定删除该模板?"
              @on-ok="handleInterDelete"
              width="300">
              <p>确定删除该模板?</p>
            </Modal>
        </div>
      </div>
  </div>
</template>
<script>
import { OfferList, SetDefaultoffer, editOffer, deleOffer, editSaveOffer, addOffer } from '../../api/AccountApi/accountCenter'
export default {
  data() {
    return {
      delId: '',
      modal2: false,
      isBtnDisabled: false,
      modelId: '',
      ind: '三',
      labelPosition: 'left',
      formLabelAlign: {
        'entryMaterials': '',
        'welfare': '',
        'templateName': '',
        'workSite': '',
        'busline': ''
      },
      tmpData: [],
      isCreateNewview: false,
      rulesform: {
        templateName: [
        { required: true, message: '请输入', trigger: 'blur' }
        ],
        welfare: [
        { required: true, message: '请输入', trigger: 'blur' }
        ],
        workSite: [
        { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    OfferList().then(res => { //  获取offer模板lis
      this.tmpData = res.result
    })
  },
  methods: {
    handleInterDelete() {
      deleOffer({ id: this.delId }).then(res => {
        if (res.code === 200) {
          OfferList().then(res => {
            this.tmpData = res.result
          })
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    clickdel(id) { //  删除
      this.delId = id
      this.modal2 = true
    },
    editoffer(e) {   // 编辑
      this.modelId = e
      this.isCreateNewview = true
      editOffer({ id: e }).then(res => {
        this.formLabelAlign = res.result
      })
    },
    save() {  //  保存
      var issave = true
      this.$refs.ruleForm.validate(val => {
        if (val) {
          this.tmpData.forEach(res => {
            if (res.id !== this.modelId) {
              if (res.templateName === this.formLabelAlign.templateName) {
                this.$message.error('重复模板名')
                issave = false
                return false
              }
            }
          })
          if (issave) {
            this.isBtnDisabled = false
            if (!this.formLabelAlign.id) {
              addOffer(this.formLabelAlign).then(res => {
                this.formLabelAlign = {
                  'entryMaterials': '',
                  'welfare': '',
                  'templateName': '',
                  'workSite': '',
                  'busline': ''
                }
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.isCreateNewview = false
                OfferList().then(res => {
                  this.tmpData = res.result
                })
              })
            } else {
              editSaveOffer(
                {
                  id: this.formLabelAlign.id,
                  entryMaterials: this.formLabelAlign.entryMaterials,
                  welfare: this.formLabelAlign.welfare,
                  templateName: this.formLabelAlign.templateName,
                  workSite: this.formLabelAlign.workSite,
                  busline: this.formLabelAlign.busline
                }
          ).then(res => {
            this.formLabelAlign = {
              'entryMaterials': '',
              'welfare': '',
              'templateName': '',
              'workSite': '',
              'busline': ''
            }
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.isCreateNewview = false
            OfferList().then(res => {
              this.tmpData = res.result
            })
          })
            }
          }
        } else {
          this.$message.error('请填写完整')
          return false
        }
      })
    },
    SetDefault(e) {  // 设置为默认
      SetDefaultoffer({ id: e }).then(res => {
        OfferList().then(res => {
          this.tmpData = res.result
        })
      })
    },
    createNewView() { //  新增模板
      this.modelId = ''
      this.isBtnDisabled = true
      this.isCreateNewview = true
    },
    NocreateNewView() { //  取消
      this.isBtnDisabled = false
      this.isCreateNewview = false
      this.formLabelAlign = {
        'entryMaterials': '',
        'welfare': '',
        'templateName': '',
        'workSite': '',
        'busline': ''
      }
    }
  }
}
</script>
<style lang="scss" src="./InterviewNotice.scss"></style>

