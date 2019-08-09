<template>
  <base-page>
    <common-header title="优惠券"></common-header>
    <div>
      <ul class="not_used_coupon">
        <li class="coupon_box">
          <div class="coupon_centent flex align-middle bg1">
            <div class="coupon_centent_left flex-auto">
              <h2>抵现金（让利酬宾）</h2>
              <h5>满2000元可用-老梁包子铺</h5>
              <h6>有效日期:2017.07.31--2017.12.31</h6>
            </div>

            <div class="coupon_centent_right">￥10</div>
          </div>
        </li>

        <li class="coupon_box">
          <div class="coupon_centent flex align-middle bg2">
            <div class="coupon_centent_left flex-auto">
              <h2>抵现金</h2>
              <h5>满2000元可用，全平台可用</h5>
              <h6>有效日期:2017.07.31--2017.12.31</h6>
            </div>

            <div class="coupon_centent_right">￥10</div>
          </div>
        </li>
      </ul>
      <!--已过期-->
      <ul class="expired_coupon">
        <li class="coupon_box">
          <div class="coupon_centent flex align-middle">
            <div class="coupon_centent_left flex-auto">
              <h2>抵现金（让利酬宾）</h2>
              <h5>满2000元可用-老梁包子铺</h5>
              <h6>有效日期:2017.07.31--2017.12.31</h6>
            </div>

            <div class="coupon_centent_right">￥10</div>
          </div>
        </li>

        <li class="coupon_box">
          <div class="coupon_centent flex align-middle">
            <div class="coupon_centent_left flex-auto">
              <h2>抵现金</h2>
              <h5>满2000元可用，全平台可用</h5>
              <h6>有效日期:2017.07.31--2017.12.31</h6>
            </div>

            <div class="coupon_centent_right">￥10</div>
          </div>
        </li>
      </ul>

      <ul class="used_coupon">
        <li class="coupon_box">
          <div class="coupon_centent flex align-middle">
            <div class="coupon_centent_left flex-auto">
              <h2>抵现金（让利酬宾）</h2>
              <h5>满2000元可用-老梁包子铺</h5>
              <h6>有效日期:2017.07.31--2017.12.31</h6>
            </div>

            <div class="coupon_centent_right">￥10</div>
          </div>
        </li>

        <li class="coupon_box">
          <div class="coupon_centent flex align-middle">
            <div class="coupon_centent_left flex-auto">
              <h2>抵现金</h2>
              <h5>满2000元可用，全平台可用</h5>
              <h6>有效日期:2017.07.31--2017.12.31</h6>
            </div>

            <div class="coupon_centent_right">￥10</div>
          </div>
        </li>
      </ul>
    </div>
  </base-page>
</template>
<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.coupon_box {
  width: 100%;
  padding: 0 5px;
  margin-top: 15px;
}

.coupon_centent {
  height: 110px;
}

.not_used_coupon .bg1 {
  background: url('~@/assets/img/yhq.png') no-repeat 0 0 / 100% 100%;
}

.not_used_coupon .bg2 {
  background: url('~@/assets/img/yhq.png') no-repeat 0 0 / 100% 100%;
}

.coupon_centent_left {
  padding-left: 15px;
}

.coupon_centent_left h2 {
  font-size: 18px;
  color: $color-theme;
  font-weight: bold;
}

.coupon_centent_left h5 {
  font-size: 12px;
  color: $color-theme;
  padding-top: 10px;
}

.coupon_centent_left h6 {
  font-size: 10px;
  color: #999999;
  padding-top: 10px;
}

.coupon_centent_right {
  font-size: 30px;
  color: #fff;
  padding-right: 33px;
}

.expired_coupon .coupon_centent {
  background: url('~@/assets/img/yhq-gq.png') no-repeat 0 0 / 100% 100%;
}

.used_coupon .coupon_centent {
  background: url('~@/assets/img/yhq-sy.png') no-repeat 0 0 / 100% 100%;
}

.used_coupon .coupon_centent_left h2, .used_coupon .coupon_centent_left h5 {
  color: #333333;
}
</style>
