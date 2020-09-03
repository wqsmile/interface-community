<template>
  <div class="document-details">
    <!-- 侧边栏 -->
    <div class="aside">
      <dl
        v-for="menu in asideMenu"
        :key="menu.name"
      >
        <dt @click="isShowSubMenu = !isShowSubMenu">
          <span class="iconfont icon-Group-" />
          {{ menu.name }}
          <span
            class="iconfont"
            :class="isShowSubMenu ? 'icon-jiantou8' : 'icon-youjiantou'"
          />
        </dt>
        <dd
          v-for="item in menu.file"
          :key="item.name"
          v-show="isShowSubMenu"
          @click="changeId(item.id)"
        >
          <!-- <span
            class="iconfont"
            :class="{'icon-youjiantou': isAsideActive[index]}"
          />-->
          {{ item.name }}
        </dd>
      </dl>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <div class="md">
        <mavon-editor codeStyle="vs" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" v-model="value" />
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
  data() {
    return {
      // aside: ['导航', '轮播图', '楼层'],
      isAsideActive: [],
      isShowSubMenu: true,
      value: '',
      asideMenu: [],
      domContent: []
    }
  },
  methods: {
    changeId(id) {
      const value = this.domContent.filter(item => {
        return item.id === id
      })[0];
      this.value = value.content
    }
  },
  created() {
    // this.aside.forEach((item, index) => {
    //   this.isAsideActive[index] = false
    // });
    // this.isAsideActive[0] = true
    // 获取文档页左侧菜单
    const id = +this.$route.params.id
    // console.log(id, typeof id);
    api.getDomMenu(id).then(res => {
      if (res.data) {
        this.asideMenu = res.data
        let flag = true
        this.asideMenu.forEach(item => {
          item.file.forEach(f => {
            api.getDomContent(f.id).then(res => {
              // console.log(res);
              if (flag) this.value = res.data.content
              flag = false
              this.domContent.push({
                id: f.id,
                content: res.data.content
              })
            })
          })
        })
      } else {
        this.value = '# ' + res.msg
      }

    })
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.document-details {
  display: flex;
  height: 100%;
  background: #f5f5f5;

  .aside {
    width: 200px;
    height: 100%;
    // border: 1px solid;

    dl {
      color: #333;
      padding-top: 20px;
      padding-right: 10px;

      dt {
        font-size: 15px;
        padding-left: 20px;
        padding-bottom: 10px;

        .icon-Group- {
          margin-right: 5px;
        }
        .icon-youjiantou,
        .icon-jiantou8 {
          font-size: 12px;
          float: right;
          margin-top: 2px;
        }
      }
      dd {
        font-size: 14px;
        padding: 10px;
        padding-left: 45px;
        cursor: pointer;
        &:hover {
          background: #ccc;
        }
      }
    }
  }

  .content {
    width: 100%;
    // border: 1px solid;
    background: #fff;
  }
}
</style>
