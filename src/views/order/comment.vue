<template>
  <base-page>
    <common-header title="发表评价" />
    <div class="bgfff pd10">
      <div class="flex align-middle pd10 c666">
        <span class="mg-r10">商品满意度</span>
        <cube-rate v-model="star"></cube-rate>
        <span class="mg-l10">{{star}}分</span>
      </div>
      <div class="mg-t10 pd10">
        <cube-textarea v-model.trim="note" placeholder="请输入评价" :maxlength="200" style="min-height: 150px"></cube-textarea>
        <cube-upload
          ref="upload"
          v-model="files"
          :action="action"
          @file-success="uploadSuccess"
          @file-error="errHandler"
          class="mg-t10"
        ></cube-upload>
      </div>
      <div class="pd20">
        <cube-button primary @click="submit()">发布评论</cube-button>
      </div>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  data() {
    return {
      order_id: "",
      star: 5,
      note: "",
      imglist: "",
      userInfo: "",
      action: {
        data: { needTn: false },
        target: this.$api.uploadUrl()
      },
      files: [],
    }
  },
  methods: {
    errHandler() {
      this.$createToast({
        type: 'warn',
        txt: '网络繁忙，请稍后重试',
        time: 1000
      }).show()
    },
    uploadSuccess(file) {
      if (file.response.code !== '1') this.errHandler();
      this.imglist += (',' + file.response.url);
      console.log(this.Data);
    },
    async submit() {
      if (this.note.length === 0) {
        return this.$createToast({
          txt: '请输入评价',
          type: 'txt',
          time: 1500
        }).show()
      }
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        order_id: this.order_id,
        appraise_img: this.imglist ? this.imglist.slice(1) : '',
        appraise_star: this.star,
        appraise_note: this.note
      }
      this.$loading.open();
      let res = await this.$api.Order.appriseProduct(param);
      this.$loading.close();
      this.$createDialog({
        content: '评价成功',
        onConfirm: () => this.$router.back()
      }).show()
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.order_id = this.$route.query.id;
    if (!this.order_id) this.$router.back()
  }
}
</script>

<style>
</style>