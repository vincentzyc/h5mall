<template>
  <base-page>
    <header class="header-bg">
      <div class="flex fs14 cfff">
        <div class="col-2">
          <i class="cubeic-back" @click="$router.back()"></i>
        </div>
        <div class="flex-auto">店铺详情</div>
        <div class="col-2"></div>
      </div>
    </header>
    <div class="bgfff mg-t15">
      <cube-tab-bar v-model="selectedLabel" show-slider class="border-beee">
        <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index" class="lh30 width100"></cube-tab>
      </cube-tab-bar>
      <cube-tab-panels class="mg-b10">
        <cube-tab-panel class="img-panel" v-show="selectedLabel==='商品信息'">
          <ProductList :items="items" />
        </cube-tab-panel>
        <cube-tab-panel class="text-panel" v-show="selectedLabel==='商家信息'">
          <div class="store-info">
            <ul>
              <li>主营：阿迪，Nike</li>
              <li>所在地：广东省广州市</li>
              <li>注册时间：2019.07.07</li>
              <li class="flex">
                <span class="flex-auto">备注</span>
                <i class="cubeic-arrow c666"></i>
              </li>
              <li class="flex">
                <span class="flex-auto">优惠券领取</span>
                <i class="cubeic-arrow c666"></i>
              </li>
            </ul>
          </div>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
  </base-page>
</template>

<script type="text/ecmascript-6">
import ProductList from "@/components/product-list-s.vue";
export default {
  components: {
    ProductList
  },
  data() {
    return {
      selectedLabel: '商品信息',
      tabs: ['商品信息', '商家信息'],
      items: [{
        title: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        img: 'store1.png',
        id: 1
      }, {
        title: '杜兰特成为完全自由球员加盟',
        img: 'store2.png',
        id: 2
      }, {
        title: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
        img: 'store3.png',
        id: 3
      }]
    };
  },
  computed: {

  }
};
</script>
<style lang="stylus" scoped>
.store-info {
  li {
    padding: 15px 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>

