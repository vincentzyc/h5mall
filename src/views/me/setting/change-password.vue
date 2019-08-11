<template>
  <base-page class="common-form">
    <div>
      <common-header title="修改密码"></common-header>
      <div class="form-wrapper">
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">手机号：</label>
          <base-input-item
            class="input-item flex-auto"
            type="phone"
            v-model="formData.phone"
            placeholder="请输入手机号"
          ></base-input-item>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">原密码：</label>
          <base-input-item
            class="input-item flex-auto"
            type="password"
            v-model="formData.password"
            placeholder="请输入原密码"
          ></base-input-item>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">密码：</label>
          <base-input-item
            class="input-item flex-auto"
            type="password"
            v-model="formData.new_password"
            placeholder="请输入新密码"
          ></base-input-item>
        </div>
        <div class="flex align-middle input-wrap">
          <label class="flex-none input-title">确认新密码：</label>
          <base-input-item
            class="input-item flex-auto"
            type="password"
            v-model="formData.confirmPassword"
            placeholder="请确认新密码"
          ></base-input-item>
        </div>
        <cube-button :primary="true" class="block-btn" @click="submit()">确定</cube-button>
      </div>
    </div>
  </base-page>
</template>

<script>
import VerificaCode from '@/components/verifica-code'
import { getUser,clearUser } from "@/service/user"
export default {
  name: 'forgetpsw',
  components: {
    "verifica-code": VerificaCode
  },
  data() {
    return {
      userInfo: "",
      formData: {
        phone: '',
        new_password: '',
        confirmPassword: '',
      }
    }
  },
  methods: {
    checkInfo() {
      if (this.formData.phone === "") return "请输入手机号";
      if (!this.$util.checkMobile(this.formData.phone)) return "手机号输入有误";
      if (this.formData.password === "") return "请输入原密码";
      if (this.formData.new_password === "") return "请输入新密码";
      if (this.formData.confirmPassword === "") return "请确认新密码";
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
      let param = {
        token: this.userInfo.token,
        user_id: this.userInfo.id,
        ...this.formData
      }
      let res = await this.$api.Common.updatePwd(param);
      clearUser();
      this.$createDialog({
        content: '密码修改成功，请重新登录',
        onConfirm: () => this.$router.replace('/me/login')
      }).show()
      this.$loading.close();
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath)
  }
}
</script>