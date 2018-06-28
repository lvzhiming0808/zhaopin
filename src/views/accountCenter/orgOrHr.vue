<template>
<div class="box-container">
    <div class="getinterivews">
    <p @click="isTree=true">
        <el-input v-model="man" placeholder="EHR组织架构" :readonly="true"></el-input>
    </p>
        <el-tree
            v-if="isTree"
            :props="defultlabel"
            :load="lodatree"
            ref="tree"
            :current-change='getnode'
            @node-click='getnode'
            lazy>
            </el-tree>
        </div>
</div>
</template>
<script>
import { getInterviews, searchinterview } from '../../api/jobApi/newCreat'
// 引入api文件
export default {
  data() {
    return {
      man: '',
      isshowTree: false,
      // 这里是设置默认属性的地方 isLeaf代表的是是否为叶子节点是叶子节点时就不会有下拉的箭头
      defultlabel: {
        value: 'id',
        label: 'name',
        isLeaf: `leafNode`
      },
      personId: '',
      person: {},
      // 选择的这个人是谁
      interviews: [],
      isTree: false
      // 这里是渲染到搜索框下的列表
    }
  },
  props: [
    'sendman'
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
        // 获取节点的时候得到这个节点的数据
    getnode(data, node) {
      if (data.type === '1') {
        // 当选中一个人的时候将这个人的值赋值到input里面
        this.man = data.name
        this.person.name = data.name
        this.person.id = data.id
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
          name: node.data.name
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
      this.$emit('sendman', this.person)
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

</style>



