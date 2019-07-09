<template>
  <base-page>
    <div class="container fs14">
      <i class="cubeic-back detail-back" @click="$router.back()"></i>
      <div class="drop-down-menu">
        <img src="@/assets/img/menu.png" alt="操作菜单" @click="showDropDownMenu=!showDropDownMenu" width="100%" height="100%" />
        <transition name="fade">
          <div class="menu" v-show="showDropDownMenu">
            <p class="border-beee">分享</p>
            <p>收藏店铺</p>
          </div>
        </transition>
      </div>

      <div class="common-slide detail-slide">
        <cube-slide ref="slide" :data="items">
          <cube-slide-item v-for="(item, index) in items" :key="index">
            <a :href="item.url">
              <img :src="item.image" />
            </a>
          </cube-slide-item>
        </cube-slide>
      </div>

      <div class="flex product-info bgfff pd10">
        <div class="flex-auto">
          <h3 class="fs16 bold lh30">商品名称名称</h3>
          <p class="fs12 c999">鼓掌：鼓掌鼓掌鼓掌</p>
          <div class="flex align-middle mg-t5">
            <span class="price ctheme fs16 mg-r10">￥99</span>
            <span class="border-tag">新品上市</span>
            <span class="border-tag">品质保障</span>
            <span class="border-tag">春节特供</span>
          </div>
        </div>
        <div class="flex flex-center">
          <div class="text-right">
            <div class="mg-b15 c666">已售19</div>
            <span class="border-tag">包邮</span>
          </div>
        </div>
      </div>

      <div class="flex pd-l10 pd-r10 pd-t20 pd-b20 bgfff mg-t15 align-middle">
        <div class="flex flex-auto align-middle">
          <img src="@/assets/img/discount.png" alt="优惠券" class="discount" />
          <span class="mg-l5 fs16">优惠券领取</span>
        </div>
        <i class="cubeic-arrow"></i>
      </div>

      <div class="specs bgfff pd-l10 pd-r10 pd-t20 pd-b20 mg-t15">
        <h3 class="mg-b20 fs14">商品规格</h3>
        <table>
          <tr>
            <td class="c666">产品名称</td>
            <td class="c333">产品名称产品名称产品名称产品名称产品名称</td>
            <td class="c666">单位</td>
            <td class="c333">个</td>
          </tr>
          <tr>
            <td class="c666">用途</td>
            <td class="c333">食用</td>
            <td class="c666">类型</td>
            <td class="c333">鸡肉</td>
          </tr>
        </table>
      </div>

      <div class="detail-info bgfff mg-t15">
        <cube-tab-bar v-model="selectedLabel" show-slider class="border-beee">
          <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index" class="lh30"></cube-tab>
        </cube-tab-bar>
        <cube-tab-panels class="mg-b10">
          <cube-tab-panel class="img-panel" v-show="selectedLabel==='图片'">
            <img :src="BASE_URL + 'static/img/banner1.png'" alt />
            <img :src="BASE_URL + 'static/img/banner2.png'" alt />
            <img :src="BASE_URL + 'static/img/banner3.png'" alt />
          </cube-tab-panel>
          <cube-tab-panel class="text-panel" v-show="selectedLabel==='文字'">
            <p v-html="$util.textBr(detailText)"></p>
          </cube-tab-panel>
          <cube-tab-panel class="comment-panel" v-show="selectedLabel==='评价'">
            <vComment :list="commentList"></vComment>
          </cube-tab-panel>
          <cube-tab-panel class="recommend-panel" v-show="selectedLabel==='推荐'">
            <vRecommend :list="recommendList"></vRecommend>
          </cube-tab-panel>
        </cube-tab-panels>
      </div>
      <!-- <h3>{{$route.query.id}}</h3> -->
    </div>
    <vFooter></vFooter>
  </base-page>
</template>


<script>
import vComment from "./comment.vue";
import vRecommend from "@/components/recommend.vue";
import vFooter from "./footer.vue";

export default {
  name: "home",
  components: {
    vComment, vRecommend, vFooter
  },
  data() {
    return {
      showDropDownMenu: false,
      selectedLabel: '图片',
      tabs: ['图片', '文字', '评价', '推荐'],
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: this.BASE_URL + 'static/img/banner1.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: this.BASE_URL + 'static/img/banner2.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: this.BASE_URL + 'static/img/banner3.png'
        }
      ],
      detailText: '描述文字@BR@描述文字描述@BR@文字描述文字描述@BR@文字描述文字描述文@BR@字描述文字',
      commentList: [{
        score: 4
      }, {
        score: 5
      }],
      recommendList: [{
        title: '常规赛MVP',
        introduce: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        img: 'store1.png',
        tags: ['限时特价', '新品上市', '包邮'],
        id: 1
      }, {
        title: '京东自营',
        introduce: '杜兰特不执行球员选项 将成为完全自由球员',
        img: 'store2.png',
        tags: ['限时特价', '质保赔付', '新品上市', '包邮'],
        id: 2
      }, {
        title: '周氏云商城',
        introduce: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
        img: 'store3.png',
        tags: ['限时特价', '新品上市', '不包邮'],
        id: 3
      }]
    }
  },
  methods: {

  },
  // mounted() {
  //   this.$nextTick(function () {
  //     setTimeout(() => {
  //       this.$refs.slide.refresh();
  //     }, 0);
  //   });
  // }
};
</script>

<style lang="stylus" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: auto;
}

.discount {
  height: 20px;
}

.drop-down-menu {
  position: absolute;
  right: 15px;
  top: 10px;
  z-index: 99;
  width: 34px;
  height: 34px;
  border-radius: 50px;

  .menu {
    position: absolute;
    top: 40px;
    right: 0;
    width: 80px;
    padding: 0 10px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #333;
    background-color: #fff;
  }
}

table {
  width: 90%;
  border-collapse: collapse;
  border-spacing: 0px;
  text-align: center;
  border: 1px solid #999;
  margin: 0 auto;
}

th, td {
  font-weight: normal;
  vertical-align: middle;
  font-size: 12px;
  line-height: 20px;
  padding: 10px 0;
  border: 1px solid #999;
}

.img-panel {
  img {
    width: 100%;
    float: left;
  }
}

.text-panel {
  padding: 10px;

  p {
    line-height: 26px;
    color: #333;
    font-size: 14px;
  }
}

.comment-panel {
  & /deep/ {
    .userimg {
      width: 40px;
      height: 40px;
    }

    .comment-img {
      width: 66px;
      height: 66px;
      margin-right: 10px;
    }

    .cube-rate-item {
      width: 10px;
      margin-right: 5px;
    }

    .reply {
      position: relative;
      background: #f7f7f7;
      padding: 10px;
      margin-top: 15px;

      .title {
        color: #405067;
      }

      &::before {
        content: '';
        position: absolute;
        top: -15px;
        left: 20px;
        border-bottom: 18px solid #f7f7f7;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
    }
  }
}
</style>


