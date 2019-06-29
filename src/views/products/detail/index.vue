<template>
  <base-page>
    <div class="container">
      <i class="cubeic-back detail-back"></i>
      <cube-slide ref="slide" :data="items" class="common-slide">
        <cube-slide-item v-for="(item, index) in items" :key="index" class="detail-slide-item">
          <a :href="item.url">
            <img :src="item.image">
          </a>
        </cube-slide-item>
      </cube-slide>

      <div class="flex product-info bgfff pd10">
        <div class="flex-auto">
          <h3 class="fs16 bold lh30">商品名称名称</h3>
          <p class="fs12 c999">鼓掌：鼓掌鼓掌鼓掌</p>
          <div class="lh30">
            <span class="price ctheme fs16 mg-r10">￥99</span>
            <span class="border-tag">新品上市</span>
            <span class="border-tag">品质保障</span>
            <span class="border-tag">春节特供</span>
          </div>
        </div>
        <div class="flex flex-center">
          <div class="text-right">
            <div class="mg-b15 c666">已售19</div>
            <span class="border-tag">包邮</span>
          </div>
        </div>
      </div>

      <div class="flex pd-l10 pd-r10 pd-t20 pd-b20 bgfff mg-t15">
        <div class="flex flex-auto align-middle">
          <img src="@/assets/img/discount.png" alt="优惠券" class="discount">
          <span class="mg-l5 fs16">优惠券领取</span>
        </div>
        <i class="cubeic-arrow"></i>
      </div>

      <div class="specs bgfff pd-l10 pd-r10 pd-t20 pd-b20 mg-t15">
        <h3 class="mg-b20">商品规格</h3>
        <table>
          <tr>
            <td class="c666">产品名称</td>
            <td class="c333">产品名称产品名称产品名称产品名称产品名称</td>
            <td class="c666">单位</td>
            <td class="c333">个</td>
          </tr>
          <tr>
            <td class="c666">用途</td>
            <td class="c333">食用</td>
            <td class="c666">类型</td>
            <td class="c333">鸡肉</td>
          </tr>
        </table>
      </div>

      <div class="detail-info bgfff mg-t15">
        <div class="flex tabs lh30 text-center fs14 c333 pd10">
          <div class="flex-auto" :class="{active:activeTab===1}" @click="activeTab=1">图片</div>
          <div class="flex-auto" :class="{active:activeTab===2}" @click="activeTab=2">文字</div>
          <div class="flex-auto" :class="{active:activeTab===3}" @click="activeTab=3">评价</div>
          <div class="flex-auto" :class="{active:activeTab===4}" @click="activeTab=4">推荐</div>
        </div>
      </div>

      <h3>{{$route.query.id}}</h3>
    </div>
  </base-page>
</template>


<script>
// import vHeader from "./header.vue";

export default {
  name: "home",
  components: {
    // vHeader,
  },
  data() {
    return {
      activeTab: 1,
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: this.BASE_URL + 'static/img/banner1.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: this.BASE_URL + 'static/img/banner2.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: this.BASE_URL + 'static/img/banner3.png'
        }
      ]
    }
  },
  methods: {

  },
  // mounted() {
  //   this.$nextTick(function () {
  //     setTimeout(() => {
  //       this.$refs.slide.refresh();
  //     }, 0);
  //   });
  // }
};
</script>

<style lang="stylus" scoped>
.discount {
  height: 20px;
}

table {
  width: 90%;
  border-collapse: collapse;
  border-spacing: 0px;
  text-align: center;
  border: 1px solid #999;
  margin: 0 auto;
}

th, td {
  font-weight: normal;
  vertical-align: middle;
  font-size: 14px;
  line-height: 20px;
  padding: 15px 0;
  border: 1px solid #999;
}

.tabs {
  .active {
    color: #fc4d56;
    border-bottom: 1px solid #fc4d56;
  }
}
</style>


