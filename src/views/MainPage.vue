<template>
  <div
    class="interface"
  >
    <!-- 接口展示页 -->
    <div class="have-interface">
      <ul>
        <router-link
          v-for="item in interfaces"
          :key="item.id"
          :to="{ name: 'documentDetails', params: { id: item.id } }"
        >
          <li
            :style="{background: item.bgColor}"
          >
            <p class="i-id">{{ item.id }}</p>
            <p class="i-name">{{ item.name }}</p>
            <p class="i-desc">
              <span>{{ item.description }}</span>
            </p>
          </li>
        </router-link>
      </ul>
    </div>
    <!-- 用户没有接口时 -->
    <div class="no-interface" v-if="interfaces.length === 0">
      你还没有创建任何接口
    </div>
  </div>
</template>

<script>
import api from '@/http/api.js'
import Mock from 'mockjs'

export default {
  data() {
    return {
      interfaces: [],
      datas: [],
    }
  },
  created() {
    api.getHome().then(res => {
      // console.log(res);
      if (res) {
        // this.interfaces = res.data
        this.interfaces = res.data
        this.interfaces = this.interfaces.map(item => {
          item.bgColor = Mock.mock('@color')
          return item
        })
        // console.log(this.interfaces);
      }
    })
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';
.interface {
  position: relative;
  width: 90%;
  background: #fff;
  border-radius: 10px;
  margin: 40px auto;
  // box-shadow: 0 0 10px rgba(0, 0, 0 ,.5);

  .have-interface {
    ul {
      display: flex;
      // justify-content:stretch;
      flex-wrap: wrap;
      padding: 10px 20px;
      // width: 100%;
      li {
        width: 400px;
        height: 200px;
        margin: 15px 11px;
        padding: 15px;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        background: @bgColor;
        text-align: center;

        p {
          margin: 5px auto;
        }

        .i-id {
          text-align: center;
          font-size: 20px;
          margin: 5px auto;
        }
        .i-name {
          font-size: 20px;
        }
        .i-desc {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;

          span {
            line-height: 25px;
          }
        }
      }

    }

  }

  .no-interface {
    position: relative;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
@media screen and (max-width: 1920px) {
  .interface {
    width: 1730px;
  }
}
@media screen and (max-width: 1900px) {
  .interface {
    width: 1310px;
  }
}
@media screen and (max-width: 1310px) {
  .interface {
    width: 886px;
  }
}
@media screen and (max-width: 886px) {
  .interface {
    width: 464px;
  }
}
</style>
