<template>
  <div class="product-list">
    <div
      v-for="(item, index) in items"
      :label="item.label"
      :key="item.label+index"
      class="flex item"
      @click="$router.push('/products/detail?id='+item.id)"
    >
      <img :src="require(`@/assets/img/${item.img}`)" alt class="item-img">
      <div class="item-content mg-l10 flex-auto flex flex-column">
        <h4 class="bold textover lh24">{{item.title}}</h4>
        <p class="fs12 mg-b5 c999 textover lh16">{{item.introduce}}</p>
        <div class="flex">
          <span v-for="(tag,index) in item.tags" :key="tag+index" class="tag-item">{{tag}}</span>
        </div>
        <div class="flex flex-auto ctheme fs16">
          <span class="flex align-middle">￥33</span>
        </div>
        <div class="flex fs10">
          <div class="adress flex-auto">
            <i class="cubeic-location"></i>
            <span class="c666">广东省广州市</span>
          </div>
          <span class="sale">已售：3</span>
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
.product-list {
  .item {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .item-img {
    width: 100px;
    height: 100px;
  }

  .item-content {
    height: 100px;
    overflow: hidden;
  }

  .adress i {
    color: #55b0e0;
    margin-right: 2px;
  }

  .sale {
    color: #ff8b1c;
  }

  .tag-item {
    font-weight: lighter;
    color: #fff;
    font-size: 6px;
    padding: 2px 5px 1px 5px;
    margin-right: 5px;
    border: 1px solid transparent;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background: #fc4d56;

    &:nth-child(1) {
      background: #26ae26;
    }

    &:nth-child(2) {
      background: #ff8b1c;
    }

    &:nth-child(3) {
      background: #fc4d56;
    }

    &:nth-child(4) {
      background: #1eb7f5;
    }

    &:last-child {
      background: #fff;
      color: #fc4d56;
      border: 1px solid #fc4d56;
      border-radius: 8px;
    }
  }
}
</style>
