<template>
  <base-page>
    <common-header title="意见反馈">
      <span slot="right" @click="submit()">提交</span>
    </common-header>
    <div class="mg15">
      <cube-textarea
        v-model.trim="value"
        placeholder="请留下您的宝贵建议"
        :maxlength="500"
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
      if (this.value.length === 0) {
        return this.$createToast({
          txt: '请输入建议',
          type: 'txt',
          time: 2000
        }).show()
      }
      let param = {
        user_id: this.userInfo.id,
        context: this.value,
        token: this.userInfo.token,
        type: '1'
      }
      this.$loading.open();
      let res = await this.$api.Common.feedback(param);
      console.log(res);
      this.$loading.close();
      this.$createDialog({
        title: '提交成功',
        content: '感谢您的反馈，掌农将及时回复',
        onConfirm: () => this.value = ''
      }).show()
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath)
  }
}
</script>