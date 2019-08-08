<template>
  <base-page>
    <common-header title="意见反馈">
      <span slot="right" @click="submit()">提交</span>
    </common-header>
    <div class="mg15">
      <cube-textarea
        v-model="value"
        :autoExpand="true"
        placeholder="请留下您的宝贵建议"
        :maxlength="500"
        :autofocus="true"
        style="min-height: 200px"
      ></cube-textarea>
      <p class="mg-t15 fs12 c666">联系电话：18812345678</p>
    </div>
  </base-page>
</template>
<script>
import { getUser } from "@/service/user"
export default {
  data() {
    return {
      value: "",
      userInfo: ""
    }
  },
  methods: {
    async submit() {
      let param = {
        user_id: this.userInfo.id,
        context: this.value,
        token: this.userInfo.token,
        type: 1
      }
      this.$loading.open();
      let res = await this.$api.Common.feedback(param);
      console.log(res);
      this.$loading.close();
      this.$createDialog({
        title: '提交成功',
        content: '感谢您的宝贵建议',
        onConfirm: () => this.value = ''
      }).show()
    }
  },
  async created() {
    this.userInfo = await getUser('/me/setting/changepsw')
  }
}
</script>