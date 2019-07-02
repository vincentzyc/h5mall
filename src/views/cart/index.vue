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
          <div class="text-center mg20">购物车</div>
          <div style="height:1500px;width:100%;background:#999"></div>
          <div class="text-center mg20">到底啦</div>
        </div>
      </cube-scroll>
    </div>
    <footer class="footer-wrap lh50">
      <div class="flex">
        <div class="pd-l10 c666" @click="allSelect=!allSelect">
          <i class="cubeic-right fs16 ctheme" v-show="allSelect"></i>
          <i class="cubeic-round-border fs16" v-show="!allSelect"></i>
          <span class="mg-l5">全选</span>
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
      showDelete: false,
      allSelect: false,
      items: [

      ]
    }
  },
  methods: {

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
}
</style>