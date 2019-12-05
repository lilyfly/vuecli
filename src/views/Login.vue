<template>
  <div class="login">
    <div class="login-container">
      <el-container style="padding:35px">
        <el-form ref="form" :model="form" class="login-form" :rules="loginRules" style="width:100%">
          <div class="title-container">
            <h3 class="title">Login Form</h3>
            <!-- <svg-icon icon-class="fanhui" /> -->
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input class="text-box" v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input class="text-box" placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="onSubmit('form')" style="width:100%">登录</el-button>
          </el-form-item>
          <div class="tip">账号 : admin 密码 : 随便填</div>
          <div class="tip">账号 : editor 密码 : 随便填 权限不一样</div>
        </el-form>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(
          new Error("The password can not be less than 6 digits")
        );
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        username: "admin",
        password: "123456"
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "please enter your name"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/deep/ .text-box {
  display: inline-block;
  width: 85% !important;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
    caret-color: $cursor;

    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $bg inset !important;
      -webkit-text-fill-color: $cursor !important;
    }
  }
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: $bg;

  .login-container {
    width: 520px;
    max-width: 100%;
  }

  .title {
    color: $light_gray;
  }
}

.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  // color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  text-align: center;
}
.tip {
  color: #fff;
  padding-top: 15px;
}
</style>