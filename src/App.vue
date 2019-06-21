<template>
  <div id="app">
    <div class="base-content" :class="{fullscreen:fullscreen}">
      <transition :name="transitionName">
        <router-view class="base-view"></router-view>
      </transition>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Home from "@/views/home";
import vFooter from "@/components/footer.vue";

export default {
  name: "app",
  components: {
    Home,
    vFooter
  },
  data() {
    return {
      transitionName: "",
      fullscreen: false
    }
  },
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.fullscreen = toDepth === 2 ? false : true;
      this.transitionName = toDepth === fromDepth ? 'fade' : toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style>
#app,
body,
html {
  height: 100%;
  width: 100%;
}

.base-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 52px;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.base-content.fullscreen {
  bottom: 0;
}
.base-view {
  transition: 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-left-enter,
.slide-left-leave-active {
  transform: translate(100%, 0);
}
.slide-right-enter,
.slide-right-leave-active {
  transform: translate(-100%, 0);
}
</style>
