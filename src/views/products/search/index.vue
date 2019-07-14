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
        <div class="pd-r10 pd-l10 minwidth50 textover" @click="search(keyWord)">搜索</div>
      </div>
    </header>
    <cube-tab-bar v-model="selectedTabs" inline @click="clickHandler" class="search-wrap">
      <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
        <span>{{item.label}}</span>
        <i :class="[item.icon,'icon',selectedTabs===item.label&&item.icon==='cubeic-select'?'rotate180':'']"></i>
      </cube-tab>
    </cube-tab-bar>

    <div class="container bgfff">
      <cube-scroll ref="scroll">
        <ProductList :items="productList" v-if="productList.length>0" />
      </cube-scroll>
    </div>

    <transition name="popup-slide-left">
      <div v-show="pageVisible" class="max640 page-popup top88">
        <div v-show="selectedTabs==='全部'">
          <Categories />
        </div>
        <div v-show="selectedTabs==='全国'">
          <Citys />
        </div>
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
      keyWord:'',
      pageVisible: false,
      selectedTabs: '全部',
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
      productList: [{
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
      }, {
        title: '常规赛MVP',
        introduce: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        img: 'store1.png',
        tags: ['限时特价', '新品上市', '包邮'],
        id: 11
      }, {
        title: '京东自营',
        introduce: '杜兰特不执行球员选项 将成为完全自由球员',
        img: 'store2.png',
        tags: ['限时特价', '质保赔付', '新品上市', '包邮'],
        id: 21
      }, {
        title: '周氏云商城',
        introduce: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
        img: 'store3.png',
        tags: ['限时特价', '新品上市', '不包邮'],
        id: 31
      }, {
        title: '常规赛MVP',
        introduce: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        img: 'store1.png',
        tags: ['限时特价', '新品上市', '包邮'],
        id: 12
      }, {
        title: '京东自营',
        introduce: '杜兰特不执行球员选项 将成为完全自由球员',
        img: 'store2.png',
        tags: ['限时特价', '质保赔付', '新品上市', '包邮'],
        id: 22
      }, {
        title: '周氏云商城',
        introduce: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
        img: 'store3.png',
        tags: ['限时特价', '新品上市', '不包邮'],
        id: 32
      }]
    }
  },
  methods: {
    search(keyWord) {
      console.log(keyWord)
    },
    clickHandler(label) {
      switch (label) {
        case '全部':
          if (this.selectedTabs !== '全部') {
            this.pageVisible = true
          } else {
            this.pageVisible = !this.pageVisible;
          }
          break;
        case '全国':
          if (this.selectedTabs !== '全国') {
            this.pageVisible = true
          } else {
            this.pageVisible = !this.pageVisible;
          }
          break;
        case '价格':
          this.pageVisible = false;
          break;
        case '成交笔数':
          this.pageVisible = false;
          break;
        default:
          break;
      }
    }
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
  text-align: center;
  z-index: 99;
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.icon-sort {
  position: relative;
  width: 16px;
  height: 18px;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: -2px;
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
</style>
