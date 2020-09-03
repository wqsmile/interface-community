<template>
  <div class="community">

    <!-- 话题 -->
    <div class="topic">
      <ul>
        <li>
          <span class="iconfont icon-quanbu"></span>
        </li>
        <li
          v-for="(topic, index) in topics"
          :key="topic.theme_name"
          :class="{ 'active': topicActive[index] }"
          @click="changeTopic(index, topic.id, topic.count_article)"
        >
          <span class="name">{{ topic.theme_name }}</span>
          <span class="num">{{ topic.count_article || 0 }}</span>
        </li>
      </ul>
    </div>
    
    <div class="mess-pub">
      <!-- 置顶消息 -->
      <div class="top-message">
        <span class="top">顶</span>
        <ul>
          <li
            v-for="message in topicMessages"
            :key="message.id"
          >
            <span class="title">{{ message.title }}</span>
            <span class="time">{{ message.time }}</span>
          </li>
        </ul>
      </div>
      <div class="pub0">
        <!-- 发表话题 -->
        <!-- <div class="pub" @click="isShowPublish = true">
          发布文章
        </div> -->
        <router-link
          class="pub"
          :to="{ name: 'articlePublish' }"
        >
          发布文章
        </router-link>
        <!-- 社区名字 -->
        <h1>BREATHE</h1>
      </div>

      <!-- <article-publish
        @close-publish="isShowPublish = false"
        v-if="isShowPublish"
        :topics="topics"
      /> -->
    </div>

    <!-- 详情 -->
    <div class="details">
      <!-- 菜单 -->
      <div class="menu">
        <ul>
          <li
            v-for="(item, index) in detailsMenu"
            :key="item.id"
            :class="{'active': menuActive[index]}"
            @click="changeMenu(index)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <!-- 交流区 -->
      <div class="com-area">
        <communication-area
          :communications="communications"
          :currentPage="{
            limit: pageData.limit,
            current: pageData.current
          }"
        />
      </div>
    </div>
    <!-- 交流区翻页 -->
    <div class="com-paging" v-if="pageData.total">
      <com-paging
        :pageDatas="pageData"
        @change-page="changePage($event)"
      />
    </div>
  </div>
</template>

<script>
import ArticlePublish from '@/components/ArticlePublish.vue'
import CommunicationArea from '@/components/CommunicationArea.vue'
import ComPaging from '@/components/Paging.vue'
import api from '@/http/api.js'
import { getRandom } from '@/utils/func.js'

export default {
  components: {
    ArticlePublish,
    CommunicationArea,
    ComPaging
  },
  data() {
    return {
      isShowPublish: false,
      topics: [],
      topicActive: [],
      topicMessages: [],
      detailsMenu: [
        {
          id: 1,
          title: '最新回复'
        },
        {
          id: 2,
          title: '最新发布'
        },
        {
          id: 3,
          title: '精品区'
        },
      ],
      menuActive: [],
      communications: [],
      pageData: {
        current: 1, // 当前第几页
        limit: 8, // 每页显示多少条数据
        total: 20, //总共多少条数据
        pageNum: 5, // 每次显示多少页
      },
      currentThemeId: null,
      article_count: 0
    }
  },
  methods: {
    // 改变主题
    changeTopic(index, id, article_count) {
      this.topicActive.fill(false)
      this.$set(this.topicActive, index, true)
      this.article_count = article_count
      this.pageData.total = this.article_count

      this.currentThemeId = id;
      this.changeMenu(0)
    },
    // 改变某主题中的菜单("最新回复", "最新发布"等)
    changeMenu(index) {
      this.menuActive.fill(false)
      this.$set(this.menuActive, index, true)
      if (index === 0) {
        this._changeMenu(this.currentThemeId)
      } else if (index === 1) {
        this._changeMenu(this.currentThemeId, 'new')
      } else if (index === 2) {
        this._changeMenu(this.currentThemeId, 'good')
      }
      // 更换当前主题的列表类型时，跳转到第一页
      this.changePage(1)
    },
    _changeMenu(currentThemeId, type = '') {
      if (this.currentThemeId) {
        this.getThemeArticle(this.currentThemeId, type)
      } else {
        this.getArticles(type)
      }
    },
    // 改变当前页码
    changePage(e) {
      this.$set(this.pageData, 'current', e)
    },
    // 获取主题列表某类型的文章
    getThemeArticle(id, type = '') {
      api.getThemeArticle(id, type).then(res => {
        // console.log(res);
        if (res.data) {
          this.communications = res.data
          this.pageData.total = this.communications.length
        } else {
          this.communications = []
          this.pageData.total = 0
        }

      })
    },
    // 获取全部文章
    getArticles(type = '') {
      api.getAllArticle(type).then(res => {
        // console.log('getAllArticle', res);
        this.communications = res.data
        // this.topics[0].article_count = this.communications.length
        this.pageData.total = this.communications.length
      })
    }
  },
  created() {
    this.topicActive = new Array(this.topics.length)
    this.topicActive.fill(false)
    this.topicActive[0] = true

    this.menuActive = new Array(this.detailsMenu.length)
    this.menuActive.fill(false)
    this.menuActive[0] = true

    this.getArticles()

    api.getTalkTheme().then(res => {
      // console.log('主题', res);
      this.topics = res.data.themeArticle
      this.topics.unshift({
        description: "这里是社区所有文章",
        id: 0,
        theme_name: res.data.allArticle.theme_name,
        count_article: res.data.allArticle.article_count
      })
    })
    api.getTopArticle().then(res => {
      this.topicMessages = res.data.map(item => {
        let y = getRandom(1, 12)
        let d = getRandom(1, 31)
        y = y < 10 ? '0' + y : y
        d = d < 10 ? '0' + d : d
        item.time = y + '-' + d
        return item
      })

    })
  }
}
</script>

<style lang='less' scoped>
.community {
  max-width: 1000px;
  min-width: 800px;
  margin: 10px auto;

  .topic {
    height: 82px;
    // border: 1px solid #ccc;
    background: #eee;

    ul {
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      padding-top: 10px;

      li {
        margin: 5px 12px;
        font-size: 14px;
        cursor: pointer;
        border-bottom: 1px solid transparent;

        &:not(:nth-child(1)):hover:not([class='active']) {
          border-bottom-color: #79a7f2;
          color: #79a7f2;
          .num {
            color: #79a7f2;
          }
        }
        &.active {
          margin: 0;
          padding: 5px 10px;
          background: #79a7f2;
          border-radius: 10px;
          color: #fff;
          .num {
            color: #fff;
          }
        }

        .name {
          padding-right: 15px;
        }
        .num {
          color: #ccc;

        }
        &:first-child {
          color: #999;
          cursor: auto;
        }
      }
    }
  }

  .mess-pub {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    .pub0 {
      margin-left: 10px;
      a.pub {
        display: inline-block;
        width: 240px;
        height: 60px;
        background: #79a7f2;
        color: #f5f5f5;
        font-weight: bold;
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        border-radius: 6px;
        cursor: pointer;
      }
      h1 {
        font-size: 50px;
        text-align: center;
        margin-top: 40px;
        color: #79a7f2;
        transform-style: preserve-3d;
        animation: breath 3s alternate infinite linear;
      }
      @keyframes breath {
        0% {
          // opacity: 0;
          transform: perspective(500px) translateY(-50px);
          text-shadow: 0 0 5px #ccc;
        }
        50% {
          transform: perspective(500px) translateZ(-50px);
          text-shadow: 0 0 0 #000;
        }
        100% {
          // opacity: 1;
          transform: perspective(500px) translateY(75px);
          text-shadow: 0 0 5px #ccc;
        }
      }
    }


    .top-message {
      position: relative;
      width: 720px;
      height: 192px;
      padding: 15px;
      border: 1px solid #ccc;

      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;

        li {
          padding: 5px 15px;
          font-size: 16px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          
          .title {
            border-bottom: 1px solid transparent;
          }
          .title:hover {
            border-bottom-color: #79a7f2;
            color: #79a7f2;
            cursor: pointer;
            .num {
              color: #79a7f2;
            }
          }
          .time {
            color: #666;
          }
        }
      }

      .top {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 18px;
        font-weight: bold;
        text-indent: 2px;
        color: #fff;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          border: 20px solid transparent;
          border-top-color: #fd7e14;
          border-left-color: #fd7e14;
          z-index: -1;
        }

      }
    }
  }


  .details {
    margin-top: 20px;
    border: 1px solid #ccc;

    .menu {
      ul {
        display: flex;
        background: #fafafa;

        li {
          padding: 15px;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          font-size: 20px;
          
          &.active,
          &:hover {
            background: #fff;
            border-bottom: none;
          }
          &:hover {
            color: #79a7f2;
            cursor: pointer;
          }
        }
      }
    }
  }

  .com-paging {
    margin: 20px;
  }
}
</style>
