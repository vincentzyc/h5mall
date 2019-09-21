<template>
  <base-page>
    <common-header title="采购信息" hideBack>
      <span slot="right" @click="$router.push('/publish/viewpublish')">去发布</span>
    </common-header>
    <cube-tab-bar v-model="selectedLabel" show-slider class="tab-wrap">
      <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index"></cube-tab>
    </cube-tab-bar>
    <div class="container">
      <cube-scroll ref="scroll">
        <cube-tab-panels class="mg-b10">
          <cube-tab-panel class="img-panel" label="采购中" v-show="selectedLabel==='采购中'">
            <ul v-if="purchasing.length>0">
              <li class="mg-t5 bgfff" v-for="(item,index) in purchasing" :key="item.id">
                <div class="flex pd10 border-beee" @click="$router.push('/publish/publishdetail?id='+item.id)">
                  <img v-lazy="item.img.split(',')[0]" alt class="square88 flex-none" />
                  <div class="mg-l10 flex-auto">
                    <div class="flex lh30">
                      <h3 class="flex-auto textover1">{{item.name}}</h3>
                      <span class="c666 fs12 flex-none">{{item.num.toString()+item.unit}}</span>
                    </div>
                    <p class="flex-auto textover1 c666 fs12 lh30">{{item.note}}</p>
                    <div class="flex lh30">
                      <h3 class="flex-auto textover1 ctheme">预算：{{item.money}}元</h3>
                      <span class="c666 fs12 flex-none">{{$util.getFormatDate('yyyy-mm-dd',item.update_time)}}</span>
                    </div>
                  </div>
                </div>
                <div class="text-right pd10">
                  <cube-button inline outline primary @click="purchaseUpdate(item.id)">修改</cube-button>
                  <cube-button inline outline class="mg-l15" @click="stopPurchase(item,index)">停止</cube-button>
                </div>
              </li>
            </ul>
            <p v-else class="mg20 pd20 text-center">暂无采购</p>
          </cube-tab-panel>
          <cube-tab-panel class="text-panel" label="已停止" v-show="selectedLabel==='已停止'">
            <ul v-if="purchaseStop.length>0">
              <li
                class="mg-t5 bgfff"
                v-for="item in purchaseStop"
                :key="item.id"
                @click="$router.push('/publish/publishdetail?id='+item.id)"
              >
                <div class="flex pd10 border-beee">
                  <img v-lazy="item.img.split(',')[0]" alt class="square88 flex-none" />
                  <div class="mg-l10 flex-auto">
                    <div class="flex lh30">
                      <h3 class="flex-auto textover1">{{item.name}}</h3>
                      <span class="c666 fs12 flex-none">{{item.num.toString()+item.unit}}</span>
                    </div>
                    <p class="flex-auto textover1 c666 fs12 lh30">{{item.note}}</p>
                    <div class="flex lh30">
                      <h3 class="flex-auto textover1 ctheme">预算：{{item.money}}元</h3>
                      <span class="c666 fs12 flex-none">{{$util.getFormatDate('yyyy-mm-dd',item.update_time)}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <p v-else class="mg20 pd20 text-center">暂无采购</p>
          </cube-tab-panel>
        </cube-tab-panels>
      </cube-scroll>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: 'keeppublish',
  data() {
    return {
      userInfo: "",
      selectedLabel: '采购中',
      tabs: ['采购中', '已停止'],
      purchasing: [],
      purchaseStop: []
    }
  },
  watch: {
    '$route'(to, from) {
      if (from.name === 'publish') return;
      if (from.name !== 'publishdetail') {
        this.getPurchasing();
        this.getPurchaseStop()
      }
    }
  },
  methods: {
    async getPurchasing() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchasing(param);
      this.purchasing = res.list || [];
    },
    async getPurchaseStop() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      let res = await this.$api.Publish.purchaseStop(param);
      this.purchaseStop = res.list || [];
    },
    stopPurchase(item, index) {
      this.$createDialog({
        type: 'confirm',
        content: '确定停止该条采购信息？',
        onConfirm: async () => {
          let param = {
            id: item.id,
            user_id: this.userInfo.id,
            token: this.userInfo.token
          }
          let res = await this.$api.Publish.stopPurchase(param);
          this.$createToast({
            txt: '已停止该条采购信息',
            type: 'txt'
          }).show();
          this.purchasing.splice(index, 1);
          this.purchaseStop.push(item);
        }
      }).show()
    },
    purchaseUpdate(id) {
      this.$router.push('/publish/viewpublish?id=' + id)
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.getPurchasing();
    this.getPurchaseStop()
  }
};
</script>

<style lang="stylus" scoped>
.tab-wrap {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 99;
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  text-align: center;

  & /deep/ .cube-tab {
    max-width: 30%;
  }
}

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 44px;
}
</style>