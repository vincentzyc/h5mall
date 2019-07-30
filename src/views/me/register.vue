<template>
  <base-page class="reg-page">
    <div>
      <common-header title="注册"></common-header>
      <div class="form-wrapper">
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">手机号：</label>
          <base-input-item class="input-item flex-auto" type="phone" v-model="formData.phone" placeholder="请输入手机号"></base-input-item>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">验证码：</label>
          <base-input-item class="input-item flex-auto" type="digit" :maxlength="6" v-model="formData.checkCode" placeholder="请输入验证码"></base-input-item>
          <cube-button
            :inline="true"
            :primary="true"
            :outline="true"
            :disabled="disabled"
            class="getcode flex-none mg-l10"
            @click="getSmsCode()"
          >{{codetxt}} {{time}}</cube-button>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">密码：</label>
          <base-input-item class="input-item flex-auto" type="password" v-model="formData.password" placeholder="请输入密码"></base-input-item>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">确认密码：</label>
          <base-input-item class="input-item flex-auto" type="password" v-model="formData.confirmPassword" placeholder="请确认密码"></base-input-item>
        </div>
        <cube-checkbox v-model="checked" shape="square" class="agree">登录即代表您同意用户协议和隐私条款</cube-checkbox>
        <cube-button :primary="true" class="reg-btn" @click="submit()">注册</cube-button>
      </div>
    </div>
  </base-page>
</template>

<script>

export default {
  name: 'register',
  data() {
    return {
      formData: {
        phone: '',
        checkCode: '',
        password: '',
        confirmPassword: '',
        download_channel: '9',
        phone_sys_type: '1'
      },
      checked: false,
      disabled: false,
      codetxt: "获取验证码",
      time: "",
    }
  },
  methods: {
    sendcCode() {
      this.disabled = true;
      this.codetxt = "重新发送";
      this.time = "60";
      this.$util.countDown(
        this.time,
        tick => {
          this.time = tick;
        },
        () => {
          this.time = "";
          this.disabled = false;
        }
      );
      this.$createToast({
        txt: '验证码已发送',
        type: 'txt'
      }).show()
    },
    async getSmsCode() {
      if (this.disabled) return;
      let param = {
        phone: this.formData.phone,
        codeType: "2"
      }
      let res = await this.$api.Common.getCode(param)
      this.sendcCode();
    },
    checkInfo() {
      if (!this.checked) return "请同意服务协议";
      if (this.formData.phone === "") return "请输入手机号";
      if (!this.$util.checkMobile(this.formData.phone)) return "手机号输入有误";
      if (this.formData.checkCode === "") return "请输入验证码";
      if (!/^[0-9]{6}$/.test(this.formData.checkCode)) return "验证码有误";
      if (this.formData.password === "") return "请输入密码";
      if (this.formData.confirmPassword === "") return "请确认密码";
      if (this.formData.password !== this.formData.confirmPassword) return "两次密码不一致";
      return true;
    },
    async submit() {
      let result = this.checkInfo();
      if (result !== true) {
        return this.$createToast({
          txt: result,
          type: 'txt',
          time: 2000
        }).show()
      }
      this.$loading.open();
      let res = await this.$api.Common.register(this.formData);
      let redirect = this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '/home';
      this.$createDialog({
        content: '注册成功',
        onConfirm: () => this.$router.replace(redirect)
      }).show()
      this.$loading.close();
    }
  }
}
</script>

<style lang="stylus" scoped>
.reg-page {
  background: #fff;
}

.form-wrapper {
  margin: 20px 30px;
}

.input-wrap {
  border-bottom: 1px solid #999;
  margin-bottom: 15px;
}

.input-title {
  min-width: 70px;
}

.reg-btn {
  margin-top: 30px;
  border-radius: 10px;
}

.input-item {
  width: 100%;
  padding: 10px;
  border: none;
  outline: 0;
}

.agree /deep/ {
  padding: 0;
  margin: 0;

  .cube-checkbox-wrap {
    padding: 0;
  }

  .cube-checkbox-label {
    font-size: 12px;
  }
}
</style>