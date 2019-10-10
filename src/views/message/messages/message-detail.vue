<template>
  <div class="message-wrapper">
    <div class="text-center mg-t15 mg-b10 c666">{{$util.getFormatDate('',detail.create_time)}}</div>
    <li class="flex pd10">
      <div class="avatar message-icon flex-none" :class="iconClass" />
      <div class="mg-l10 flex-auto bubble">
        <h3 class="c666">{{detail.message_head}}</h3>
        <p class="lh18 mg-t10 bgfff fs12">{{detail.message}}</p>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "messageDetail",
  props: ['detail', 'iconClass'],
  created(){
    if(this.$route.query.type==='msg') this.$router.back()
  }
}
</script>

<style lang="stylus" scoped>
.avatar {
  border-radius: 50%;
  outline: none;
}

.bubble {
  padding: 10px 15px;
  color: #333;
  background: #fff;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  min-width: 80px;
  margin: 0 15px 0 5px;
}

.bubble:before {
  content: '';
  border-style: solid;
  border-width: 8px;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  top: 8px;
  left: -15px;
}
</style>