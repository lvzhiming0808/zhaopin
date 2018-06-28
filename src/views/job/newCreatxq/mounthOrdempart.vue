<template>
  <div>
    <Form ref="ruleForm"  :rules="rulesform" :model="jonMessages"  :label-width="80">
      <div class="newcreate-jobInformation Closing-date">
        <FormItem label="所属部门" prop="jobDeptId">
          <Select v-model="jonMessages.jobDeptId" placeholder="请选择" @on-change="getDept" style="width:200px;">
            <Option :label="item.deptName" :value="item.deptId" v-for="item in SubordinateDepartment" :key="item.deptId" :data-id="item.deptName"></Option>
          </Select>
        </FormItem>
      </div>
      <div class="newcreate-jobInformation Closing-date">
        <FormItem label="发放月数" prop="payMonth">
          <Input type="text" v-model="jonMessages.payMonth" placeholder="12" style="width:200px;"></Input>
          <span>个月</span>
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
  import * as types from '@/store/modules/Jobmanagement/actionTypes'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    props: ['workList'],
    data() {
      var checkMounth = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('发放月数不能为空'))
        } else {
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (!(+value >= 12 && +value <= 36)) {
              callback(new Error('请输入12-36之间的数字'))
            } else {
              callback()
            }
          }
        }
      }
      return {
        tablelist1: '',  // 存的元数据
        jonMessages: {
          payMonth: '',
          jobDeptName: '',
          jobDeptId: ''
        },
        arr: [],
        rulesform: {
          payMonth: [
          { required: true, validator: checkMounth, trigger: 'change' }
          ],
          jobDeptId: [{ required: true, message: '请选择所属部门', trigger: 'change' }]
        }
      }
    },
    computed: {
      ...mapGetters('Jobmanagement', [
        'SubordinateDepartment'
      ])
    },
    methods: {
      ...mapActions('Jobmanagement', [
        types.HANDEL_DEPARTMENT
      ]),
      getDept(val) {
        this.arr = this.SubordinateDepartment.filter(item => item.deptId === val)
        this.jonMessages.jobDeptName = this.arr[0].deptName
        this.$store.commit('set_openmounth', this.jonMessages)
      },
      settablelist() {
        this.jonMessages.jobDeptId = this.tablelist1.jobDeptId
        this.jonMessages.payMonth = this.tablelist1.payMonth
        this.jonMessages.jobDeptName = this.tablelist1.jobDeptName
        if (this.$route.query.isEdit) {
          this.jonMessages.payMonth = this.tablelist1.payMonth
          this.jonMessages.jobDeptName = this.tablelist1.jobDeptName
        }
      }
    },
    mounted() {
      this[types.HANDEL_DEPARTMENT]()
      this.$store.commit('set_RefdeptId', this.$refs.ruleForm)  //  获取dom
    },
    watch: {  //  监测接收数据
      workList(val) {
      //  把原数据给data的tablelist
        this.tablelist1 = val
        this.settablelist()
      },
      jonMessages: {
        deep: true,
        handler: function(val, oldVal) {
          this.$store.commit('set_openmounth', val)
        }
      }
    }
  }
</script>
<style lang="scss">
.openMounth_wrapper{
  *:before{
    content: '' !important;
    display: none;
  }
  .selfDepartment{
    input{
        width: 600px;
      }
  }
  .jobInformation-depar{
    display: flex;
    label{
      font-size: 16px;
    }
    b{
      font-size: 14px;
      color: rgb(245, 108, 108);
      font-weight: normal;
      display: block;
      height: 40px;
      line-height: 40px;
      margin-right: 6px;
    }
  }
  .selfDepartment{
    display: flex;
  }
  .openMounth{
    margin-top: 30px;
    margin-bottom: 30px;
      .names{
        display: flex;
        width: 80px;
        font-size: 16px;
        margin-left: 6px;
      }
  } 
}
</style>
