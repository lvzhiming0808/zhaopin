// 引入依赖的库

import Vue from 'vue'

export default Vue.component('NavBar', {
  template: `
    <div>
  		<Tag type="dot" v-for="(item,index) in navArr" :key="'navArr'+index" :color="currentNavPath === item.path ? 'blue' : 'default'" :closable="index > 0 ? true : false" @click.native="handleNavRoute(item)" @on-close="handleCloseNav" :name="item.path">{{item.name}}</Tag>
    </div>
  `,
  data() {
    return {
      currentNavPath: '',
      navArr: [
        {
          name: '主页',
          fullPath: '/layout/home',
          path: '/layout/home',
          fromPath: ''
        }
      ]
    }
  },
  mounted() {
    this.handleNav(this.$route.name, this.$route.fullPath, this.$route.path)
  },
  watch: {
    '$route': 'getPath'  // 监听事件
  },
  methods: {
    getPath() {
      this.handleNav(this.$route.name, this.$route.fullPath, this.$route.path)
    },
    findNavbarByPath(navPath) {
      for (var i = 0; i < this.navArr.length; i++) {
        if (this.navArr[i].path === navPath) {
          return this.navArr[i]
        }
      }
      return null
    },
    navIndexColor(navPath) {
      if (this.findNavbarByPath(navPath) !== null) {
        this.currentNavPath = navPath
      }
    },
    handleNav(name, fullPath, path) {
      if (path.indexOf('/layout/PositionDetails') > -1) {
        path = fullPath
      }
      if (path.indexOf('/layout/talentdetails') > -1) {
        path = fullPath
      }
      if (path.indexOf('/layout/detailEditing') > -1) {
        path = fullPath
      }
      if (path.indexOf('/layout/activeSend') > -1) {
        path = fullPath
      }
      if (path.indexOf('/layout/searchdetail') > -1) {
        path = fullPath
      }
      function Navbar(name, fullPath, path, fromPath) {
        this.name = name
        this.fullPath = fullPath
        this.path = path
        this.fromPath = fromPath
      }
      const nav = new Navbar(name, fullPath, path, this.currentNavPath)
      if (this.findNavbarByPath(path) === null) {
        this.navArr.push(nav)
      }
      this.navIndexColor(path)
      console.log(this.navArr, 'this.navArr')
    },
    handleCloseNav(e, closePath) {
      var closeNavbar, closeNavbarIndex, switchNavbar
      for (var i = 0; i < this.navArr.length; i++) {
        if (this.navArr[i].path !== closePath) {
          continue
        }
        closeNavbar = this.navArr[i]
        closeNavbarIndex = i
        switchNavbar = this.findNavbarByPath(closeNavbar.fromPath)
        if (switchNavbar !== null) {
          break
        }
        if (i === this.navArr.length - 1) {
          switchNavbar = this.navArr[i - 1]
        } else {
          switchNavbar = this.navArr[i + 1]
        }
        break
      }
      this.navArr.splice(closeNavbarIndex, 1)
      if (this.currentNavPath === closePath) {
        this.$router.push({ path: switchNavbar.fullPath })
      }
    },
    handleNavRoute(item) {
      this.$router.push({ path: item.fullPath })
    }
  }
})
