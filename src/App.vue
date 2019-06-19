<template>
  <div id="app">
    <div class="base-content">
      <!-- <cube-scroll ref="scroll"> -->
        <Home/>
      <!-- </cube-scroll> -->
    </div>
    <base-view></base-view>
  </div>
</template>
<script>
// @ is an alias to /src
import Home from "@/views/home";
export default {
  name: "app",
  components: {
    Home
  }
  // mounted() {
  //   this.$nextTick(function () {
  //     window.addEventListener("load", () => {
  //       this.$refs.scroll.refresh();
  //     });
  //   });
  // }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app, body, html {
  height: 100%;
}

.base-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
