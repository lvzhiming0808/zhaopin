<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType(0)" size="large" long type="text">
                    <transition name="mes-current-type-btn">
                        <Icon v-show="this.types === 0" type="checkmark"></Icon>
                    </transition>
                    <span class="mes-type-btn-text">未读消息</span>
                    <Badge class="message-count-badge-outer"  overflow-count="1000" class-name="message-count-badge" :count="result"></Badge>
                </Button>
            </div>
            <div>
                <Button @click="setCurrentMesType(1)" size="large" long type="text">
                    <transition name="mes-current-type-btn">
                        <Icon v-show="this.types === 1" type="checkmark"></Icon>
                    </transition><span class="mes-type-btn-text">已读消息</span>
                </Button>
            </div>
        </div>
        <div class="message-content-con">
            <transition name="view-message" v-if="showMesTitleList">
                <img v-if="showMesTitleList&&magesslist.length===0" src="../../assets/img_zhanwei.png" alt="" style="display:block;margin:20px auto">
                <div class="message-title-list-con">
                    <Table border ref="messageList" :columns="mesTitleColumns" :data="magesslist" :no-data-text="magesslist.createDateTime">
                    </Table>
                    <Page 
                      :total="pagination.total" 
                      :page-size="20" 
                      show-total 
                      class="paging"  
                      :current='currentPage' 
                      @on-change="changepage">
                    </Page>
                </div>
            </transition>
            <transition name="back-message-list" v-if="!showMesTitleList">
               <img v-if="!showMesTitleList&&MessList.length===0" src="../../assets/img_zhanwei.png" alt="" style="display:block;margin:20px auto">
                <div class="message-view-content-con">
                  <div class="message-content-top-bar">
                      <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                      <h3 class="mes-title">消息详情</h3>
                  </div>
                  <div class="message-content-body">
                    <Card>
                        <p slot="title">
                          <Icon type="ios-email"></Icon>
                          投递通知
                        </p>
                        <span slot="extra">
                            <Icon type="ios-time-outline"></Icon>
                            {{readDateTime}}
                        </span>
                        <span v-for="(item,index) in MessList" :key="index">
                            <span v-if="item.templateType===0">{{item.section}}</span>
                            <router-link :to="{path:item.templateRoutePath+'?'+item.templateParam}">
                                <a v-if="item.templateType===1">{{item.section}}</a>
                            </router-link>
                        </span>
                    </Card>
                  </div>
                </div>
            </transition>
        </div>
         <Spin fix v-if="isShowLoading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
    </div>
</template>

<script>
import { magess, magessnum, magessdered, details, detail, magessdeleted } from '../../api/resumeSearchApi/total' // magess
import * as types from '../../store/modules/message/actionTypes'
import { mapMutations } from 'vuex'
export default {
  data() {
    const markAsreadBtn = (h, params) => {
      return h('Button', {
        props: {
          size: 'small'
        },
        on: {
          click: () => {
            this.isReaded(params)
          }
        }
      }, '标为已读')
    }
    const deleteMesBtn = (h, params) => {
      return h('Button', {
        props: {
          size: 'small',
          type: 'error'
        },
        on: {
          click: () => {
            this.isDelete(params)
          }
        }
      }, '删除')
    }
    return {
      isShowLoading: true,
      result: 0,
      MessList: [],
      readDateTime: '',
      pagination: { pageSize: 20, pageNum: 1 },
      ids: '',
     // types: '',
      titleName: '',
      magesslist: [{
        createDateTime: '',
        title: ''
      }
      ],
      redmagesslist: [{
        title: '',
        readDateTime: ''
      }
      ],
      showMesTitleList: true,
      mesTitleColumns: [
        {
          title: '消息列表',
          key: 'title',
          align: 'left',
          ellipsis: true,
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  this.showMesTitleList = false
                  this.addmassge(params.index, params.row.notifyId)
                  this.MessList = params.row.contentTemplates
                  this.readDateTime = params.row.createDateTime
                  this.getMessageNum(0)
                }
              }
            }, params.row.title)
          }
        },
        {
          title: '时间',
          key: 'createDateTime',
          align: 'center',
          width: 180
        },
        {
          title: '操作',
          key: 'asread',
          align: 'center',
          width: 100,
          render: (h, params) => {
            if (this.types === 0) {
              return h('div', [
                markAsreadBtn(h, params)
              ])
            } else
            if (this.types === 1) {
              return h('div', [
                deleteMesBtn(h, params)
              ])
            }
          }
        }
      ]
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state.message.currentPage
      },
      set(value) {
        this[types.HANDEL_CURRENTPAGE](value)
      }
    },
    types: {
      get() {
        return this.$store.state.message.types
      },
      set(value) {
        this[types.HANDEL_TYPES](value)
      }
    }
  },
  methods: {
    ...mapMutations('message', [
      types.HANDEL_CURRENTPAGE,
      types.HANDEL_TYPES
    ]),
    getMessage(type, page) { // 消息列表,unread未读消息
      this.isShowLoading = true
      magess({
        readStatus: type,
        page: page,
        size: 20
      }).then(res => {
        this.isShowLoading = false
        this.magesslist = res.result.list
        this.pagination.total = res.result.total
      })
    },
    getMessageNum(val) { // 消息数量
      magessnum({
        readStatus: val
      })
      .then(res => {
        if (res.code === 200) {
          this.result = res.result
        }
      })
    },
    changepage(e) {
      this[types.HANDEL_CURRENTPAGE](e)
      if (this.types === 0) {
        this.getMessage(0, e)
      } else {
        this.getMessage(1, e)
      }
    },
    isReaded(params) { // 标为已读
      magessdered({
        ids: params.row.notifyId
      }).then(res => { // 已读消息列表
        if (res.code === 200) {
          this.getMessage(0, this.currentPage)
          this.getMessageNum(0)
        }
      })
    },
    isDelete(params) {
      magessdeleted({
        ids: params.row.notifyId,
        readStatus: '1'
      }).then(res => {
        if (res.code === 200) {
          this.getMessage(1, this.currentPage)
          this.getMessageNum(0)
          this.$message.success('删除成功')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    addmassge(index, notifyId) {
      if (this.types === 'hasread') {
        magessdered({
          ids: notifyId
        }).then(res => { // 已读消息列表
          if (res.code === 200) {
            this.getMessage(1, 1)
            this.getMessageNum(0)
          }
        })
      } else {
        magessdered({
          ids: notifyId
        }).then(res => { // 已读消息列表
          if (res.code === 200) {
            this.getMessage(0, 1)
            this.getMessageNum(0)
          }
        })
      }
    },
    toresumedetails(seekerId, resumeId, id, messageType, tabIndex) {
      // 跳转到简历详情
      if (messageType === 1) {
        details({ seekerId: seekerId, resumeId: resumeId }).then(res => {
          if (res.result) {
            this.$router.push({ path: '/layout/activeSend', query: { seekerId: seekerId, id: resumeId, tabIndex: tabIndex }})
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        // 跳转到职位详情
        detail({
          id: id
        }).then(res => {
          if (res.result) {
            this.$router.push({ path: '/layout/PositionDetails', query: { id: id }})
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    // formatDate(time) {
    //   const date = new Date(time)
    //   const year = date.getFullYear()
    //   const month = date.getMonth() + 1
    //   const day = date.getDate()
    //   const hour = date.getHours()
    //   const minute = date.getMinutes()
    //   const second = date.getSeconds()
    //   return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second
    // },
    backMesTitleList(val) {
      this.getMessageNum(0)
      this.getMessage(this.types, this.currentPage)
      this.showMesTitleList = true
    },
    setCurrentMesType(type) {
      this.getMessageNum(0)
      this.showMesTitleList = true
      this[types.HANDEL_CURRENTPAGE](1)
      this[types.HANDEL_TYPES](type)
      magess({
        readStatus: type,
        page: this.currentPage,
        size: 20
      }).then(res => { // 消息列表
        this.magesslist = res.result.list
        this.pagination.total = res.result.total
      })
      // if (this.currentMessageType !== type) {
      //   this.showMesTitleList = true
      // }
      // this.currentMessageType = type
      // if (type === 'unread') {
      //   this.noDataText = '暂无未读消息'
      //   this.currentMesList = this.unreadMesList
      // } else if (type === 'hasread') {
      //   this.noDataText = '暂无已读消息'
      //   this.currentMesList = this.hasreadMesList
      // } else {
      //   this.noDataText = '回收站无消息'
      //   this.currentMesList = this.recyclebinList
      // }
    }
    // getContent(index) {
    //         // you can write ajax request here to get message content
    //   let mesContent = ''
    //   switch (this.currentMessageType + index) {
    //     case 'unread0': mesContent = '这是您点击的《欢迎登录iView-admin后台管理系统，来了解他的用途吧》的相关内容。'; break
    //     case 'unread1': mesContent = '这是您点击的《使用iView-admin和iView-ui组件库快速搭建你的后台系统吧》的相关内容。'; break
    //     case 'unread2': mesContent = '这是您点击的《喜欢iView-admin的话，欢迎到github主页给个star吧》的相关内容。'; break
    //     case 'hasread0': mesContent = '这是您点击的《这是一条您已经读过的消息》的相关内容。'; break
    //     default: mesContent = '这是您点击的《这是一条被删除的消息》的相关内容。'; break
    //   }
    //   this.mes.content = mesContent
    // }

  },
  mounted() {
    this.getMessageNum(0)
    var b
    a()
    var it = this
    // 解决轮询消息登陆页报错问题
    function a() {
      b = setInterval(() => {
        if (window.location.hash === '#/login') {
          clearInterval(b)
          return false
        }
        magessnum({
          readStatus: 0
        })
        .then(res => { // 消息数量
          it.result = res.result
        })
      }, 3000)
    }
    this.getMessage(this.types, this.currentPage)
    // magess({
    //   readStatus: this.types,
    //   page: this.currentPage,
    //   size: 20
    // }).then(res => { // 消息列表
    //   this.magesslist = res.result.list
    //   this.pagination.total = res.result.total
    // })
  },
  watch: {
    // unreadMesList(arr) {
    //   this.unreadCount = arr.length
    // },
    // recyclebinList(arr) {
    //   this.recyclebinCount = arr.length
    // }
  }
}
</script>
<style lang="less">
    @import './message.less';
</style>

