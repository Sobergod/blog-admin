<template>
  <div>
    <div class="bg-wrap" :style="bgUrl"></div>
    <div class="wrap">
      <div class="form-item">
        <p class="title">欢迎使用后台管理系统</p>
        <div class="form-wrap">
          <Card dis-hover style="background:rgba(255,255,255,0.8)">
            <div class="avater">
              <img :src="avater" alt="">
            </div>
            <Form ref="loginForm" :model="loginForm" :rules="valRules">
              <!-- 登录框 -->
              <FormItem prop="user">
                <Input class="inp" v-model="loginForm.user" size="large" @on-blur="getUserAvater(loginForm.user)" prefix="ios-contact" placeholder="输入用户账户" />
              </FormItem>
              <FormItem prop="password">
                <Input class="inp" v-model="loginForm.password" size="large" prefix="ios-lock" type="password" placeholder="输入密码" />
              </FormItem>
              <!-- 图形验证码 -->
              <!-- <FormItem prop="cop">
                <div class="cop-wrap">
                  <Input class="inp" size="large" prefix="ios-alert" placeholder="输入验证码" />
                  <img src="" alt="">
                </div>
              </FormItem> -->
              <Button class="inp" @click="submitBtn('loginForm')" type="success" :loading="loading" long>
                <span v-if="!loading">登录</span>
                <span v-else>登录中...</span>
              </Button>
            </Form>
            <div class="others-item">
              <span @click="navToRegisterBtn()">去注册</span>
              <span>忘记密码?</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <div class="footer">
      @2018-8-至今 Design by CJH
    </div>
  </div>
</template>

<script>
import AX from "lib/axios-conf.js";
// import RSA from "node-rsa";
import { utils } from "../utils/utils.js";
const defaultImgAva = require("../assets/defaultAva.jpg");
export default {
  data() {
    return {
      bgUrl: "background-image:url(" + require("../assets/bg1.jpg") + ")",
      loading: false,
      avater: defaultImgAva,
      t1: null,
      pubKey: null,
      // 登录表单
      loginForm: {
        user: "",
        password: ""
      },
      valRules: {
        user: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码应大于六位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // this.getData();
    this.getPubKey();
  },
  methods: {
    getPubKey: function() {
      AX("/pubkey", "get")
        .then(res => {
          console.log(res);
          this.pubKey = res.data.pubKey;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // changeREA: function() {
    //   AX("/creatersa", "get")
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    submitBtn: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.sendUserData(this.loginForm);
        } else {
          this.$Message.error("请检查所填内容!");
        }
      });
    },
    navToRegisterBtn: function() {
      this.$router.push({ path: "/register", name: "register" });
    },
    // 发送用户信息
    sendUserData: function(user) {
      let name = user.user;
      let password = utils.rsaEncrypt(user.password, this.pubKey);
      this.loading = true;
      AX({
        url: "/login",
        data: {
          user: name,
          password: password
        },
        method: "post"
      })
        .then(res => {
          if (res.data.resCode.code < 1050) {
            setTimeout(() => {
              this.loading = false;
              this.$router.push("/index");
            }, 1000);
            this.$store.dispatch("UserLogin", res.data.token);
            // this.$store.dispatch("UserName", username);
          } else {
            this.$Message.error(res.data.resCode.tipMsg);
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        })
        .catch(err => {
          this.$Message.error("服务器忙");
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },
    // 获取用户头像
    getUserAvater: function(user) {
      if (user == "") {
        this.avater = defaultImgAva;
        return false;
      }
      AX.get("/avaimg", {
        params: {
          name: user
        }
      })
        .then(res => {
          this.avater = res.data.avater ? res.data.avater : defaultImgAva;
        })
        .catch(err => {});
    }
    //
  }
};
</script>

<style scoped>
.wrap {
  position: relative;
  padding: 20px;
  min-height: 600px;
}
.bg-wrap {
  z-index: 1;
  position: absolute;
  top: 0;
  width: 100%;
  height: 500px;
  background-color: #47cb89;
  background-size: cover;
  background-position: center;
  box-shadow: 1px 1px 10px #666;
}
.form-item {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 70%;
  margin: auto;
}
.title {
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: #fff;
}
/* 头像  */
.avater {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 60px;
  height: 60px;
  border: 2px solid #47cb89;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 1px 1px 5px #aaa;
}
.avater img {
  width: 100%;
  height: 100%;
}
.form-wrap {
  margin: 0 auto;
  width: 250px;
  text-align: center;
}
/* 验证码容器  */
.cop-wrap {
  display: flex;
}
/* 忘记密码和注册按钮  */
.others-item {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 10px;
  font-size: 14px;
  color: #279765;
}
.others-item span {
  cursor: pointer;
}
.others-item span:hover {
  color: #00b25c;
  transition: all 0.2s linear;
}

/* 底部  */
.footer {
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  box-shadow: 1px 1px 5px #ddd;
}
@media (min-width: 768px) {
  .wrap {
    margin: 60px auto 0 auto;
    width: 90%;
  }
  .bg-wrap {
    height: 570px;
  }
  .title {
    font-size: 30px;
  }
}
@media (min-width: 345px) {
  .form-wrap {
    width: 300px;
  }
}
</style>