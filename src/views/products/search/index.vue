<template>
  <base-page>
    <header class="header-bg">
      <div class="flex fs14 cfff">
        <div class="pd-r10 pd-l10 minwidth50 textover">
          <i class="cubeic-back" @click="$router.back()"></i>
        </div>
        <div class="flex flex-auto flex-center textover">
          <div class="search-input flex flex-auto">
            <i class="cubeic-search"></i>
            <input type="text" placeholder="搜索" class="flex-auto" v-model="keyWord" />
          </div>
        </div>
        <div class="pd-r10 pd-l10 minwidth50 textover" @click="searchKeyWord(keyWord)">搜索</div>
      </div>
    </header>
    <cube-tab-bar v-model="selectedTabs" inline class="search-wrap" @click="clickHandler">
      <cube-tab v-for="(item,index) in tabs" :label="item.label" :key="index" :value="index">
        <div class="textover">{{item.label}}</div>
        <i :class="[item.icon,'icon',selectedTabs===item.label&&item.icon==='cubeic-select'?'':'rotate180']"></i>
      </cube-tab>
    </cube-tab-bar>

    <div class="container bgfff">
      <cube-scroll ref="scroll">
        <ProductList :items="productList" v-if="productList.length>0" />
      </cube-scroll>
    </div>

    <transition name="popup-slide-left">
      <div v-show="pageVisible" class="max640 page-popup top88 search-popup">
        <Categories v-show="selectedTabs===0" class="categories" @setCategories="setCategories" @search="search" />
        <Citys v-show="selectedTabs===1" class="citys" @setCitys="setCitys" @search="search" />
      </div>
    </transition>
  </base-page>
</template>

<script>
import ProductList from '@/components/product-list.vue';
import Categories from './categories.vue';
import Citys from './citys.vue';
export default {
  components: {
    ProductList, Categories, Citys
  },
  data() {
    return {
      keyWord: '',
      param: {
        pageNum: '1',//	string	是	当前页数	
        parent_type_id: '',//	string	否	一级分类id	
        type_id: '',//	string	否	二级分类id	
        production_province: '',//	string	否	商品的省份	
        production_city: '',//	string	否	商品的城市	
        price_sort: '',//	string	否	价格排序，1降序，2升序（价格销量两个只能传一个）	
        salenum_sort: ''//	string	否	销量排序，1降序，2升序（价格销量两个只能传一个）
      },
      pageVisible: false,
      selectedTabs: 0,
      tabs: [{
        label: '全部',
        icon: 'cubeic-select'
      }, {
        label: '全国',
        icon: 'cubeic-select'
      }, {
        label: '价格',
        icon: 'icon-sort'
      }, {
        label: '成交笔数',
        icon: 'icon-sort'
      }],
      productList: []
    }
  },
  methods: {
    setCategories(n) {
      this.tabs[0].label = n
    },
    setCitys(n) {
      this.tabs[1].label = n
    },
    async search() {
      let res = await this.$api.Product.productSearch(this.param);
      this.productList = res.shops;
    },
    searchKeyWord(keyWord) {
      this.$router.push('/home/search?key=' + keyWord)
    },
    clickHandler(i) {
      switch (i) {
        case 0:
          if (this.selectedTabs !== 0) {
            this.pageVisible = true
          } else {
            this.pageVisible = !this.pageVisible;
          }
          break;
        case 1:
          if (this.selectedTabs !== 1) {
            this.pageVisible = true
          } else {
            this.pageVisible = !this.pageVisible;
          }
          break;
        case 2:
          this.pageVisible = false;
          break;
        case 3:
          this.pageVisible = false;
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.search()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 44px;
}

.top88 {
  top: 88px;
}

.icon {
  transition: 0.3s;
}

.rotate180 {
  transform: rotate(180deg);
}

.search-wrap {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  color: #333;
  z-index: 99;
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  & /deep/ .cube-tab {
    max-width: 25%;
  }
}

.icon-sort {
  position: relative;
  width: 16px;
  height: 18px;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 20px;
    background: url('~@/assets/img/seach-sort.png') no-repeat -18px 0 / 100% 100%;
  }
}

.cube-tab_active .icon-sort {
  &:after {
    background: url('~@/assets/img/seach-sort.png') no-repeat 0 0 / 100% 100%;
  }
}

.search-popup /deep/ {
  .categories {
    .width96 {
      width: 96%;
    }

    .panel-item {
      display: inline-block;
      min-width: 30%;
      text-align: center;
      padding: 10px;
      margin-bottom: 10px;
      margin-right: 3%;
      font-size: 12px;
      border: 1px solid #999;
      color: #666;
      border-radius: 5px;
    }

    .panel-item.fullwidth {
      width: 100%;

      span {
        width: 90%;
      }
    }

    .panel-item.active {
      span {
        border-color: $color-theme;
        color: $color-theme;
      }
    }
  }

  .citys {
    .panel-item {
      text-align: center;
      line-height: 44px;
      border-bottom: 1px solid #eee;
      color: #666;
    }

    .panel-item.active {
      color: $color-theme;
    }
  }
}
</style>
