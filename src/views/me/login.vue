<template>
  <base-page class="login-form">
    <common-header title="登录"></common-header>
    <div class="border-beee">
      <cube-tab-bar v-model="label" show-slider style="width: 66%;margin: 0 auto;">
        <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index" class="lh30 width100"></cube-tab>
      </cube-tab-bar>
    </div>
    <div class="form-wrapper">
      <cube-tab-panels class="mg-b10">
        <cube-tab-panel class="img-panel" label="快速登录" v-show="label==='快速登录'">
          <div class="flex align-middle input-wrap">
            <label class="flex-none input-title min-width">手机号：</label>
            <base-input-item class="input-item flex-auto" type="phone" v-model="formData.phone" placeholder="请输入手机号"></base-input-item>
          </div>
          <div class="flex align-middle input-wrap">
            <label class="flex-none input-title min-width">验证码：</label>
            <base-input-item class="input-item flex-auto" type="digit" :maxlength="6" v-model="formData.code" placeholder="请输入验证码"></base-input-item>
            <verifica-code :phone="formData.phone" />
          </div>
        </cube-tab-panel>
        <cube-tab-panel class="text-panel" label="账号登录" v-show="label==='账号登录'">
          <div class="flex align-middle input-wrap">
            <label class="flex-none input-title min-width">手机号：</label>
            <base-input-item class="input-item flex-auto" type="phone" v-model="formData.phone" placeholder="请输入手机号"></base-input-item>
          </div>
          <div class="flex align-middle input-wrap">
            <label class="flex-none input-title min-width">密码：</label>
            <base-input-item class="input-item flex-auto" type="password" v-model="formData.password" placeholder="请输入密码"></base-input-item>
          </div>
          <div class="clearfix ctheme">
            <span class="pull-left" @click="$router.push(`/me/register?redirect=${redirect}`)">注册</span>
            <span class="pull-right" @click="$router.push('/me/forgetpsw')">忘记密码</span>
          </div>
        </cube-tab-panel>
      </cube-tab-panels>
      <cube-button :primary="true" class="block-btn" @click="submit()">确定</cube-button>
    </div>
  </base-page>
</template>

<script>
import VerificaCode from '@/components/verifica-code'
export default {
  name: 'login',
  components: {
    "verifica-code": VerificaCode
  },
  data() {
    return {
      label: "快速登录",
      tabs: ['快速登录', '账号登录'],
      redirect: '',
      formData: {
        phone: '',
        code: '',
        password: ''
      }
    }
  },
  methods: {
    checkInfo() {
      if (this.formData.phone === "") return "请输入手机号";
      if (!this.$util.checkMobile(this.formData.phone)) return "手机号输入有误";
      if (this.label === '快速登录') {
        if (this.formData.code === "") return "请输入验证码";
        if (!/^[0-9]{6}$/.test(this.formData.code)) return "验证码有误";
      } else {
        if (this.formData.password === "") return "请输入密码";
      }
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
      let res = this.label === '快速登录' ? await this.$api.Common.loginByCode(this.formData) :
        await this.$api.Common.login(this.formData);
      this.$util.setLStorage('userInfo', res, true);
      this.$loading.close();
      this.$createToast({
        txt: '登录成功',
        type: 'txt',
        time: 1000
      }).show();
      setTimeout(() => {
        this.$router.replace(this.redirect)
      }, 500);
    }
  },
  created() {
    this.redirect = this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '/home';
  }
}
</script>