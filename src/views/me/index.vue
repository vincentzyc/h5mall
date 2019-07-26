<template>
  <base-page>
    <div class="page-t0">
      <!-- <cube-scroll ref="scroll"> -->
      <div class="user-info">
        <div class="userimg">
          <img src="@/assets/img/logo.png" alt />
          <span class="vip">v0</span>
        </div>
        <div class="text-center fs18 cfff mg15">vincnet</div>
        <div class="flex opacitybg">
          <div class="flex-auto">优惠券(1)</div>
          <span>|</span>
          <div class="flex-auto">积分(20)</div>
        </div>
      </div>
      <div class="scroll-wrapper">
        <div class="text-center mg20">我的</div>
        <div style="height:1500px;width:100%;background:#999"></div>
        <div class="text-center mg20">到底啦</div>
      </div>
      <!-- </cube-scroll> -->
    </div>
  </base-page>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {
  },
  data() {
    return {
      items: [

      ]
    }
  },
  methods: {

  },
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
  background: rgba(0, 0, 0, 0.15);
}
</style>

