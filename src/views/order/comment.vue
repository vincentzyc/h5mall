<template>
  <base-page>
    <common-header title="发表评价" />
    <div class="bgfff mg-t10">
      <div class="flex align-middle pd10 c666">
        <span class="mg-r10">商品满意度</span>
        <cube-rate v-model="Data.appraise_star"></cube-rate>
        <span class="mg-l10">{{Data.appraise_star}}分</span>
      </div>
      <div>
        <cube-textarea v-model.trim="Data.appraise_note" placeholder="请输入评价" :maxlength="200" style="min-height: 200px"></cube-textarea>
        <cube-upload
          ref="upload"
          v-model="files"
          :action="action"
          @file-success="uploadSuccess"
          @file-error="errHandler"
        >
          <div class="headimg mg-r10">
            <cube-upload-btn :multiple="true">
              <!-- <img :src="userInfo.head_img||require('@/assets/img/logo.png')" class="square50" alt="头像" /> -->
            </cube-upload-btn>
          </div>
          {{files}}
        </cube-upload>
      </div>
      <!-- Data.appraise_img -->
    </div>
  </base-page>
</template>

<script>
export default {
  data() {
    return {
      Data: {
        appraise_star: 5,
        appraise_note: "",
        appraise_img: ""
      },
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
      // this.userInfo.head_img = file.response.url || '';
    },
  }
}
</script>

<style>
</style>