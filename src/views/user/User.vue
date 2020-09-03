<template>
  <div class="user">
    <div class="base-info">
      <person-info />
    </div>
    <router-view></router-view>
  </div>  
</template>

<script>
import cookie from '@/utils/cookie.js'
import PersonInfo from './Personal.vue'

export default {
  components: {
    PersonInfo
  },
  data() {
    return {
      username: cookie.get('username')
    }
  }
}
</script>

<style lang='less' scoped>
.user {
  display: flex;
  width: 1000px;
  margin: 10px auto;
  border: 1px solid #ddd;
}
</style>
