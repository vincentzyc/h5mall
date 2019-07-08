<template>
  <base-page>
    <common-header title="店铺详情" />
    <cube-scroll ref="scroll" :scrollEvents="['scroll']" @scroll="scroll">
      <div class="pd-b50">
        <div class="bgfff mg-t15 pd10 flex">
          <img src="@/assets/img/store3.png" alt="商家logo" class="square88 flex-none" />
          <div class="flex flex-auto pd-l10">
            <div class="flex-auto">
              <div class="flex align-middle">
                <h3 class="lh30 fs18 mg-r10">周氏云商城</h3>
                <div class="identity"></div>
              </div>
              <p class="lh24">商家介绍商家介绍商家介绍</p>
              <div class="flex align-middle store cyellow fs10">
                <p class="lh26 mg-r5">用户评分</p>
                <cube-rate v-model="score" disabled></cube-rate>
                <span>{{score}}分</span>
              </div>
            </div>
            <img src="@/assets/img/logo.png" alt="二维码" class="qrcode" />
          </div>
        </div>
        <div class="bgfff mg-t15">
          <cube-tab-bar v-model="selectedLabel" show-slider class="border-beee">
            <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index" class="lh30 width100"></cube-tab>
          </cube-tab-bar>
          <cube-tab-panels class="mg-b10">
            <cube-tab-panel class="img-panel" v-show="selectedLabel==='商品信息'">
              <ProductList :items="items" />
            </cube-tab-panel>
            <cube-tab-panel class="text-panel" v-show="selectedLabel==='商家信息'">
              <div class="store-info">
                <ul>
                  <li>主营：阿迪，Nike</li>
                  <li>所在地：广东省广州市</li>
                  <li>注册时间：2019.07.07</li>
                  <li class="flex">
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
      </div>
    </cube-scroll>

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
      isIdentity: true,
      isLike: false,
      score: 4,
      selectedLabel: '商品信息',
      tabs: ['商品信息', '商家信息'],
      items: [{
        title: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        img: 'store1.png',
        id: 1
      }, {
        title: '杜兰特成为完全自由球员加盟',
        img: 'store2.png',
        id: 2
      }, {
        title: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
        img: 'store3.png',
        id: 3
      }, {
        title: '杜兰特成为完全自由球员加盟',
        img: 'store2.png',
        id: 4
      }, {
        title: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
        img: 'store3.png',
        id: 5
      }]
    };
  },
  computed: {

  }
};
</script>
<style lang="stylus" scoped>
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

