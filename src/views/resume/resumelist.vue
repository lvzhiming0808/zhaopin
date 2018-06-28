<template>
 <div class='rightbox'>
      <div class='right-cont r-mt' v-for='(item,index) in resumelistText' :key='index' id="resume_List">
        <el-row :gutter='20'>
          <el-col :span='1' style='padding-left: 20px'>
            <div class='grid-content bg-purple check'>
              <el-checkbox :indeterminate='isIndeterminate' v-model='item.selected' @change='changeSelect(index)'
                      :value='index'></el-checkbox>
            </div>
          </el-col>
          <div class='listneir' @click='toresumedetails($event,item.resumeId,item.seekerId,item.num,item.inWay,item.platId, item.resumeName)'>
            <el-col :span='2'>
              <div class='grid-content bg-purple' >
                <div class="ineup" v-if="item.num">
                  <p class="inup1">{{item.num}}</p>
                  <p>排队中</p>
                </div>
                <img
                  class='right-head'
                  :src='item.photoPath||headuser'/>
              </div>
            </el-col>
            <el-col :span='20'>
              <div class='grid-content bg-purple'>
                <div class='right-list-top'>
                  <el-row class='mt'>
                             <span class="users">
                                <span class='username' style="text-align: left;">{{item.jobSeekerName}}</span>
                           <span class='svg-container sex'>
                          <icon-svg :icon-class='item.sexIcon'/>
                        </span>
                        <span class='age'>{{item.age}}岁</span>
                             </span>
                      <!-- </div> -->
                        <span class='job' :title ='item.jobTitle'>{{item.jobTitle}}</span>
                        <span class='workLength' v-if="item.workLengthMin&&item.workLengthMin!==item.workLengthMin">工作经验{{item.workLengthMin}}-{{item.workLengthMax}}年</span>
                        <span class='workLength' v-if="!item.workLengthMin">工作经验:未填写</span>
                        <span class='workLength' v-if="item.workLengthMin ===item.workLengthMin &&item.workLengthMin !== null">工作经验{{item.workLengthMin}}年</span>
                        <span class='school'>{{item.degree | codeformat}}</span>
                  </el-row>
                  <div class='xiangxi'>
                    <span class='deptName' :title="item.deptName">应聘部门：{{item.deptName}}</span>
                    <span>应聘日期：{{item.askTime|timeFormat}}</span>
                    <span>期望薪资：{{item.expectSalaryMin}}-{{item.expectSalaryMax}}</span>
                    <span class="expectPlace" :title="item.expectPlace">期望地点：{{item.expectPlace}}</span>
                  </div>
                  <div class='ersonppeop'>
                    <p>负责人：{{item.handleUserName}}</p>
                    <p class='rumsource'>简历来源：{{item.resumeFrom | codeformat}}</p>
                  </div>
                  <div class='label'>
                    <el-tag type='danger' size='mini' v-if="item.brandUniversity" >{{item.brandUniversity}}</el-tag>
                    <el-tag type='success' size='mini' v-if="item.brandUniversity =='985'">{{211}}</el-tag>
                    <el-tag size='mini' v-if="item.brandCompany==200001">名企</el-tag>
                  </div>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
      <div class='right-cont' style='border: none'>
        <div class='rightfanye'>
          <div class='block approval-pagination'>
            <el-pagination
              :page-size='20'
              background
              layout='total, prev, pager, next'
              @current-change='pageChange'
              :total='pageOption.total'>
            </el-pagination>
          </div>
        </div>
      </div>
 </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
</style>
