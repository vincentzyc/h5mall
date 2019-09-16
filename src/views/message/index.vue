<template>
  <base-page>
    <common-header title="消息" hideBack></common-header>
    <cube-scroll ref="scroll">
      <div class="scroll-wrapper message-wrapper">
        <ul class="message-list">
          <router-link to="/message/system" tag="li" class="flex align-middle">
            <div class="message-icon message-icon1">
              <span class="state" v-if="SystemMessage"></span>
            </div>
            <span class="flex-auto">系统消息</span>
            <i class="cubeic-arrow c666"></i>
          </router-link>
          <router-link to="/message/trade" tag="li" class="flex align-middle">
            <div class="message-icon message-icon2">
              <span class="state" v-if="TradeMessage"></span>
            </div>
            <span class="flex-auto">交易消息</span>
            <i class="cubeic-arrow c666"></i>
          </router-link>
          <router-link to="/message/purchase" tag="li" class="flex align-middle">
            <div class="message-icon message-icon3">
              <span class="state" v-if="PurchaseMessage"></span>
            </div>
            <span class="flex-auto">农户报价</span>
            <i class="cubeic-arrow c666"></i>
          </router-link>
          <router-link to="/message/shop" tag="li" class="flex align-middle">
            <div class="message-icon message-icon4">
              <span class="state" v-if="ShopMessage"></span>
            </div>
            <span class="flex-auto">农户通知</span>
            <i class="cubeic-arrow c666"></i>
          </router-link>
        </ul>
      </div>
    </cube-scroll>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: "message",
  data() {
    return {
      userInfo: "",
      SystemMessage: false,
      TradeMessage: false,
      PurchaseMessage: false,
      ShopMessage: false,
    }
  },
  methods: {
    async getMessage() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Message.messageIndex(param);
      this.SystemMessage = res.SystemMessage;
      this.TradeMessage = res.TradeMessage;
      this.PurchaseMessage = res.PurchaseMessage;
      this.ShopMessage = res.ShopMessage;
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.getMessage()
  }
};
</script>