<template>
  <div class="recommend-list">
    <div
      v-for="item in list"
      :key="item.id"
      class="item col-6"
      @click="viewDetail(item.id)"
    >
      <img v-lazy="item.img" class="item-img" />
      <div class="mg-t5">
        <h4 class="textover lh20">{{item.name}}</h4>
        <div class="ctheme fs16 lh20 mg-t5">￥{{item.price}}</div>
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
  methods: {
    viewDetail(id) {
      this.$router.push('/products/detail?id=' + id);
      // window.location.reload();
    }
  }
}
</script>

<style lang="stylus" scoped>
.recommend-list {
  padding-bottom: 0;
  overflow: hidden;

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
    min-height: 150px;
  }
}
</style>
