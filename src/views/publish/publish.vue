<template>
  <base-page>
    <common-header :title="publishId?'修改采购':'发布采购'" />
    <cube-scroll ref="scroll">
      <div class="common-form mg-t10">
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">采购的物品：</label>
          <base-input-item class="input-item flex-auto" type="text" v-model="formData.name" placeholder="请输入采购物品名称"></base-input-item>
        </div>
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">需求分类：</label>
          <div class="flex input-item flex-auto">
            <select class="flex-none mg-r10 col-6" v-model="formData.parent_type_id">
              <option v-for="item in classify" :key="item.parent_id" :value="item.parent_id">{{item.name}}</option>
            </select>
            <select class="flex-none col-6" v-model="formData.type_id">
              <option v-for="item in classify2" :key="item.classify_id" :value="item.classify_id">{{item.classifyName}}</option>
            </select>
          </div>
        </div>
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">货源地：</label>
          <base-input-item
            class="input-item flex-auto"
            type="text"
            v-model="formData.from_address"
            placeholder="请输入期望的货源地"
          ></base-input-item>
        </div>
      </div>

      <div class="common-form mg-t10">
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">数量：</label>
          <base-input-item class="input-item flex-auto" type="digit" v-model="formData.num" placeholder="请输入数量"></base-input-item>
        </div>
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">单位：</label>
          <base-input-item class="input-item flex-auto" type="text" v-model="formData.unit" placeholder="请输入单位"></base-input-item>
        </div>
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">预算金额：</label>
          <base-input-item class="input-item flex-auto" type="money" v-model="formData.money" placeholder="请输入预算金额"></base-input-item>
        </div>
      </div>

      <div class="common-form mg-t10">
        <div class="pd15">
          <label>需求描述：</label>
          <cube-textarea
            v-model.trim="formData.note"
            placeholder="详细描述采购要求，可以收到更满意的报价哦"
            :maxlength="200"
            class="mg-t10"
            style="min-height: 100px"
          ></cube-textarea>
        </div>
      </div>

      <div class="common-form mg-t10">
        <div class="pd15">
          <label>图片：</label>
          <cube-upload
            ref="upload"
            v-model="files"
            :action="action"
            @file-success="uploadSuccess"
            @file-error="errHandler"
            class="mg-t10"
          ></cube-upload>
        </div>
      </div>
      <div class="common-form mg-t10">
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">验证码：</label>
          <base-input-item
            class="input-item flex-auto"
            type="digit"
            :maxlength="6"
            v-model="formData.code"
            placeholder="请输入验证码"
          ></base-input-item>
          <verifica-code type="0" :phone="userInfo.phone" />
        </div>
      </div>
      <div class="flex pd20">
        <cube-button :primary="true" @click="submit()">{{publishId?"保存":"发布"}}</cube-button>
      </div>
    </cube-scroll>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
import VerificaCode from '@/components/verifica-code'
export default {
  name: "publish",
  components: {
    "verifica-code": VerificaCode
  },
  data() {
    return {
      userInfo: "",
      action: {
        data: { needTn: false },
        target: this.$api.uploadUrl()
      },
      classify: [],
      files: [],
      imglist: "",
      initClassify2: false,
      formData: {
        name: "",
        parent_type_id: "",
        type_id: "",
        from_address: "",
        unit: "",
        num: "",
        money: "",
        note: "",
        code: ""
      }
    }
  },
  computed: {
    publishId() {
      if (this.$route.query.id) this.initClassify2 = true;
      return this.$route.query.id
    },
    classify2() {
      if (this.classify.length === 0) return [];
      let arr = this.classify.find(v => v.parent_id === this.formData.parent_type_id);
      if (this.publishId && this.initClassify2) {
        this.initClassify2 = false;
        return arr.classificationTwo || [];
      }
      if (Array.isArray(arr.classificationTwo) && arr.classificationTwo.length > 0) this.formData.type_id = arr.classificationTwo[0].classify_id;
      return arr.classificationTwo || []
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
      if (file.response.code !== '1') return this.errHandler();
      this.imglist = this.imglist + ',' + file.response.url;
    },
    checkInfo() {
      if (this.formData.name === "") return "请输入采购物品名称";
      if (this.formData.from_address === "") return "请输入货源地";
      if (this.formData.num === "") return "请输入数量";
      if (this.formData.unit === "") return "请输入单位";
      if (this.formData.money === "") return "请输入预算金额";
      if (this.formData.code === "") return "请输入验证码";
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
        ...this.formData,
        user_id: this.userInfo.id,
        token: this.userInfo.token,
      }
      param.img = this.imglist ? this.imglist.slice(1) : '';
      let res = this.publishId ? await this.$api.Publish.purchaseUpdate(param) : await this.$api.Publish.publish(param);
      if (this.publishId) {
        this.$createToast({
          txt: "修改成功",
          type: 'txt',
          time: 2000
        }).show();
        return this.$router.back()
      }
      this.$router.push('/publish/viewpublish/success')
    },
    async getClassify() {
      let res = await this.$api.Product.productClassify('');
      this.classify = res.classify || [];
      if (this.publishId) return true;
      if (Array.isArray(res.classify)) this.formData.parent_type_id = this.classify[0].parent_id;
      return true
    },
    async getPurchaseInfo() {
      let param = {
        id: this.publishId,
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchaseInfo(param);
      this.imglist = res.publishPd.img;
      this.files = res.publishPd.img.split(',').map(v => {
        return { url: v }
      })
      this.formData = { ...res.publishPd }
    }
  },
  async created() {
    this.$loading.open();
    this.userInfo = await getUser(this.$route.fullPath);
    if (this.publishId) await this.getPurchaseInfo();
    await this.getClassify();
    this.$loading.close();
  }
};
</script>