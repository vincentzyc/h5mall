<template>
  <div>
    <footer class="footer-wrap">
      <div class="flex">
        <div class="col-2">
          <div class="icon cart"></div>
          <h5 class="fs12 c999">购物车</h5>
        </div>
        <div class="col-2" @click="$router.push('/store/detail?id='+Data.shop_id)">
          <div class="icon store"></div>
          <h5 class="fs12 c999">店铺</h5>
        </div>
        <div class="col-2">
          <div class="icon seller"></div>
          <h5 class="fs12 c999">联系卖家</h5>
        </div>
        <div class="col-3 add-cart" @click="showPopup()">加入购物车</div>
        <div class="col-3 pay" @click="showPopup()">立即支付</div>
      </div>
    </footer>
    <div class="specsPopup">
      <cube-popup position="bottom" :mask-closable="true" ref="specsPopup">
        <div class="flex preview">
          <img :src="selectSpecs.specsImg" alt="商品预览图" />
          <div class="flex flex-auto specs-select align-end">
            <span class="ctheme fs12 mg-l10">
              ￥
              <span class="fs18">{{selectSpecs.specsPrice}}</span>
            </span>
          </div>
          <i class="cubeic-close" @click="hidePopup()"></i>
        </div>
        <div class="specs-info">
          <p class="lh30 fs12">选择规格</p>
          <ul class="specs-content">
            <li :class="{active:selectSpecs.id===item.id}" v-for="item in Data.specs" :key="item.id" @click="selectSpecs=item">{{item.specsName}}</li>
          </ul>
        </div>
        <div class="flex handle">
          <div class="flex-auto btn add-cart">加入购物车</div>
          <div class="flex-auto btn pay" @click="handlePay()">立即购买</div>
        </div>
      </cube-popup>
    </div>
  </div>
</template>

<script>
export default {
  props: ['Data'],
  data() {
    return {
      selectSpecs: ''
    }
  },
  watch: {
    Data(n) {
      this.selectSpecs = n.specs[0] || ''
    }
  },
  methods: {
    handlePay() {
      console.log("立即购买");
      // this.$refs.specsPopup.show()
    },
    showPopup() {
      this.$refs.specsPopup.show()
    },
    hidePopup() {
      this.$refs.specsPopup.hide()
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.footer-wrap {
  .icon {
    width: 30px;
    height: 30px;
    margin: 3px auto 0 auto;
  }

  .cart {
    background: url('~@/assets/img/detail-footer.png') no-repeat 0px 0px / auto 100%;
  }

  .store {
    background: url('~@/assets/img/detail-footer.png') no-repeat -30px 0px / auto 100%;
  }

  .seller {
    background: url('~@/assets/img/detail-footer.png') no-repeat -65px 0px / auto 100%;
  }
}

.add-cart {
  background: $color-orange;
  color: #fff;
  line-height: 50px;
}

.pay {
  background: $color-theme;
  color: #fff;
  line-height: 50px;
}

.specsPopup & /deep/ {
  .cube-popup-content {
    width: 100%;
    height: 80%;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    background: #fff;
  }

  .preview {
    padding: 15px;

    img {
      border-radius: 5px;
      width: 88px;
      height: 88px;
    }
  }

  .specs-info {
    position: absolute;
    top: 110px;
    left: 15px;
    right: 15px;
    bottom: 50px;

    .specs-content {
      position: absolute;
      top: 30px;
      bottom: 0;
      font-size: 12px;
      overflow-y: auto;

      li {
        display: inline-block;
        margin-bottom: 15px;
        margin-right: 15px;
        padding: 10px 15px;
        border-radius: 20px;
        background: #eee;
        color: #333;
        border: 1px solid transparent;
      }

      li.active {
        background: $color-theme-light;
        border-color: $color-theme;
        color: $color-theme;
      }
    }
  }

  .handle {
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #ddd;
  }
}
</style>

