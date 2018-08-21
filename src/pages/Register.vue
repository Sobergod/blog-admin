<template>
    <div>
        <h1 class="title">欢迎注册</h1>
        <div class="from-wrap">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
                <FormItem prop="user">
                    <Input size="large" prefix="ios-contact" placeholder="请输入用户名" type="text" v-model="formCustom.user"></Input>
                </FormItem>
                <FormItem prop="passwd">
                    <Input prefix="md-key" size="large" placeholder="请输入密码" type="password" v-model="formCustom.passwd"></Input>
                </FormItem>
                <FormItem prop="passwdCheck">
                    <Input prefix="ios-hammer" placeholder="请确认密码" type="password" v-model="formCustom.passwdCheck"></Input>
                </FormItem>
                <FormItem prop="age">
                    <Input prefix="ios-body" placeholder="请输入年龄" type="text" v-model="formCustom.age" number></Input>
                </FormItem>
                <FormItem prop="phone">
                    <Input prefix="ios-call" placeholder="请输入电话" type="text" v-model="formCustom.phone" number></Input>
                </FormItem>
                <div class="input-item">
                    <RadioGroup v-model="formCustom.sex">
                        <Radio label="男"></Radio>
                        <Radio label="女"></Radio>
                        <Radio label="未知"></Radio>
                    </RadioGroup>
                </div>
                <div class="button-wrap">
                    <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                    <Button @click="handleReset('formCustom')" style="margin-left: 8px">清空</Button>
                </div>
            </Form>
        </div>
        <div class="bg-wrap" :style="bgStyle"></div>
    </div>
</template>

<script>
const bg = require("../assets/bg2.jpg");
export default {
  data() {
    const validateUser = (rule, value, callback) => {
      const userReg = /^([a-zA-Z\u4e00-\u9fa5]){3,16}$/;
      if (value === "") {
        callback(new Error("请输入用户名!"));
      } else if (!userReg.test(value)) {
        callback(new Error("用户名字母或汉字,长度大于3小于16"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      let passwdReg = /^[a-zA-Z]\w{5,17}$/;
      if (value === "") {
        callback(new Error("请输入密码!"));
      } else if (!passwdReg.test(value)) {
        callback(new Error("字母开头,长度在6~18之间,只能包含字母数字和下划线"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次确认密码!"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空!"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字"));
        } else {
          if (value < 18) {
            callback(new Error("必须大于18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePhone = (rule, value, callback) => {
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value === "") {
        callback(new Error("请输入电话!"));
      } else if (!phoneReg.test(value)) {
        callback(new Error("手机号码格式有误"));
      } else {
        callback();
      }
    };

    return {
      bgStyle: "background-image:url(" + bg + ")",
      formCustom: {
        user: "",
        passwd: "",
        passwdCheck: "",
        age: "",
        phone: "",
        sex: "男"
      },
      ruleCustom: {
        user: [{ validator: validateUser, trigger: "blur" }],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  text-align: center;
}
.from-wrap {
  z-index: 2;
  position: relative;
  padding: 20px;
  margin: 20px auto;
  width: 90%;
  background: #fff;
  box-shadow: 1px 1px 5px #ccc;
}
.input-item {
  margin-bottom: 24px;
}
.button-wrap {
  margin-left: 20px;
  text-align: center;
}
.bg-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
}
@media (min-width: 351px) {
  .from-wrap {
    width: 350px;
  }
}
</style>