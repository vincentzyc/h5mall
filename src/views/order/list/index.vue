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
            <cube-scroll
              :data="slideItem[0].items"
              ref="scroll0"
              :options="slideItem[0].options"
              @pulling-up="onPullingUp"
            >
              <vProduct :noOrder="slideItem[0].noOrder" :items="slideItem[0].items" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待付款 -->
          <cube-slide-item>
            <cube-scroll
              :data="slideItem[1].items"
              ref="scroll1"
              :options="slideItem[1].options"
              @pulling-up="onPullingUp"
            >
              <vProduct :noOrder="slideItem[1].noOrder" :items="slideItem[1].items" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待发货 -->
          <cube-slide-item>
            <cube-scroll
              :data="slideItem[2].items"
              ref="scroll2"
              :options="slideItem[2].options"
              @pulling-up="onPullingUp"
            >
              <vProduct :noOrder="slideItem[2].noOrder" :items="slideItem[2].items" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待收货 -->
          <cube-slide-item>
            <cube-scroll
              :data="slideItem[3].items"
              ref="scroll3"
              :options="slideItem[3].options"
              @pulling-up="onPullingUp"
            >
              <vProduct :noOrder="slideItem[3].noOrder" :items="slideItem[3].items" />
            </cube-scroll>
          </cube-slide-item>
          <!-- 待评价 -->
          <cube-slide-item>
            <cube-scroll
              :data="slideItem[4].items"
              ref="scroll4"
              :options="slideItem[4].options"
              @pulling-up="onPullingUp"
            >
              <vProduct :noOrder="slideItem[4].noOrder" :items="slideItem[4].items" />
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
      pullUpLoad: {
        txt: {
          noMore: '没有更多了...'
        }
      },
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
      allOrders: [],
      slideItem: [{
        items: [],
        num: 0,
        noOrder: false,
        options: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          pullUpLoad: false,
          directionLockThreshold: 0
        },
      }, {
        items: [],
        num: 0,
        noOrder: false,
        options: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          pullUpLoad: false,
          directionLockThreshold: 0
        },
      }, {
        items: [],
        num: 0,
        noOrder: false,
        options: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          pullUpLoad: false,
          directionLockThreshold: 0
        },
      }, {
        items: [],
        num: 0,
        noOrder: false,
        options: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          pullUpLoad: false,
          directionLockThreshold: 0
        },
      }, {
        items: [],
        num: 0,
        noOrder: false,
        options: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          pullUpLoad: false,
          directionLockThreshold: 0
        },
      }]
    }
  },
  methods: {
    async onPullingUp() {
      this.getOrder(this.initialIndex)
    },
    changePage(current) {
      if (this.slideItem[current].items.length === 0 && this.slideItem[current].num === 0) this.getOrder(current)
      this.selectedLabel = this.tabLabels[current].label;
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    /**
     * s => order_status	string	否	''全部  0 待付款 1已付款（待发货）2已发货(待收货) 3已收货（待评价） 4用户已评价 5商家已评价
     */
    async getOrder(index) {
      if (this.slideItem[index].num === false) return;
      let orderStatus = index - 1;
      if (orderStatus === -1) orderStatus = '';
      this.slideItem[index].num++;
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        pageNum: this.slideItem[index].num,
        order_status: orderStatus
      }
      console.log(param);
      let res = await this.$api.Order.allOrder(param);
      console.log(res);
      this.slideItem[index].items.push(...res.orderList);
      if (this.slideItem[index].num === 1 && res.orderList.length === 0) this.slideItem[index].noOrder = true;
      if (res.orderList.length < 3) {
        this.slideItem[index].num = false;
      } else {
        this.slideItem[index].options.pullUpLoad = this.pullUpLoad;
      }
      this.$refs['scroll' + index].forceUpdate();
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
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.initialTab()
    this.getOrder(this.initialIndex);
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