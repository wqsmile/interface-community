<template>
  <div class="base-info">
    <div class="header">
      <common-profile :imgSrc="selfInfo.profile" width="100px" :hasBorder="false" />
      <div class="signature">
        <div class="signature-show" v-if="selfInfo.signature">{{ selfInfo.signature }}</div>
        <p class="signature-show" v-else>暂无个性签名</p>
        <p class="modify"><span>修改签名</span></p>
      </div>

    </div>
    <div class="email">
      <span class="bind-email">绑定邮箱 {{ selfInfo.email }}</span>
      <p class="modify"><span>修改邮箱</span></p>
    </div>
  </div>
</template>

<script>
import CommonProfile from '@/components/CommonProfile.vue'
import api from '@/http/api.js'

export default {
  components: {
    CommonProfile
  },
  data() {
    return {
      selfInfo: {
        profile: 'profile.png',
        signature: '',
        email: '327645607@qq.com'
      }
    }
  },
  created() {
    api.getUserInfo().then(res => {
      this.selfInfo.profile = res.data.photo
    })
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.base-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px;

  .header {
    display: inline-flex;

    .signature {
      margin-left: 20px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .signature-show {
        width: 484px;
        height: 70px;
        line-height: 22px;
        background: @bgColor;
        padding: 5px;
        box-sizing: border-box;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

    }

  }

  .email {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .bind-email {
      color: #666;
      font-size: 18px;
    }
  }
  p.modify {
    font-size: 14px;
    text-align: right;
    // margin-top: 9px;
    span {
      background: @tColor;
      padding: 5px;
      cursor: pointer;
      color: #f5f5f5;
    }
  }
}

</style>
