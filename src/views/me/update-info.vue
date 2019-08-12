<template>
  <base-page>
    <common-header title="个人资料">
      <span slot="right" @click="save()">保存</span>
    </common-header>
    <ul class="info-list mg-t15 bgfff">
      <li class="flex align-middle pd15 border-beee">
        <span class="flex-auto">头像</span>
        <img :src="userInfo.head_img||require('@/assets/img/logo.png')" class="square50" alt />
        <i class="cubeic-arrow c666"></i>
      </li>
      <li class="flex align-middle pd15 border-beee">
        <span>呢称</span>
        <base-input-item
          class="input-item flex-auto text-right mg-l20 c666"
          type="text"
          placeholder="请输入昵称"
          v-model.trim="userInfo.name"
        ></base-input-item>
      </li>
      <li class="flex align-middle pd15 border-beee">
        <span>生日</span>
        <div
          class="flex-auto text-right mg-l20 c666"
          @click="showDatePicker()"
        >{{userInfo.birthday||'请选择生日'}}</div>
      </li>
      <li class="flex align-middle pd15 border-beee">
        <span>手机号</span>
        <div class="flex-auto text-right">
          <span class="mg-r15 c666">18812345678</span>
          <cube-button
            :inline="true"
            :primary="true"
            :outline="true"
            @click="$refs.pagePopup.open()"
          >更换</cube-button>
        </div>
      </li>
    </ul>
    <!-- 更换手机号 -->
    <page-popup ref="pagePopup" position="right" class="pd-t44" type="changephone">
      <common-header title="更换手机号" />
      <div class="common-form">
        <div class="form-wrapper">
          <div class="flex align-middle input-wrap">
            <label class="flex-none input-title">手机号：</label>
            <base-input-item
              v-model="formData.phone"
              class="input-item flex-auto"
              type="phone"
              placeholder="请输入手机号"
            ></base-input-item>
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
            <verifica-code :phone="formData.phone" />
          </div>
          <p class="flex fs12 c999">提示：更换后，新手机号将成为登录账号</p>
          <cube-button :primary="true" class="block-btn" @click="submit()">确定</cube-button>
        </div>
      </div>
    </page-popup>
  </base-page>
</template>

<script>
import VerificaCode from '@/components/verifica-code'
import { getUser } from "@/service/user"

export default {
  name: 'updateInfo',
  components: {
    "verifica-code": VerificaCode
  },
  data() {
    return {
      userInfo: '',
      formData: {
        new_phone: '',
        checkCode: '',
      }
    }
  },
  methods: {
    formatDate(d) {
      if (this.$util.getType(d) !== 'String') return '';
      let arr = d.split('-');
      arr.forEach((v, i, val) => {
        val[i] = parseInt(v);
      });
      return arr
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择生日',
          min: [1920, 1, 1],
          max: new Date(),
          value: this.formatDate(this.userInfo.birthday) || new Date(1980, 0, 1),
          format: {
            year: 'YYYY',
            month: 'MM',
            date: 'DD'
          },
          onSelect: this.selectHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.userInfo.birthday = selectedText.join('-')
    },
    async save() {
      if (this.userInfo.name === '') {
        return this.$createToast({
          txt: '姓名不能为空',
          type: 'txt',
          time: 2000
        }).show()
      }
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        name: this.userInfo.name,
        head_img: this.userInfo.head_img || '',
        birthday: this.userInfo.birthday
      }
      this.$loading.open();
      let res = await this.$api.Common.updateInfoByUserId(param);
      this.$loading.close();
      this.$createDialog({
        content: '保存成功',
        onConfirm: () => this.$router.back()
      }).show()
    },
    checkInfo() {
      if (this.formData.phone === "") return "请输入手机号";
      if (!this.$util.checkMobile(this.formData.phone)) return "手机号输入有误";
      if (this.formData.checkCode === "") return "请输入验证码";
      if (!/^[0-9]{6}$/.test(this.formData.checkCode)) return "验证码有误";
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
        phone: this.userInfo.phone,
        ...this.formData
      }
      let res = await this.$api.Common.updatePhoneByCode(param);
      this.$loading.close();
      this.$createDialog({
        content: '修改成功',
        onConfirm: () => this.$router.back()
      }).show()
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath, 'local');
    this.userInfo.birthday = this.$util.getFormatDate('yyyy-mm-dd', this.userInfo.birthday)
  }
}
</script>