<template>
  <div class="communicate-wrapper" id="account_Channel">
    <!--关联用户管理 -->
    <div class="sChannel2">
      <div class="sChannel-form">
        <p class="orgtitle">{{platId|codeformat}}-{{deptName}}</p>
        <p class="orgshengyu">
          <span>{{platId|codeformat}}点数/币数：{{balance}}枚</span>
          <span>剩余下载简历数：{{downloadNum}}份</span>
          <span>剩余职位刷新次数：{{refreshNum}}次</span>
        </p>
      </div>
      <Button type="primary" @click="modal1 = true" class="sC-button"><Icon type="ios-plus-outline"></Icon> 新增关联用户</Button>
      <Modal
          v-model="modal1"
          title="新增关联用户"
          @on-ok="baseUsersuree">
          <Form  ref="form">
            <p style="margin-bottom: 20px;">请选择要关联的用户</p>
            <span style="position: absolute;top: 113px;left: 25px;z-index: 2100;"><i class="el-icon-search"></i></span>
            <Select v-model="baseUsersname" filterable placeholder="选择用户，可搜索" class="select-paddig-left" >
                <Option v-for="item in baseUsers"  :value="item.id" :key="item.dept" :label="item.email"></Option>
            </Select>
          </Form>
      </Modal>
    </div>
    <div class="communicate-main">
      <div class="channelTable" style="width: 100%;">
      <Table border :columns="columns1" :data="channelList" style="overflow-x:hidden;"></Table>
      <Modal
          v-model="modal2"
          title="删除用户"
          @on-ok="deleteyes()">
          <Form ref="form">
            <p>确定要删除此用户？</p>
          </Form>
      </Modal>
        <div class="pages">
          <Page 
          :total="pagination.total" 
          @on-change="handleCurrentChange"
          :page-size="pagination.size"
          show-total>
          </Page>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="channelTable">
      <p class="orgtitle">操作记录：</p>
      <Table border :columns="columns2" :data="channelLogList" center style="overflow-x:hidden;"></Table>
      </div>
    </div>
    <Spin fix v-if="isShowLoading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
  import { channellist, channelLogList, baseUsers, addChannelUser, deleteuseer } from '../../api/AccountApi/accountCenter'
  import moment from 'moment/moment'
  export default {
    data() {
      return {
        isShowLoading: true,
        modal1: false,
        modal2: false,
        currentPage1: 1, // 当前页
        pagination: { pageSize: 10, pageNum: 1 },
        platId: '',
        deptName: '',
        balance: '',
        downloadNum: '',
        refreshNum: '',
        total: '',
        userid: '',
        a: '',
        b: {
          platId: '',
          pageNum: '',
          size: '',
          channelId: ''
        },
        c: {
          platId: '',
          channelId: '',
          type: 5,
          num: 10
        },
        adduserObj: {
          platId: 10001,
          channelId: 1,
          uid: 18
        },
        columns1: [
          {
            title: '用户名',
            key: 'email',
            align: 'center'
          },
          {
            title: '在线职位',
            key: 'jobNum',
            align: 'center'
          },
          {
            title: '累计简历下载',
            key: 'downloadNum',
            align: 'center'
          },
          {
            title: '累计刷新数',
            key: 'refreshNum',
            align: 'center'
          },
          {
            title: '使用渠道点数/币数',
            key: 'count',
            align: 'center'
          },
          {
            title: '操作',
            key: 'status',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteuser(params.index, params.row.id)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        columns2: [
          {
            title: '操作用户',
            key: 'suserRole',
            align: 'center'
          },
          {
            title: '操作',
            key: 'comment',
            align: 'center'
          },
          {
            title: '操作时间',
            key: 'updateDate',
            align: 'center'
          }
        ],
        channelList: [{
          username: '',
          onLineJobNum: '',
          downloadNum: '',
          count: '',
          refreshNum: '',
          account: ''
        }],
        channelLogList: [{
          username: '',
          date: ''
        }],
        baseUsersname: '',
        baseUsers: [{
          dept: '',
          email: '',
          roleName: ''
        }],
        radio2: 3,
        ismark: false,
        ismark2: false
      }
    },
    mounted() {
      this.isShowLoading = true
      this.a = this.$route.query
      this.platId = this.$route.query.platId
      this.deptName = this.$route.query.deptName
      this.balance = this.$route.query.balance
      this.downloadNum = this.$route.query.downloadNum
      this.refreshNum = this.$route.query.refreshNum
      this.account = this.$route.query.account
      this.b.platId = this.a.platId
      this.b.pageNum = this.a.pageNum
      this.b.size = 10
      this.b.channelId = this.a.channelId
      this.c.platId = this.a.platId
      this.c.channelId = this.a.channelId
  
      channellist(this.b).then(res => {
        this.channelList = res.result.list
        this.isShowLoading = false
      })
      channelLogList(this.c).then(res => {
        this.channelLogList = res.result.map(item => {
          item.comment = item.comment + ' ' + item.userEmail
          item.suserRole = item.suserRole + ' ' + item.suserEmail
          item.updateDate = this.myDate(item.updateDate)
          return item
        })
      })
      baseUsers(this.c).then(res => {
        this.baseUsers = res
      })
      this.handleCurrentChange(1)
    },
    methods: {
      cancel() {
        this.$Message.info('Clicked cancel')
      },
      dateFormat: function(row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
       // 返回按钮
      routertototal() {
        // history.go(-1, { path: 'communicate', query: { platId: this.platId, pageNum: 1, size: 20 }})
        this.$router.push({ path: 'communicate' })
      },
      baseUsersuree() { //  新增用户
        this.adduserObj.platId = this.$route.query.platId
        this.adduserObj.channelId = this.$route.query.channelId
        this.adduserObj.uid = this.baseUsersname
        this.deptName = this.$route.query.deptName
        this.balance = this.$route.query.balance
        this.downloadNum = this.$route.query.downloadNum
        this.refreshNum = this.$route.query.refreshNum
        this.account = this.$route.query.account
        addChannelUser(this.adduserObj).then(res => {
        })
        this.ismark = false
        setTimeout(() => {
          this.$router.push({ path: 'userMange', query: { deptName: this.deptName, balance: this.balance, downloadNum: this.downloadNum, refreshNum: this.refreshNum, account: this.account, platId: this.adduserObj.platId, pageNum: 1, size: 20, channelId: this.adduserObj.channelId, time: +new Date() }})
        }, 1000)
      },
      deleteuser(index, id) {
        this.userid = id
        this.modal2 = true
      },
      deleteyes() { // 删除用户
        this.adduserObj.platId = this.$route.query.platId
        this.adduserObj.channelId = this.$route.query.channelId
        this.adduserObj.uid = this.baseUsersname
        this.deptName = this.$route.query.deptName
        this.balance = this.$route.query.balance
        this.downloadNum = this.$route.query.downloadNum
        this.refreshNum = this.$route.query.refreshNum
        this.account = this.$route.query.account
        deleteuseer({ id: this.userid }).then(res => {
        })
        this.ismark = false
        setTimeout(() => {
          this.$router.push({ path: 'userMange', query: { deptName: this.deptName, balance: this.balance, downloadNum: this.downloadNum, refreshNum: this.refreshNum, account: this.account, platId: this.adduserObj.platId, pageNum: 1, size: 20, channelId: this.adduserObj.channelId, time: +new Date() }})
        }, 1000)
      },
      handleCurrentChange(val) {
        val ? this.b.pageNum = val : ''
        channellist(this.b).then(res => {
          if (res.code === 200) {
            this.pagination.size = res.result.pageSize
            this.pagination.total = res.result.total
            this.channelList = res.result.list
            document.documentElement.scrollTop = 0
          } else {
            this.$message.error(res.message)
          }
        })
      },
      addAccountnumber() {  //  触发遮罩
        this.ismark = true
      },
      myDate(value) {
        var values = ''
        if (!value) {
          return
        } else {
          values = new Date(value)
        }
        var year = values.getFullYear()
        var month = values.getMonth() + 1
        var date = values.getDate()
        // var day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][values.getDay()]
        var hour = values.getHours() < 10 ? '0' + values.getHours() : values.getHours()
        var minute = values.getMinutes() < 10 ? '0' + values.getMinutes() : values.getMinutes()
        var second = values.getSeconds() < 10 ? '0' + values.getSeconds() : values.getSeconds()
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second + ' '
      }
    }
  }
</script>
<style lang="scss">
.select-paddig-left{
  .ivu-select-selection {
  .ivu-select-input{
      padding-left: 30px;
    }
}
}
  .communicate-wrapper {  
    .sChannel2{
      overflow: hidden;
      background: #fff;
      .arrow-down {
          width: 0;
          height: 0;
          border-right: 50px solid transparent;
          border-top: 50px solid #2d8cf0;
          position: relative;
          left: -5px;
          top: -5px;
          cursor: pointer;
          a {
            position: absolute;
            top: -37px;
            left: 8px;
            font-size: 12px;
            color: #fff;
          }
      }
      .sChannel-form{
        width: 50%;
        float: left;
        padding-top: 15px;
        .orgtitle{
          font-size: 18px;
          margin-bottom: 10px;
          margin-left: 20px;
        }
        .orgshengyu{
          font-size: 14px;
          line-height: 25px;
          margin-left: 20px;
        }
      }
      .sC-button{
        margin: 10px 10px 0 0;
        float: right;
      }
    }
    .PersonneManagement-wrapper-head {
      height: 50px;
      margin-top: 20px;
      .PersonneManagement-head-title {
        display: inline-block;
        border-left: 2px solid #2d8cf0;
        height: 14px;
        font-size: 16px;
        padding-left: 8px;
        line-height: 14px;
      }
    }
    .record{
      padding: 10px 10px 80px 10px;
      background: #fff;
      .orgtitle{
          font-size: 18px;
          margin-bottom: 10px;
          margin-left: 20px;
        }
    }
    .communicate-main {
      background: #fff;
      display: flex;
      clear: both;
      padding: 10px;
      box-sizing: border-box;
      .pages {
        float: right;
        margin-top: 30px;
      }
      }
    }
    .PersonneManagement-mark {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1111;
      .mark-content {
        width: 538px;
        height: 280px;
        background: #fff;
        border-radius: 6px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -250px 0 0 -266px;
        padding: 10px;
        box-sizing: border-box;
        h3 {
          height: 50px;
          text-align: center;
          line-height: 50px;
          position: relative;
          font-size: 16px;
          color: #202020;
          font-weight: normal;
          border-bottom: 1px solid #eaeef2;
          span {
            position: absolute;
            right: 0px;
            font-size: 20px;
            color: #ececec;
            font-weight: bold;
            top: 12px;
          }
        }
        .jobInformation-lists {
          padding-top: 39px;
        }
      }
    }
</style>

