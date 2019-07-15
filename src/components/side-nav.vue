<template>
  <div class="flex side-nav">
    <div class="flex-none nav" :class="navClass">
      <ul>
        <li
          v-for="item in data"
          :key="item.label"
          @click="handleNav(item)"
          class="textover"
          :class="{active:selectNav.label===item.label}"
        >{{item.label}}</li>
      </ul>
    </div>
    <div class="flex-auto nav-panel">
      <ul v-if="!panelSlot&&selectNav" class="pd10">
        <li v-for="item in selectNav.items" :key="item" class="lh30 border-beee textover">{{item}}</li>
      </ul>
      <slot v-if="panelSlot&&selectNav" :selectNav="selectNav" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    navClass: {
      type: String,
      default: 'col-4'
    },
    panelSlot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectNav: ''
    }
  },
  methods: {
    handleNav(item) {
      this.selectNav = item;
      this.$emit('selectNav', item)
    }
  },
  created() {
    this.selectNav = this.data[0]
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

  .nav {
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