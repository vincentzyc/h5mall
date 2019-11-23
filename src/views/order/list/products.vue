<template>
  <div v-if="!noOrder">
    <div v-if="items.length>0">
      <!-- 店铺 -->
      <div class="products mg-b10 bgfff" v-for="(store,index) in items" :key="store.id">
        <div class="flex align-middle pd10 c666">
          <span class="store"></span>
          <div class="flex align-middle mg-l10">
            <span class="mg-r10">{{store.shop_name}}</span>
            <i class="fs16 cubeic-arrow"></i>
          </div>
          <div class="flex-auto text-right cblue">{{store.order_status|orderState}}</div>
        </div>
        <!-- 商品 -->
        <div
          class="product-item mg-b5 bg-grey-sss"
          v-for="item in store.products"
          :key="item.id"
          @click="$router.push('/order/orderdetail?id=' + item.id)"
        >
          <div class="pd10">
            <div class="flex product-info">
              <img class="flex-none" v-lazy="item.img.split(',')[0]" alt="产品图片" />
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
        <!-- 商品价格总计 -->
        <div class="flex pd10 bgfff flex-center">
          <span>总计：</span>
          <div class="flex-auto">￥{{totalPrice(store.products)}}</div>
          <cube-button
            v-if="store.order_status===0"
            :inline="true"
            :outline="true"
            primary
            class="mg-r10"
            @click="deleteConfirm(store,index)"
          >删除订单</cube-button>
          <cube-button
            :inline="true"
            primary
            v-if="btnStatus(store.order_status)"
            @click="goPage(store)"
          >{{btnStatus(store.order_status)}}</cube-button>
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
    noOrder: Boolean,
    userInfo: Object
  },
  filters: {
    orderState(v) {
      switch (v) {
        case 0:
          return "待付款"
        case 1:
          return "待发货"
        case 2:
          return "待收货"
        case 3:
          return "待评价"
        default:
          return ''
      }
    }
  },
  methods: {
    totalPrice(arr) {
      let totalPrice = 0, sum = 0;
      sum = arr.reduce((all, c) => all + c.num * c.price, 0)
      totalPrice += sum;
      return this.$util.toDecimal(totalPrice, 2)
    },
    btnStatus(value) {
      switch (value) {
        case 0:
          return "去付款"
        case 2:
          return "确认收货"
        case 3:
          return "去评价"
        default:
          return false
      }
    },
    async deleteConfirm(store, index) {
      this.$createDialog({
        type: 'confirm',
        content: '是否确定删除选中订单',
        onConfirm: () => {
          this.deleteOrder(store, index);
        },
        onCancel: () => { }
      }).show()
    },
    async deleteOrder(store, index) {
      this.$loading.open();
      let allId = "";
      store.products.forEach(element => {
        allId += (element.id + ",")
      });
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        id: allId.slice(0, -1)
      }
      let res = await this.$api.Order.deleteOrder(param);
      this.items.splice(index, 1);
      this.$emit('isDelete',store.order_status)
      this.$loading.close();
      this.$createToast({
        txt: '删除成功',
        type: 'txt'
      }).show()
    },
    goPage(store) {
      let allId = "";
      switch (store.order_status) {
        case 0:
          store.products.forEach(element => {
            allId += (element.id + ",")
          });
          this.$router.push('/order/orderdetail?id=' + allId.slice(0, -1))
          break
        case 2:
          this.$router.push('/order/orderdetail?id=' + store.order_id)
          break
        case 3:
          this.$router.push('/order/comment?id=' + store.order_id)
          break
        default:
          break
      }
    }
  }
}
</script>