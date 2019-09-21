<template>
  <base-page>
    <common-header title="发布采购"/>
    <div>
      发布采购
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: "publish",
  data() {
    return {
      userInfo: "",
      selectedLabel: '采购中',
      tabs: ['采购中', '已停止'],
      purchasing: [],
      purchaseStop: []
    }
  },
  methods: {
    async getPurchasing() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchasing(param);
      console.log('采购中', res);
    },
    async getPurchaseStop() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchaseStop(param);
      console.log('已停止', res);
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
  }
};
</script>