<template>
  <div class="newcreate-jobInformation Job-highlights" id="jobAdd_bright">
        <h3><b style="font-size:14px;color:#F56C6C;font-weight:normal;">* </b>职位亮点</h3>
        <ul>
            <li id="joblifhts" v-for="(item, index) in lightList" :key="item[0]" @click="workLights(item[0],$event)" :max="5">{{item[1]}}</li>
        </ul>
        <p style="color:red;font-size:12px;" v-if="this.$store.state.RegExpJob_disable.jobStern">请选择标签</p>
    </div>
</template>
<script>
import Jobjs from '../../../json/job'
export default{
  data() {
    return {
      tablelist: '',  //  原数据
      jonMessages: {    //  该组件的所有数据
        jobStern: ''
      },
      lightList: [], // 职位亮点
      lights: [],
      ind: 0
    }
  },
  created() {
    this.$store.commit('set_jobLifhts', this.jonMessages)
    this.lightList = Jobjs.CONST_WORKLIGHT// 职位亮点
  },
  methods: {
    open4() {
      this.$message.error('只允许添加4个职位亮点')
    },
    workLights(key, e) { // 职位亮点
     // this.ind++
      var strs = document.getElementsByClassName('listActive')
      if (e.target.className !== 'listActive' && strs.length > 3) {
        this.open4()
        return
      } else {
        if (e.target.className === 'listActive') {
          this.lights.forEach((element, index) => {
            if (element === key) {
              this.lights.splice(index, 1)
              this.jonMessages.jobStern = this.lights.join(',')
              if (this.lights.length === 0) {
                this.$store.commit('set_jobStern_true')
              }
            }
          })
          e.target.className = ''
        } else {
          e.target.className = 'listActive'
          this.lights.push(key)
          this.$store.commit('set_jobStern_false')
        }
        this.jonMessages.jobStern = this.lights.join(',')
      }
    },
    settablelist() {
      this.jonMessages.jobStern = this.tablelist.jobStern	  //  职位亮点
      this.lights = this.jonMessages.jobStern.split(',')
      //  遍历需要亮的标签
      var lightarr = this.jonMessages.jobStern.split(',')
      lightarr
      this.lightList.forEach((el, index) => {
        lightarr.forEach((val, ind) => {
          if (el[0] === lightarr[ind]) {
            var strs = document.querySelectorAll('#joblifhts')
            strs[index].className = 'listActive'
          }
        })
      })
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
        this.$store.commit('set_jobLifhts', val)
      }
    }
  }
}
</script>
<style lang="scss" src="../newCreates.scss"></style>