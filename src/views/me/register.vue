<template>
  <base-page class="common-form">
    <common-header title="注册"></common-header>
    <div class="form-wrapper">
      <div class="flex align-middle input-wrap">
        <label class="flex-none input-title">手机号：</label>
        <base-input-item class="input-item flex-auto" type="phone" v-model="formData.phone" placeholder="请输入手机号"></base-input-item>
      </div>
      <div class="flex align-middle input-wrap">
        <label class="flex-none input-title">验证码：</label>
        <base-input-item
          class="input-item flex-auto"
          type="digit"
          :maxlength="6"
          v-model="formData.checkCode"
          placeholder="请输入验证码"
        ></base-input-item>
        <verifica-code :phone="formData.phone" codeType="2" />
      </div>
      <div class="flex align-middle input-wrap">
        <label class="flex-none input-title">密码：</label>
        <base-input-item class="input-item flex-auto" type="password" v-model="formData.password" placeholder="请输入密码"></base-input-item>
      </div>
      <div class="flex align-middle input-wrap">
        <label class="flex-none input-title">确认密码：</label>
        <base-input-item
          class="input-item flex-auto"
          type="password"
          v-model="formData.confirmPassword"
          placeholder="请确认密码"
        ></base-input-item>
      </div>
      <div class="flex fs12">
        <cube-checkbox v-model="checked" shape="square" class="agree"></cube-checkbox>
        <span>登录即代表您同意</span>
        <span
          class="cblue"
          @click="$util.goIframe('http://ricky-s.qicp.io/res/html/znAgreement.html','用户服务协议')"
        >掌农用户协议和隐私条款</span>
      </div>

      <cube-button :primary="true" class="block-btn" @click="submit()">注册</cube-button>
    </div>
  </base-page>
</template>

<script>
import VerificaCode from '@/components/verifica-code'
export default {
  name: 'register',
  components: {
    "verifica-code": VerificaCode
  },
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
      checked: false
    }
  },
  methods: {
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
      // let redirect = this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '/home';
      this.$loading.close();
      this.$createDialog({
        content: '注册成功',
        onConfirm: () => this.$router.replace('/me/login')
      }).show()
    }
  }
}
</script>