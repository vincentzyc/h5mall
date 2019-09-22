<template>
  <base-page>
    <common-header title="采购详情" />
    <cube-scroll ref="scroll" v-if="detail">
      <div class="flex mg-t5 bgfff pd10">
        <img v-lazy="detail.img.split(',')[0]" alt class="square88 flex-none" />
        <div class="mg-l10 flex-auto">
          <div class="flex lh30">
            <h3 class="flex-auto textover1">{{detail.name}}</h3>
            <span class="c666 fs12 flex-none">{{$util.getFormatDate('yyyy-mm-dd',detail.update_time)}}</span>
          </div>
          <h3 class="lh30 textover1 ctheme">预算：{{detail.money}}元</h3>
          <p class="lh30">{{detail.num.toString()+detail.unit}}</p>
        </div>
      </div>
      <div class="mg-t5 bgfff">
        <p class="pd10 textover1 c666 lh30 border-beee">发货地：{{detail.from_address}}</p>
        <div class="pd10">
          <p class="lh24">需求描述</p>
          <p class="textover1 c666 lh30 mg-t5">{{detail.note}}</p>
        </div>
      </div>
      <div class="mg-t5 bgfff">
        <div class="pd10">
          <p class="lh24">图片信息</p>
          <div class="mg-t10">
            <img v-for="item in detail.img.split(',')" v-lazy="item" :key="item" class="square88 mg-r10 mg-b10" />
          </div>
        </div>
      </div>
    </cube-scroll>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  data() {
    return {
      userInfo: "",
      detail: ""
    }
  },
  computed: {
    publishId() {
      return this.$route.query.id
    }
  },
  methods: {
    async getPurchaseInfo() {
      let param = {
        id: this.publishId,
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchaseInfo(param);
      this.detail = res.publishPd;
    }
  },
  async created() {
    this.$loading.open();
    this.userInfo = await getUser(this.$route.fullPath);
    await this.getPurchaseInfo();
    this.$loading.close();
  }
}
</script>