<template>
  <base-page>
    <common-header title="农户消息"></common-header>
    <ul class="message-wrapper" v-if="userInfo&&haveMsg">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex bgfff border-beee align-middle pd5"
        @click="detail=item;$refs.pagePopup.open()"
      >
        <div class="flex-none message-icon4 flex-none" />
        <div class="pd-t10 pd-b10 flex-auto">
          <h3 class="lh20">{{item.message_head}}</h3>
          <p class="textover1 mg-t10 c999">{{item.message}}</p>
        </div>
        <div class="flex flex-center flex-none pd10 c999">{{$util.getFormatDate('yyyy-mm-dd',item.create_time)}}</div>
      </li>
    </ul>
    <div v-else class="mg20 pd20 text-center">暂无消息</div>
    <page-popup ref="pagePopup" position="right" class="pd-t44" style="background:#eee" type="msg">
      <common-header title="消息详情" />
      <MsgDetail :detail="detail" iconClass="message-icon4" />
    </page-popup>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
import MsgDetail from "./message-detail"
export default {
  name: "ShopMessage",
  components: {
    MsgDetail
  },
  data() {
    return {
      userInfo: "",
      haveMsg: true,
      items: [],
      detail: ''
    }
  },
  methods: {
    async getMessage() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Message.shopMessage(param);
      this.haveMsg = (res.shopMessage || []).length > 0;
      this.items = res.shopMessage
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.getMessage()
  }
}
</script>