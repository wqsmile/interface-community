<template>
  <div>
    <div
      class="show-name"
      @mouseenter="showLogout = username !== undefined ? true : false"
      @mouseleave="showLogout = false"
    >
      <router-link
        v-if="username"
        :to="{ name: 'user' }"
      >
        <span>
          {{ username }}
        </span>
      </router-link>
      <span v-else @click="toLogin" class="click-login">点击登录</span>
      <div
        class="exit"
        @click="logout"
      >退出</div>
    </div>
    <!-- @mouseenter="showLogout = username !== undefined ? true : false" -->
    <div
      class="show-menu"
      @mouseenter="showLogout = username !== undefined ? true : false"
      @mouseleave="showLogout = false"
    >
      <span
        class="iconfont icon-caidan"
      ></span>
      <div
        class="show-logout show-header-nav"
        :class="{ 'show': showLogout }"
      >
        <header-nav-area :headerNav="headerNav" />
        <div
          class="logout"
          @click="logout"  
        >
          退出
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import cookie from '@/utils/cookie.js'
import api from '@/http/api.js'
import HeaderNavArea from '@/components/HeaderNavArea.vue'

export default {
  components: {
    HeaderNavArea
  },
  data() {
    return {
      username: '',
      showLogout: false,
      headerNav: [
        { name: '个人', toName: 'user', isActive: this.$route.name === 'user' },
        { name: '首页', toName: 'defaultPage', isActive: this.$route.name === 'defaultPage' || this.$route.name === 'main' },
        { name: '社区', toName: 'community', isActive: this.$route.name === 'community' },
      ],
    }
  },
  methods: {
    async logout() {
      if (this.username === undefined) return
      const flag = confirm('确定登出吗')
      if (!flag) {
        return
      }
      const res = await api.loginValid()
      if (res.status === 200) {
        const isLogout = await api.logout()
        if (isLogout.status === 200) {
          localStorage.clear()
          cookie.remove('authorization')
          this.$router.push('/login')
          // if (this.$route.name !== 'community') {
          //   this.$router.push({
          //     name: 'community'
          //   })
          // }
          // this.$router.go(0)
        }
      }
    },
    toLogin() {
      this.$router.push({
        name: 'login'
      })
    }
  },
  computed: {
    // username() {
    //   return cookie.get('username')
    // }
  },
  created() {
    const authorization = localStorage.getItem('authorization')
    if (authorization) {
      api.getUserInfo().then(res => {
        // console.log(res);
        this.username = res.data.username
      })
    } else {
      // alert('请先登录')
      // this.$router.push('/login')
    }

  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.show-name {
  padding: 0 10px;
  display: flex;
  .exit {
    margin-left: 10px;
    cursor: pointer;
  }
  .click-login {
    cursor: pointer;
  }
}
.show-menu {
  display: none;
  // border: 1px solid #000;
  position: relative;
  .icon-caidan {
    font-size: 25px;
    cursor: pointer;
  }
}
@media screen and (max-width: 886px) {

  .show-menu {
    display: block;
    text-align: center;
    .show-logout {
      right: 0;
    }
    // width: 80px;
    // border: 1px solid #000;
  }
  .show-name {
    display: none;
  }
}
// .show-name {
//   display: none;
// }
a span {
  color: @fColor;
  font-size: 20px;
}
.show-logout {
  // position: absolute;
  position: relative;
  right: -18px;
  top: -2px;
  background: @bgColor;
  // margin-right: -20px;
  width: 80px;
  text-align: center;
  transition: height .3s linear;
  border-radius: 0 0 10px 10px;
  z-index: 1000;
  overflow: hidden;
  cursor: pointer;
  height: 0;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, .5);
  &.show {
    // height: 50px;
    height: auto;
  }
  .logout {
    &:hover {
      background: @hBgColor;
    }
  }
  
}
</style>
