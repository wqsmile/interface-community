<template>
  <div class="modify-info">
    <div class="title">
      <span class="iconfont icon-zhanghushezhi"></span>
      <span>账户设置</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo"/>
      <el-tab-pane label="修改头像" name="modifyProfile"/>
      <el-tab-pane label="绑定同步" name="bindSync"/>
      <el-tab-pane label="修改密码" name="modifyPassword"/>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'baseInfo'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
        this.$router.push({
          name: tab.name,
          // params: { name: tab.name }
        })
      }
    }
  };
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.modify-info {
  width: 100%;
  padding: 20px;

  .title {
    margin-bottom: 20px;
    line-height: 20px;
    span {
      margin: 0 4px;
      color: @tColor;
      vertical-align: top;
    }
    .icon-zhanghushezhi {
      color: #666;
      font-size: 20px;
    }
  }
}
</style>
