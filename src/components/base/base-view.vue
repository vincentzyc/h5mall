<template>
  <transition :name="transitionName">
    <router-view class="base-view"></router-view>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: "base-view",
  data(){
    return {
      transitionName:""
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth === fromDepth ? 'fade' : toDepth < fromDepth? 'slide-right' : 'slide-left'
  }
}
};
</script>

<style>
.base-view {
  transition: 0.3s;
}
.fade-enter, .fade-leave-active{
	opacity: 0;
}
.slide-left-enter, .slide-left-leave-active {
  transform: translate(100%, 0);
}
.slide-right-enter, .slide-right-leave-active {
  transform: translate(-100%, 0);
}
</style>
