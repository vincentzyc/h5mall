<template>
  <div class="base-page">
    <div class="wrapper">
      <main class="content">
        <slot/>
      </main>
    </div>
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
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    .content {
      margin: 10px;
    }
  }
}
</style>
