<template>
  <header class="header-bg">
    <div class="flex fs14 cfff">
      <div class="pd-r10 pd-l10 minwidth50 textover">
        <i class="cubeic-back" @click="$router.back()" v-show="!hideBack"></i>
        <slot name="left"></slot>
      </div>
      <div class="flex flex-auto flex-center textover">{{title}}</div>
      <div class="pd-r10 pd-l10 minwidth50 textover">
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
