<template>
  <div>
    <div class="text-center mg-t15 mg-b10 c666">2019-01-01</div>
    <li class="flex pd10">
      <img :src="detail.img" alt="店铺logo" class="avatar" />
      <div class="mg-l10 flex-auto bubble">
        <h3 class="c666">{{detail.message_head}}</h3>
        <p class="textover1 mg-t10 bgfff fs12">{{detail.message}}</p>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "messageDetail",
  props: ['detail']
}
</script>

<style lang="stylus" scoped>
.avatar {
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 6px;
  min-width: 48px;
  width: 48px;
  height: 48px;
  outline: none;
}

.bubble {
  padding: 10px 15px;
  color: #333;
  background: #fff;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 420px;
  min-width: 80px;
  margin: 0 15px 0 5px;
}

.bubble:before {
  content: '';
  border-style: solid;
  border-width: 6px;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  top: 8px;
  left: -12px;
}
</style>