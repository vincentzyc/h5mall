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
      <div class="flex align-middle pd-l15 pd5 border-beee" @click="showAddressPicker">
        <label class="flex-none input-title">所在地区：</label>
        <base-input-item class="input-item flex-auto" readonly v-model="citys" placeholder="请选择所在地区"></base-input-item>
        <i class="cubeic-arrow c666"></i>
      </div>
      <div class="pd15">
        <label>详细地址：</label>
        <cube-textarea
          v-model.trim="address"
          placeholder="请输入详细地址"
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
      allCitys: '',
      citys: '',
      address: '',
      addressPicker: '',
      checked: true,
      formData: {
        phone: '',
        name: '',
        address: ''
      }
    }
  },
  methods: {
    showAddressPicker() {
      this.addressPicker.show()
    },
    selectHandle(selectedVal) {
      this.citys = selectedVal.join(' ')
    },
    async initCitys(arrAddress) {
      let arrIndex = [];
      let res = await this.$api.Common.getRegionAll({ level: 3 });
      let allCitys = res.region.map((item1, index1) => {
        if (arrAddress && item1.province === arrAddress[0]) arrIndex.push(index1);
        return {
          text: item1.province,
          value: item1.province,
          children: item1.citys.map((item2, index2) => {
            if (arrAddress && item2.city === arrAddress[1]) arrIndex.push(index2);
            return {
              text: item2.city,
              value: item2.city,
              children: item2.districts.map((item3, index3) => {
                if (arrAddress && item3.district === arrAddress[2]) arrIndex.push(index3);
                return {
                  text: item3.district,
                  value: item3.district
                }
              })
            }
          })
        }
      });
      this.addressPicker = this.$createCascadePicker({
        data: allCitys,
        onSelect: this.selectHandle
      });
      if (arrAddress) this.addressPicker.setData(allCitys, arrIndex)
    },
    checkInfo() {
      if (this.formData.name === "") return "请输入姓名";
      if (!/^[\u4e00-\u9fa5]{2,20}$/.test(this.formData.name)) return "姓名输入有误";
      if (this.formData.phone === "") return "请输入手机号";
      if (!this.$util.checkMobile(this.formData.phone)) return "手机号输入有误";
      if (this.citys === "") return "请选择所在地区";
      if (this.address === "") return "请输入详细地址";
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
      this.formData.address = this.citys + " " + this.address;
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
        name: this.BUS.editAddress.name,
        id: this.BUS.editAddress.id,
        address: '',
      }
      this.checked = this.BUS.editAddress.state === 1;
      this.title = "编辑地址";
      let arr = this.BUS.editAddress.address.split(" ");
      if (arr.length >= 3) {
        this.citys = arr.slice(0, 3).join(' ');
        this.address = arr.slice(3).join('');
        this.initCitys(arr.slice(0, 3));
      } else {
        this.$createToast({ type: 'txt', txt: '地址有误，请重新选择填写', time: 2000 }).show();
        this.initCitys();
      }
    } else {
      this.initCitys();
    }
  }
}
</script>