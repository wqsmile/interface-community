<template>
  <div class="modify-profile">
    <div class="profile">
      <common-profile :imgSrc="selfInfo.profile" width="100px" :hasBorder="true" />
      <button @click="submit" v-if="file">点击修改</button>

      <input type="file" accept="image/*" @change="handleFile">
      <!-- {{ profile }} -->
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
      selfInfo: {},
      file: null,
      picData: null
    }
  },
  methods: {
    submit() {
      this.picData = new FormData();
      this.picData.append('photo', this.file, this.file.name);
      // console.log(picData);
      api.modifyProfile(this.picData).then(res => {
        // console.log(res);
        this.$router.go(0)
      })
    },
    handleFile: function (e) {
      let target = e.target || e.srcElement
      let file = target.files[0]
      this.file = file

      // console.log(file);
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.selfInfo.profile = res.result
      }
      reader.readAsDataURL(file)
    },
  },
  created() {
    api.getUserInfo().then(res => {
      // console.log(res);
      // this.selfInfo.profile = res.data.photo
      this.$set(this.selfInfo, 'profile', res.data.photo)
    })
  }
}
</script>

<style lang='less' scoped>
@import '~@/assets/css/common.less';

.modify-profile {
  .profile {
    // border: 1px solid;
    display: inline-flex;
    // flex-direction: column;
    align-items: flex-end;

    button,
    input {
      margin-left: 20px;
    }
  }
}

</style>
