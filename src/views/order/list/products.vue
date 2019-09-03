<template>
  <div v-if="!noOrder">
    <div v-if="items.length>0">
      <!-- 店铺 -->
      <div class="products mg-b10" v-for="store in items" :key="store.id">
        <div class="flex align-middle pd10 c666 bgfff">
          <span class="store"></span>
          <div class="flex align-middle mg-l10">
            <span class="mg-r10">{{store.shop_name}}</span>
            <i class="fs16 cubeic-arrow"></i>
          </div>
        </div>
        <!-- 商品 -->
        <div class="product-item" v-for="item in store.products" :key="item.id">
          <div class="pd10">
            <div class="flex product-info">
              <img v-lazy="item.img.split(',')[0]" alt="产品图片" />
              <div class="flex-auto pd-l10">
                <h4 class="textover2 lh20 title">{{item.product_name}}</h4>
                <div class="flex mg-t10">
                  <span class="flex-auto ctheme fs16">￥{{item.price}}</span>
                  <span class="mg5">x{{item.num}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 商品价格总计 -->
          <div class="flex pd10 bgfff flex-center">
            <span>总计：</span>
            <div class="flex-auto">￥{{item.price*item.num||0}}</div>
            <cube-button
              :inline="true"
              primary
              v-if="btnStatus(store.order_status)"
              @click="goPage(store.order_status)"
            >{{btnStatus(store.order_status)}}</cube-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="mg20 lh30 text-center c666">拼命加载中...</p>
    </div>
  </div>
  <div v-else>
    <p class="mg20 lh30 text-center">暂无订单</p>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    noOrder: Boolean
  },
  methods: {
    btnStatus(value) {
      switch (value) {
        case 0:
          return "去付款"
        case 2:
          return "确认收货"
        default:
          return false
      }
    },
    goPage(v) {
      switch (v) {
        case 0:
          this.$router.push('/home')
          break
        case 2:
          this.$router.push('/cart')
          break
        default:
          break
      }
    }
  }
}
</script>