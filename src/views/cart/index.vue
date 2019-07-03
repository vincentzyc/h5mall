<template>
  <base-page>
    <header class="header-bg">
      <div class="flex fs14 cfff">
        <span class="col-2"></span>
        <div class="flex-auto">购物车</div>
        <span class="col-2" @click="showDelete=!showDelete">{{showDelete?'完成':'编辑'}}</span>
      </div>
    </header>
    <div class="content">
      <cube-scroll ref="scroll">
        <div class="scroll-wrapper">
          <!-- 店铺 -->
          <div class="mg-t10" v-for="store in 3" :key="store">
            <div class="flex align-middle pd10 c666 bgfff">
              <cube-checkbox v-model="check" class="store-check"></cube-checkbox>
              <span class="store"></span>
              <span class="mg-l10 mg-r10">京东自营{{store}}</span>
              <i class="fs16 cubeic-arrow"></i>
            </div>
            <!-- 店铺 商品 -->
            <div class="product-item" v-for="item in store" :key="item">
              <div class="pd10">
                <cube-checkbox v-model="checkitem">
                  <div class="flex product-info">
                    <img src="@/assets/img/store3.png" alt="店铺logo" />
                    <div class="pd-l10">
                      <h4 class="textover2 mg-t5">梅西连续9次大赛无缘冠军 “心疼梅西”登上热搜梅西连续9次大赛无缘冠军 “心疼梅西”登上热搜</h4>
                      <p class="ctheme fs16 mg-t5">￥9{{item}}</p>
                    </div>
                  </div>
                </cube-checkbox>
              </div>
              <div class="pd10 bgfff">
                <div class="flex align-middle mg-l20">
                  <span class="mg-l10 c666 fs12">购买数量</span>
                  <div class="flex align-middle flex-auto justify-end">
                    <span class="icon cut"></span>
                    <span class="mg5">1{{item}}</span>
                    <span class="icon add"></span>
                  </div>
                </div>
              </div>
            </div>
            <!-- /店铺 商品 -->
          </div>
          <!--/ 店铺 -->
        </div>
      </cube-scroll>
    </div>
    <footer class="footer-wrap lh50">
      <div class="flex">
        <div class="flex pd-l10 c666">
          <cube-checkbox v-model="allSelect">全选</cube-checkbox>
        </div>
        <div class="flex-auto">
          <div class="text-right pd-r10 c666" v-show="!showDelete">总计：￥99.99</div>
        </div>
        <div class="col-3 pay bgtheme cfff">{{showDelete?'删除':'结算'}}</div>
      </div>
    </footer>
  </base-page>
</template>

<script>

export default {
  name: "cart",
  data() {
    return {
      check: false,
      checkitem: false,
      showDelete: false,
      allSelect: false,
      items: [

      ]
    }
  },
  methods: {
    test() {
      console.log(111111);
    }
  },
  mounted() {
    // this.$nextTick(function () {
    //   setTimeout(() => {
    //     this.$refs.slide.refresh();
    //     this.$refs.scroll.refresh();
    //   }, 0);
    // });
  }
};
</script>
<style lang="stylus" scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 50px;

  .store-check /deep/ .cube-checkbox-wrap {
    padding: 0;

    span.cube-checkbox-label {
      display: none;
    }
  }

  .product-info {
    img {
      width: 80px;
      height: 80px;
    }
  }

  .store {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('~@/assets/img/detail-footer.png') no-repeat -21px 0px / auto 100%;
  }

  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
  }

  .cut {
    background: url('~@/assets/img/cart.png') no-repeat 0px 0px / auto 140px;
  }

  .add {
    background: url('~@/assets/img/cart.png') no-repeat 0px -30px / auto 140px;
  }
}

.content, .footer-wrap {
  & /deep/ .cube-checkbox {
    padding: 0;

    .cube-checkbox-ui {
      font-size: 20px;
      margin-right: 10px;
    }
  }
}
</style>