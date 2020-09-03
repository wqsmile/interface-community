<template>
  <div class="com-area">
    <ul>
      <li
        v-for="item in coms"
        :key="item.article_id"
      >
        <!-- 头像 -->
        <!-- <div class="profile"> -->
        <div>
          <common-profile :imgSrc="item.photo" width="45px" :hasBorder="true" />
          <!-- <img :src="require('@/assets/img/' + item.profile)" alt=""> -->
        </div>
        <!-- 文字区 -->
        <div class="message">
          <!-- 头部 -->
          <div class="header">
            <!-- 发帖类型 -->
            <!-- <span class="com">
              {{ item.type }}
            </span> -->
            <!-- 发帖标题 -->
            <router-link
              :to="{
                name: 'articleDetails',
                params: {
                  article_id: item.article_id
                }
              }"
            >
              <span class="title">
                {{ item.title }}
              </span>
            </router-link>

          </div>
          <!-- 浏览和评论数量 -->
          <div class="info">
            <span class="name">{{ item.username }}</span>
            <span class="browse">浏览：{{ item.browse }}</span>
            <span class="comment">
              评论：{{ item.reply }}
            </span>
            <span class="time">
              {{ item.create_time }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import CommonProfile from '@/components/CommonProfile.vue'

export default {
  components: {
    CommonProfile
  },
  props: {
    communications: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Object,
      required: true,
      default: () => ({
        limit: 5,
        current: 1
      })
    }
  },
  data() {
    return {
      // communication: this.communications,
      pageContent: this.currentPage
    }
  },
  computed: {
    coms() {
      let start = (this.currentPage.current - 1) * this.currentPage.limit
      return this.communications.slice(start, start + this.currentPage.limit)
    }
  }
}
</script>

<style lang='less' scoped>
.com-area {
  ul {
    padding: 10px 20px;

    li {
      display: flex;
      align-items: center;
      height: 82px;
      padding: 10px 0;
      border-bottom: 1px dashed #ccc;
      box-sizing: border-box;
      .profile {
        border: 1px solid #ccc;
        padding: 1px;

        img {
          width: 45px;
          height: 45px;
          vertical-align: middle;
        }
      }

      .message {
        margin-left: 20px;
        line-height: 25px;
        color: #333;
        width: 100%;

        .header {
          .com {
            margin-right: 20px;
          }
          .com:hover,
          .title:hover {
            border-bottom: 1px solid;
            border-bottom-color: #79a7f2;
            color: #79a7f2;
            cursor: pointer;
          }
        }

        .info {

          span {
            margin-right: 20px;
            font-size: 14px;
          }
          .name,
          .browse {
            color: #999;
          }
          .comment:hover {
            border-bottom: 1px solid;
            border-bottom-color: #79a7f2;
            color: #79a7f2;
            cursor: pointer;
          }
          .time {
            float: right;
          }
          
        }
      }
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
