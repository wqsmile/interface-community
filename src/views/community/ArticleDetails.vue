<template>
  <div class="details">
    <!-- 左边 -->
    <div class="left">
      <!-- 标题 -->
      <h2 class="title" :title="details.title">
        {{ details.title }}
      </h2>
      <!-- 文章发布时间，浏览数，回复数等 -->
      <div class="info">
        <span v-if="details.create_time">
          <span class="iconfont icon-shijian"></span>
          {{ details.create_time }}
        </span>
        <span>
          <span class="iconfont icon-liulan"></span>
          {{ details.browse }}
        </span>
        <span>
          <span class="iconfont icon-pinglun"></span>
          {{ details.reply }}
        </span>
      </div>
      <!-- 文章内容 -->
      <p class="content">
        <span class="show-author">
          <span class="iconfont icon-zuozhe"></span>
          {{ details.username}}
        </span>
        {{ details.content }}
      </p>
      <!-- 评论区 -->
      <div class="comment" v-if="details.iscomment">
        <div class="publish-com">
          <div class="textarea">
            <el-input
              type="textarea"
              autosize
              placeholder="欢迎评论"
              v-model="comContent"
              ref="comInput"
            >
            </el-input>
          </div>
          <span
            class="btn"
            @click="publishCom(article_id)"
          >发表评论</span>
        </div>
        <article-comment
          :comments="comments"
          :a_id="+article_id"
          :commentNum="1"
        />
      </div>
      <div class="no-com" v-else>此文章不开启评论</div>

    </div>
    <!-- 右边 -->
    <div class="right">
      <!-- 作者信息 -->
      <div class="user">
        <!-- 头像 -->
        <div>
          <common-profile :imgSrc="details.photo" width="45px" :hasBorder="true" />
        </div>
        <!-- 名称 -->
        <div class="name">
          {{ details.username}}
        </div>
      </div>
      <!-- 资讯列表 -->
      <div class="message">
        <!-- 资讯列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/http/api.js'
import CommonProfile from '@/components/CommonProfile.vue'
import ArticleComment from '@/components/ArticleComment.vue'

export default {
  components: {
    CommonProfile,
    ArticleComment
  },
  data() {
    return {
      details: {},
      content: '',
      comments: [],
      comContent: '',
      article_id: this.$route.params.article_id
    }
  },
  methods: {
    publishCom(a_id) {
      if (this.comContent) {
        api.addComment(a_id, this.comContent).then(res => {
          this.comContent = ''
          this.$router.go(0)
        })
      }
    }
  },
  created() {
    // 获取文章内容
    api.getArticleContent(this.article_id).then(res => {
      // console.log(123,res);
      this.details = res.data
    })
    // 获取文章评论
    api.getArticleComment(this.article_id).then(res => {
      // console.log('getArticleComment', res);
      this.comments = res.data
    })
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.details {
  max-width: 1000px;
  margin: 20px auto;
  // border: 1px solid @borderColor;
  display: flex;
  // background: @bgColor;

  .left {
    width: 70%;
    min-width: 300px;
    // border-right: 1px solid @borderColor;

    .title {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // border-bottom: 1px solid @borderColor;
    }
    .info {
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: @bgColor;
      margin-bottom: 10px;
      color: #999;
      // border-bottom: 1px solid @borderColor;
      span {
        margin: 5px;
      }
    }
    .content {
      min-height: 200px;
      border-bottom: 1px dashed @borderColor;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 20px;
      font-size: 15px;
      .show-author {
        display: none;
      }
    }
    .comment {
      min-height: 200px;
      padding: 10px;
      box-sizing: border-box;
      .publish-com {
        display: flex;
        align-items: flex-end;
        font-size: 12px;
        margin-bottom: 15px;
        .textarea {
          width: 600px;
        }
        .btn {
          background: #79a7f2;
          color: #fff;
          padding: 8px 15px;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          white-space: nowrap;
        }
      }
    }

  }
  
  .right {
    width: 25%;
    min-width: 160px;
    margin-left: 5%;

    .user {
      height: 200px;
      border: 1px solid @borderColor;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .name {
        margin-top: 10px;
      }
    }

    .message {
      padding: 10px;
    }
  }
  @media screen and (max-width: 460px) {
    .right {
      display: none;
    }
    .left {
      width: 100%;
      .title {
        font-size: 16px;
      }
      .content {
        .show-author {
          display: block;
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
