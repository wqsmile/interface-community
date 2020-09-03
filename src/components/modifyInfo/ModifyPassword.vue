<template>
  <!-- <div class="m-pwd">
    <div>
      <label for="oldPwd">原 密 码</label>
      <div>
        <el-input placeholder="请输入原密码" v-model="oldPwd" show-password></el-input>
      </div>
    </div>
    <div>
      <label for="oldPwd">新 密 码</label>
      <div>
        <el-input placeholder="请输入新密码" v-model="newPwd" show-password></el-input>
      </div>
    </div>
    <div>
      <label for="oldPwd">确认密码</label>
      <div>
        <el-input placeholder="请再次输入新密码" v-model="rePwd" show-password></el-input>
      </div>
    </div>
    <el-button type="primary" @click="submit" class="btn">提交</el-button>
  </div>-->
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原 密 码" prop="oldPwd">
        <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新 密 码" prop="newPwd">
        <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePwd">
        <el-input type="password" v-model="ruleForm.rePwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/http/api.js'

export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      }
      else {
      //   if (this.ruleForm.oldPwd !== '') {
      //     this.$refs.ruleForm.validateField('oldPwd');
      //   }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      }
      else {
        if (value.length < 6) {
          callback(new Error('密码长度不小于6位'));
        } else if (this.ruleForm.newPwd !== '') {
          this.$refs.ruleForm.validateField('rePwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        rePwd: ''
      },
      rules: {
        oldPwd: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        rePwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          api.modifyPassword(this.ruleForm.oldPwd, this.ruleForm.newPwd).then(res => {
            console.log(res);
            if (res.errorCode) {
              alert('旧密码错误')
            } else {
              this.$router.push('/login')
            }
            // this.$router.push('/login')
          })
        } else {
          alert('密码输入有误，请重新核对');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
  // submit() {
  //   if (this.oldPwd !== '' && this.newPwd !== '' && this.rePwd === this.newPwd) {
  //     api.modifyPassword(this.oldPwd, this.newPwd).then(res => {
  //       console.log(res);
  //       this.$router.push('/login')
  //     })
  //   } else {
  //     alert('密码不能为空')
  //   }
  // }
}
</script>

<style lang='less' scoped>
.el-input {
  width: 250px;
}
// .m-pwd {
//   display: inline-block;
//   text-align: center;
//   > div {
//     display: flex;
//     width: 300px;
//     justify-content: space-between;
//     align-items: center;

//     > div {
//       width: 200px;
//       margin: 10px;
//     }
//   }
// }
</style>