<template>
  <div class="product-list">
    <div v-for="item in items" :key="item.id" class="flex item bgfff pd10 border-beee" @click="$router.push('/products/detail?id='+item.id)">
      <img v-lazy="item.carousel_img.split(',')[0]" alt class="item-img flex-none square88" />
      <div class="mg-l10 flex-auto flex flex-column">
        <h4 class="bold textover2 lh22">{{item.name}}</h4>
        <div class="flex">
          <div class="flex-auto">
            <p class="fs12 mg-b5 mg-t5 c999 textover lh16">产地：{{adress(item)}}</p>
            <span class="sale-num">已售：{{item.virtual_num}}</span>
          </div>
          <div class="flex align-middle">
            <span class="ctheme fs16">￥{{item.price}}</span>
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
  },
  methods: {
    adress(v) {
      return `${v.production_province || ''} ${v.production_city || ''} ${v.production_place || ''}`
    }
  }
}
</script>
