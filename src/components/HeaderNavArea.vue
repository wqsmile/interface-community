<template>
  <div class="header-nav-area">
    <div
      v-for="(navItem, index) in headerNav"
      :key="navItem.name"
      @click="changeActive(index)"
    >
      <router-link
        :class="{ 'active': navItem.isActive}"
        :to="{ name: navItem.toName }"
      >
        {{ navItem.name }}
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    headerNav: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // headerNav: [
      //   { name: '首页', toName: 'defaultPage', isActive: this.$route.name === 'defaultPage' || this.$route.name === 'main' },
      //   { name: '社区', toName: 'community', isActive: this.$route.name === 'community' },
      // ],
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

.header-nav-area {

  // position: relative;
  // height: 60px;
  // line-height: 60px;
  // background: rgb(121, 167, 242);
  display: flex;
  height: 60px;
  // color: #f5f5f5;

  > div {
    &:hover {
      background: #ddd;
      cursor: pointer;
    }
  }

  a,
  .logout {
    display: inline-block;
    // width: 100px;
    height: 100%;
    width: 100%;
    color: @fColor;
    font-size: 20px;
    padding: 0 10px;

    &.active {
      color: @fColor;
      font-weight: 500;
    }
  }
  // .logout {
  //   position: absolute;
  //   right: 10px;
  //   cursor: pointer;
  // }

  // h1 {
  //   font-size: 35px;
  //   margin-left: 20px;
  //   cursor: pointer;
  //   color: #f5f5f5;
  // }

  // @media screen and (max-width: 768px) {
  //   .is-show-header {
  //     display: none;
  //   }
  // }
}

@media screen and (max-width: 886px) {
  .header-nav-area {
    flex-direction: column;
    height: auto;
    a,
    .logout {
      padding: 0;
    }
  }
}
</style>
