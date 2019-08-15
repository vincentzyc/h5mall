<template>
  <div>
    <footer class="footer-wrap">
      <div class="flex">
        <div class="col-2" @click="toCart()">
          <div class="icon cart"></div>
          <h5 class="fs12 c999">购物车</h5>
        </div>
        <div class="col-2" @click="toShop()">
          <div class="icon store"></div>
          <h5 class="fs12 c999">店铺</h5>
        </div>
        <div class="col-2" @click="toChat()">
          <div class="icon seller"></div>
          <h5 class="fs12 c999">联系卖家</h5>
        </div>
        <div class="col-3 add-cart" @click="showPopup()">加入购物车</div>
        <div class="col-3 pay" @click="showPopup()">立即支付</div>
      </div>
    </footer>
    <div class="specsPopup">
      <cube-popup position="bottom" :mask-closable="true" ref="specsPopup">
        <div class="flex preview">
          <img :src="selectSpecs.specsImg" alt="商品预览图" />
          <div class="flex flex-auto specs-select align-end">
            <span class="ctheme fs12 mg-l10">
              ￥
              <span class="fs18">{{selectSpecs.specsPrice}}</span>
            </span>
          </div>
          <i class="cubeic-close" @click="hidePopup()"></i>
        </div>
        <div class="specs-info">
          <p class="lh30 fs12">选择规格</p>
          <ul class="specs-content">
            <li
              :class="{active:selectSpecs.id===item.id}"
              v-for="item in Data.specs"
              :key="item.id"
              @click="selectSpecs=item"
            >{{item.specsName}}</li>
          </ul>
          <div class="flex align-middle mg-b10">
            <span class="c666 fs12">购买数量</span>
            <div class="flex align-middle flex-auto justify-end">
              <span class="icon cut" @click="number = number>1?number-1:1">-</span>
              <span class="mg10">{{number}}</span>
              <span class="icon add" @click="number = number+1">+</span>
            </div>
          </div>
        </div>

        <div class="flex handle">
          <div class="flex-auto btn add-cart" @click="addCart()">加入购物车</div>
          <div class="flex-auto btn pay" @click="toPay()">立即购买</div>
        </div>
      </cube-popup>
    </div>
  </div>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  props: ['Data'],
  data() {
    return {
      selectSpecs: '',
      number: 1
    }
  },
  watch: {
    Data(n) {
      if (!n) return;
      this.selectSpecs = n.specs[0] || ''
    }
  },
  methods: {
    // 交互函数
    // 购物车
    toCart() {
      if (this.$util.platform() === 'android') return window.android.toCart();
      if (this.$util.platform() === 'ios') return window.webkit.messageHandlers.jumpShoppingCart.postMessage(""); //必须要参数，否则交互无效
      return this.$router.push('/cart')
    },
    // 店铺
    toShop() {
      let str = JSON.stringify({ shop_id: (this.Data.shop_id || '').toString() });
      if (this.$util.platform() === 'android') return window.android.toShop(str);
      if (this.$util.platform() === 'ios') return window.webkit.messageHandlers.jumpShop.postMessage(str);
      return this.$router.push('/store/detail?id=' + (this.Data.shop_id || '').toString())
    },
    // 联系卖家
    toChat() {
      let str = JSON.stringify({
        shop_id: (this.Data.shop_id || '').toString(),
        product_id: (this.Data.id || '').toString(),
      });
      if (this.$util.platform() === 'android') return window.android.toChat(str);
      if (this.$util.platform() === 'ios') return window.webkit.messageHandlers.contactSellers.postMessage(str);
      return this.$createDialog({ content: '联系卖家' }).show();
    },
    // 加入购物车
    addCart() {
      let str = JSON.stringify({
        product_id: (this.Data.id || '').toString(),
        specs_id: (this.selectSpecs.id || '').toString(),
        num: this.number.toString()
      })
      if (this.$util.platform() === 'android') {
        window.android.addCart(str);
        return this.hidePopup();
      }
      if (this.$util.platform() === 'ios') {
        window.webkit.messageHandlers.addShoppingCart.postMessage(str);
        return this.hidePopup();
      }
      return this.addShoppingCart()
    },
    async addShoppingCart() {
      this.userInfo = await getUser(this.$route.fullPath);
      let param = {
        user_id: this.userInfo.id.toString(),
        token: this.userInfo.token,
        product_id: (this.Data.id || '').toString(),
        specsId: this.selectSpecs.id,
        num: this.number
      }
      this.$loading.open();
      console.log(param);
      let res = await this.$api.Product.addShoppingCart(param);
      this.$createToast({
        txt: "添加成功",
        type: "txt",
        time: 2000
      }).show()
      this.$loading.close();
      this.hidePopup();
    },
    // 立即支付
    toPay() {
      let str = JSON.stringify({
        product_id: (this.Data.id || '').toString(),
        specs_id: (this.selectSpecs.id || '').toString(),
        num: this.number.toString()
      })
      this.hidePopup();
      if (this.$util.platform() === 'android') {
        window.android.toPay(str);
        return this.hidePopup();
      }
      if (this.$util.platform() === 'ios') {
        window.webkit.messageHandlers.buyNow.postMessage(str);
        return this.hidePopup();
      }
      return this.$createDialog({ content: '立即支付' }).show();
    },
    // /交互函数 
    showPopup() {
      this.$refs.specsPopup.show()
    },
    hidePopup() {
      this.$refs.specsPopup.hide()
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.footer-wrap {
  .icon {
    width: 30px;
    height: 30px;
    margin: 3px auto 0 auto;
  }

  .cart {
    background: url('~@/assets/img/detail-footer.png') no-repeat 0px 0px / auto 100%;
  }

  .store {
    background: url('~@/assets/img/detail-footer.png') no-repeat -30px 0px / auto 100%;
  }

  .seller {
    background: url('~@/assets/img/detail-footer.png') no-repeat -65px 0px / auto 100%;
  }
}

.add-cart {
  background: $color-orange;
  color: #fff;
  line-height: 50px;
}

.pay {
  background: $color-theme;
  color: #fff;
  line-height: 50px;
}

.specsPopup & /deep/ {
  .cube-popup-content {
    width: 100%;
    height: 80%;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    background: #fff;
  }

  .preview {
    padding: 15px;

    img {
      border-radius: 5px;
      width: 88px;
      height: 88px;
    }
  }

  .specs-info {
    position: absolute;
    top: 110px;
    left: 15px;
    right: 15px;
    bottom: 50px;
    font-size: 12px;
    overflow-y: auto;

    li {
      display: inline-block;
      margin-bottom: 15px;
      margin-right: 15px;
      padding: 10px 15px;
      border-radius: 20px;
      background: #eee;
      color: #333;
      border: 1px solid transparent;
    }

    li.active {
      background: $color-theme-light-sss;
      border-color: $color-theme;
      color: $color-theme;
    }

    .icon {
      display: inline-block;
      width: 26px;
      line-height: 26px;
      font-size: 16px;
      border-radius: 5px;
      text-align: center;
      color: #666;
      border: 1px solid #ccc;
    }

    .cut {
      // background: url('~@/assets/img/cart.png') no-repeat 0px 0px / auto 140px;
    }

    .add {
      // background: url('~@/assets/img/cart.png') no-repeat 0px -30px / auto 140px;
    }
  }

  .handle {
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #ddd;
  }
}
</style>

