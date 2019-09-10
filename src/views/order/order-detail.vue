<template>
  <base-page>
    <common-header title="订单详情" />
    <div>订单详情</div>
    <div class="content">
      <!-- <div class="address-wrap bgfff">
        <div class="flex align-middle add-address" @click="$router.push('/me/address?type=select')">
          <i class="c999 cubeic-location"></i>
          <div class="flex flex-auto flex-column pd10">
            <div class="flex flex-auto">
              <p class="flex-auto textover1">收货人：{{address.name}}</p>
              <p class="flex-none textover1">{{address.phone}}</p>
            </div>
            <p class="fs14 c666 mg-t10 textover2">{{address.address}}</p>
          </div>
        </div>
        <img src="@/assets/img/order-address.png" alt width="100%" />
      </div>-->

      <!-- 店铺 -->
      <!-- <div class="products mg-t10" v-for="store in items" :key="store.id">
        <div class="flex align-middle pd10 c666 bgfff">
          <span class="store"></span>
          <div class="flex align-middle mg-l10">
            <span class="mg-r10">{{store.name}}</span>
            <i class="fs16 cubeic-arrow"></i>
          </div>
        </div> -->
        <!-- 店铺 商品 -->
        <!-- <div class="product-item" v-for="item in store.productInfo" :key="item.id">
          <div class="pd10">
            <div class="flex product-info">
              <img :src="item.specs.specsImg.split(',')[0]" alt="店铺logo" />
              <div class="flex-auto pd-l10">
                <h4 class="textover2 lh20 title">{{item.name}}</h4>
                <div class="flex mg-t10">
                  <span class="flex-auto ctheme fs16">￥{{item.specs.specsPrice}}</span>
                  <span class="mg5">x{{item.cart_num}}</span>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- /店铺 商品 -->
      <!-- </div> -->
      <!--/ 店铺 -->
      <!-- <div class="leave-msg">
        <label>买家留言：</label>
        <cube-textarea
          v-model.trim="remark"
          placeholder="请输入备注"
          :maxlength="200"
          class="mg-t10"
          style="min-height: 100px"
        ></cube-textarea>
      </div>-->
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  data() {
    return {
      order_id: '',
      detail:""
    }
  },
  methods: {
    async getOrderDetail() {
      let param = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        order_id: this.order_id
      }
      console.log(param);
      let res = await this.$api.Order.orderDetail(param);
      console.log(res);
      this.detail = res.order_detail
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.order_id = this.$route.query.id;
    if (!this.order_id) this.$router.back();
    this.getOrderDetail()
  }
}
</script>

<style>
</style>