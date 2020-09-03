<template>
  <div class="common-comment">
    <ul>
      <li
        v-for="comment in coms"
        :key="comment.comment_id"
      >
        <span class="username">
          {{ comment.username }}
          <span class="pub-time">{{ comment.create_time }}</span>
          <br>
        </span>
        {{ comment.content }}
        <span
          class="com"
          @click="comHim(comment.comment_id)"
          v-if="num < 4"
        >
          回复ta
        </span>
        <div class="publish-com" v-if="isOpenComment[comment.comment_id]">
          <div class="textarea">
            <el-input
              type="textarea"
              autosize
              placeholder="欢迎评论"
              v-model="comContent"
            >
            </el-input>
          </div>
          <span
            class="btn"
            @click="publishCom(comment.comment_id)"
          >发表评论</span>
        </div>
        <keep-alive>
          <!--             :commentNum="++num" -->
          <base-comment
            :comments="comment.children"
            :a_id="+article_id"
            class="ml"
            :commentNum="num + 1"
            v-if="num < 3"
          />
        </keep-alive>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/http/api.js'

export default {
  name: 'base-comment',
  props: {
    comments: {
      
    },
    commentNum: {
      type: Number,
    },
    a_id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isOpenComment: [],
      // coms: this.comments,
      article_id: this.$route.params.article_id,
      comContent: '',
      num: this.commentNum
    }
  },
  methods: {
    // 点击显示发表回复ta
    comHim(c_id) {
      this.$set(this.isOpenComment, c_id, !this.isOpenComment[c_id])
    },
    // 发布评论
    publishCom(c_id) {
      if (this.comContent) {
        // console.log(c_id, this.coms);
        api.addComment2(c_id, this.article_id, this.comContent).then(res => {
          this.comContent = ''
          this.$router.go(0)
        })
      }

    }
  },
  computed: {
    coms() {
      // console.log(this.comments);
      return this.comments
    }
  }
}
</script>

<style lang='less' scoped>
.common-comment {
  ul {
    font-size: 14px;
    line-height: 26px;
    li {
      margin: 4px 0;
      .username {
        color: #666;
        .pub-time {
          float: right;
        }
      }
      .com {
        font-size: 12px;
        cursor: pointer;
        float: right;
        background: #79a7f2;
        border-radius: 4px;
        color: #eee;
        padding: 0px 4px;
        .iconfont {
          margin-left: 2px;
          font-size: 10px;
        }
        &:hover {
          color: #fff;
        }
      }
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
          padding: 3px 15px;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          white-space: nowrap;
        }
      }


    }
  }
}
.ml {
  // border: 1px solid;
  padding-left: 20px;
}
</style>
