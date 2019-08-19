<template>
  <div id="app">
    <div class="base-content" :class="{fullscreen:fullscreen}">
      <transition :name="transitionName">
        <keep-alive :include="/keep+/">
          <router-view class="base-view"></router-view>
        </keep-alive>
      </transition>
    </div>
    <div v-show="!fullscreen">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script>
import vFooter from "@/components/footer.vue";

export default {
  name: "app",
  components: {
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
      this.transitionName = toDepth === fromDepth ? 'fade' : toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
}
</script>