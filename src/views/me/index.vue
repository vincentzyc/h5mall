<template>
  <base-page top0>
    <cube-scroll ref="scroll">
      <div class="user-info">
        <div class="userimg" @click="$router.push('/me/updateinfo')">
          <img :src="user.head_img||require('@/assets/img/logo.png')" alt />
          <span class="vip">v{{user.grade||0}}</span>
        </div>
        <div class="text-center fs18 cfff mg15">{{user.name||'呢称'}}</div>
        <div class="flex opacitybg">
          <div class="flex-auto" @click="$router.push('/me/coupon')">优惠券({{user.gift_card_num||0}})</div>
          <span>|</span>
          <div class="flex-auto" @click="$router.push('/me/myscore')">积分({{user.score||0}})</div>
        </div>
      </div>
      <div class="bgfff mg-b15">
        <div class="flex pd15 border-beee">
          <span class="flex-auto">我的订单</span>
          <span class="c999 mg-r10 fs12">查看全部</span>
          <i class="cubeic-arrow c666"></i>
        </div>
        <ul class="flex order-state">
          <li>
            <div class="state state1">
              <span>1</span>
            </div>
            <div>待付款</div>
          </li>
          <li>
            <div class="state state2">
              <span>2</span>
            </div>
            <div>待发货</div>
          </li>
          <li>
            <div class="state state3">
              <span>3</span>
            </div>
            <div>待收货</div>
          </li>
          <li>
            <div class="state state4">
              <span></span>
            </div>
            <div>待评价</div>
          </li>
        </ul>
      </div>
      <ul class="info-list">
        <li class="flex align-middle">
          <div class="icon icon1"></div>
          <span class="flex-auto">钱包：</span>
          <strong class="ctheme">￥{{user.user_money||0}}</strong>
        </li>
        <li class="flex align-middle" @click="$router.push('/me/likestore')">
          <div class="icon icon2"></div>
          <span class="flex-auto">我关注的商家</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle">
          <div class="icon icon3"></div>
          <span class="flex-auto">收货地址</span>
          <i class="cubeic-arrow c666"></i>
        </li>
      </ul>
      <ul class="info-list">
        <li class="flex align-middle" @click="contact()">
          <div class="icon icon4"></div>
          <span class="flex-auto">联系客服</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle" @click="$router.push('/me/becomefarmer')">
          <div class="icon icon5"></div>
          <span class="flex-auto">成为农户</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle" @click="$router.push('/me/setting')">
          <div class="icon icon6"></div>
          <span class="flex-auto">设置</span>
          <i class="cubeic-arrow c666"></i>
        </li>
        <li class="flex align-middle" @click="$refs.followPopup.show()">
          <div class="icon icon7"></div>
          <span class="flex-auto">关注公众号</span>
          <i class="cubeic-arrow c666"></i>
        </li>
      </ul>
    </cube-scroll>

    <cube-popup position="center" center :mask-closable="true" ref="followPopup">
      <div class="follow-popup">
        <div class="frame">
          <div class="frame_title">关注公众号</div>
          <div class="frame_mode_first">方式一：微信扫描或识别关注卡</div>
          <div
            class="frame_mode_first_btn"
            @click="$refs.pagePopup.open();$refs.followPopup.hide()"
          >获取关注卡</div>
          <div class="frame_mode_first_border"></div>

          <div class="frame_mode_first" style="margin-top: 20px">方式 二：复制链接到微信搜索</div>
          <div class="frame_mode_second_text">{{gzhLink}}</div>
          <div class="frame_mode_first_btn" @click="copy()">复制链接</div>
        </div>
      </div>
    </cube-popup>
    <!-- 识别关注卡 -->
    <page-popup ref="pagePopup" position="right" class="pd-t44" type="getgzh">
      <common-header title="关注卡" />
      <div class="gzh-bg">
        <img src="@/assets/img/gzh.jpg" alt width="100%" />
        <p class="text-center mg-t10">长按图片识别二维码即可关注掌农公众号</p>
      </div>
    </page-popup>
  </base-page>
</template>

<script>
import { getUser,updateUser } from "@/service/user"
import Clipboard from "@/utils/clipboard"

export default {
  name: "me",
  components: {
  },
  data() {
    return {
      user: "",
      contactPhone: "18827737585",
      items: [],
      gzhLink: "https://word=%E7%AB%99%E9%85%B7%E7%BD%91&tn=25017023_10_pg&lm=-1&ssl_s=1&ssl_c=ssl1_16733da497c"
    }
  },
  methods: {
    copy() {
      let clipboard = new Clipboard();
      clipboard.copy(this.gzhLink, () => {
        this.$createToast({
          txt: '复制成功',
          type: 'txt',
          time: 2000
        }).show()
      }, () => {
        this.$createDialog({
          type: 'alert',
          content: '您的浏览器不支持自动复制，请手动复制',
        }).show()
      });
    },
    contact() {
      this.$createDialog({
        type: 'confirm',
        confirmBtn: {
          text: '拨打',
          active: true,
          href: 'tel:' + this.contactPhone
        }
      }, (createElement) => {
        return [
          createElement('div', {
            'class': ['bgtheme', 'cfff', 'lh30', 'fs14', 'pd10'],
            slot: 'title'
          }, '欢迎联系客服'),
          createElement('p', {
            'class': ['text-center'],
            slot: 'content'
          }, [
              createElement('p', {
                'class': ['c000', 'lh30']
              }, this.contactPhone),
              createElement('p', {
                'class': ['c999']
              }, '（周一至周五）9:00-18:00)')
            ])
        ]
      }).show()
    },
    async getUserInfo() {
      let userInfo = await getUser(this.$route.fullPath);
      this.user = userInfo;
      let param = {
        token: userInfo.token,
        user_id: userInfo.id
      }
      let res = await this.$api.Common.getInfoByUserId(param);
      this.user = {
        gift_card_num: res.gift_card_num,
        user_money: res.user_money,
        ...res.userPd
      }
      updateUser({ ...userInfo, ...this.user });
      this.$refs.scroll.refresh();
    }
  },
  created() {
    this.getUserInfo()
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.user-info {
  width: 100%;
  padding-top: 20px;
  background: url('~@/assets/img/me-bg.jpg') no-repeat 0 0 / 100% 100%;
}

.vip {
  position: absolute;
  display: inline-block;
  bottom: -5px;
  right: 5px;
  background: #ff8c2e;
  border-radius: 20px;
  padding: 5px;
  font-size: 12px;
  border: 2px solid #fff;
  color: #fff;
}

.userimg {
  position: relative;
  width: 88px;
  height: 88px;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
}

.opacitybg {
  text-align: center;
  color: #fff;
  line-height: 44px;
  background: rgba(0, 0, 0, 0.1);
}

.order-state {
  padding: 15px 0;
  color: #999;

  li {
    text-align: center;
    width: 25%;
  }

  .state {
    width: 36px;
    height: 36px;
    margin: 0 auto 5px auto;
    position: relative;

    span {
      position: absolute;
      right: -10px;
      top: -10px;
      color: #fff;
      border-radius: 10px;
      font-size: 12px;
      background: $color-theme;
      min-width: 16px;
      line-height: 16px;
    }
  }

  .state1 {
    background: url('~@/assets/img/me.png') no-repeat -240px 0 / auto 100%;
  }

  .state2 {
    background: url('~@/assets/img/me.png') no-repeat -279px 0 / auto 100%;
  }

  .state3 {
    background: url('~@/assets/img/me.png') no-repeat -319px 0 / auto 100%;
  }

  .state4 {
    background: url('~@/assets/img/me.png') no-repeat -358px 0 / auto 100%;
  }
}

.info-list {
  background: #fff;
  margin-bottom: 15px;
  padding: 0 10px;

  li {
    padding: 12px 5px;
    border-bottom: 1px solid #eee;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .icon1 {
    background: url('~@/assets/img/me.png') no-repeat -44px -1px / auto 100%;
  }

  .icon2 {
    background: url('~@/assets/img/me.png') no-repeat -21px -1px / auto 100%;
  }

  .icon3 {
    background: url('~@/assets/img/me.png') no-repeat -67px -1px / auto 100%;
  }

  .icon4 {
    background: url('~@/assets/img/me.png') no-repeat -89px -1px / auto 100%;
  }

  .icon5 {
    background: url('~@/assets/img/me.png') no-repeat -113px -1px / auto 100%;
  }

  .icon6 {
    background: url('~@/assets/img/me.png') no-repeat -136px -1px / auto 100%;
  }

  .icon7 {
    background: url('~@/assets/img/me.png') no-repeat 0 -1px / auto 100%;
  }
}

.follow-popup {
  position: relative;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;

  .frame {
    padding: 10px;
  }

  .frame_title {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    background-size: 18px;
  }

  .frame_mode_first {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    margin: 15px 0;
  }

  .frame_mode_first_btn {
    font-size: 14px;
    color: #ffffff;
    background: #fc3c47;
    width: 100px;
    height: 28px;
    border-radius: 14px;
    text-align: center;
    line-height: 28px;
  }

  .frame_mode_first_border {
    height: 1px;
    border-bottom: 1px dashed #d2d2d2;
    margin: 15px 0;
  }

  .frame_mode_second_text {
    font-size: 12px;
    color: #666666;
    word-break: break-all;
    margin: 15px 0;
  }
}

.gzh-bg {
  width: 100%;
  height: 100%;
  padding: 10%;
  background: url('~@/assets/img/gzh-bg.jpg') no-repeat 0 0 / 100% 100%;
}
</style>

