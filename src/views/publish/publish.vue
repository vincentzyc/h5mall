<template>
  <base-page>
    <common-header title="发布采购" />
    <div>
      <div class="common-form mg-t10">
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">采购的物品：</label>
          <base-input-item class="input-item flex-auto" type="text" v-model="formData.name" placeholder="请输入采购物品名称"></base-input-item>
        </div>
        <div class="flex align-middle pd-l15 pd5 border-beee">
          <label class="flex-none input-title">需求分类：</label>
          <div class="flex input-item flex-auto">
            <select class="flex-none mg-r10 col-6" v-model="formData.type">
              <option v-for="item in classify" :key="item.parent_id" :value="item.name">{{item.name}}</option>
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
          <base-input-item class="input-item flex-auto" type="digit" v-model="formData.unit" placeholder="请输入单位"></base-input-item>
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
      <div class="flex pd20">
        <cube-button :primary="true" @click="submit()">发布</cube-button>
      </div>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: "publish",
  data() {
    return {
      userInfo: "",
      classify: [],
      formData: {
        name: "",
        type: "",
        type_id: "",
        from_address: "",
        unit: "",
        num: "",
        money: "",
        note: "",
        code: "",
        img: ""
      },
      selectedLabel: '采购中',
      tabs: ['采购中', '已停止'],
      purchasing: [],
      purchaseStop: []
    }
  },
  computed: {
    classify2() {
      if (this.classify.length === 0) return [];
      let arr = this.classify.find(v => v.name === this.formData.type);
      if (Array.isArray(arr.classificationTwo) && arr.classificationTwo.length > 0) this.formData.type_id = arr.classificationTwo[0].classify_id;
      return arr.classificationTwo || []
    }
  },
  methods: {
    async getPurchasing() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchasing(param);
      console.log('采购中', res);
    },
    async getPurchaseStop() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchaseStop(param);
      console.log('已停止', res);
    },
    async getClassify() {
      let res = await this.$api.Product.productClassify('');
      this.classify = res.classify || [];
      if (Array.isArray(res.classify)) this.formData.type = this.classify[0].name;
    },
    submit() { }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.getClassify()
  }
};
</script>