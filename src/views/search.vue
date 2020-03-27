<template>
  <base-page>
    <header class="header-bg">
      <div class="flex fs14 cfff">
        <div class="pd-r10 pd-l10 minwidth50 textover">
          <i class="cubeic-back" @click="$router.back()"></i>
        </div>
        <div class="search-wrap flex flex-auto flex-center textover">
          <div class="search-input flex flex-auto">
            <i class="cubeic-search"></i>
            <input type="text" placeholder="搜索" class="flex-auto" v-model="param.keywords" />
          </div>
        </div>
        <div class="pd-r10 pd-l10 minwidth50 textover" @click="search(param.keywords)">搜索</div>
      </div>
    </header>
    <div class="heightfull pd-t10">
      <ProductList :items="productList" v-if="productList.length>0" />
      <div v-else-if="searchNull">
        <p class="text-center lh30 c999 mg-t20">暂无符合条件的商品</p>
      </div>
      <div class="heightfull bgfff pd10" v-else>
        <div class="flex">
          <p class="flex-auto">历史搜索</p>
          <i class="cubeic-delete c999 fs16" @click="deleteHistory()" v-if="searchList.length>0"></i>
        </div>
        <div class="row mg-t15" v-if="searchList.length>0">
          <ul class="clearfix">
            <li v-for="item in searchList" :key="item" class="search-tag" @click="clickHistory(item)">{{item}}</li>
          </ul>
        </div>
        <p class="text-center lh30 c999 mg-t20" v-else>暂无搜索历史</p>
      </div>
    </div>
  </base-page>
</template>

<script>
import ProductList from '@/components/product-list-s.vue';
export default {
  components: {
    ProductList
  },
  data() {
    return {
      param: {
        keywords: '',
        pageNum: '1'
      },
      searchNull: false,
      searchList: [],
      productList: []
    }
  },
  watch: {
    'param.keywords'(n) {
      if (n.length === 0) this.searchNull = false;
    }
  },
  methods: {
    setDefaultKey() {
      let q = this.$route.query.key;
      if (q) {
        this.param.keywords = q;
        this.search(q)
      }
    },
    saveHistory(keyWord) {
      if (keyWord === '') return;
      let arr = this.$util.getLStorage('searchHistory') || [];
      arr.push(keyWord);
      this.searchList = [...new Set(arr)];
      this.$util.setLStorage('searchHistory', this.searchList)
    },
    async search(keyWord) {
      if (keyWord) {
        let res = await this.$api.Product.productSearch(this.param);
        this.productList = res;
        this.searchNull = res.length > 0 ? false : true;
        this.saveHistory(keyWord);
      } else {
        this.productList = []
      }
    },
    clickHistory(keyWord) {
      this.param.keywords = keyWord;
      this.search(keyWord);
    },
    deleteHistory() {
      this.$createDialog({
        type: 'confirm',
        content: '是否确定删除所有搜索历史',
        onConfirm: () => {
          window.localStorage.removeItem('searchHistory');
          this.searchList = [];
          this.toast = this.$createToast({
            txt: '删除成功',
            type: 'txt'
          }).show()
        },
        onCancel: () => { }
      }).show()
    }
  },
  created() {
    this.searchList = this.$util.getLStorage('searchHistory') || [];
    this.setDefaultKey()
  }
}
</script>