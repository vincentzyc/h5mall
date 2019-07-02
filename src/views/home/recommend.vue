<template>
  <div class="recommend-wrap bgfff">
    <div class="flex lh30 border-beee pd5 pd-l10 pd-r10">
      <h5 class="flex-auto c333">为您推荐</h5>
      <div class="c999 fs12">
        <span>查看全部</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <ProductList :items="items"/>
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
      items: [{
        title: '常规赛MVP',
        introduce: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        img: 'store1.png',
        tags: ['限时特价', '新品上市', '包邮'],
        id: 1
      }, {
        title: '京东自营',
        introduce: '杜兰特不执行球员选项 将成为完全自由球员',
        img: 'store2.png',
        tags: ['限时特价', '质保赔付', '新品上市', '包邮'],
        id: 2
      }, {
        title: '周氏云商城',
        introduce: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
        img: 'store3.png',
        tags: ['限时特价', '新品上市', '不包邮'],
        id: 3
      }]
    }
  },
  methods: {

  }
}
</script>
