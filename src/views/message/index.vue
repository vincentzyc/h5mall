<template>
  <base-page>
    <common-header title="消息" hideBack></common-header>
    <cube-scroll ref="scroll">
      <div class="scroll-wrapper">
        <ul class="msg-list">
          <li class="flex align-middle">
            <div class="icon icon1"></div>
            <span class="flex-auto">系统消息</span>
            <i class="cubeic-arrow c666"></i>
          </li>
          <li class="flex align-middle">
            <div class="icon icon2"></div>
            <span class="flex-auto">交易消息</span>
            <i class="cubeic-arrow c666"></i>
          </li>
          <li class="flex align-middle">
            <div class="icon icon3"></div>
            <span class="flex-auto">农户报价</span>
            <i class="cubeic-arrow c666"></i>
          </li>
          <li class="flex align-middle">
            <div class="icon icon4"></div>
            <span class="flex-auto">农户通知</span>
            <i class="cubeic-arrow c666"></i>
          </li>
        </ul>
      </div>
    </cube-scroll>
  </base-page>
</template>

<script>

export default {
  name: "message",
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
<style lang="stylus" scoped>
.msg-list {
  background: #fff;
  margin-bottom: 15px;
  padding: 0 10px;

  li {
    padding: 12px 5px;
    border-bottom: 1px solid #eee;
  }

  .icon {
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }

  .icon1 {
    background: url('~@/assets/img/message.png') no-repeat 0px 0px / auto 100%;
  }

  .icon2 {
    background: url('~@/assets/img/message.png') no-repeat -30px 0px / auto 100%;
  }

  .icon3 {
    background: url('~@/assets/img/message.png') no-repeat -60px 0px / auto 100%;
  }

  .icon4 {
    background: url('~@/assets/img/message.png') no-repeat -90px 0px / auto 100%;
  }
}
</style>