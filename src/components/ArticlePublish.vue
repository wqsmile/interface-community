<template>
  <div class="publish">
    <div class="publish-form">
      <!-- 关闭弹窗 -->
      <span class="iconfont icon-guanbi" @click="$router.push({name: 'community'})" />
      <!-- 主题选择 -->
      <div class="theme">
        <div class="topic">
          <label>主题选择</label>
          <div>
            <el-select v-model="value" filterable placeholder="请选择一个主题">
              <el-option
                v-for="item in topic"
                :key="item.id"
                :label="item.theme_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>

        </div>
        <div class="title">
          <label>标题</label>
          <div class="title-input">
            <el-input
              placeholder="请输入文章标题"
              v-model="title"
              maxlength="40"
              clearable
            >
            </el-input>
          </div>

        </div>

      </div>
      <!-- 文章编辑 -->
      <div class="md">
        <mavon-editor :toolbarsFlag="false" :subfield="false" v-model="mdValue" />
      </div>
      <div class="is-comment">
        <input type="checkbox" v-model="isComment" name="is-c">
        <label for="is-c">开启评论</label>
      </div>
      <div class="submit">
        <button @click="submit">立即发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import api from '@/http/api.js'

export default {
  components: {
    mavonEditor
  },
  // props: {
  //   topics: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data() {
    return {
      mdValue: '',
      value: '',
      title: '',
      // topic: this.topics.slice(1),
      topic: [],
      isComment: true
    }
  },
  methods: {
    submit() {
      if (this.value !== '' && this.title !== '' && this.mdValue !== '') {
        this.isComment = this.isComment ? 1 : 0
        api.publishArticle(this.value, this.title, this.mdValue, this.isComment).then(res => {
          // this.$emit('close-publish')
          this.$router.push({
            name: 'community'
          })
          this.$router.go(0)
        })
      } else {
        alert('文章主题, 标题和内容不能为空')
      }
    }
  },
  created() {
    api.getTalkTheme().then(res => {
      // console.log('主题', res);
      this.topic = res.data.themeArticle
    })
  }
}
</script>

<style lang='less' scoped>
.publish {
  .publish-form {
    position: relative;
    left: 50%;
    // top: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1200px;
    min-width: 364px;
    height: 645px;
    background: #fff;
    // border: 1px solid;
    z-index: 100;
    padding: 40px 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .topic {
      width: 340px;
    }

    .theme {
      display: inline-flex;
      justify-content: space-between;
      label {
        margin-right: 20px;
      }
      .title {
        display: inline-flex;
        align-items: center;
        width: 340px;
        .title-input {
          width: 280px;
        }
      }
    }
    @media screen and (max-width: 836px) {
      .theme {
        flex-direction: column;
        align-items: center;
      }
      .topic,
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
      }
      .topic > div > .el-select {
        width: 250px;
      }
      .title > .title-input {
        width: 250px !important;
        // margin-left: 38px; 
      }
    }

    .md {
      .v-note-wrapper {
        height: 400px;
      }
    }
    .submit {
      button {
        width: 180px;
        height: 40px;
        outline: none;
        border: none;
        background: #79a7f2;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .icon-guanbi {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
      color: #999;
      font-size: 20px;
    }
  }
  // &::before {
  //   content: "";
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: rgba(0, 0, 0, 0.3);
  //   z-index: 1;
  // }
}
</style>
