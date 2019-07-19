<template>
  <base-page>
    <!-- <v-header></v-header> -->
    <img src="@/assets/img/me-bg.jpg" alt="">
    <cube-scroll ref="scroll">
      <div class="scroll-wrapper">
        <div class="text-center mg20">我的</div>
        <div style="height:1500px;width:100%;background:#999"></div>
        <div class="text-center mg20">到底啦</div>
      </div>
    </cube-scroll>
    <!-- <v-footer></v-footer> -->
  </base-page>
</template>

<script>
// @ is an alias to /src
// import vHeader from "./header.vue";
// import vFooter from "./footer.vue";

export default {
  name: "home",
  components: {
    // 'v-header': vHeader,
    // 'v-footer': vFooter
  },
  data() {
    return {
      items: [

      ]
    }
  },
  methods: {

  },
  mounted() {
    // this.$nextTick(function () {
    //   setTimeout(() => {
    //     this.$refs.slide.refresh();
    //     this.$refs.scroll.refresh();
    //   }, 0);
    // });
  }
};
</script>
