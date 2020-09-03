<template>
  <div class="home">
    <header class="header">
      <breathe-header />
    </header>
    <!-- 主内容区 -->
    <main>
      <transition name="app" mode="out-in">
        <router-view />
      </transition>
    </main>
    <!-- 底部 -->
    <footer>
      <breathe-footer />
    </footer>
  </div>
</template>

<script>
import BreatheHeader from './header/Header.vue'
import BreatheFooter from './footer/Footer.vue'

export default {
  name: 'Home',
  components: {
    BreatheHeader,
    BreatheFooter
  }
}
</script>

<style lang='less' scoped>
</style>
