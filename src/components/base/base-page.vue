<template>
  <div class="base-page">
    <main class="wrapper" :class="[top0?'top0':'top44']">
      <slot />
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "base-page",
  props: {
    top0: {
      type: Boolean,
      default: false
    }
  }

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
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &.top0 {
      padding-top: 0;
    }

    &.top44 {
      padding-top: 44px;
    }
  }
}
</style>
