<template>
  <base-page>
    <common-header title="系统消息"></common-header>
    <ul class="view-wrapper" v-if="userInfo&&haveMsg">
      <li v-for="item in items" :key="item.id" class="flex bgfff border-beee" @click="detail=item;$refs.pagePopup.open()">
        <img :src="item.img||requrie('@/assets/img/logo.png')" alt="店铺logo" class="pd10 square66" />
        <div class="pd-t10 pd-b10 flex-auto">
          <h3 class="lh20">{{item.message_head}}</h3>
          <p class="textover1 mg-t10 c999">{{item.message}}</p>
        </div>
        <div class="flex flex-center flex-none pd10 c999">{{item.time}}</div>
      </li>
    </ul>
    <div v-else class="mg20 pd20 text-center">暂无消息</div>
    <page-popup ref="pagePopup" position="right" class="pd-t44" style="background:#eee" type="msg">
      <common-header title="消息详情" />
      <MsgDetail :detail="detail" />
    </page-popup>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
import MsgDetail from "./message-detail"
export default {
  name: "systemMessage",
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
      // console.log(param);
      // let res = await this.$api.Message.systemMessage(param);
      let res = {
        systemMessage: [{
          id: 1,
          img: 'http://ricky-s.qicp.io/res/image/2018/9/5/92729b0697764085857049b1daee83ff.png',
          message_head: "111",
          message: "发射点发射点发射点发射点发1",
          time: "2019-01-01"
        }, {
          id: 12,
          img: 'http://ricky-s.qicp.io/res/image/2018/9/5/92729b0697764085857049b1daee83ff.png',
          message_head: "222",
          message: "发射点发射点发射点发射点发2",
          time: "2019-01-02"
        }]
      }
      // console.log(res);
      this.haveMsg = (res.systemMessage || []).length > 0;
      this.items = res.systemMessage
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.getMessage()
  }
}
</script>