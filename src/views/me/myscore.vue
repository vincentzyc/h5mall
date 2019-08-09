<template>
  <base-page>
    <common-header title="积分"></common-header>
    <div class="flex myscore c333">
      <div>当前积分</div>
      <div class="flex flex-column justify-end flex-auto text-center">
        <h2 class="score ctheme">{{Data.score||0}}</h2>
        <div class="mg-b10 c666 fs12">升级还需要{{Data.rest||0}}</div>
      </div>
      <div>
        <div>当前等级</div>
        <div class="text-center mg-t5 cblue">V{{Data.grade||0}}</div>
      </div>
    </div>
    <div class="mg-t10 bgfff">
      <cube-tab-bar v-model="label" show-slider class="tab-bar">
        <cube-tab label="记录" class="lh30 width100"></cube-tab>
        <cube-tab label="规则" class="lh30 width100"></cube-tab>
      </cube-tab-bar>
    </div>
    <div class="panels-wrap">
      <div class="list-panel" v-show="label==='记录'">
        <ul v-if="Data.list&&Data.list.length>0">
          <li
            v-for="item in Data.list"
            :key="item.id"
            class="flex lh24 pd10 border-beee align-middle"
          >
            <div class="flex-auto">
              <h3>{{item.type}}</h3>
              <p class="c999 fs12">{{$util.getFormatDate('',item.create_time)}}</p>
            </div>
            <div class="fs16">+{{item.num}}</div>
          </li>
        </ul>
        <div v-else>
          <p class="lh30 mg20 text-center">暂无记录</p>
        </div>
      </div>
      <div class="iframe-panel" v-show="label==='规则'">
        <iframe
          src="http://ricky-s.qicp.io/res/html/scoreRule.html"
          style="width: 100%;height: 100%;"
        ></iframe>
      </div>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  data() {
    return {
      Data: "",
      label: '记录',
      items: []
    }
  },
  methods: {
    async getScore() {
      let userInfo = await getUser(this.$route.fullPath);
      let param = {
        token: userInfo.token,
        user_id: userInfo.id
      }
      this.Data = await this.$api.Common.myScore(param);
    }
  },
  created() {
    this.getScore()
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.myscore {
  height: 100px;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;

  .score {
    margin: 10px;
    font-size: 24px;
  }
}

.tab-bar {
  padding: 0 20%;
  height: 44px;
  border-bottom: 1px solid #eee;
}

.panels-wrap {
  position: absolute;
  top: 208px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: #fff;
}

.iframe-panel {
  width: 100%;
  height: 100%;
}
</style>
