<template>
  <base-page>
    <common-header title="购物车" hideBack>
      <span slot="right" v-if="stores.length>0" @click="showDelete=!showDelete">{{showDelete?'完成':'编辑'}}</span>
    </common-header>
    <div class="content-wrap" v-if="stores.length>0">
      <div class="content">
        <cube-scroll ref="scroll">
          <div class="scroll-wrapper">
            <!-- 店铺 -->
            <div class="mg-t10" v-for="(store,index) in stores" :key="store.id">
              <div class="flex align-middle pd10 c666 bgfff">
                <cube-checkbox v-model="store.allCheck" class="store-check" @input="storeCheck(index)"></cube-checkbox>
                <span class="store"></span>
                <div class="flex align-middle mg-l10" @click="$router.push('/store/detail?id='+store.id)">
                  <span class="mg-r10">{{store.name}}</span>
                  <i class="fs16 cubeic-arrow"></i>
                </div>
              </div>
              <!-- 店铺 商品 -->
              <div class="product-item" v-for="item in store.productInfo" :key="item.id">
                <div class="pd10">
                  <cube-checkbox v-model="item.check" @input="itemCheck(index)">
                    <div class="flex product-info">
                      <img :src="item.carousel_img.split(',')[0]" alt="店铺logo" />
                      <div class="pd-l10">
                        <h4 class="textover2 mg-t5">{{item.name}}</h4>
                        <p class="ctheme fs16 mg-t5">￥{{item.specs.specsPrice}}</p>
                      </div>
                    </div>
                  </cube-checkbox>
                </div>
                <div class="pd10 bgfff">
                  <div class="flex align-middle mg-l20">
                    <span class="mg-l10 c666 fs12">购买数量</span>
                    <div class="flex align-middle flex-auto justify-end">
                      <span class="icon cut" @click="item.cart_num = item.cart_num>1?Number(item.cart_num)-1:1"></span>
                      <span class="mg5">{{item.cart_num}}</span>
                      <span class="icon add" @click="item.cart_num = Number(item.cart_num)+1"></span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /店铺 商品 -->
            </div>
            <!--/ 店铺 -->
          </div>
        </cube-scroll>
      </div>
      <footer class="footer-wrap lh50">
        <div class="flex">
          <div class="flex pd-l10 c666">
            <cube-checkbox v-model="allSelect" @input="handleAllSelect">全选</cube-checkbox>
          </div>
          <div class="flex-auto">
            <div class="text-right pd-r10 c666" v-show="!showDelete">
              总计：
              <span class="fs16">￥{{totalPrice}}</span>
            </div>
          </div>
          <div
            class="col-3 pay cfff"
            :class="showDelete?'bgorange':'bgtheme'"
            @click="showDelete?delect():pay()"
          >{{showDelete?'删除':'结算'}}</div>
        </div>
      </footer>
    </div>
    <div v-else class="empty-wrap">
      <div class="empty-cart">
        <div class="empty-cart-icon"></div>
        <p class="text-center c666 fs12">购物车还是空的哦~</p>
      </div>
      <div class="bgfff">
        <p class="text-center lh30 pd10 c666">为您推荐</p>
        <vRecommend :list="recommendList"></vRecommend>
      </div>
    </div>
  </base-page>
</template>

<script>
import vRecommend from "@/components/recommend.vue";
import { getUser } from "@/service/user"
export default {
  name: "cart",
  components: {
    vRecommend
  },
  data() {
    return {
      userInfo: '',
      pageNum: 1,
      showDelete: false,
      allSelect: false,
      stores: [],
      recommendList: []
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0, sum = 0;
      this.stores.forEach(v => {
        sum = v.productInfo.reduce((all, c) => c.check ? all + c.cart_num * c.price : all, 0)
        totalPrice += sum;
      })
      return totalPrice
    }
  },
  methods: {
    addCheckKey(list) {
      return list.map(v => {
        return {
          ...v,
          allCheck: false,
          productInfo: v.productInfo.map(pv => {
            return {
              ...pv,
              check: false
            }
          })
        }
      })
    },
    async getRecommend() {
      let res = await this.$api.Product.sysRecommend({ pageNum: this.pageNum });
      this.recommendList.push(...res.list);
    },
    async myCart() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
      }
      let res = await this.$api.Product.myCart(param);
      if (res.cartList.length === 0) return this.getRecommend();
      this.stores = this.addCheckKey(res.cartList);
    },
    itemCheck(index) {
      this.stores[index].allCheck = this.stores[index].productInfo.every(v => v.check === true);
      this.allSelect = this.stores.every(v => v.allCheck === true);
    },
    storeCheck(index) {
      this.stores[index].productInfo.forEach(v => v.check = this.stores[index].allCheck);
      this.allSelect = this.stores.every(v => v.allCheck === true);
    },
    handleAllSelect(isSelect) {
      this.stores.forEach(s => {
        s.allCheck = isSelect;
        s.productInfo.forEach(v => v.check = isSelect)
      })
    },
    async delectProduct() {
      let delectList = [], newCart = [];
      newCart = this.stores.filter((s, si, sarr) => {
        let newPro = s.productInfo.filter(v => {
          if (v.check) {
            delectList.push({
              product_id: v.id,
              specsId: v.specs.id
            })
            return false;
          }
          return true;
        })
        sarr[si].productInfo = newPro;
        if (!s.allCheck) return sarr
      })
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token,
        product_list: delectList
      }
      let res = await this.$api.Product.delShoppingCart(param);
      this.$createToast({
        txt: '删除成功',
        type: 'txt',
        time: 2000
      }).show();
      this.stores = newCart
    },
    delect() {
      this.$createDialog({
        type: 'confirm',
        content: '是否确定删除选中商品',
        onConfirm: () => {
          this.delectProduct();
          if (this.allSelect) this.getRecommend();
        },
        onCancel: () => { }
      }).show()
    },
    pay() {
      return this.$createToast({
        txt: "拼命开发中",
        type: "txt",
        time: 2000
      }).show()
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
    this.myCart();
  }
};
</script>
<style lang="stylus" scoped>
.content-wrap {
  width: 100%;
  height: 100%;
}

.empty-cart {
  margin: 100px auto;

  .empty-cart-icon {
    margin: 0 auto;
    width: 150px;
    height: 120px;
    background: url('~@/assets/img/cart.png') no-repeat 0px -80px / 100%;
  }
}

.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 50px;

  .store-check /deep/ .cube-checkbox-wrap {
    padding: 0;

    span.cube-checkbox-label {
      display: none;
    }
  }

  .product-info {
    img {
      width: 80px;
      height: 80px;
    }
  }

  .store {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('~@/assets/img/detail-footer.png') no-repeat -21px 0px / auto 100%;
  }

  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
  }

  .cut {
    background: url('~@/assets/img/cart.png') no-repeat 0px 0px / auto 140px;
  }

  .add {
    background: url('~@/assets/img/cart.png') no-repeat 0px -30px / auto 140px;
  }
}

.content, .footer-wrap {
  & /deep/ .cube-checkbox {
    padding: 0;

    .cube-checkbox-ui {
      font-size: 20px;
      margin-right: 10px;
    }
  }
}
</style>