<template>
  <base-page>
    <div v-if="$util.platform()==='h5'" class="detail_top">
      <i class="cubeic-back detail-back" @click="$router.back()"></i>
      <div class="drop-down-menu">
        <img
          src="@/assets/img/menu.png"
          alt="操作菜单"
          @click="showDropDownMenu=!showDropDownMenu"
          width="100%"
          height="100%"
        />
        <transition name="fade">
          <div class="menu" v-show="showDropDownMenu">
            <!-- <p class="border-beee">分享</p> -->
            <p @click="likeStore(Data.shop_id)">收藏店铺</p>
          </div>
        </transition>
      </div>
    </div>
    <div id="detail_wrap" class="container fs14">
      <div v-if="Data">
        <div class="common-slide detail-slide">
          <cube-slide ref="slide" :data="carousel" :auto-play="false">
            <cube-slide-item v-for="(item, index) in carousel" :key="index" class="relative">
              <div v-if="item.type==='video'">
                <img :src="item.video_cover" />
                <img src="@/assets/img/video_controls.png" @click="initVideo(item)" class="play-icon" />
              </div>
              <!-- <video
                controls
                v-if="item.type==='video'"
                :poster="item.video_cover"
                class="video-wrap"
                @click="videoPlay($event)"
              >
                <source :src="item.url" type="video/mp4" />
              </video>-->
              <img :src="item.url" v-else />
            </cube-slide-item>
          </cube-slide>
        </div>

        <div class="flex product-info bgfff pd10">
          <div class="flex-auto col-9">
            <h3 class="fs16 bold lh30 textover">{{Data.name}}</h3>
            <p class="fs12 c999">产地：{{Data.production_place}}</p>
            <div class="flex align-middle mg-t5">
              <span class="price ctheme fs16 mg-r10">￥{{$refs.footer.selectSpecs.specsPrice}}</span>
              <!-- <span class="price ctheme fs16 mg-r10">￥{{Data.specs[0].specsPrice}}</span> -->
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

        <div class="flex pd-l10 pd-r10 pd-t15 pd-b15 bgfff mg-t15 align-middle" @click="getCoupon()">
          <div class="flex flex-auto align-middle">
            <img src="@/assets/img/discount.png" alt="优惠券" class="discount" />
            <span class="mg-l5 fs14">优惠券领取</span>
          </div>
          <i class="cubeic-arrow"></i>
        </div>

        <div
          class="flex pd-l10 pd-r10 pd-t15 pd-b15 bgfff mg-t15 align-middle fs12"
          @click="$refs.footer.showPopup()"
          v-if="Data.specs.length>0"
        >
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
          <cube-tab-bar v-model="selectedLabel" show-slider class="border-beee" @change="changeHandler">
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
    <div class="coupon-popup">
      <cube-popup position="bottom" :mask-closable="true" ref="couponPopup">
        <ul>
          <li class="coupon_box" v-for="item in storeCoupon" :key="item.card_id">
            <div class="coupon_centent flex align-middle bg1">
              <div class="pd-l15 flex-auto">
                <h2 class="cbold fs18 ctheme">{{item.note}}</h2>
                <!-- <h5 class="fs12 ctheme pd-t10">{{item.card_type}}</h5> -->
                <h6 class="fs10 c999 pd-t10 lh16">{{formatTime(item.start_time,item.end_time)}}</h6>
              </div>
              <div class="coupon_centent_right">￥{{item.discount||0}}</div>
              <div class="coupon_centent_right_btn ctheme" @click="getCard(item.id)">领取</div>
            </div>
          </li>
        </ul>
        <div class="coupon_btn bgtheme" @click="$refs.couponPopup.hide()">完成</div>
      </cube-popup>
    </div>
    <div class="video-play">
      <cube-popup ref="videoPopup">
        <div class="video-wrap">
          <video
            ref="videoPlayer"
            controls
            autoplay
            preload="auto"
            :poster="curVideo.video_cover"
            :src="curVideo.url"
            style="width:100%;height:100%"
          >
            <!-- <source :src="curVideo.url" type="video/mp4" /> -->
          </video>
        </div>
        <i class="cubeic-close video-close" @click="videoClose()"></i>
      </cube-popup>
    </div>

    <vFooter :Data="Data" ref="footer"></vFooter>
  </base-page>
</template>


<script>
import vComment from "./comment.vue";
import vRecommend from "@/components/recommend.vue";
import vFooter from "./footer.vue";
import { addShopCollection, getCard } from "@/service/user"

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
      loadComment: true,
      carousel: [],
      curVideo: {},
      showDropDownMenu: false,
      selectedLabel: '图片',
      tabs: ['图片', '文字', '评价', '推荐'],
      commentList: [],
      recommendList: [],
      storeCoupon: []
    }
  },
  watch: {
    '$route'(to, form) {
      if (to.name === 'productsDetail' && form.name === 'productsDetail') {
        Object.assign(this.$data, this.$options.data());
        this.init();
      }
    }
  },
  methods: {
    changeHandler(label) {
      if (label === '评价') return this.getCommentList();
      if (label === '推荐') return this.getRecommend();
    },
    // 交互函数
    // 优惠券领取
    getCoupon() {
      let str = JSON.stringify({ shop_id: (this.Data.shop_id || '').toString() });
      if (this.$util.platform() === 'android') return window.android.getCoupon(str);
      if (this.$util.platform() === 'ios') return window.webkit.messageHandlers.jumpCoupon.postMessage(str);
      return this.getShopCard()
    },
    // /交互函数
    formatTime(start, end) {
      if (start && end) {
        let startTime = this.$util.getFormatDate('yyyy-mm-dd', start);
        let endTime = this.$util.getFormatDate('yyyy-mm-dd', end);
        return '有效日期:' + startTime + '至' + endTime;
      }
      return ''
    },
    getCard(id) {
      getCard(id, this.$route.fullPath)
    },
    initVideo(obj) {
      this.curVideo = obj;
      this.$refs.videoPopup.show();
    },
    videoClose() {
      this.$refs.videoPlayer.pause();
      this.$refs.videoPopup.hide();
    },
    likeStore(id) {
      addShopCollection(id, this.$route.fullPath);
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
        video = this.Data.video.split(",").map((v, i) => {
          return {
            type: 'video',
            url: v,
            video_cover: this.Data.video_cover.split(",")[i]
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
    async getShopCard() {
      if (!this.Data) return this.storeCoupon = [];
      this.$loading.open();
      let res = await this.$api.Store.shopCard({ shop_id: this.Data.shop_id });
      if (res.list.length > 0) {
        this.storeCoupon = res.list;
        this.$refs.couponPopup.show();
      } else {
        this.$createToast({
          txt: '暂无优惠券',
          type: 'txt',
          time: 2000
        }).show()
      }
      this.$loading.close();
    },
    async getCommentList() {
      if (!this.Data) return this.commentList = [];
      if (!this.loadComment) return;
      this.$loading.open();
      let res = await this.$api.Product.getCommentList({ product_id: this.Data.id });
      this.commentList = res.list;
      this.loadComment = false;
      this.$loading.close();
    },
    wxShare() {
      let shareData = {
        imgUrl: this.Data.carousel_img.split(",")[0], // 分享显示的缩略图地址
        link: window.location.origin + window.location.pathname + window.location.hash, // 分享地址
        desc: this.Data.introduction, // 分享描述
        title: this.Data.name // 分享标题
      }
      this.$api.wxShare(shareData);
    },
    async init() {
      this.$loading.open();
      let res = await this.$api.Product.productDetail({ product_id: this.$route.query.id });
      this.Data = res;
      this.getCarousel();
      this.wxShare();
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

.detail_top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
}

.discount {
  height: 20px;
}

.video-wrap {
  width: 100%;
  height: 400px;
  z-idnex: 999;
  background-color: #fff;
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

.video-close {
  position: absolute;
  right: 5px;
  top: -26px;
  font-size: 25px;
  background: #fff;
  border-radius: 20px;
  z-index: 1001;
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

.coupon-popup & /deep/ {
  .cube-popup-content {
    width: 100%;
    max-height: 80%;
    border-radius: 16px 16px 0 0;
    overflow: auto;
    background: #fff;
    padding: 10px;
  }

  .coupon_box {
    width: 100%;
    padding: 0 5px;
    margin-top: 15px;
  }

  .coupon_centent {
    height: 110px;
  }

  .bg1 {
    background: url('~@/assets/img/getyhq.png') no-repeat 0 0 / 100% 100%;
  }

  .coupon_centent_right {
    font-size: 30px;
    color: #fff;
    padding: 35px;
  }

  .coupon_centent_right_btn {
    width: 35px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
  }

  .coupon_btn {
    width: 100px;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    margin: 10px auto;
  }
}
</style>


