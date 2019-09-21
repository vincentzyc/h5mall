<template>
  <cube-button
    :inline="true"
    :primary="true"
    :outline="true"
    :disabled="disabled"
    class="getcode flex-none mg-l10"
    @click="getSmsCode()"
  >{{codetxt}} {{time}}</cube-button>
</template>
<script>
export default {
  props: {
    phone: {
      require: true,
      type: String
    },
    codeType:{
      default:'0',
      type: String
    }
  },
  data() {
    return {
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
      if (this.phone === "") {
        this.$createToast({
          txt: '请输入手机号',
          type: 'txt'
        }).show();
        return;
      }
      if (!this.$util.checkMobile(this.phone)) {
        this.$createToast({
          txt: '手机号输入有误',
          type: 'txt'
        }).show();
        return;
      }
      let param = {
        phone: this.phone,
        codeType: this.codeType
      }
      let res = await this.$api.Common.getCode(param)
      this.sendcCode();
    }
  }
}
</script>
