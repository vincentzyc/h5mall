<template>
  <base-page>
    <common-header title="发布采购" hideBack>
      <span slot="right" @click="$router.push('/publish/gopublish')">去发布</span>
    </common-header>
    <cube-scroll ref="scroll">
      <div class="scroll-wrapper">
        <div>
          <cube-tab-bar v-model="selectedLabel" show-slider class="border-beee bgfff">
            <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index" class="lh30 width100"></cube-tab>
          </cube-tab-bar>
          <cube-tab-panels class="mg-b10">
            <cube-tab-panel class="img-panel" label="采购中" v-show="selectedLabel==='采购中'">
              <ul v-if="purchasing.length>0">
                <li>111</li>
                <li>111</li>
                <li>时间：{{$util.getFormatDate('yyyy-mm-dd')}}</li>
              </ul>
              <p v-else class="mg20 pd20 text-center">暂无采购</p>
            </cube-tab-panel>
            <cube-tab-panel class="text-panel" label="已停止" v-show="selectedLabel==='已停止'">
              <ul v-if="purchaseStop.length>0">
                <li>22</li>
                <li>222</li>
                <li>时间：{{$util.getFormatDate('yyyy-mm-dd')}}</li>
              </ul>
              <p v-else class="mg20 pd20 text-center">暂无采购</p>
            </cube-tab-panel>
          </cube-tab-panels>
        </div>
      </div>
    </cube-scroll>
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
    this.getPurchasing();
    this.getPurchaseStop()
  }
};
</script>