<template>
  <transition :name="pageTransition">
    <div v-show="pageVisible" class="max640 page-popup">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'page-popup',
  props: {
    position: {
      type: String,
      default: 'right'
    },
    type: {
      type: String,
      default: 'popup'
    }
  },
  watch: {
    "$route": {
      handler(n) {
        this.pageVisible = n.query.type === this.type
      },
      immediate: true
    }
  },
  data() {
    return {
      pageVisible: false,
      pageTransition: ''
    };
  },
  methods: {
    open() {
      this.$router.push(`${this.$route.fullPath}${Object.keys(this.$route.query).length > 0 ? '&' : '?'}type=${this.type}`)
    },
    close() {
      this.$router.back();
    }
  },
  beforeMount() {
    this.pageTransition = `popup-slide-${this.position}`;
  }
};
</script>

<style lang="stylus">
.page-popup {
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.3s;
  z-index: 999;
}

.popup-slide-top-enter, .popup-slide-top-leave-active {
  transform: translate3d(0, -100%, 0);
}

.popup-slide-right-enter, .popup-slide-right-leave-active {
  transform: translate3d(100%, 0, 0);
}

.popup-slide-bottom-enter, .popup-slide-bottom-leave-active {
  transform: translate3d(0, 100%, 0);
}

.popup-slide-left-enter, .popup-slide-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}
</style>