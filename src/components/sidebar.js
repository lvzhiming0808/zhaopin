// 引入依赖的库

import Vue from 'vue'
import { GLOBALROUTE } from '../json/globalLeftRoute'
import { loginUserInfo } from '../api/loginApi/user.js'

export default Vue.component('SideBar', {
  template: `
		<Menu v-if="urlList.length>0" :theme="theme" :active-name="active" :open-names="open" style="width:auto" accordion>
      <router-link v-for="(item,index) in urlList" :key="'MenuItem'+index" :to="item.id|pathformat" v-if="+item.childNodes.length===0">
        <MenuItem :name="'i'+index">
          <icon-svg :icon-class='item.id|iconformat' style="font-size: 16px"/>
          <span class="layout-text">{{item.resourceName}}</span>
        </MenuItem>
      </router-link>
      <Submenu v-for="(item,index) in urlList" :key="'Submenu'+index" :name="'i'+index" v-if="+item.childNodes.length>0"> 
        <template slot="title">
            <icon-svg :icon-class='item.id|iconformat' style="font-size: 16px"/>
            <span class="layout-text">{{item.resourceName}}</span>
        </template>
        <router-link v-for="(key,ind) in item.childNodes" :key="'child'+ind" :to="key.id|pathformat"  class="menitemchands">
          <MenuItem :name="'i'+index+'-'+ind"> <span class="layout-text2">{{key.resourceName}}</span></MenuItem>
        </router-link>
      </Submenu>
  	</Menu>
  `,
  data() {
    return {
      active: '',
      route_arr: [],
      open: [],
      theme: 'dark',
      urlList: []
    }
  },
  beforeMount() {
    this.getActive(this.$route.name)
  },
  mounted() {
    loginUserInfo().then(res => {
      this.urlList = res.result.loginUser.sysResources
    })
  },
  watch: {
    '$route': 'getPath'  // 监听事件
  },
  methods: {
    getActive(val) {
      for (let i = 0; i < GLOBALROUTE.length; i++) {
        if (GLOBALROUTE[i].name === val) {
          this.route_arr = GLOBALROUTE[i].activeName.split('-')
        }
      }
      if (this.route_arr.length > 1) {
        this.active = this.route_arr[0] + '-' + this.route_arr[1]
      } else {
        this.active = this.route_arr[0]
      }
      this.open = [this.route_arr[0]]
    },
    getPath() {
      this.getActive(this.$route.name)
    }
  }
})
