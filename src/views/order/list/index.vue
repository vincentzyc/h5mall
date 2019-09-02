<template>
  <base-page>
    <common-header title="订单" />
    <div class="content">
      <cube-tab-bar
        class="tab-bar"
        v-model="selectedLabel"
        show-slider
        :use-transition="false"
        ref="tabNav"
        :data="tabLabels"
      ></cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="false"
          :initial-index="initialIndex"
          :auto-play="false"
          :show-dots="false"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 全部 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions" @pulling-up="onPullingUp">
              <vProduct :items="getOrders()" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待付款 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions" @pulling-up="onPullingUp">
              <vProduct :items="getOrders(0)" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待发货 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions" @pulling-up="onPullingUp">
              <vProduct :items="getOrders(1)" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待收货 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions" @pulling-up="onPullingUp">
              <vProduct :items="getOrders(2)" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待评价 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions" @pulling-up="onPullingUp">
              <vProduct :items="getOrders(3)" />
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </base-page>
</template>

<script type="text/ecmascript-6">
import vProduct from './products'
import { getUser } from "@/service/user"
export default {
  components: {
    vProduct
  },
  data() {
    return {
      selectedLabel: '全部',
      tabLabels: [{
        label: '全部'
      }, {
        label: '待付款'
      }, {
        label: '待发货'
      }, {
        label: '待收货'
      }, {
        label: '待评价'
      }],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      allOrders: [],
      pageNum: [0, 0, 0, 0, 0]
    }
  },
  methods: {
    async onPullingUp() {
      // if (!this.upLoadMore) return this.$refs.scroll.forceUpdate();
      // this.param.pageNum++;
      // this.upLoadMore = await this.search();
    },
    getOrders(s) {
      if (s === undefined || s === '') return this.allOrders;
      return this.allOrders.filter(v => v.order_status === s)
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      // console.log(current)
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    async getAllOrder() {
      this.userInfo = await getUser(this.$route.fullPath);
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        pageNum: 1,
        order_status: '',
        // order_status	string	否	''全部  0 待付款 1已付款（待发货）2已发货(待收货) 3已收货（待评价） 4用户已评价 5商家已评价
      }
      let res = await this.$api.Order.allOrder(param);
      console.log(res);
      this.allOrders = res.orderList || []
    },
    initialTab() {
      let i = Number(this.$route.query.type || 0);
      this.selectedLabel = this.tabLabels[i].label
    }
  },
  computed: {
    initialIndex() {
      return this.tabLabels.findIndex(item => item.label === this.selectedLabel);
    }
  },
  created() {
    this.getAllOrder();
    this.initialTab()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
/* 覆盖样式 */
.tab-bar {
  padding: 10px 0;
  background-color: #fff;
}

.tab-slide-container {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 0;
}

.content /deep/ {
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
}
</style>