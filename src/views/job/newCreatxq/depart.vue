<template>
      <div class="box-container">
        <div class="getinterivews">
     <el-select
    v-model="man"
    filterable
    remote
    reserve-keyword
    @change="getman"
    placeholder="请输入关键词"
    :remote-method="getInterviewMan">
    <el-option
      v-for="item in interviews"
      :key="item.id"
      @change="fn(item.employeeName)"
      :label="item.employeeName"
      :value="item.id">
      <span id="getManName" class="getManName" style="float: left">{{ item.employeeName }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.dept }}</span>
      <span class="getManId" v-show="false">{{ item.id }}</span>
    </el-option>
  </el-select>
  <el-popover
  ref="popover4"
  placement="right"
  width="400"
  popper-class='scroll'
  v-model="visible2"
  trigger="click">
  <el-tree
        :props="defultlabel"
        :load="lodatree"
        ref="tree"
        :current-change='getnode'
        @node-click='getnode'
         lazy>
        </el-tree>
</el-popover>
<Button type="primary" v-popover:popover4>
  <icon-svg icon-class='job_xqbm' style="font-size: 24px; text-align:center;"/>
</Button>
  </div>
      </div>
</template>
<script>
import { getInterviews, searchinterview } from '../../../api/jobApi/newCreat'
// 引入api文件
export default {
  data() {
    return {
      man: [],
      isshowTree: false,
      // 这里是设置默认属性的地方 isLeaf代表的是是否为叶子节点是叶子节点时就不会有下拉的箭头
      defultlabel: {
        value: 'id',
        label: 'name',
        isLeaf: `leafNode`
      },
      visible2: false,
      person: {},
      // 选择的这个人是谁
      interviews: []
      // 这里是渲染到搜索框下的列表
    }
  },
  mounted() {
    if (!this.$route.query.newNeed) {
      this.man = this.interviewData[this.addIndex]['interviewerName'] || '' //  进来的时候进行赋值操作
    } else {
      this.man = ''
    }
  },
  props: [
    'addIndex',
    'interviewData'
  ],
  methods: {
    // 搜索的时候显示到选择框上面的list列表的获取
    getInterviewMan(query) {
      if (query) {
        searchinterview({
          employeeName: query
        }).then(res => {
          this.interviews = res
        })
      }
    },
    // 这里是讲选择框的数据赋值到这个人上去并将这个人的id传递给父组件
    getman(val) {
      // this.id = val
      // this.person.name = this.man
      this.person.id = val
      this.person.addIndex = this.addIndex
      this.$nextTick(res => {
        var getManName_dom = document.getElementsByClassName('getManName')
        var getManId_dom = document.getElementsByClassName('getManId')
        for (var i = 0; i < getManId_dom.length; i++) {
          if (getManId_dom[i].innerText === val) {
            this.person.name = getManName_dom[i].innerText
            this.$emit('sendman', [this.person])
            return false
          }
        }
      })
    },
        // 获取节点的时候得到这个节点的数据
    getnode(data, node) {
      if (data.type === '1') {
        // 当选中一个人的时候将这个人的值赋值到input里面
        this.man = data.name
        this.person.name = data.name
        this.person.id = data.id
        this.person.addIndex = this.addIndex
        // 将这个弹出框隐藏
        this.visible2 = false
      } else {
        this.man = ''
      }
    },
    getInter() {
      this.isshowTree = true
    },
    lodatree(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '尚德机构', id: 0, leafNode: '0' }])
      }
      if (node.data.type === '1') {
        this.person = {
          id: node.data.id,
          name: node.data.name,
          addIndex: this.addIndex
        }
      }
      if (node.level >= 1) {
        if (node.data.leafNode !== '1') {
          this.getchild(node.data.id, node, resolve)
        } else {
          return resolve([])
        }
      }
    },
    // 懒加载子节点
    getchild(id, node, resolve) {
      let data = []
      getInterviews({
        id: id
      }).then(res => {
        data = res.map(item => {
          item.leafNode = item.leafNode === '1' && item.type === '1'
          return item
        })
        return resolve && resolve(data)
      })
    }
  },
  // 这里是监测数据的该表将数据传递给父组件使用 后期可以通过父组件绑定或者vuex的方式将数据传递给父组件
  watch: {
    // 这里将id传到外面接收
    man: function() {
      this.$emit('sendman', [this.person])
    },
    interviewData(val) {
      this.man = this.interviewData[this.addIndex]['interviewerName'] || ''
    }
  }
}
</script>
<style lang="scss" scoped>
.getinterivews{
.scroll{
  max-height: 500px;
  overflow: scroll;
}
}
.el-button{
   vertical-align:top;
   text-align: center;
   span{
     width: 100%;
     height: 100%;
     display: block;
   }
}

</style>
