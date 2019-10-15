<template>
  <base-page>
    <common-header :title="title" />
    <div v-if="payState==='1'">
      <div class="text-center" style="margin: 60px;">
        <i class="cubeic-right ctheme" style="font-size: 100px;"></i>
      </div>
    </div>
    <div v-else>
      <div class="text-center" style="margin: 30px;">
        <i class="cubeic-sad ctheme" style="font-size: 100px;"></i>
      </div>
      <div style="width:80%;margin:10px auto" class="text-center lh24 c333">
        <p>抱歉！未查到您的支付信息</p>
        <p>请确认您是否已完成支付？</p>
        <p>如已支付，请勿再次支付，并留意订单状态</p>
        <p>有问题，请咨询客服</p>
      </div>
    </div>
    <div style="width:80%;margin:30px auto">
      <cube-button :primary="true" @click="$router.push('/order/list')">查看订单</cube-button>
      <cube-button :outline="true" :primary="true" class="mg-t20" @click="$router.push('/home')">返回首页</cube-button>
    </div>
  </base-page>
</template>

<script>
export default {
  computed: {
    payState() {
      return this.$route.query.res
    },
    title() {
      return this.payState === '1' ? "支付成功" : "支付异常"
    }
  }
}
</script>