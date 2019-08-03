<template>
  <base-page>
    <div class="page-t0">
      <!-- <cube-scroll ref="scroll"> -->
      <div class="user-info">
        <div class="userimg">
          <img src="@/assets/img/logo.png" alt />
          <span class="vip">v{{user.grade?user.grade:0}}</span>
        </div>
        <div class="text-center fs18 cfff mg15">{{user.name}}</div>
        <div class="flex opacitybg">
          <div class="flex-auto">优惠券(1)</div>
          <span>|</span>
          <div class="flex-auto">积分(20)</div>
        </div>
      </div>
      <div class="bgfff mg-b15">
        <div class="flex pd15 border-beee">
          <span class="flex-auto">我的订单</span>
          <span class="c999 mg-r10 fs12">查看全部</span>
          <i class="cubeic-arrow c666"></i>
        </div>
        <ul class="flex order-state">
          <li>
            <div class="state state1"></div>
            <div>待付款</div>
          </li>
          <li>
            <div class="state state2"></div>
            <div>待发货</div>
          </li>
          <li>
            <div class="state state3"></div>
            <div>待收货</div>
          </li>
          <li>
            <div class="state state4"></div>
            <div>待评价</div>
          </li>
        </ul>
      </div>
      <ul class="info-list">
        <li class="flex align-middle">
          <div class="icon icon1"></div>
          <span class="flex-auto">钱包：</span>
          <strong class="ctheme">￥1111</strong>
        </li>
        <li class="flex align-middle" @click="$router.push('/me/likestore')">
          <div class="icon icon2"></div>
          <span class="flex-auto">我关注的商家</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle">
          <div class="icon icon3"></div>
          <span class="flex-auto">收货地址</span>
          <i class="cubeic-arrow c666"></i>
        </li>
      </ul>
      <ul class="info-list">
        <li class="flex align-middle">
          <div class="icon icon4"></div>
          <span class="flex-auto">联系客服</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle">
          <div class="icon icon5"></div>
          <span class="flex-auto">成为农户</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle">
          <div class="icon icon6"></div>
          <span class="flex-auto">设置</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle">
          <div class="icon icon7"></div>
          <span class="flex-auto">关注公共号</span>
          <i class="cubeic-arrow c666"></i>
        </li>
      </ul>
      <!-- </cube-scroll> -->
    </div>
  </base-page>
</template>

<script>
export default {
  name: "me",
  components: {
  },
  data() {
    return {
      user: "",
      items: [

      ]
    }
  },
  methods: {

  },
  created() {
    let userInfo = this.$util.getLStorage('userInfo', true);
    console.log(userInfo);
    if (userInfo) this.user = userInfo.user
  }
};
</script>

<style lang="stylus" scoped>
.user-info {
  width: 100%;
  padding-top: 20px;
  background: url('~@/assets/img/me-bg.jpg') no-repeat 0 0 / 100% 100%;
}

.vip {
  position: absolute;
  display: inline-block;
  bottom: -5px;
  right: 5px;
  background: #ff8c2e;
  border-radius: 20px;
  padding: 5px;
  font-size: 12px;
  border: 2px solid #fff;
  color: #fff;
}

.userimg {
  position: relative;
  width: 88px;
  height: 88px;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
}

.opacitybg {
  text-align: center;
  color: #fff;
  line-height: 44px;
  background: rgba(0, 0, 0, 0.1);
}

.order-state {
  padding: 20px 0;
  color: #999;

  li {
    text-align: center;
    width: 25%;
  }

  img {
    width: 36px;
    height: 36px;
    margin-bottom: 10px;
  }

  .state {
    width: 36px;
    height: 36px;
    margin: 0 auto 10px auto;
  }

  .state1 {
    background: url('~@/assets/img/me.png') no-repeat -240px 0 / auto 100%;
  }

  .state2 {
    background: url('~@/assets/img/me.png') no-repeat -279px 0 / auto 100%;
  }

  .state3 {
    background: url('~@/assets/img/me.png') no-repeat -319px 0 / auto 100%;
  }

  .state4 {
    background: url('~@/assets/img/me.png') no-repeat -358px 0 / auto 100%;
  }
}

.info-list {
  background: #fff;
  margin-bottom: 15px;
  padding: 0 10px;

  li {
    padding: 12px 5px;
    border-bottom: 1px solid #eee;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .icon1 {
    background: url('~@/assets/img/me.png') no-repeat -44px -1px / auto 100%;
  }

  .icon2 {
    background: url('~@/assets/img/me.png') no-repeat -21px -1px / auto 100%;
  }

  .icon3 {
    background: url('~@/assets/img/me.png') no-repeat -67px -1px / auto 100%;
  }

  .icon4 {
    background: url('~@/assets/img/me.png') no-repeat -89px -1px / auto 100%;
  }

  .icon5 {
    background: url('~@/assets/img/me.png') no-repeat -113px -1px / auto 100%;
  }

  .icon6 {
    background: url('~@/assets/img/me.png') no-repeat -136px -1px / auto 100%;
  }

  .icon7 {
    background: url('~@/assets/img/me.png') no-repeat 0 -1px / auto 100%;
  }
}
</style>

