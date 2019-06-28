<template>
  <div class="container">
    <i class="cubeic-back detail-back"></i>
    <cube-slide ref="slide" :data="items" class="common-slide">
      <cube-slide-item v-for="(item, index) in items" :key="index" class="detail-slide-item">
        <a :href="item.url">
          <img :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
    <h3>{{$route.query.id}}</h3>
  </div>
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



