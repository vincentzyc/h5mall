<template>
  <base-page>
    <common-header title="订单" />
    <div class="content tab-composite-view">
      <cube-tab-bar v-model="selectedLabel" show-slider :use-transition="disabled" ref="tabNav" :data="tabLabels"></cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 全部 -->
          <cube-slide-item>
            <cube-scroll :data="followersData" :options="scrollOptions">
              <ul class="list-wrapper">
                <li v-for="(item, index) in followersData" class="list-item" :key="index">
                  <div class="top">
                    <img :src="item.avatar" class="avatar" />
                    <span class="time">{{resolveTitle(item)}}</span>
                  </div>
                  <div class="middle is-bold line-height">{{item.question}}</div>
                  <div>{{resolveQuestionFollowers(item)}}</div>
                </li>
              </ul>
            </cube-scroll>
          </cube-slide-item>
          <!-- 待付款 -->
          <cube-slide-item>
            <cube-scroll :data="recommendData" :options="scrollOptions">
              <ul class="list-wrapper">
                <li v-for="(item, index) in recommendData" class="list-item" :key="index">
                  <div class="top is-black is-bold line-height">{{item.question}}</div>
                  <div class="middle is-grey line-height">{{item.content}}</div>
                  <div>{{resolveQuestionFollowers(item)}}</div>
                </li>
              </ul>
            </cube-scroll>
          </cube-slide-item>
          <!-- 待发货 -->
          <cube-slide-item>
            <cube-scroll :data="hotData" :options="scrollOptions">
              <ul class="list-wrapper">
                <li v-for="(item, index) in hotData" class="list-item" :key="index">
                  <div class="hot-title">
                    <span class="hot-sequence">{{item.sequence}}</span>
                    <span></span>
                    {{item.label}}
                  </div>
                  <div class="hot-content is-bold is-black">{{item.question}}</div>
                </li>
              </ul>
            </cube-scroll>
          </cube-slide-item>
          <!-- 待收货 -->
          <cube-slide-item>
            <cube-scroll :data="followersData" :options="scrollOptions">
              <li v-for="(item, index) in followersData" class="list-item" :key="index">
                <div class="top">
                  <img :src="item.avatar" class="avatar" />
                  <span class="time">{{resolveTitle(item)}}</span>
                </div>
                <div class="middle is-bold line-height">{{item.question}}</div>
                <div>{{resolveQuestionFollowers(item)}}</div>
              </li>
            </cube-scroll>
          </cube-slide-item>
          <!-- 待评价 -->
          <cube-slide-item>
            <cube-scroll :data="recommendData" :options="scrollOptions">
              <ul class="list-wrapper">
                <li v-for="(item, index) in recommendData" class="list-item" :key="index">
                  <div class="top is-black is-bold line-height">{{item.question}}</div>
                  <div class="middle is-grey line-height">{{item.content}}</div>
                  <div>{{resolveQuestionFollowers(item)}}</div>
                </li>
              </ul>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </base-page>
</template>

<script type="text/ecmascript-6">
import { FOLLOWERS_DATA, RECOMMEND_DATA, HOT_DATA } from './tab-bar'
import { getUser } from "@/service/user"
export default {
  data() {
    return {
      selectedLabel: '全部',
      disabled: false,
      tabLabels: [{
        label: '全部'
      }, {
        label: '待付款'
      }, {
        label: '待发货'
      }, {
        label: '待收货'
      }, {
        label: '待评价'
      }],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      followersData: FOLLOWERS_DATA,
      recommendData: RECOMMEND_DATA,
      hotData: HOT_DATA
    }
  },
  methods: {
    findIndex(ary, fn) {
      if (ary.findIndex) {
        return ary.findIndex(fn)
      }
      /* istanbul ignore next */
      let index = -1
      /* istanbul ignore next */
      ary.some(function (item, i, ary) {
        const ret = fn.call(this, item, i, ary)
        if (ret) {
          index = i
          return ret
        }
      })
      /* istanbul ignore next */
      return index
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      console.log(current)
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    resolveTitle(item) {
      return `${item.name}关注了问题 · ${item.postTime} 小时前`
    },
    resolveQuestionFollowers(item) {
      return `${item.answers} 赞同 · ${item.followers} 评论`
    },
    async getAllOrder() {
      this.userInfo = await getUser(this.$route.fullPath);
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        pageNum: 1,
        order_status: '',
        // order_status	string	否	''全部  0 待付款 1已付款（待发货）2已发货(待收货) 3已收货（待评价） 4用户已评价 5商家已评价
      }
      let res = await this.$api.Order.allOrder(param);
      console.log(res);
    }
  },
  computed: {
    initialIndex() {
      let index = 0
      index = this.findIndex(this.tabLabels, item => item.label === this.selectedLabel);
      return index
    }
  },
  created() {
    this.getAllOrder()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
/* 覆盖样式 */
.tab-composite-view {
  .cube-tab-bar {
    background-color: white;
  }

  .cube-tab, .cube-tab_active {
    color: black;
  }

  .cube-tab-bar-slider {
    background-color: black;
  }

  .tab-slide-container {
    position: fixed;
    top: 74px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .list-wrapper {
    overflow: hidden;

    li {
      padding: 15px 10px;
      margin-top: 10px;
      text-align: left;
      background-color: white;
      font-size: 14px;
      color: #999;
      white-space: normal;

      .line-height {
        line-height: 1.5;
      }

      .is-black {
        color: black;
      }

      .is-grey {
        color: #999;
      }

      .is-bold {
        font-weight: bold;
      }

      .top {
        display: flex;

        .avatar {
          width: 15px;
          height: 15px;
          margin-right: 2px;
          border-radius: 100%;
        }

        .time {
          flex: 1;
        }
      }

      .middle {
        display: flex;
        margin: 10px 0;
        color: black;
      }

      .hot-title {
        display: flex;
        align-items: center;
        font-size: 12px;

        .hot-sequence {
          display: inline-block;
          margin-right: 2px;
          padding: 3px 6px;
          border-radius: 2px;
          background-color: darkgoldenrod;
          color: white;
        }
      }

      .hot-content {
        margin-top: 15px;
      }
    }
  }
}
</style>