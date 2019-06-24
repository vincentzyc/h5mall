<template>
  <div class="recommend-wrap">
    <div class="flex lh30 border-beee pd5 pd-l10 pd-r10">
      <h5 class="flex-auto c333">为您推荐</h5>
      <div class="c999 fs12">
        <span>查看全部</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <div class="list">
      <div v-for="(item, index) in tabs" :label="item.label" :key="item.label+index" class="flex item">
        <img :src="require(`@/assets/img/${item.img}`)" alt class="item-img">
        <div class="item-content mg-l10">
          <h5 class="fs12 lh30">{{item.label}}</h5>
          <h5 class="fs12 lh30">{{item.label}}</h5>
          <h5 class="fs12 lh30">{{item.label}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [{
        label: '京东自营',
        img: 'store1.png'
      }, {
        label: '竹海李氏山货',
        img: 'store2.png'
      }, {
        label: '周氏野货',
        img: 'store3.png'
      }]
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
.recommend-wrap {
  background: #fff;
  margin-top: 15px;

  .list {
    .item {
      padding: 10px;
      border-bottom: 1px solid #eee;

      .item-img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>

