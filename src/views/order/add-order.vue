<template>
  <base-page>
    <common-header title="确认订单" />
    <div class="content">
      <div class="address-wrap bgfff">
        <div class="flex align-middle add-address" @click="$router.push('/me/address?type=select')">
          <i class="c999 cubeic-location"></i>
          <div v-if="address" class="flex flex-auto flex-column pd10">
            <div class="flex flex-auto">
              <p class="flex-auto textover1">收货人：{{address.name}}</p>
              <p class="flex-none textover1">{{address.phone}}</p>
            </div>
            <p class="fs14 c666 mg-t10 textover2">{{address.address}}</p>
          </div>
          <div v-else class="flex flex-auto flex-center">
            <p>请添加收货地址</p>
          </div>
        </div>
        <img src="@/assets/img/order-address.png" alt width="100%" />
      </div>

      <!-- 店铺 -->
      <div class="products mg-t10" v-for="store in items" :key="store.id">
        <div class="flex align-middle pd10 c666 bgfff">
          <span class="store"></span>
          <div class="flex align-middle mg-l10">
            <span class="mg-r10">{{store.name}}</span>
            <i class="fs16 cubeic-arrow"></i>
          </div>
        </div>
        <!-- 店铺 商品 -->
        <div class="product-item" v-for="item in store.productInfo" :key="item.id">
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
        </div>
        <!-- /店铺 商品 -->
      </div>
      <!--/ 店铺 -->
      <div class="leave-msg">
        <label>买家留言：</label>
        <cube-textarea
          v-model.trim="remark"
          placeholder="请输入备注"
          :maxlength="200"
          class="mg-t10"
          style="min-height: 100px"
        ></cube-textarea>
      </div>
      <div class="flex bgfff pd15" @click="getOrderCard()">
        <div class="flex flex-auto">优惠券领取</div>
        <div class="c999">
          <span>-￥{{coupon.discount||0.00}}</span>
          <i class="cubeic-arrow"></i>
        </div>
      </div>
      <div class="mg-t10 bgfff">
        <h3 class="pay-title">请选择支付方式</h3>
        <ul class="shop_ul">
          <cube-radio-group v-model="selected">
            <cube-radio option="zfb" position="right" class="border-beee">
              <img src="@/assets/img/zfb-pay.png" width="20px" height="20px" class="mg-r10" />
              支付宝支付
            </cube-radio>
            <cube-radio option="wx" position="right" class="border-beee">
              <img src="@/assets/img/wx-pay.png" width="20px" height="20px" class="mg-r10" />
              微信支付
            </cube-radio>
            <cube-radio option="ye" position="right" class="border-beee">
              <img src="@/assets/img/balance.png" width="20px" height="20px" class="mg-r10" />
              余额支付
            </cube-radio>
          </cube-radio-group>
        </ul>
      </div>
    </div>
    <footer class="footer-wrap lh50">
      <div class="flex">
        <div class="flex-auto">
          <div class="text-left pd-l20 c666">
            总计：￥
            <span class="fs16">{{totalPrice}}</span>
          </div>
        </div>
        <div class="col-3 cfff bgtheme" @click="pay()">支付</div>
      </div>
    </footer>
    <!-- 选择优惠券 -->
    <page-popup ref="pagePopup" position="right" class="pd-t44" type="coupon">
      <div class="pd10">
        <common-header title="选择优惠券" />
        <div>
          <ul class="not_used_coupon" v-if="couponList.length>0">
            <cube-checkbox v-model="checked" shape="square" @input="noUseCoupon">不使用优惠券</cube-checkbox>
            <li class="coupon_box" v-for="item in couponList" :key="item.card_id" @click="selectCoupon(item)">
              <div class="coupon_centent flex align-middle bg1">
                <div class="coupon_centent_left flex-auto">
                  <h2>{{item.note}}</h2>
                  <h5>{{item.shop_name}}</h5>
                  <h6>{{formatTime(item.start_time,item.end_time)}}</h6>
                </div>
                <div class="coupon_centent_right">￥{{item.discount||0}}</div>
              </div>
            </li>
          </ul>
          <div class="mg20" v-else>
            <p class="pd20 c666 text-center">暂无可用优惠券</p>
          </div>
        </div>
      </div>
    </page-popup>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: 'keepaddorder',
  data() {
    return {
      userInfo: '',
      items: [],
      address: "",
      remark: "",
      selected: 'zfb',
      coupon: '',
      couponList: [],
      checked: false
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0, sum = 0;
      this.items.forEach(v => {
        sum = v.productInfo.reduce((all, c) => all + c.cart_num * c.specs.specsPrice, 0)
        totalPrice += sum;
      })
      return totalPrice - (this.coupon.discount || 0) > 0 ? totalPrice : 0
    }
  },
  methods: {
    selectCoupon(item) {
      this.coupon = item;
      this.$router.back()
    },
    noUseCoupon(check) {
      if (check) {
        setTimeout(() => {
          this.coupon = "";
          this.$router.back()
        }, 300);
      }
    },
    formatTime(start, end) {
      if (start && end) {
        let startTime = this.$util.getFormatDate('yyyy-mm-dd', start);
        let endTime = this.$util.getFormatDate('yyyy-mm-dd', end);
        return '有效日期:' + startTime + '至' + endTime;
      }
      return ''
    },
    async getAddress() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Common.addressList(param);
      this.address = Array.isArray(res.list) ? res.list[0] : ""
    },
    async getProducts(param) {
      let res = await this.$api.Order.directSettlement(param);
      this.items = res.settlementList || [];
    },
    async getOrderCard() {
      this.$loading.open();
      let param = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        product_info: [{
          shop_id: this.items[0].id.toString(),
          product_id: this.items[0].productInfo[0].id.toString(),
          num: this.items[0].productInfo[0].cart_num
        }]
      }
      let res = await this.$api.Order.orderCard(param);
      this.couponList = res.list || [];
      this.$loading.close();
      this.$refs.pagePopup.open()
    },
    async pay() {
      let param = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        address: this.address.address,
        phone: this.address.phone,
        name: this.address.name,
        card_id: this.coupon.card_id,
        submitType: "2",
        product_info: [{
          specsId: this.items[0].productInfo[0].specs.id,
          product_id: this.items[0].productInfo[0].id,
          num: this.items[0].productInfo[0].cart_num,
          remark: this.remark
        }]
      }
      this.$loading.open();
      let res = await this.$api.Order.orderSubmit(param);
      let payParam = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        order_id: res.order_id
      }
      let payres = await this.$api.Pay.wxpay(payParam);
      this.$loading.close();
    }
  },
  activated() {
    if (this.EVENTBUS.selectAdress) this.address = this.EVENTBUS.selectAdress;
    if (this.EVENTBUS.orderParam) this.getProducts(this.EVENTBUS.orderParam)
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    if (this.EVENTBUS.orderParam) {
      this.getAddress()
    } else {
      if (this.$route.fullPath === '/order/add') {
        this.$router.back()
      } else {
        this.$router.go(-2)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.add-address {
  height: 88px;
  padding: 10px;
}

.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: auto;
}

.products {
  .product-info {
    img {
      width: 80px;
      height: 80px;
    }

    .title {
      min-height: 40px;
    }
  }

  .store {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('~@/assets/img/detail-footer.png') no-repeat -21px 0px / auto 100%;
  }
}

.leave-msg {
  background: #fff;
  padding: 15px;
  border-bottom: 1px solid #eee;

  & /deep/ .cube-textarea {
    background: #f9f9f9;
  }
}

.pay-title {
  padding: 10px;
  line-height: 20px;
  font-size: 14px;
  color: #999;
  border-bottom: 1px solid #eeeeee;
}

.pay-title:before {
  content: '|';
  width: 3px;
  color: #33dbff;
  margin-right: 6px;
}

.coupon_box {
  width: 100%;
  padding: 0 5px;
  margin-bottom: 15px;
}

.coupon_centent {
  height: 110px;
}

.not_used_coupon .bg1 {
  background: url('~@/assets/img/yhq.png') no-repeat 0 0 / 100% 100%;
}

.not_used_coupon .bg2 {
  background: url('~@/assets/img/yhq.png') no-repeat 0 0 / 100% 100%;
}

.coupon_centent_left {
  padding-left: 15px;
}

.coupon_centent_left h2 {
  font-size: 18px;
  color: $color-theme;
  font-weight: bold;
}

.coupon_centent_left h5 {
  font-size: 12px;
  color: $color-theme;
  padding-top: 10px;
}

.coupon_centent_left h6 {
  font-size: 10px;
  color: #999999;
  padding-top: 10px;
}

.coupon_centent_right {
  font-size: 30px;
  color: #fff;
  padding-right: 33px;
}
</style>