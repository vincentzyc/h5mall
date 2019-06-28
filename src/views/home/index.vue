<template>
  <base-page>
    <v-header/>
    <cube-scroll ref="scroll" :scrollEvents="['scroll']" @scroll="scroll">
      <div class="scroll-wrapper">
        <cube-slide ref="slide" :data="items" class="common-slide">
          <cube-slide-item v-for="(item, index) in items" :key="index" class="common-slide-item">
            <a :href="item.url">
              <img :src="item.image">
            </a>
          </cube-slide-item>
        </cube-slide>
        <v-tabs/>
        <FineStore/>
        <vRecommend/>
      </div>
    </cube-scroll>
    <div class="backtop" @click="scrollTo()" v-show="backtop">
      <img src="@/assets/img/totop.png" alt="回到顶部" width="100%">
    </div>
  </base-page>
</template>

<script>
// @ is an alias to /src
import vHeader from "./header.vue";
import vTabs from "./tabs.vue";
import FineStore from "./fine-store.vue";
import vRecommend from "./recommend.vue";


export default {
  name: "home",
  components: {
    vHeader,
    vTabs,
    FineStore,
    vRecommend
  },
  data() {
    return {
      backtop: false,
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
    scroll(pos) {
      this.backtop = pos.y < -200 ? true : false
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  },
  mounted() {
    this.$nextTick(function () {
      setTimeout(() => {
        this.$refs.slide.refresh();
        this.$refs.scroll.refresh();
      }, 0);
    });
  }
};
</script>
