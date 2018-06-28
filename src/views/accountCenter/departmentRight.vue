<template>
  <div class="grid-content bg-purple">
    <div class="departmentchildren">
      <h4>{{Title}}</h4>
      <div class="dchildrenCont">
         <Row>
            <Col span="18">
              <div class="grid-content bg-purple rank">
              <span style="position: absolute;">主管：</span>
              <span style="float: left; margin-left: 100px; margin-bottom: 20px">
                 <Tag color="blue" v-for="tag in dynamicTags" :key="tag.name" :closable="closable1" @on-close="handleCloseORG(tag)"> {{tag.name}}</Tag>
                 <Modal
                  v-model="dialogVisibleDel"
                  title="删除用户"
                  @on-ok="delSure"
                  width="300">
                 <p>是否确认删除？</p>
              </Modal>
              </span>
            </div>
            </Col>
            <Col span="4">
             <div class="grid-content bg-purple addrankbox">
               <Button type="primary" class="addrank" @click="AdddialogVisibleHRorHrbp(2)" v-show="isCanAddHrbp!==0">添加主管</Button>
              </div>
            </Col>
            <Modal
                v-model="dialogVisibleOrg"
                title="新增部门">
                <span style="margin-bottom:20px;display:block">部门名称：</span>
                 <Input v-model="departName" placeholder="1~20个字"></Input>
                <p style="height:30px;margin-top:10px;">
                  <span style="color:red" v-if="isShowDepart">*请输入1~20个字</span>
                </p>
                <div slot="footer">
                    <Button type="text" size="large" @click="dialogVisibleOrg=false">取消</Button>
                    <Button type="primary" size="large" @click="AddOrgSure">确定</Button>
                </div>
            </Modal>
        </Row>
      </div>
      <div class="dchildrenCont">
        <Row>
          <Col span="18">
            <div class="grid-content bg-purple rank">
                <span style="position: absolute;">HR：</span>
                <span style="float: left; margin-left: 100px; margin-bottom: 20px">
                  <Tag color="blue" v-for="tag2 in dynamicTags2" :key="tag2.name" :closable="closable3" @on-close="handleCloseHR(tag2)"> {{tag2.name}}</Tag>
                </span>
              </div>
          </Col>
          <Col span="4">
              <div class="grid-content bg-purple addrankbox">
                <Button type="primary" class="addrank" @click="AdddialogVisibleHRorHrbp(3)" v-show="this.isCanAddHr!==0">添加HR</Button>
              </div>
          </Col>
        </Row>
          <Modal
              v-model="dialogVisibleHRorHrbp"
              title="添加主管/HR"
              @on-ok="AddHrOrHrbp()">
              <p class="dialogbox">选择主管/用户</p>
            <orgOrHr @sendman="sendman"></orgOrHr>
          </Modal>
      </div>
      <div class="dchildrenCont">
        <Row>
          <Col span="18">
            <div class="grid-content bg-purple rank">
              <span style="position: absolute;">下属部门：</span>
              <span style="float: left; margin-left: 100px; margin-bottom: 20px">
                 <Tag color="blue" v-for="tag3 in dynamicTags3" :key="tag3.name" :closable="closable2" @on-close="handleCloseSUB(tag3)"> {{tag3.name}}</Tag>
              </span>
            </div>
          </Col>
          <Col span="4"><div class="grid-content bg-purple addrankbox">
            <Button type="primary" class="addrank" @click="AdddialogVisibleOrg" v-show="this.isCanAddOrg!==0">添加下属部门</Button>
          </div></Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
// import bus from './eventBus'
 import { addOrganization, addLoginUser, delOrganization, delLoginUser } from '../../api/AccountApi/accountCenter'
 import orgOrHr from './orgOrHr.vue'
 import * as types from '../../store/modules/accentCenter/actionTypes'
 import { mapActions } from 'vuex'
 export default {
   props: ['detaliList'],
   data() {
     return {
       dialogVisible: false,
       dialogVisibleHRorHrbp: false,
       dialogVisibleOrg: false,
       dialogVisibleDel: false,
       dynamicTags: [],
       dynamicTags2: [],
       dynamicTags3: [],
       inputVisible: false,
       inputValue: '',
       baseUsersname: '', // 下属部门
       baseUsers: [],
       AllPerson: {},
       isCanAddHrbp: 0,
       isCanAddHr: 0,
       isCanAddOrg: 0,
       closable3: true,
       closable1: true,
       closable2: true,
       departName: '',
       organizationName: '',
       organizationId: 0,
       isShowDepart: false,
       roleId: 0,
       orgOrhrList: [],
       hrOrOrgId: '',
       Title: '',
       hrId: 0
     }
   },
   components: {
     orgOrHr
   },
   created() {

   },
   mounted() {
   },
   methods: {
     ...mapActions('accentCenter', [
       types.HANDEL_ORGLEFTLIST,
       types.HANDEL_ORGDEATIL
     ]),
     getName() {
       if (this.detaliList.code === 200) {
         this.AllPerson = this.detaliList.result
         if (this.AllPerson.hrbps.length > 0) {
           this.AllPerson.hrbps.map(item => {
             this.dynamicTags.push({ name: item.loginUserName, ids: item.id })
           })
         }
         if (this.AllPerson.hrs.length > 0) {
           this.AllPerson.hrs.map(item => {
             this.dynamicTags2.push({ name: item.loginUserName, ids: item.id })
           })
         }
         if (this.AllPerson.organizations.length > 0) {
           this.AllPerson.organizations.map(item => {
             this.dynamicTags3.push({ name: item.organizationName, ids: item.id })
           })
         }
       }
     },
     sendman(a) {
       this.hrOrOrgId = a.id
     },
     handleCloseORG(tag) { // 删除主管
       this.hrId = tag.ids
       this.dialogVisibleDel = true
     },
     delSure() {
       this.dialogVisibleDel = false
       delLoginUser({
         loginUserId: this.hrId
       }).then(res => {
         if (res.code === 200) {
           this.$message.success('删除成功')
           this[types.HANDEL_ORGDEATIL](this.organizationId)
           this[types.HANDEL_ORGLEFTLIST]()
         } else {
           this.$message.error(res.message)
         }
       })
     },
     handleCloseHR(tag2) { // 删除HR
       this.hrId = tag2.ids
       this.dialogVisibleDel = true
     },
     handleCloseSUB(tag3) { // 删除部门
       var id = tag3.ids
       delOrganization({
         organizationId: id
       }).then(res => {
         if (res.code === 200) {
           this.$message.success('删除成功')
           this[types.HANDEL_ORGDEATIL](this.organizationId)
           this[types.HANDEL_ORGLEFTLIST]()
         } else {
           this.$message.error(res.message)
         }
       })
     },
     AdddialogVisibleOrg() { // 添加下属部门
       this.dialogVisibleOrg = true
       this.isShowDepart = false
       this.departName = ''
     },
     AdddialogVisibleHRorHrbp(val) { // 添加HR主管
       this.roleId = val
       this.dialogVisibleHRorHrbp = true
     },
     AddHrOrHrbp() { // 添加主管/HR
       this.dialogVisibleHRorHrbp = false
       var obj = {
         organizationId: this.organizationId,
         organizationName: this.organizationName,
         roleId: this.roleId,
         sourceUserId: this.hrOrOrgId
       }
       addLoginUser(obj).then(res => {
         if (res.code === 200) {
           this.$message({
             message: '添加成功',
             type: 'success'
           })
           this[types.HANDEL_ORGDEATIL](this.organizationId)
           this[types.HANDEL_ORGLEFTLIST]()
         } else {
           this.$message.error(res.message)
         }
       })
     },
     AddOrgSure() { // 添加下属部门
       if (this.departName.length < 1 || this.departName.length > 20) {
         this.isShowDepart = true
         return false
       } else {
         this.isShowDepart = false
         addOrganization({
           organizationName: this.departName,
           parentOrganizationId: this.organizationId
         }).then(res => {
           if (res.code === 200) {
             this[types.HANDEL_ORGDEATIL](this.organizationId)
             this[types.HANDEL_ORGLEFTLIST]()
             this.dialogVisibleOrg = false
             this.$message({
               message: '添加成功',
               type: 'success'
             })
           } else {
             this.$message.error(res.message)
           }
         })
       }
     }
   },
   watch: {
     detaliList: function() {
       this.dynamicTags = []
       this.dynamicTags2 = []
       this.dynamicTags3 = []
       this.getName()
       this.isCanAddHrbp = this.detaliList.result.isCanAddHrbp
       this.isCanAddOrg = this.detaliList.result.isCanAddOrg
       this.isCanAddHr = this.detaliList.result.isCanAddHr
       this.organizationName = this.detaliList.result.organizationName
       this.organizationId = this.detaliList.result.id
       this.Title = this.detaliList.result.organizationName
       if (this.detaliList.result.isCanDelHr === 0) {
         this.closable3 = false
       } else {
         this.closable3 = true
       }
       if (this.detaliList.result.isCanDelHrbp === 0) {
         this.closable1 = false
       } else {
         this.closable1 = true
       }
       if (this.detaliList.result.isCanDelOrg === 0) {
         this.closable2 = false
       } else {
         this.closable2 = true
       }
     }
   }
 }
</script>
<style lang='scss'>
.departmentchildren{
    padding: 20px;
  h4{
    font-family: 微软雅黑;
    font-size: 16px;
    font-weight: normal;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .dchildrenCont{
    border-bottom: 1px solid #ccc;
    min-height: 92px;
    .rank{
      padding: 30px 0;
      line-height: 30px;
      height: 30px;
    }
    .addrankbox{
      text-align: right;
    }
    .addrank{
      margin: 25px 0;
    }
  }
}
</style>

