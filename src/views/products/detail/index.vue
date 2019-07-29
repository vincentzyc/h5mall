<template>
  <base-page>
    <div id="detail_wrap" class="container fs14">
      <div v-if="Data">
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
          <cube-slide ref="slide" :data="carousel" :auto-play="false">
            <cube-slide-item v-for="(item, index) in carousel" :key="index">
              <img :src="item.url" v-if="item.type==='img'" />
              <video controls v-if="item.type==='video'" class="video-wrap" @click="videoPlay($event)">
                <source :src="item.url" type="video/mp4" />
              </video>
            </cube-slide-item>
          </cube-slide>
        </div>

        <div class="flex product-info bgfff pd10">
          <div class="flex-auto col-9">
            <h3 class="fs16 bold lh30 textover">{{Data.name}}</h3>
            <p class="fs12 c999">产地：{{Data.production_place}}</p>
            <div class="flex align-middle mg-t5">
              <span class="price ctheme fs16 mg-r10">￥{{Data.price}}</span>
              <span class="border-tag" v-for="item in Data.tagList" :key="item">{{item}}</span>
            </div>
          </div>
          <div class="flex flex-center flex-none col-3">
            <div class="text-right">
              <div class="mg-b15 fs12 c666">已售{{Data.virtual_num}}</div>
              <span class="border-tag" v-if="Data.is_ems===1">包邮</span>
            </div>
          </div>
        </div>

        <div class="flex pd-l10 pd-r10 pd-t15 pd-b15 bgfff mg-t15 align-middle">
          <div class="flex flex-auto align-middle">
            <img src="@/assets/img/discount.png" alt="优惠券" class="discount" />
            <span class="mg-l5 fs14">优惠券领取</span>
          </div>
          <i class="cubeic-arrow"></i>
        </div>

        <div class="flex pd-l10 pd-r10 pd-t15 pd-b15 bgfff mg-t15 align-middle fs12" @click="$refs.footer.showPopup()" v-if="Data.specs.length>0">
          <span class="flex-none mg-r15">已选</span>
          <div class="flex-auto">{{$refs.footer.selectSpecs.specsName||''}}</div>
          <i class="cubeic-arrow"></i>
        </div>

        <div class="specs bgfff pd-l10 pd-r10 pd-t20 pd-b20 mg-t15">
          <h3 class="mg-b20 fs14">商品规格</h3>
          <table>
            <tr>
              <td class="c666">产品名称</td>
              <td class="c333">{{Data.name}}</td>
              <td class="c666">单位</td>
              <td class="c333">{{Data.unit}}</td>
            </tr>
            <tr>
              <td class="c666">用途</td>
              <td class="c333">{{Data.application}}</td>
              <td class="c666">类型</td>
              <td class="c333">{{Data.type_name}}</td>
            </tr>
          </table>
        </div>

        <div class="detail-info bgfff mg-t15">
          <cube-tab-bar v-model="selectedLabel" show-slider class="border-beee">
            <cube-tab v-for="(item, index) in tabs" :label="item" :key="item+index" class="lh30"></cube-tab>
          </cube-tab-bar>
          <cube-tab-panels class="mg-b10">
            <cube-tab-panel class="img-panel" label="图片" v-show="selectedLabel==='图片'">
              <img v-for="item in Data.img.split(',')" :key="item" v-lazy="item" alt class="tab-panel-img" />
            </cube-tab-panel>
            <cube-tab-panel class="text-panel" label="文字" v-show="selectedLabel==='文字'">
              <!-- <p v-html="$util.textBr(Data.introduction,'@BR@')"></p> -->
              <p>{{Data.introduction}}</p>
            </cube-tab-panel>
            <cube-tab-panel class="comment-panel" label="评价" v-show="selectedLabel==='评价'">
              <vComment :list="commentList" v-if="commentList.length>0"></vComment>
              <div v-else>
                <p class="mg20 lh30 text-center">暂无评价</p>
              </div>
            </cube-tab-panel>
            <cube-tab-panel class="recommend-panel" label="推荐" v-show="selectedLabel==='推荐'">
              <vRecommend :list="recommendList" v-if="recommendList.length>0"></vRecommend>
              <div v-else>
                <p class="mg20 lh30 text-center">暂无推荐产品</p>
              </div>
            </cube-tab-panel>
          </cube-tab-panels>
        </div>
      </div>
    </div>

    <vFooter @emitPopup="emitPopup" :Data="Data" ref="footer"></vFooter>
  </base-page>
</template>


<script>
import vComment from "./comment.vue";
import vRecommend from "@/components/recommend.vue";
import vFooter from "./footer.vue";

export default {
  name: "productDetail",
  components: {
    vComment, vRecommend, vFooter
  },
  data() {
    return {
      Data: '',
      pageNum: 0,
      loadMore: true,
      carousel: [],
      showDropDownMenu: false,
      selectedLabel: '图片',
      tabs: ['图片', '文字', '评价', '推荐'],
      commentList: [],
      recommendList: []
    }
  },
  watch: {
    '$route'(to) {
      if (to.name === 'productsDetail') {
        Object.assign(this.$data, this.$options.data());
        this.init();
      }
    }
  },
  methods: {
    emitPopup(v) {
    },
    videoPlay(e) {
      e.target.paused ? e.target.play() : e.target.pause();
    },
    getCarousel() {
      let imgs = [], video = [];
      if (!this.Data) return;
      if (this.Data.carousel_img) {
        imgs = this.Data.carousel_img.split(",").map(v => {
          return {
            type: 'img',
            url: v
          }
        });
      }
      if (this.Data.video) {
        video = this.Data.video.split(",").map(v => {
          return {
            type: 'video',
            url: v
          }
        });
      }
      this.carousel = [...imgs, ...video]
    },
    async getRecommend() {
      if (!this.Data) return this.recommendList = [];
      if (!this.loadMore) return;
      this.pageNum++
      let param = {
        product_id: this.Data.id,
        type_id: this.Data.type_id,
        pageNum: this.pageNum
      }
      let res = await this.$api.Product.getRecommend(param);
      this.loadMore = (res.recommendList || []).length === 10;
      this.recommendList.push(...res.recommendList)
    },
    scrollBottom() {
      let el = document.getElementById("detail_wrap");
      let scrollTop = 0, clientHeight = 0, scrollHeight = 0;
      el.onscroll = () => {
        scrollTop = el.scrollTop;
        clientHeight = el.clientHeight || el.offsetHeight;
        scrollHeight = el.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) this.getRecommend()
      };
    },
    async getCommentList() {
      if (!this.Data) return this.commentList = [];
      let res = await this.$api.Product.getCommentList({ product_id: this.Data.id });
      this.commentList = res.list
    },
    async init() {
      this.$loading.open();
      let res = await this.$api.Product.productDetail({ product_id: this.$route.query.id });
      console.log(res);
      this.Data = res.product_info;
      this.getCarousel();
      this.getCommentList();
      this.getRecommend();
      this.$loading.close();
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.scrollBottom()
    });
  },
  created() {
    this.init()
  }
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

.video-wrap {
  width: 100%;
  height: 100%;
  z-idnex: 999;
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


