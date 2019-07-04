<template>
  <base-page>
    <header class="header-bg">
      <div class="flex fs14 cfff">
        <div class="col-2"></div>
        <div class="flex-auto">购物车</div>
        <div class="col-2">
          <span v-if="stores.length>0" @click="showDelete=!showDelete">{{showDelete?'完成':'编辑'}}</span>
        </div>
      </div>
    </header>
    <div class="content-wrap" v-if="stores.length>0">
      <div class="content">
        <cube-scroll ref="scroll">
          <div class="scroll-wrapper">
            <!-- 店铺 -->
            <div class="mg-t10" v-for="(store,index) in stores" :key="store.storeId">
              <div class="flex align-middle pd10 c666 bgfff">
                <cube-checkbox v-model="store.allCheck" class="store-check" @input="storeCheck(index)"></cube-checkbox>
                <span class="store"></span>
                <span class="mg-l10 mg-r10">{{store.storeName}}</span>
                <i class="fs16 cubeic-arrow"></i>
              </div>
              <!-- 店铺 商品 -->
              <div class="product-item" v-for="item in store.products" :key="item.id">
                <div class="pd10">
                  <cube-checkbox v-model="item.check" @input="itemCheck(index)">
                    <div class="flex product-info">
                      <img :src="require(`@/assets/img/${item.img}`)" alt="店铺logo" />
                      <div class="pd-l10">
                        <h4 class="textover2 mg-t5">{{item.title}}</h4>
                        <p class="ctheme fs16 mg-t5">￥{{item.price}}</p>
                      </div>
                    </div>
                  </cube-checkbox>
                </div>
                <div class="pd10 bgfff">
                  <div class="flex align-middle mg-l20">
                    <span class="mg-l10 c666 fs12">购买数量</span>
                    <div class="flex align-middle flex-auto justify-end">
                      <span class="icon cut" @click="item.number = item.number>1?item.number-1:1"></span>
                      <span class="mg5">{{item.number}}</span>
                      <span class="icon add" @click="item.number = item.number+1"></span>
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
          <div class="col-3 pay cfff" :class="showDelete?'bgorange':'bgtheme'" @click="showDelete?delect():pay()">{{showDelete?'删除':'结算'}}</div>
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
import { debuglog } from 'util';
export default {
  name: "cart",
  components: {
    vRecommend
  },
  data() {
    return {
      check: false,
      checkitem: false,
      showDelete: false,
      allSelect: false,
      stores: [{
        storeId: 1,
        storeName: '京东自营',
        allCheck: false,
        products: [{
          check: false,
          number: 1,
          title: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
          img: 'store1.png',
          price: 99,
          id: 1
        }, {
          check: false,
          number: 1,
          title: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
          img: 'store2.png',
          price: 199,
          id: 2
        }],
      }, {
        storeId: 2,
        storeName: '周氏云商城',
        allCheck: false,
        products: [{
          check: false,
          number: 1,
          title: '杜兰特成为完全自由球员加盟篮网',
          img: 'store3.png',
          price: 899,
          id: 3
        }],
      }, {
        storeId: 1,
        storeName: '京东自营',
        allCheck: false,
        products: [{
          check: false,
          number: 1,
          title: '杜兰特成为完全自由球员加盟篮网1',
          img: 'store3.png',
          price: 123,
          id: 33
        }, {
          check: false,
          number: 1,
          title: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼2',
          img: 'store1.png',
          price: 65,
          id: 31
        }, {
          check: false,
          number: 1,
          title: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯3',
          img: 'store2.png',
          price: 158,
          id: 32
        }],
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
  computed: {
    totalPrice() {
      let totalPrice = 0, sum = 0;
      this.stores.forEach(v => {
        sum = v.products.reduce((all, c) => c.check ? all + c.number * c.price : all, 0)
        totalPrice += sum;
      })
      return totalPrice
    }
  },
  methods: {
    itemCheck(index) {
      this.stores[index].allCheck = this.stores[index].products.every(v => v.check === true);
      this.allSelect = this.stores.every(v => v.allCheck === true);
    },
    storeCheck(index) {
      this.stores[index].products.forEach(v => v.check = this.stores[index].allCheck);
      this.allSelect = this.stores.every(v => v.allCheck === true);
    },
    handleAllSelect(isSelect) {
      this.stores.forEach(s => {
        s.allCheck = isSelect;
        s.products.forEach(v => v.check = isSelect)
      })
    },
    delect() {
      if (this.allSelect) this.stores = []
      // this.stores.forEach((s, si,sarr) => {
      //   console.log(si,sarr);
      //   if (s.allCheck) {
      //     sarr.splice(si, 1)
      //   } else {
      //     s.products.forEach((v, vi,varr) => {
      //       if (v.check) varr.products.splice(vi, 1)
      //     })
      //   }
      // })
    },
    pay() { }
  }
};
</script>
<style lang="stylus" scoped>
.content-wrap {
  width: 100%;
  height: 100%;
}

.empty-wrap {
  margin-top: 44px;
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