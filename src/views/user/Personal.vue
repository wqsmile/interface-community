<template>
  <div class="personal">
    <div class="self-info">
      <common-profile :imgSrc="person.profile" width="80px" :hasBorder="true" />
      <div class="self-info-1">
        <p class="name">{{person.name}}</p>
        <p class="score">积分:{{person.score}}</p>
        <p class="level">等级:{{person.level}}</p>
      </div>
    </div>
    <!-- 个人详细信息 -->
    <div class="self-details">
      <ul>
        <li
          v-for="item in selfDetails"
          :key="item.name"
        >
          <router-link :to="{ name: item.name, params: { name: item.name } }">
            <span
              class="iconfont"
              :class="item.icon"
            />
            <span class="name">
              {{ item.value }}
            </span>
            <span
              class="num"
              v-if="item.num || item.num === 0"  
            >
              {{ item.num }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import CommonProfile from '@/components/CommonProfile.vue'
import cookie from '@/utils/cookie.js'
import api from '@/http/api.js'

export default {
  components: {
    CommonProfile
  },
  data() {
    return {
      person: {
        profile: 'profile.png',
        name: cookie.get('username'),
        score: 20,
        level: 1
      },
      selfDetails: [
        {
          value : '修改资料',
          name: 'modifyInfo',
          icon: 'icon-xiugaiziliao'
        },
        {
          value : '我的文章',
          name: 'myArticle',
          icon: 'icon-wenzhang'
        },
        {
          value : '我的消息',
          name: 'myMessage',
          icon: 'icon-xiaoxi',
          num: 1
        },
        {
          value : '我的私信',
          name: 'privateMessge',
          icon: 'icon-sixin',
          num: 0
        },
        {
          value : '我的收藏',
          name: 'myCollection',
          icon: 'icon-wodeshoucang'
        },
        {
          value : '申请认证',
          name: 'applyCertification',
          icon: 'icon-renzheng'
        },
      ]
    }
  },
  created() {
    api.getUserInfo().then(res => {
      // console.log(res);
      this.person.name = res.data.username
      this.person.profile = res.data.photo
    })
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.personal {
  width: 212px;
  height: 352px;
  background: #fff;
  border-right: 3px solid #E1ECEE;

  .self-info {
    display: inline-flex;
    padding: 10px;
    .self-info-1 {
      margin-left: 10px;
      .name {
        margin-bottom: 20px;
      }
      .score,
      .level {
        font-size: 14px;
        color: @fColor;
        margin: 4px 0;
      }
    }
  }
  .self-details {
    padding: 20px 0;
    ul {
      li {
        font-size: 14px;
        cursor: pointer;

        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 8px 35px;
          box-sizing: border-box;
        }

        &:hover {
          background: #ddd;
        }
        .iconfont {
          margin-right: 3px;
        }
        .num {
          margin-left: 20px;
          padding: 3px 10px;
          background: @tColor;
          color: #f5f5f5;
        }
      }
    }
  }
}
</style>
