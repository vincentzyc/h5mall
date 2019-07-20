<template>
  <div class="flex side-nav">
    <div class="flex-none nav" :class="navClass">
      <slot name="navSlot" />
    </div>
    <div class="flex-auto nav-panel">
      <slot name="panelSlot" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navClass: {
      type: String,
      default: 'col-4'
    }
  },
  data() {
    return {
      selectNav: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.side-nav {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .nav, .nav-panel {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
  }

  .nav /deep/ {
    background: #eee;

    li {
      border-bottom: 1px solid #ccc;
      line-height: 44px;
    }

    li.active {
      position: relative;
      background: #fff;
      color: $color-theme;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: $color-theme;
      }
    }
  }
}
</style>