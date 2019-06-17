<template>
  <base-page>
    <div>
      <cube-slide ref="slide" :data="items" @change="changePage">
        <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)" class="banner-slide">
          <a :href="item.url">
            <img :src="item.image">
          </a>
        </cube-slide-item>
      </cube-slide>
      <!-- <HelloWorld/> -->
    </div>
  </base-page>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/hello-world.vue";

export default {
  name: "home",
  components: {
    // HelloWorld
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
