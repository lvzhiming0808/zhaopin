<template>
 <div>
   <Form ref="ruleForm"  :rules="rulesform" :model="jonMessages"  :label-width="80">
    <Row>
        <div class="newcreate-jobInformation">
        <div class="forms2">
            <div class="forms2-top">
              <FormItem label="发布地点" prop='checkModel' id="jobAdd_place">
                <CheckboxGroup v-model="jonMessages.checkModel" @on-change="eleclentRadio">
                    <Checkbox :disabled="isdisabled_publish" change label="北京">北京</Checkbox>
                    <Checkbox :disabled="isdisabled_publish" label="武汉">武汉</Checkbox>
                </CheckboxGroup>
              </FormItem>
            </div>
        </div>
        </div>
        <div class="newcreate-jobInformation Working-address">
          <FormItem label="工作地址" prop='workPlace'>
            <Row>
              <Col span="6">
                <Select @change="workPlace_change()" v-model="jonMessages.workPlace" placeholder="北京/武汉" style="width:200px" >
                <Option v-for="item in workPlaceList"
                  :key="item[1]"
                  :label="item[1]"
                  :value="item[1]">
                </Option >
              </Select>
              </Col>
              <Col span="16">
                <Select v-model="jonMessages.workSite" placeholder="请选择" style="width:300px" >
                  <Option 
                    v-for="item in workSiteList[jonMessages.workPlace]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </Option >
                </Select>
              </Col>
            </Row> 
          </FormItem>
        </div>
    </Row>
    </Form>
 </div>
</template>
<script>
import Jobjs from '../../../json/job'
export default{
  data() {
    return {
      isdisabled_publish: false,
      tablelist: '',  //  原数据
      jonMessages: {    //  该组件的所有数据
        workPlace: '',
        publishCity: '',
        workSite: '', //  这里是自己添加的
        checkModel: []
      },
      workPlaceList: [], // 工作地址，对应组件里面的选项数据
      checkplace: { // 对应选择的城市
        0: '武汉',
        1: '北京'
      },
      workSiteList: Jobjs.CONST_REQUIRE_WORKSITE,
      rulesform: {
        checkModel: [
          { type: 'array', required: true, message: '请至少选择一个发布地点', trigger: 'change' }
        ],
        workPlace: [
          { required: true, message: '请选择工作地址', trigger: 'change' }
        ],
        workSite: [
          { required: true, message: '请选择详细地点', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.$store.commit('set_publishPlace', this.jonMessages)
    this.workPlaceList = Jobjs.CONST_REQUIRE_PLACE  //  工作年限
    this.$store.commit('set_RefpublishPlace', this.$refs.ruleForm)  //  获取dom
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
        this.$store.commit('set_publishPlace', val)
      }
    }
  },
  methods: {
    eleclentRadio() {
      var publishCityStr = this.jonMessages.checkModel.join(',')
      this.jonMessages.publishCity = publishCityStr.substr(0, publishCityStr.length)
    },
    settablelist() {
      this.jonMessages.publishCity = this.tablelist.publishCity	  //  发布地址
      this.jonMessages.checkModel = this.jonMessages.publishCity.split(',') || []  //  武汉 北京
      this.jonMessages.workPlace = this.tablelist.workPlace //  工作地址
      this.jonMessages.workSite = this.tablelist.workSite //  工作地点
      if (this.tablelist.publishState === 130002 || this.tablelist.publishState === 130006) {
        this.isdisabled_publish = true
      }
    },
    workPlace_change() {
      this.jonMessages.workSite = ''
    }
  }
}
</script>
<style lang="scss" src="../newCreates.scss"></style>
