<template>
  <base-page>
    <common-header title="店铺详情" />
    <div class="content-wrap" v-if="aData">
      <cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp">
        <div class="bgfff mg-t15 pd10 flex">
          <img :src="aData.shop.img" alt="商家logo" class="square88 flex-none" />
          <div class="flex flex-auto pd-l10">
            <div class="flex-auto">
              <div class="flex align-middle">
                <h3 class="lh30 fs16 mg-r10">{{aData.shop.name}}</h3>
                <div class="identity"></div>
              </div>
              <p class="fs12 lh20 textover2">{{aData.shop.description}}</p>
              <div class="flex align-middle store cyellow fs10">
                <p class="lh26 mg-r5">用户评分</p>
                <div v-if="aData.shop.score>0">
                  <cube-rate v-model="aData.shop.score" disabled></cube-rate>
                  <span>{{aData.shop.score}}分</span>
                </div>
                <p v-else class="c999">暂无评分！</p>
              </div>
            </div>
            <div class="flex-none">
              <img v-if="aData.shop.qr_code" :src="aData.shop.qr_code" alt="二维码" class="qrcode" />
            </div>
          </div>
        </div>
        <div class="bgfff mg-t15">
          <cube-tab-bar v-model="selectedLabel" show-slider class="border-beee" @click="changeTab">
            <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index" class="lh30 width100"></cube-tab>
          </cube-tab-bar>
          <cube-tab-panels class="mg-b10">
            <cube-tab-panel class="img-panel" label="商品信息" v-show="selectedLabel==='商品信息'">
              <ProductList :items="productList" v-if="productList.length>0" />
              <div v-else>
                <p class="mg20 lh30 text-center">暂无商品</p>
              </div>
            </cube-tab-panel>
            <cube-tab-panel class="text-panel" label="商家信息" v-show="selectedLabel==='商家信息'">
              <div class="store-info">
                <ul>
                  <li>主营：阿迪，Nike</li>
                  <li>所在地：广东省广州市</li>
                  <li>注册时间：2019.07.07</li>
                  <li class="flex" @click="$refs.pagePopup.open()">
                    <span class="flex-auto">店铺介绍</span>
                    <i class="cubeic-arrow c666"></i>
                  </li>
                  <li class="flex">
                    <span class="flex-auto">优惠券领取</span>
                    <i class="cubeic-arrow c666"></i>
                  </li>
                </ul>
              </div>
            </cube-tab-panel>
          </cube-tab-panels>
        </div>
      </cube-scroll>
    </div>

    <footer class="flex footer-wrap align-middle">
      <div class="flex flex-center flex-auto" @click="isLike=!isLike">
        <div class="icon like" :class="{active:isLike}"></div>
        <h5 class="fs12 c999">关注</h5>
      </div>
      <div class="flex flex-center flex-auto">
        <div class="icon seller"></div>
        <h5 class="fs12 c999">联系卖家</h5>
      </div>
      <div class="flex flex-center flex-auto">
        <div class="icon call"></div>
        <h5 class="fs12 c999">打电话</h5>
      </div>
    </footer>

    <!-- 店铺介绍 -->
    <page-popup ref="pagePopup" position="right" class="pd-t44">
      <div class="pd10">
        <common-header title="店铺介绍" hideBack>
          <i slot="left" class="cubeic-back" @click="$refs.pagePopup.close()"></i>
        </common-header>
        <p class="lh24">店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</p>
        <p class="lh24">店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</p>
        <p class="lh24">店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</p>
        <p class="lh24">店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</p>
        <p class="lh24">店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</p>
        <p class="lh24">店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</p>
        <p class="lh24">店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍</p>
      </div>
    </page-popup>
  </base-page>
</template>

<script type="text/ecmascript-6">
import ProductList from "@/components/product-list-s.vue";
export default {
  components: {
    ProductList
  },
  data() {
    return {
      aData: "",
      pageNum: 0,
      upLoadMore: true,
      pullUpLoad: {
        txt: {
          noMore: '没有更多了...'
        }
      },
      options: {
        pullUpLoad: {
          txt: {
            noMore: '没有更多了...'
          }
        }
      },
      isIdentity: true,
      isLike: false,
      score: 4,
      selectedLabel: '商品信息',
      tabs: ['商品信息', '商家信息'],
      productList: []
    };
  },
  methods: {
    changeTab(tab) {
      this.options.pullUpLoad = tab === '商家信息' ? false : this.pullUpLoad;
    },
    async onPullingUp() {
      if (!this.upLoadMore) return this.$refs.scroll.forceUpdate();
      let res = await this.getDetail();
      this.upLoadMore = res.upLoadMore;
      this.$refs.scroll.forceUpdate(res.hasData);
    },
    async getDetail() {
      this.pageNum++;
      let param = {
        pageNum: this.pageNum,
        shop_id: this.$route.query.id
      }
      console.log(param);
      let res = await this.$api.Store.shopDetail(param);
      console.log(res);
      this.aData = {
        shop: res.shop,
        farmer: res.farmer
      };
      this.productList.push(...res.productList);
      return {
        upLoadMore: res.productList.length === 10,
        hasData: res.productList.length > 0
      }
    }
  },
  created() {
    this.getDetail()
  }
};
</script>
<style lang="stylus" scoped>
.content-wrap {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
}

.qrcode {
  width: 30px;
  height: 30px;
  margin-top: 10px;
}

.identity {
  width: 20px;
  height: 15px;
  background: url('~@/assets/img/store-detail.png') no-repeat -77px -30px / 100px 66px;
}

.store-info {
  li {
    padding: 15px 10px;
    border-bottom: 1px solid #eee;
  }
}

.store {
  & /deep/ .cube-rate-item {
    width: 10px;
    margin-right: 5px;
  }
}

.footer-wrap {
  border-top: 1px solid #eee;

  &>div {
    &:not(:last-child) {
      border-right: 1px solid #eee;
    }
  }

  .icon {
    width: 24px;
    height: 20px;
  }

  .cubeic-like {
    font-size: 24px;
  }

  .like {
    background: url('~@/assets/img/store-detail.png') no-repeat -36px -31px / 90px 55px;
  }

  .like.active {
    background: url('~@/assets/img/store-detail.png') no-repeat -36px -4px / 90px 55px;
  }

  .call {
    background: url('~@/assets/img/store-detail.png') no-repeat -4px -33px / 90px 55px;
  }

  .seller {
    background: url('~@/assets/img/store-detail.png') no-repeat -4px -4px / 90px 55px;
  }
}
</style>

