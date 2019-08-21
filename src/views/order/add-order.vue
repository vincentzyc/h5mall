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
              <img :src="item.carousel_img.split(',')[0]" alt="店铺logo" />
              <div class="flex-auto pd-l10">
                <h4 class="textover2 lh20 title">{{item.name}}</h4>
                <div class="flex mg-t10">
                  <span class="flex-auto ctheme fs16">￥{{item.price}}</span>
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
          v-model.trim="message"
          placeholder="请输入备注"
          :maxlength="200"
          class="mg-t10"
          style="min-height: 100px"
        ></cube-textarea>
      </div>
      <div class="flex bgfff pd15">
        <div class="flex flex-auto">优惠券领取</div>
        <div class="c999">
          <span>-￥0.00</span>
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
        <div class="col-3 cfff bgtheme">支付</div>
      </div>
    </footer>
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
      message: "",
      selected: 'zfb'
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0, sum = 0;
      this.items.forEach(v => {
        sum = v.productInfo.reduce((all, c) => all + c.cart_num * c.price, 0)
        totalPrice += sum;
      })
      return totalPrice
    }
  },
  methods: {
    async getAddress() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Common.addressList(param);
      this.address = Array.isArray(res.list) ? res.list[0] : ""
    },
    async getProducts(param) {
      console.log(param);
      let res = await this.$api.Order.directSettlement(param);
      console.log(res);
      this.items = res.settlementList || [];
    },
    // addressDelete(id) {
    //   this.$createDialog({
    //     type: 'confirm',
    //     content: '是否确定删除该地址',
    //     onConfirm: async () => {
    //       let param = {
    //         user_id: this.userInfo.id,
    //         token: this.userInfo.token,
    //         id: id
    //       }
    //       await this.$api.Common.addressDelete(param);
    //       this.$createToast({
    //         txt: '删除成功',
    //         type: 'txt',
    //         time: 2000
    //       }).show();
    //       this.items = this.items.filter(v => v.id !== id)
    //     },
    //     onCancel: () => { }
    //   }).show()
    // }
  },
  activated() {
    if (this.EVENTBUS.selectAdress) this.address = this.EVENTBUS.selectAdress;
    if (this.EVENTBUS.orderParam) this.getProducts(this.EVENTBUS.orderParam)
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.EVENTBUS.orderParam ? this.getAddress() : this.$router.back()
  }
}
</script>

<style lang="stylus" scoped>
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
</style>