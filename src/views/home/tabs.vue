<template>
  <div class="row flex flex-wrap tabs-wrap">
    <div v-for="(item, index) in tabs" :label="item.label" :key="item.label" class="tabs-item flex-none">
      <i slot="icon" :class="item.icon"></i>
      <h4>{{item.label}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabelSlots: 'Like',
      tabs: [{
        label: 'Home',
        icon: 'cubeic-home'
      }, {
        label: 'Like',
        icon: 'cubeic-like'
      }, {
        label: 'Vip',
        icon: 'cubeic-vip'
      }, {
        label: 'Me',
        icon: 'cubeic-person'
      }, {
        label: 'Home1',
        icon: 'cubeic-home'
      }, {
        label: 'Like1',
        icon: 'cubeic-like'
      }, {
        label: 'Vip1',
        icon: 'cubeic-vip'
      }, {
        label: 'Me1',
        icon: 'cubeic-person'
      }, {
        label: 'Home2',
        icon: 'cubeic-home'
      }, {
        label: 'Like2',
        icon: 'cubeic-like'
      }, {
        label: 'Vip2',
        icon: 'cubeic-vip'
      }, {
        label: 'Me2',
        icon: 'cubeic-person'
      }]
    }
  },
  methods: {
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs-wrap {
  padding: 15px 0;

  .tabs-item {
    width: 20%;
    text-align: center;
    padding: 5px;
    margin-bottom: 5px;
  }
}
</style>

