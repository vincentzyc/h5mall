<template>
  <base-page>
    <common-header :title="title">
      <span slot="right" @click="submit()">保存</span>
    </common-header>
    <div class="common-form mg-t15">
      <div class="flex align-middle pd-l15 pd5 border-beee">
        <label class="flex-none input-title">姓名：</label>
        <base-input-item class="input-item flex-auto" type="text" v-model="formData.name" placeholder="请输入姓名"></base-input-item>
      </div>
      <div class="flex align-middle pd-l15 pd5 border-beee">
        <label class="flex-none input-title">联系方式：</label>
        <base-input-item class="input-item flex-auto" type="phone" v-model="formData.phone" placeholder="请输入手机号"></base-input-item>
      </div>
      <div class="pd15">
        <label>地址：</label>
        <cube-textarea
          v-model.trim="formData.address"
          placeholder="请输入地址"
          :maxlength="200"
          class="mg-t10"
          style="min-height: 100px"
        ></cube-textarea>
      </div>
      <cube-checkbox v-model="checked" shape="square" style="margin-top:-0.2rem">
        默认地址
        <span class="corange fs12">(选择后订单提交前无需在手动输入)</span>
      </cube-checkbox>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: 'addressInfo',
  data() {
    return {
      userInfo: '',
      title: "添加地址",
      formData: {
        phone: '',
        address: '',
        name: ''
      },
      checked: true
    }
  },
  methods: {
    checkInfo() {
      if (this.formData.name === "") return "请输入姓名";
      if (!/^[\u4e00-\u9fa5]{2,20}$/.test(this.formData.name)) return "姓名输入有误";
      if (this.formData.phone === "") return "请输入手机号";
      if (!this.$util.checkMobile(this.formData.phone)) return "手机号输入有误";
      if (this.formData.address === "") return "请输入地址";
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
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        state: this.checked ? 1 : 0,
        ...this.formData
      }
      this.$loading.open('正在保存...');
      let res = this.BUS.editAddress ? await this.$api.Common.addressUpdate(param) : await this.$api.Common.addressAdd(param);
      this.$loading.close();
      this.$createDialog({
        content: '保存成功',
        onConfirm: () => this.$router.back()
      }).show()
    }
  },
  destroyed() {
    this.BUS.setEditAddress(null);
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    if (this.BUS.editAddress) {
      this.formData = {
        phone: this.BUS.editAddress.phone,
        address: this.BUS.editAddress.address,
        name: this.BUS.editAddress.name,
        id: this.BUS.editAddress.id,
      }
      this.checked = this.BUS.editAddress.state === 1;
      this.title = "编辑地址"
    }
  }
}
</script>