<template>
  <div class="recommend-list">
    <div
      v-for="(item, index) in list"
      :label="item.label"
      :key="item.label+index"
      class="item col-6"
      @click="$router.push('/products/detail?id='+item.id)"
    >
      <img :src="require(`@/assets/img/${item.img}`)" alt class="item-img">
      <div class="mg-t5">
        <h4 class="textover lh20">{{item.introduce}}</h4>
        <div class="ctheme fs16 lh20 mg-t5">￥33</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      require: true,
      type: Array
    }
  },
  data() {
    return {

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
.recommend-list {
  padding-bottom: 0;

  .item {
    padding: 10px;
    border-bottom: 1px solid #eee;

    &:nth-child(2n-1) {
      border-right: 1px solid #eee;
    }
  }

  .item-img {
    width: 100%;
    height: 150px;
  }
}
</style>
