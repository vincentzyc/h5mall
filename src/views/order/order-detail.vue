<template>
  <base-page>
    <common-header title="订单详情" />
    <div class="content">
      <div class="scroll-wrapper" v-if="detail" :class="{'pd-b50':footerStatus}">
        <div class="flex align-middle bgfff pd10">
          <div class="flex-auto cblue">{{detail.order_status|orderStatus}}</div>
          <img v-if="detail.order_status===0" src="@/assets/img/dfk.png" alt="待付款" class="width80" />
          <img v-if="detail.order_status===1" src="@/assets/img/dfh.png" alt="待发货" class="width80" />
          <img v-if="detail.order_status===2" src="@/assets/img/dsh.png" alt="待收货" class="width80" />
          <img v-if="detail.order_status===3" src="@/assets/img/dpj.png" alt="待评价" class="width80" />
        </div>

        <div class="address-wrap bgfff mg-t10">
          <div class="flex align-middle address">
            <i class="c999 cubeic-location"></i>
            <div class="flex flex-auto flex-column pd10">
              <div class="flex flex-auto">
                <p class="flex-auto textover1">收货人：{{detail.consignee_name}}</p>
                <p class="flex-none textover1">{{detail.consignee_phone}}</p>
              </div>
              <p class="fs14 c666 mg-t10 textover2 lh20">{{detail.consignee_address}}</p>
            </div>
          </div>
          <img class="flex-none" src="@/assets/img/order-address.png" alt width="100%" />
        </div>

        <div class="products mg-t10 bgfff" v-for="store in orderList" :key="store.shop_id">
          <div class="flex align-middle pd10 c666 bgfff">
            <span class="store"></span>
            <div class="flex align-middle mg-l10">
              <span class="mg-r10">{{store.shop_name}}</span>
              <i class="fs16 cubeic-arrow"></i>
            </div>
          </div>
          <div class="product-item bgeee mg-b5" v-for="item in store.products" :key="item.id">
            <div class="pd10">
              <div class="flex product-info">
                <img class="flex-none" :src="item.img.split(',')[0]" alt="店铺logo" />
                <div class="flex-auto pd-l10">
                  <h4 class="textover2 lh20 title">{{item.product_name}}</h4>
                  <div class="flex mg-t10">
                    <span class="flex-auto ctheme fs16">￥{{item.price}}</span>
                    <span class="mg5">x{{item.num}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bgfff lh20 pd10 text-right">合计：￥{{orderTotalPrice}}</div>

        <div class="mg-t10 bgfff pd10">
          <div class="c666 mg-b10">备注信息</div>
          <div class="lh20 fs12">{{detail.remark}}</div>
        </div>

        <div class="mg-t10 bgfff pd10 order-record">
          <ul class="fs12 c666 lh24">
            <li v-if="detail.create_time">下单时间：{{$util.getFormatDate('yyyy-mm-dd hh:mm',detail.create_time)}}</li>
            <li v-if="detail.order_no">订单号：{{detail.order_no}}</li>
            <li v-if="detail.send_time">发货时间：{{$util.getFormatDate('yyyy-mm-dd hh:mm',detail.send_time)}}</li>
            <li v-if="detail.delivery_company">物流公司：{{detail.delivery_company}}</li>
            <li v-if="detail.delivery_id">物流单号：{{detail.delivery_id}}</li>
            <li v-if="detail.received_time">收货时间：{{$util.getFormatDate('yyyy-mm-dd hh:mm',detail.received_time)}}</li>
          </ul>
        </div>

        <div class="mg-t10 bgfff">
          <h3 class="pd10 lh20 fs14 c999 border-beee">请选择支付方式</h3>
          <ul class="shop_ul">
            <cube-radio-group v-model="selected">
              <cube-radio option="wx" position="right" class="border-beee">
                <img src="@/assets/img/wx-pay.png" width="20px" height="20px" class="mg-r10" />
                微信支付
              </cube-radio>
              <cube-radio option="zfb" position="right" class="border-beee" v-if="!$util.isWechat()">
                <img src="@/assets/img/zfb-pay.png" width="20px" height="20px" class="mg-r10" />
                支付宝支付
              </cube-radio>
              <!-- <cube-radio option="ye" position="right" class="border-beee">
              <img src="@/assets/img/balance.png" width="20px" height="20px" class="mg-r10" />
              余额支付
              </cube-radio>-->
            </cube-radio-group>
          </ul>
        </div>
      </div>

      <footer class="footerwrap bgtheme" v-if="footerStatus" @click="footerClick(detail.order_status)">{{footerStatus}}</footer>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
import goPay from "@/service/pay"
export default {
  data() {
    return {
      id_in: '',
      detail: "",
      orderList: "",
      orderTotalPrice: "",
      selected: "wx"
    }
  },
  computed: {
    footerStatus() {
      if (!this.detail) return "";
      switch (this.detail.order_status) {
        case 0:
          return "立即付款"
        case 2:
          return "确认收货"
        case 3:
          return "去评价"
        default:
          return ''
      }
    }
  },
  filters: {
    orderStatus(s) {
      switch (s) {
        case 0:
          return "等待买家付款"
        case 1:
          return "等待卖家发货"
        case 2:
          return "等待买家收货"
        case 3:
          return "等待买家评价"
        default:
          return ''
      }
    }
  },
  methods: {
    footerClick(s) {
      switch (s) {
        case 0:
          this.pay()
        case 2:
          return "确认收货"
        case 3:
          this.$router.push('/order/comment?id=' + detail.product_id)
          return "去评价"
        default:
          return ''
      }
    },
    async pay() {
      let param = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        id_in: this.id_in,
        card_id: this.detail.card_id,
        name: this.detail.consignee_name,
        phone: this.detail.consignee_phone,
        address: this.detail.consignee_address
      }
      console.log('接口orderSubmitOfWait入参',param);
      let res = await this.$api.Order.orderSubmitOfWait(param);
      console.log('接口orderSubmitOfWait返回',res);
      let orderParam = {
        order_id: res.order_id,
        ...this.userInfo
      }
      goPay(orderParam, this.selected)
    },
    async getOrderList() {
      let param = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        id_in: this.id_in
      }
      let res = await this.$api.Order.goPay(param);
      this.orderList = res.orderList;
      this.orderTotalPrice = res.orderTotalPrice;
      this.getOrderDetail();
    },
    async getOrderDetail(order_id) {
      let param = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        order_id: this.id_in
      }
      console.log(param);
      let res = await this.$api.Order.orderDetail(param);
      console.log(res);
      this.detail = res.order_detail;
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.id_in = this.$route.query.id;
    if (!this.id_in) this.$router.back();
    this.getOrderList()
  }
}
</script>

<style lang="stylus" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}

.address-wrap .address {
  height: 88px;
  padding: 10px;
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

.footerwrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 16px;
  z-index: 99;
}
</style>