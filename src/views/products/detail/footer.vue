<template>
  <footer class="footer-wrap">
    <div class="flex">
      <div class="col-2">
        <div class="icon cart"></div>
        <h5 class="fs12 c999">购物车</h5>
      </div>
      <div class="col-2">
        <div class="icon store"></div>
        <h5 class="fs12 c999">店铺</h5>
      </div>
      <div class="col-2">
        <div class="icon seller"></div>
        <h5 class="fs12 c999">联系卖家</h5>
      </div>
      <div class="col-3 add-cart">加入购物车</div>
      <div class="col-3 pay">立即支付</div>
    </div>
  </footer>
</template>

<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.footer-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  text-align: center;
  height: 50px;

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

  .add-cart {
    background: $color-light-orange;
    color: #fff;
    line-height: 50px;
  }

  .pay {
    background: $color-theme;
    color: #fff;
    line-height: 50px;
  }
}
</style>

