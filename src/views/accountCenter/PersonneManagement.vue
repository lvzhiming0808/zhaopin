<template>
  <div class="PersonneManagement-wrapper" id="account_User">
    <!-- 用户管理 -->
    <div class="PersonneManagement-wrapper-main">
      <div class="PersonneManagement-main-search">
       <Input v-model="input4" placeholder="搜索姓名/邮箱"  icon="search" @on-click="PersonneSearch" @keyup.enter.native="PersonneSearch" style="width: 200px"></Input>
      </div>
      <div style="clear:both;">
        <Table border :columns="columns1" :data="tableData"></Table>
      </div>
      <div class="pages">
        <Page 
        :total="pagination.total"
        :page-size="pagination.size"
        @on-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        show-total>
        </Page>
      </div>
    </div>
     <Spin fix v-if="isShowLoading" style="position: absolute;">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
  import { editRole, forbidden, del, adduser, getuserlist, getadduserlist } from '../../api/AccountApi/accountCenter'
  export default {
    mounted() {
      this.handleCurrentChange(1)
    },
    data() {
      return {
        isShowLoading: true,
        isSelect: false,
        columns1: [
          {
            title: '姓名',
            key: 'employeeName',
            align: 'center'
          },
          {
            title: '邮箱',
            key: 'email',
            align: 'center'
          },
          {
            title: '部门',
            key: 'dept',
            align: 'center'
          },
          {
            title: '职务',
            key: 'positionName',
            align: 'center'
          },
          {
            title: '手机',
            key: 'phone',
            align: 'center'
          },
          {
            title: '角色',
            key: 'roleName',
            align: 'center'
          },
          {
            title: '状态',
            key: 'enablestr',
            align: 'center'
          }
        ],
        tableData: [
        ],
        user: '',
        pagination: { size: 20, pageSize: 1 },
        input4: '', // 搜索框一
        currentPage1: 1, // 当前页
        isMark: false, // 弹出框
        radio2: 3,
        radio3: 3,
        iseditmark: false,
        editData: {
          'dept': 'string',
          'deptId': 0,
          'email': 'string',
          'employeeId': 0,
          'enable': 0,
          'password': 'string',
          'phone': 'string',
          'roleId': 0,
          'roleName': 'string',
          'id': 0,
          'userName': 'string'
        },
        adduserData: [],
        map: { '1': '超级管理员', '2': 'HRBP', '3': 'HR' }
      }
    },
    methods: {
      fn(e) {
        if (this.user !== '') {
          this.isSelect = false
        }
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        //  切换不同的数据来切换数据
        this.isShowLoading = true
        getuserlist({ page: val, size: 20 }).then(res => {
          this.isShowLoading = false
          if (res.code === 200) {
            var arr = res.result.list.sort(function compareFunction(param1, param2) {
              return param1.userName.localeCompare(param2.userName, 'zh')
            })
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].enable === 1) {
                arr[i].enablestr = '使用中'
              } else {
                arr[i].enablestr = '禁用'
              }
            }
            this.tableData = arr
            this.pagination.size = res.result.pageSize
            this.pagination.total = res.result.total
            document.documentElement.scrollTop = 0
          } else {
            this.$message.error(res.message)
          }
        })
      },
      forbiddenFn(e) {
        forbidden({
          id: e.id,
          enable: e.enable
        }).then(res => {
          // forbidden()
          this.handleCurrentChange(1)
        })
      },
      handleClick(e) { // 禁用按钮
        if (e.enable - 1) {
          this.$confirm('是否要启用所选账号？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.forbiddenFn(e)
          })
        } else {
          this.$confirm('是否要禁用所选账号？禁用后会保存操作记录，但账号不可使用。', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.forbiddenFn(e)
          })
        }
      },  // 禁用
      PersonneSearch() {
        // 发送fetch请求传递关键字参数
        this.isShowLoading = true
        getuserlist({ employeeName: this.input4, page: 1, size: 20 }).then(res => {
          this.isShowLoading = false
          var arr = res.result.list
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].enable === 1) {
              arr[i].enablestr = '使用中'
            } else {
              arr[i].enablestr = '禁用'
            }
          }
          this.tableData = arr
          this.pagination.size = res.result.pageSize
          this.pagination.total = res.result.total
        })
      },
      del(e) {
        // 发送删除请求
        if (confirm('您确定要删除该角色', '提示')) {
          del({ id: e.id }).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.handleCurrentChange(1)
          })
        }
      },
      modifile(e) {
        // 需要编辑角色  需要一个模态框
        this.iseditmark = true
        this.radio3 = e.roleId
        this.editData = {
          'roleId': this.radio3,
          'roleName': this.map[this.radio3],
          'id': e.id
        }
      }, // 编辑
      addUsers() {
        // 添加角色
        getadduserlist().then(res => {
          this.adduserData = res
        })
        this.isMark = true
        // document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      },  // 添加
      subimit() {
        if (this.user === '') {
          this.isSelect = true
          return false
        }
        var map = { 1: '超级管理员', 2: 'HRBP', 3: 'HR' }
        var arr = this.adduserData
        var b = []
        arr.forEach(item => {
          if (item['employeeId'] === this.user) {
            b.push(item)
          }
        })
        if (b[0] !== '') {
          adduser({
            dept: b[0]['deptName111111'],
            deptId: b[0]['deptId'],
            email: b[0]['email'],
            employeeId: b[0]['employeeId'],
            // enable: b[0]['enable'],
            roleId: this.radio3,
            roleName: map[this.radio3],
            employeeName: b[0]['employeeName'],
            userName: b[0]['email']
          }).then(res => {
            this.handleCurrentChange(1)
            this.$router.push({ path: 'personneManagement' })
          })
        } else {
          this.$message.error('添加失败')
        }
        this.isMark = false
      },  // 提交添加用户
      markCha() {
        this.isMark = false // 查询角色
      }, // 查询
      editmark() {
        this.iseditmark = false // 编辑角色
      },
      onsubmit() {
        var map = { 1: '超级管理员', 2: 'HRBP', 3: 'HR' }
        var obj = JSON.parse(JSON.stringify(this.editData))
        obj.roleId = this.radio3
        obj.roleName = map[this.radio3]
        editRole(obj).then(res => {
          getuserlist({ page: 1, size: 20 }).then(res => {
            var arr = res.result.list
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].enable === 1) {
                arr[i].enablestr = '使用中'
              } else {
                arr[i].enablestr = '禁用'
              }
            }
            this.tableData = arr
            this.pagination.size = res.result.pageSize
            this.pagination.total = res.result.size
            this.iseditmark = false
          })
        })
      }  // 编辑角色提交
    }
  }
</script>
<style lang="scss" src="./PersonneManagement.scss">
  .PersonneManagement-wrapper {
    margin-top: 20px;
    .PersonneManagement-wrapper-head {
      // height: 50px;
      // margin: 23px 0;
      .PersonneManagement-head-title {
        display: inline-block;
        width: 80px;
        border-left: 2px solid #2d8cf0;
        font-size: 16px;
        padding-left: 8px;
      }
    }
    .PersonneManagement-wrapper-main {

      padding: 10px 10px 80px 10px;
      box-sizing: border-box;
      .PersonneManagement-main-search {
        float: right;
      }
      .pages {
        float: right;
        margin-top: 30px;
      }
    }
  }
</style>
