<template>
  <div class="grid-content bg-purple departLeft">
       <Tree :data="dataList" @on-toggle-expand="handleNodeClick" :render="renderContent"></Tree>
  </div>
</template>
<script>
import * as types from '../../store/modules/accentCenter/actionTypes'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      orgId: 0,
      dataList: [],
      isLoading: true
    }
  },
  computed: {
    ...mapGetters('accentCenter', [
      'orgLeftList',
      'detaliList'
    ])
  },
  mounted() {
    this[types.HANDEL_ORGLEFTLIST]().then(res => {
      if (this.orgLeftList.length > 0) {
        this.isLoading = false
        this.$emit('londingEvent', this.isLoading)
      }
      if (this.orgLeftList.length > 0) {
        this.getTree(this.orgLeftList, false)
        this.orgId = this.orgLeftList[0].id
        this[types.HANDEL_ORGDEATIL](this.orgId)
      }
    })
  },
  methods: {
    ...mapActions('accentCenter', [
      types.HANDEL_ORGLEFTLIST,
      types.HANDEL_ORGDEATIL
    ]),
    getTree(orgLeftList, isShow) {
      const arr = []
      orgLeftList.forEach(item => {
        const obj = {}
        obj.title = item.organizationName
        obj.loginUserNum = item.loginUserNum
        obj.expand = isShow
        obj.id = item.id // 其他你想要添加的属性
        obj.children = this.getTree(item.childList, isShow) // 递归调用
        arr.push(obj)
        this.dataList = arr
      })
      return arr
    },
    renderContent(h, { root, node, data }) {
      if (data.title.length > 6) {
        data.title = data.title.substr(0, 6) + '...'
      }
      return h('span', [
        h('span', {
          on: {
            click: () => { this.handleNodeClick(data) }
          },
          style: {
            cursor: 'pointer'
          }
        }, data.title),
        h('span', {
          style: {
            marginLeft: '10px'
          }
        }, '(' + data.loginUserNum + ')')
      ])
    },
    handleNodeClick(data) {
      this.isLoading = true
      this.$emit('londingEvent', this.isLoading)
      this.orgId = data.id
      this[types.HANDEL_ORGDEATIL](this.orgId)
      if (this.detaliList) {
        this.isLoading = false
        this.$emit('londingEvent', this.isLoading)
      }
    }
  },
  watch: {
    orgLeftList(res) {
      console.log('aaaaaaaaaaaaaa', res)
      this.getTree(res, true)
    }
  }
}
</script>
<style lang='scss' scoped>
a{
  list-style: none;
  text-decoration: none;
}
.custom-tree-node{
  .Listnumber{
    margin-left: 10px;
  }
}
.departLeft{
  min-height: 1000px !important;
  border-right:1px solid rgba(133, 141, 172, 0.2);
  
}
</style>

