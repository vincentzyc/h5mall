<template>
  <base-page>
    <v-header/>
    <cube-scroll ref="scroll">
      <div class="scroll-wrapper">
        <cube-slide ref="slide" :data="items" @change="changePage" class="banner-slide">
          <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)" class="banner-slide-item">
            <a :href="item.url">
              <img :src="item.image">
            </a>
          </cube-slide-item>
        </cube-slide>
        <v-tabs/>
        <FineStore/>
        <vRecommend/>
        <div class="text-center mg20" @click="$router.push('/page/button')">到底啦</div>
      </div>
    </cube-scroll>
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
    changePage(current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      console.log(item, index)
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
