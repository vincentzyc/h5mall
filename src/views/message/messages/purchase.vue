<template>
  <base-page>
    <common-header title="农户报价"></common-header>
    <div class="view-wrapper" v-if="userInfo&&haveMsg">
      <cube-recycle-list class="list" :on-fetch="getMessage">
        <template slot="item" slot-scope="{ data }">
          <li class="flex list-item">
            <img :src="data.img||requrie('@/assets/img/logo.png')" alt="店铺logo" />
            <div class="main flex-auto">
              <h3>{{data.message_head}}</h3>
              <p class="textover1">{{data.message}}</p>
            </div>
            <div class="flex flex-center flex-none">2019-01-01</div>
          </li>
        </template>
      </cube-recycle-list>
    </div>
    <div v-else class="mg20 pd20 text-center">暂无消息</div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: "PurchaseMessage",
  data() {
    return {
      userInfo: "",
      haveMsg: true
    }
  },
  methods: {
    async getMessage() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Message.systemMessage(param);
      console.log(res);
      this.haveMsg = (res.systemMessage || []).length > 0;
      return res.systemMessage || []
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
  }
}
</script>