<template>
  <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
          <Card :bordered="false">
              <p slot="title">
                  <Icon type="log-in"></Icon>
                  尚德机构招聘系统
              </p>
              <div class="form-con">
                  <Form ref="loginForm" :model="loginForm" :rules="rules">
                      <FormItem prop="email">
                          <Input v-model="loginForm.email" placeholder="请输入用户名">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                          </Input>
                      </FormItem>
                      <FormItem prop="password">
                          <Input type="password" v-model="loginForm.password" @keyup.enter.native="handleLogin" placeholder="请输入密码">
                              <span slot="prepend">
                                  <Icon :size="14" type="locked"></Icon>
                              </span>
                          </Input>
                      </FormItem>
                      <FormItem>
                          <Button @click="handleLogin" type="primary" long>登录</Button>
                          <span v-if="isLogin" style="color:red; font-size:12px;">账号或是密码错误！！</span>
                      </FormItem>
                  </Form>
              </div>
          </Card>
      </div>
  </div>
</template>
<script>
import { LOG_IN } from '@/store/modules/user/actionTypes'
import { loginUserInfo } from '../../api/loginApi/user.js'
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      this.isLogin = false
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      radio: '1',
      isLogin: false, //  控制报错文字的提示显示
      loginForm: {  //  表单的数据
        email: '',
        password: ''
      },
      urlList: [],
      rules: { //  验证
        email: [{ required: true, message: '请输入账号', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱账号地址', trigger: 'blur' }],
        password: [{ trigger: 'blur', validator: validatePass }]
      },
      loading: false  //  加载动画
    }
  },
  methods: {
    handleLogin() {   //  点击登录
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch(LOG_IN, this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/layout/home' })
            loginUserInfo()
            .then(res => {
              this.urlList = res.result.loginUser.sysResources
              localStorage.setItem('urlList', JSON.stringify(this.urlList))
            })
          }).catch(() => {
            this.loading = false
            this.isLogin = true
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" >
    @import './login.less';
</style>
