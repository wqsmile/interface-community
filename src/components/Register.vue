<template>
  <div class="bg">
    <form action="#" class="login">
      <h2>Struggle Breathe.</h2>
      <!-- 用户名 -->
      <div class="username login-input">
        <span class="iconfont icon-user"></span>
        <input
          type="text"
          placeholder="Enter your qq email, get password"
          v-model="username"
          @blur="validateN"
        >
        <p v-if="validateName">{{ nameTip }}</p>
      </div>
      <!-- 密码 -->
      <div class="password login-input">
        <span class="iconfont icon-mima"></span>
        <input
          type="password"
          placeholder="Enter your password"
          v-model="password"
          @blur="validateP"
        >
        <p v-if="validatePwd">{{ pwdTip }}</p>
      </div>
      <!-- 已有密码 -->
      <div class="forget-pwd had-pwd">
        <router-link :to="{ name: 'login' }">If you have the password, click here login</router-link>
      </div>
      <!-- 注册 -->
      <div class="login-btn send-btn">
        <button @click="submit">Send Email</button>
      </div>
    </form>
  </div>
</template>

<script>
import cookie from '@/utils/cookie'
import api from '@/http/api.js'

export default {
  data() {
    return {
      username: '',
      password: '',
      validateName: false,
      validatePwd: false,
      nameTip: '',
      pwdTip: '',
      emailReg: null
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      if (this.username === '') {
        alert('邮箱不能为空')
        return
      }
      if (this.emailReg === null) {
        alert('邮箱格式不正确')
        return
      }

      api.registerEmail(this.username, this.password).then(res => {
        if (res) {
          this.$router.push({
            name: 'login'
          })
        }
      })

    },
    validateN() {
      if (this.username === '') {
        this.nameTip = '邮箱不能为空'
        this.validateName = true
      } else {
        this.validateName = false
      }
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
      this.emailReg = this.username.match(reg)
      // console.log(emailReg);
      if (this.username !== '' && this.emailReg === null) {
        this.nameTip = '邮箱格式不正确'
        this.validateName = true
      }
    },
    validateP() {
      if (this.password === '') {
        this.pwdTip = '密码不能为空'
        this.validatePwd = true
      } else {
        this.validatePwd = false
      }
    }
  }
}
</script>

<style lang="less" scoped src="@/assets/css/login.less"></style>
