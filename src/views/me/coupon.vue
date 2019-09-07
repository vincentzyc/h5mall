<template>
  <base-page>
    <common-header title="优惠券"></common-header>
    <div class="bgfff">
      <cube-tab-bar v-model="label" show-slider class="tab-bar">
        <cube-tab label="未使用" class="lh30 width100"></cube-tab>
        <cube-tab label="已过期" class="lh30 width100"></cube-tab>
        <cube-tab label="已使用" class="lh30 width100"></cube-tab>
      </cube-tab-bar>
    </div>
    <div>
      <div v-show="label==='未使用'">
        <ul class="not_used_coupon" v-if="unusedList.length>0">
          <li class="coupon_box" v-for="item in unusedList" :key="item.card_id">
            <div class="coupon_centent flex align-middle bg1">
              <div class="coupon_centent_left flex-auto">
                <h2>{{item.note}}</h2>
                <h5>{{item.shop_name}}</h5>
                <h6>{{formatTime(item.start_time,item.end_time)}}</h6>
              </div>
              <div class="coupon_centent_right">￥{{item.discount||0}}</div>
            </div>
          </li>
        </ul>
        <div class="mg20" v-else>
          <p class="pd20 c666 text-center">暂无可用优惠券</p>
        </div>
      </div>
      <div v-show="label==='已过期'">
        <ul class="expired_coupon" v-if="overdueList.length>0">
          <li class="coupon_box" v-for="item in overdueList" :key="item.card_id">
            <div class="coupon_centent flex align-middle">
              <div class="coupon_centent_left flex-auto">
                <h2>{{item.note}}</h2>
                <h5>{{item.shop_name}}</h5>
                <h6>{{formatTime(item.start_time,item.end_time)}}</h6>
              </div>
              <div class="coupon_centent_right">￥{{item.discount||0}}</div>
            </div>
          </li>
        </ul>
        <div class="mg20" v-else>
          <p class="pd20 c666 text-center">暂无过期优惠券</p>
        </div>
      </div>
      <div v-show="label==='已使用'">
        <ul class="used_coupon" v-if="usedList.length>0">
          <li class="coupon_box" v-for="item in usedList" :key="item.card_id">
            <div class="coupon_centent flex align-middle">
              <div class="coupon_centent_left flex-auto">
                <h2>{{item.note}}</h2>
                <h5>{{item.shop_name}}</h5>
                <h6>{{formatTime(item.start_time,item.end_time)}}</h6>
              </div>
              <div class="coupon_centent_right">￥{{item.discount||0}}</div>
            </div>
          </li>
        </ul>
        <div class="mg20" v-else>
          <p class="pd20 c666 text-center">您还没有使用过优惠券哦~</p>
        </div>
      </div>
    </div>
  </base-page>
</template>
<script>
import { unusedCard, overdueCard, usedCard } from "@/service/user"
export default {
  data() {
    return {
      label: '未使用',
      unusedList: [],
      overdueList: [],
      usedList: []
    }
  },
  methods: {
    formatTime(start, end) {
      if (start && end) {
        let startTime = this.$util.getFormatDate('yyyy-mm-dd', start);
        let endTime = this.$util.getFormatDate('yyyy-mm-dd', end);
        return '有效日期:' + startTime + '至' + endTime;
      }
      return ''
    }
  },
  async created() {
    this.unusedList = await unusedCard(this.$route.fullPath);
    this.overdueList = await overdueCard(this.$route.fullPath);
    this.usedList = await usedCard(this.$route.fullPath);
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.coupon_box {
  width: 100%;
  padding: 0 5px;
  margin-top: 15px;
}

.coupon_centent {
  height: 110px;
}

.not_used_coupon .bg1 {
  background: url('~@/assets/img/yhq.png') no-repeat 0 0 / 100% 100%;
}

.not_used_coupon .bg2 {
  background: url('~@/assets/img/yhq.png') no-repeat 0 0 / 100% 100%;
}

.coupon_centent_left {
  padding-left: 15px;
}

.coupon_centent_left h2 {
  font-size: 18px;
  color: $color-theme;
  font-weight: bold;
}

.coupon_centent_left h5 {
  font-size: 12px;
  color: $color-theme;
  padding-top: 10px;
}

.coupon_centent_left h6 {
  font-size: 10px;
  color: #999999;
  padding-top: 10px;
}

.coupon_centent_right {
  font-size: 30px;
  color: #fff;
  padding-right: 33px;
}

.expired_coupon .coupon_centent {
  background: url('~@/assets/img/yhq-gq.png') no-repeat 0 0 / 100% 100%;
}

.used_coupon .coupon_centent {
  background: url('~@/assets/img/yhq-sy.png') no-repeat 0 0 / 100% 100%;
}

.used_coupon .coupon_centent_left h2, .used_coupon .coupon_centent_left h5 {
  color: #333333;
}
</style>
