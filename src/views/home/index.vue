<template>
  <base-page>
    <v-header />
    <cube-scroll ref="scroll" :scrollEvents="['scroll']" :options="options" @scroll="scroll" @pulling-up="onPullingUp">
      <div class="scroll-wrapper">
        <cube-slide ref="slide" :data="topItems" class="common-slide">
          <cube-slide-item v-for="(item, index) in topItems" :key="index">
            <router-link :to="'/products/detail?id='+item.link_url">
              <img :src="item.img" />
            </router-link>
          </cube-slide-item>
        </cube-slide>
        <v-tabs />
        <!-- <FineStore /> -->
        <!-- <cube-slide ref="slide" :data="middleItems" class="common-slide store-slide">
          <cube-slide-item v-for="(item, index) in middleItems" :key="index">
            <a :href="'/#/store/detail?id='+item.farmer_id">
              <img :src="item.img" />
            </a>
          </cube-slide-item>
        </cube-slide>-->
        <vRecommend ref="recommend" />
      </div>
    </cube-scroll>
    <div class="backtop" @click="scrollTo()" v-show="backtop">
      <img src="@/assets/img/totop.png" alt="回到顶部" width="100%" />
    </div>
  </base-page>
</template>

<script>
// @ is an alias to /src
import vHeader from "./header.vue";
import vTabs from "./tabs.vue";
// import FineStore from "./fine-store.vue";
import vRecommend from "./recommend.vue";

export default {
  name: "keepHome",
  components: {
    vHeader,
    vTabs,
    // FineStore,
    vRecommend
  },
  data() {
    return {
      backtop: false,
      upLoadMore: true,
      options: {
        pullUpLoad: {
          txt: {
            noMore: '没有更多了...'
          }
        }
      },
      topItems: [],
      // middleItems: []
    }
  },
  methods: {
    scroll(pos) {
      this.backtop = pos.y < -200 ? true : false
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    async onPullingUp() {
      if (!this.upLoadMore) return this.$refs.scroll.forceUpdate();
      let res = await this.$refs.recommend.getRecommend();
      this.upLoadMore = res.upLoadMore;
      this.$refs.scroll.forceUpdate(res.hasData);
    },
  },
  mounted() {
    this.$nextTick(function () {
      setTimeout(() => {
        this.$refs.slide.refresh();
        this.$refs.scroll.refresh();
      }, 10);
    });
  },
  async created() {
    let res = await this.$api.Product.carouselList();
    console.log(res);
    this.topItems = res.top;
    // this.middleItems = res.middle;
    this.$refs.slide.refresh();
  }
};
</script>
