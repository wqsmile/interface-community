<template>
  <div class="paging">
    <div
      class="first"
      :class="{'isFirst': min === 1}"
      @click="toFirst"
    >
      1...
    </div>
    <div
      class="pre"
      :class="{'isFirst': min === 1}"
      @click="toPre"
    >
      <span class="iconfont icon-zuoshuangjiantou"></span>
    </div>
    <ul class="pages">
      <li
        v-for="(page, index) in pageNum"
        :key="index"
        :class="{'current': pageDatas.current === index + min}"
        @click="$emit('change-page', index + min)"
      >
        {{ index + min }}
      </li>
    </ul>
    <div
      class="next"
      :class="{'isLast': max === pages}"
      @click="toNext"
    >
      <span class="iconfont icon-youshuangjiantou"></span>
    </div>
    <div class="last"
      :class="{'isLast': max === pages}"
      @click="toLast"
    >
      ...{{ pages }}
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    pageDatas: {
      type: Object
    }
  },
  data() {
    return {
      min: 0,
    }
  },
  methods: {
    toFirst() {
      if (this.min === 1) return
      this.$emit('change-page', 1)
      this.min = 1
    },
    toLast() {
      if (this.min === this.pages - this.pageNum + 1) {
        return
      }
      this.$emit('change-page', this.pages)
      this.min = this.pages - this.pageNum + 1
    },
    toPre() {
      if (this.min === 1) return;
      this.min -= this.pageNum
      if (this.min <= 0) this.min = 1
      this.$emit('change-page', this.min)
    },
    toNext() {
      if (this.min === this.pages - this.pageNum + 1) {
        return
      }
      this.min += this.pageNum
      if (this.min > this.pages - this.pageNum) {
        this.min = this.pages - this.pageNum + 1
      }
      this.$emit('change-page', this.min)
    }
  },
  computed: {
    max() {
      return this.min + this.pageNum - 1
    },
    pageNum() {
      return this.pages <= this.pageDatas.pageNum ? this.pages : this.pageDatas.pageNum
    },
    pages() {
      return Math.ceil(this.pageDatas.total / this.pageDatas.limit)
    }
  },
  created() {
    this.min = 1
  }
}
</script>

<style scoped>
.paging {
  display: flex;
}
.pages {
  display: flex;
}
.pages > li,
.paging > div {
  min-width: 20px;
  text-align: center;
  padding: 10px 12px;
  margin: 0 2px;
  background: #79a7f2;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 0 5px #ccc;
}

.paging > .first {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.paging > .last {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.paging > .isFirst,
.paging > .isLast {
  cursor: not-allowed;
  background: #ccc;
}
.pages > li.current {
  background: #007bff;
}
</style>
