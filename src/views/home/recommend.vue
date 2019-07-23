<template>
  <div class="recommend-wrap bgfff">
    <div class="flex lh30 border-beee pd5 pd-l10 pd-r10">
      <h5 class="flex-auto c333">为您推荐</h5>
      <div class="c999 fs12" @click="$router.push('/products/search?type=全部')">
        <span>查看全部</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <ProductList :items="items" />
  </div>
</template>

<script>
import ProductList from "@/components/product-list.vue";
export default {
  components: {
    ProductList
  },
  data() {
    return {
      pageNum: 0,
      items: []
    }
  },
  methods: {
    async getRecommend() {
      this.pageNum++;
      let res = await this.$api.Product.sysRecommend({ pageNum: this.pageNum });
      this.items.push(...res.list);
      return res.list.length === 10
    }
  },
  created() {
    this.getRecommend()
  }
}
</script>
