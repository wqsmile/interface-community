<template>
  <div class="header">
    <router-link :to="{ name: 'defaultPage' }">
      <h1 @click="changeActive(0)">Breathe</h1>
    </router-link>
    <div class="is-show-header">
      <header-nav-area :headerNav="headerNav" />
    </div>
    <!-- <div
      v-for="(navItem, index) in headerNav"
      :key="navItem.name"
      @click="changeActive(index)"
      class="is-show-header"
    >
      <router-link
        :class="{ 'active': navItem.isActive}"
        :to="{ name: navItem.toName }"
      >
        {{ navItem.name }}
      </router-link>
    </div> -->
    <div class="logout">
      <breath-logout />
    </div>

  </div>
</template>

<script>
import BreathLogout from '@/components/Logout.vue'
import HeaderNavArea from '@/components/HeaderNavArea.vue'

export default {
  components: {
    BreathLogout,
    HeaderNavArea
  },
  data() {
    return {
      headerNav: [
        { name: '首页', toName: 'defaultPage', isActive: this.$route.name === 'defaultPage' || this.$route.name === 'main' },
        { name: '社区', toName: 'community', isActive: this.$route.name === 'community' },
      ],
    }
  },
  methods: {
    changeActive(index) {
      this.headerNav.forEach(item => this.$set(item, 'isActive', false));
      this.$set(this.headerNav[index], 'isActive', true);
    },
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.header {
  position: relative;
  height: 60px;
  line-height: 60px;
  background: @bgColor;
  display: flex;
  color: @fColor;

  a,
  .logout {
    color: @fColor;
    font-size: 20px;
    margin: 0 10px;
    &.active {
      color: #f5f5f5;
      font-weight: 500;
    }
  }
  .logout {
    position: absolute;
    right: -10px;
    // cursor: pointer;
  }

  h1 {
    font-size: 35px;
    margin-left: 20px;
    cursor: pointer;
    color: @fColor;
  }

  @media screen and (max-width: 886px) {
    .is-show-header {
      display: none;
    }
  }
}
</style>
