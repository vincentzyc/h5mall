<template>
  <div class="flex side-nav">
    <div class="flex-none col-4 nav">
      <ul>
        <li v-for="item in data" :key="item.label" @click="selectNav=item" class="lh30 border-bddd textover" style="line-height:200px">{{item.label}}</li>
      </ul>
    </div>
    <div class="flex-auto nav-panel">
      <ul v-if="selectNav">
        <li v-for="item in selectNav.items" :key="item" class="lh30 border-bddd textover">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectNav: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.side-nav {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .nav, .nav-panel {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>