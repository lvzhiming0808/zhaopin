<template>
<div>
  <Form ref="ruleForm" :rules="rulesform" :model="jonMessages">
    <div class="newcreate-jobInformation job-escription">
        <h3><b style="font-size:14px;color:#F56C6C;font-weight:normal;">* </b>职位描述</h3>
        <div class="job-escription-main">
            <div class="Position-responsibility">
                <FormItem prop='jobDesc' 
                  style="outline: none;border:1px solid #fff"> 
                  <Input 
                  type="textarea" 
                  style="outline: none;border:1px solid #fff"
                  v-model="jonMessages.jobDesc" 
                   :autosize="{ minRows: 10, maxRows: 10}"
                   :maxlength="500"
                   :minlength="50"
                  placeholder="请输入内容 50 - 500个字"></Input>
                </FormItem>
            </div>
        </div>
    </div>
    <div class="newcreate-jobInformation Professional-tag">
        <h3><b style="font-size:14px;color:#F56C6C;font-weight:normal;">* </b>职业标签
            <Tooltip content="Here is the prompt text">
              <Icon type="help-circled"></Icon>
              <div slot="content">
                1.请使用与职位相关的词汇；e.g.销售、电销；<br/>
                2.禁止使用修饰词汇；e.g.环境好；<br/>
                3.禁止使用诱惑词汇；e.g.五险一金；<br/>
                4.禁止使用其他与职位类型、技能不相关的词汇。<br/>
              </div>
              <b></b>
            </Tooltip>
        </h3>
        <div class="Professional-content">
        <Input placeholder="请输入 1-7 个字" v-model="Professional" class="input-with-select" style="width:200px;" :maxlength="7"
                   :minlength="1" v-on:change="changeProfessiona"></Input>
        <Button type="primary" id="jobAdd_label"  @click="AddProfessional($event)">添加</Button>
        </div>
        <p class="tips" v-if="isProfessional">标签不合适</p>
        <p class="tips" v-if="isaddagin">不能重复添加</p>
        <p class="tips" v-if="this.$store.state.RegExpJob_disable.Professional">请添加标签</p>
        <Tag checkable color="blue" v-for="tag in dynamicTags1" :key="tag" :name="item" closable @on-close="handleClose1(tag)">{{tag}}</Tag>
    </div>
  </Form>
</div>
   
</template>
<script>
export default{
  data() {
    var jobDescLength = (rule, value, callback) => {
      if (value) {
        if (value.replace(/\s/g, '').length < 50 || value.replace(/\s/g, '').length > 500) {
          callback(new Error('长度在 50 到 500 个字'))
        } else {
          callback()
        }
      }
    }
    return {
      isaddagin: false,
      isProfessional: false,
      dynamicTags1: [],
      inputVisible: false,
      Professional: '', // 标签显示的数据
      tablelist: '',  //  原数据
      jonMessages: {    //  该组件的所有数据
        jobDuty: '',
        jobDesc: '',
        jobLable: ''
      },
      rulesform: {
        jobDesc: [
          { required: true, message: '请输入详细信息', trigger: 'blur' },
          { min: 50, max: 500, message: '长度在 50 到 500 个字', trigger: 'blur' },
          { validator: jobDescLength, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.$route.query.RsendEvent && !this.$route.query.id) {
      this.jonMessages.jobDesc = '职位职责：\n\n\n\n\n任职要求：'
    }
    this.$store.commit('set_jobdirection', this.jonMessages)
    this.$store.commit('set_Refjobdirection', this.$refs.ruleForm)  //  获取dom
  },
  methods: {
    AddProfessional(e) { // 添加职业标签
      const arr = ['五险一金', '环境好', '三高人群', '高温补贴', '加班补贴', '餐补', '房补', '全勤奖', '年底双薪', '13薪', '14薪', '绩效奖金', '年终分红', '交通补助', '包吃', '包住', '包吃包住', '带薪年假', '弹性工作', '不加班', '节日福利', '福利', '工作餐', '定期体检', '全职', '兼职', '本科', '硕士', '博士', '上市企业', '年终奖', '补贴', '补助', '免费', '分红', '年终奖金', '年终分红']
      for (var i = 0; i < arr.length; i++) {
        if (this.Professional === arr[i] || this.Professional === '') {
          this.isProfessional = true
          return false
        }
      }
      if (this.dynamicTags1.length < 5) {
        for (let i = 0; i < this.dynamicTags1.length; i++) {
          if (this.dynamicTags1[i] === this.Professional) {
            this.isaddagin = true
            return false
          }
        }
        this.isaddagin = false
        this.dynamicTags1.push(this.Professional)
        this.jonMessages.jobLable = this.dynamicTags1.join(',')
        this.$store.commit('set_Professional_false')
        this.isProfessional = false
        return false
      } else {
        this.$message.error('最多只能添加5个')
      }
    },
    handleClose1(tag) { // 删除标签
      this.dynamicTags1.splice(this.dynamicTags1.indexOf(tag), 1)
      this.jonMessages.jobLable = this.dynamicTags1.join(',')
      if (this.dynamicTags1.length === 0) {
        this.$store.commit('set_Professional_true')
      }
    },
    settablelist() {
      this.jonMessages.jobDesc = this.tablelist.jobDesc	  //  职位职责
      this.jonMessages.jobDuty = this.tablelist.jobDuty	  //  任职要求
      this.jonMessages.jobLable = this.tablelist.jobLable //  职位标签
      this.dynamicTags1 = this.jonMessages.jobLable.split(',') || ''
      if (this.dynamicTags1[0] === '') {
        this.dynamicTags1.splice(0, 1)
      }
    },
    changeProfessiona() {
      this.isProfessional = false
      this.isaddagin = false
    }
  },
  props: ['workList'],
  watch: {  //  监测接收数据
    workList(val) {
      //  把原数据给data的tablelist
      this.tablelist = val
      this.settablelist()
    },
    jonMessages: {
      deep: true,
      handler: function(val, oldVal) {
        this.$store.commit('set_jobdirection', val)
      }
    }
  }

}
</script>
<style lang="scss" src="../newCreates.scss"></style>