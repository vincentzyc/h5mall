<template>
  <div class="base-page">
    <main class="wrapper">
      <slot />
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "base-page"
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.base-page {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;

  >.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 44px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
