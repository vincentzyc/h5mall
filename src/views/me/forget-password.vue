<template>
  <base-page class="common-form">
    <div>
      <common-header title="找回密码"></common-header>
      <div class="form-wrapper">
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">手机号：</label>
          <base-input-item class="input-item flex-auto" type="phone" v-model="formData.phone" placeholder="请输入手机号"></base-input-item>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">验证码：</label>
          <base-input-item class="input-item flex-auto" type="digit" :maxlength="6" v-model="formData.checkCode" placeholder="请输入验证码"></base-input-item>
          <verifica-code :phone="formData.phone" />
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">密码：</label>
          <base-input-item class="input-item flex-auto" type="password" v-model="formData.new_password" placeholder="请输入密码"></base-input-item>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">确认密码：</label>
          <base-input-item class="input-item flex-auto" type="password" v-model="formData.confirmPassword" placeholder="请确认密码"></base-input-item>
        </div>
        <cube-button :primary="true" class="block-btn" @click="submit()">确定</cube-button>
      </div>
    </div>
  </base-page>
</template>

<script>
import VerificaCode from '@/components/verifica-code'
export default {
  name: 'forgetpsw',
  components: {
    "verifica-code": VerificaCode
  },
  data() {
    return {
      formData: {
        phone: '',
        checkCode: '',
        new_password: '',
        confirmPassword: '',
        download_channel: '9',
        phone_sys_type: '1'
      },
      disabled: false,
      codetxt: "获取验证码",
      time: "",
    }
  },
  methods: {
    checkInfo() {
      if (this.formData.phone === "") return "请输入手机号";
      if (!this.$util.checkMobile(this.formData.phone)) return "手机号输入有误";
      if (this.formData.checkCode === "") return "请输入验证码";
      if (!/^[0-9]{6}$/.test(this.formData.checkCode)) return "验证码有误";
      if (this.formData.new_password === "") return "请输入密码";
      if (this.formData.confirmPassword === "") return "请确认密码";
      if (this.formData.new_password !== this.formData.confirmPassword) return "两次密码不一致";
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
      let res = await this.$api.Common.updatePwdByCode(this.formData);
      this.$createDialog({
        content: '密码设置成功，请重新登录',
        onConfirm: () => this.$router.replace('/me/login')
      }).show()
      this.$loading.close();
    }
  }
}
</script>