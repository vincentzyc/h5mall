<template>
  <div class="row flex flex-wrap tabs-wrap">
    <div
      v-for="item in tabs"
      :label="item.name"
      :key="item.name"
      class="tabs-item flex-none"
      @click="$router.push('/products/search?id='+item.parent_id)"
    >
      <img :src="item.img" alt />
      <h5>{{item.name}}</h5>
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
    let res = await this.$api.Product.productType();
    this.tabs = res;
  }
}
</script>

<style lang="stylus" scoped>
.tabs-wrap {
  padding: 10px 5px;
  background: #fff;

  .tabs-item {
    width: 20%;
    text-align: center;
    padding: 5px;
    margin-bottom: 5px;
    font-size: 12px;
    color: #666;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>

