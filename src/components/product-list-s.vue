<template>
  <div class="product-list">
    <div
      v-for="(item, index) in items"
      :label="item.label"
      :key="item.label+index"
      class="flex item bgfff pd10 border-beee"
      @click="$router.push('/products/detail?id='+item.id)"
    >
      <img :src="require(`@/assets/img/${item.img}`)" alt class="item-img flex-none square88" />
      <div class="mg-l10 flex-auto flex flex-column">
        <h4 class="bold textover2 lh22">{{item.title}}</h4>
        <div class="flex">
          <div class="flex-auto">
            <p class="fs12 mg-b5 c999 textover lh16">产地：广东省广州市</p>
            <span class="sale-num">已售：99</span>
          </div>
          <div class="flex align-middle">
            <span class="ctheme fs16">￥33</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      require: true,
      type: Array
    }
  }
}
</script>
