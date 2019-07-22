<template>
  <div class="store-list">
    <div class="flex lh30">
      <h5 class="flex-auto c333">优质农户</h5>
      <div class="view-all">
        <span>查看全部</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <div class="row flex">
      <div v-for="(item, index) in tabs" :label="item.name" :key="item.name+index" class="store-item col-4">
        <img :src="item.img" alt />
        <h5 class="fs12">{{item.name}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: []
    }
  },
  async created() {
    let res = await this.$api.Store.bestShop();
    this.tabs = res.recommendList;
  }
}
</script>

<style lang="stylus" scoped>
.store-list {
  padding: 10px;
  background: #fff;
  margin-top: 15px;

  .view-all {
    color: #999;
    font-size: 12px;
  }

  .store-item {
    padding: 5px;

    img {
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
    }
  }
}
</style>

