<template>
  <base-page>
    <common-header title="订单详情" />
    <div>订单详情</div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.order_id = this.$route.query.id;
    if (!this.order_id) this.$router.back()
  }
}
</script>

<style>
</style>