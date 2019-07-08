<template>
  <header class="header-bg">
    <div class="flex fs14 cfff">
      <div class="col-2">
        <i class="cubeic-back" @click="$router.back()" v-show="!hideBack"></i>
        <slot name="left"></slot>
      </div>
      <div class="flex-auto">{{title}}</div>
      <div class="col-2">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
export default {
  name: "common-header",
  props: {
    title: {
      type: String,
      default: ''
    },
    hideBack: {
      type: Boolean,
      default: false
    }
  }
};
</script>
