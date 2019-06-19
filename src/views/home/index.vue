<template>
  <base-page>
    <div>
      <v-header></v-header>
      <cube-slide ref="slide" :data="items" @change="changePage" class="banner-slide">
        <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)" class="banner-slide-item">
          <a :href="item.url">
            <img :src="item.image">
          </a>
        </cube-slide-item>
      </cube-slide>
      <!-- <div style="height:1500px;width:100%;background:#999"></div> -->
      <v-footer></v-footer>
    </div>
  </base-page>
</template>

<script>
// @ is an alias to /src
import vHeader from "./header.vue";
import vFooter from "./footer.vue";

export default {
  name: "home",
  components: {
    'v-header': vHeader,
    'v-footer': vFooter
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
  }
};
</script>
