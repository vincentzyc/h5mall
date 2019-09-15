<template>
  <div class="pd10">
    <div class="text-center mg-t10 mg-b10">2019-01-01</div>
    <li class="flex pd10">
      <img :src="detail.img" alt="店铺logo" class="square50 border-radius10" />
      <div class="mg-l10 flex-auto">
        <h3 class="c666">{{detail.message_head}}</h3>
        <p class="textover1 mg-t10 bgfff pd10 border-radius10">{{detail.message}}</p>
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