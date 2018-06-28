<template>
<div class="box-container">
      <div class="treeHeader">
        <el-tree
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
import { searchinterview } from '../../api/jobApi/newCreat'
import { sysUsers } from '../../api/resumeApi/resumelist.js'

// 引入api文件
export default {
  data() {
    return {
      manORG: '',
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
    'FirstName', 'FirstId', 'personType', 'leafNode'
  ],
  mounted() {},
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
      if (data.personType === 1) {
        // 当选中一个人的时候将这个人的值赋值到input里面
        this.manORG = data.name
        this.person.name = data.name
        this.person.id = data.id
      } else {
        this.manORG = ''
        this.person.name = ''
        this.person.id = ''
      }
      this.$emit('Searchsendman', this.person, this.manORG)
    },
    getInter() {
      this.isshowTree = true
    },
    lodatree(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: this.FirstName, id: this.FirstId, leafNode: this.leafNode, personType: this.personType }])
      }
      if (node.level >= 1) {
        if (node.data.leafNode !== 1) {
          this.getchild(node.data.id, node, resolve)
        } else {
          return resolve([])
        }
      }
    },
    // 懒加载子节点
    getchild(id, node, resolve) {
      const data = []
      if (node.data.personType === 1) {
        sysUsers({
          organizationId: id
        }).then(res => {
          res.result.map(item => {
            if (item.personType === 1) {
              data.push(item)
            }
          })
          return resolve && resolve(data)
          // data = res.result.map(item => {
          //   item.leafNode = item.leafNode === 1 && item.personType === 0
          //   return item
          // })
          // return resolve && resolve(data)
        })
      } else {
        return resolve([])
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box-container{
  max-height: 300px;
 .el-tree{
   max-height: 250px;
   overflow-y: scroll;
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



