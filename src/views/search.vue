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
            <input type="text" placeholder="搜索" class="flex-auto" v-model="keyWord" />
          </div>
        </div>
        <div class="pd-r10 pd-l10 minwidth50 textover" @click="search(keyWord)">搜索</div>
      </div>
    </header>
    <div class="heightfull pd-t10">
      <ProductList :items="productList" v-if="productList.length>0" />
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
      keyWord: '',
      searchList: [],
      productList: []
    }
  },
  methods: {
    saveHistory(keyWord) {
      if (keyWord === '') return;
      let arr = this.$util.getLocalStorage('searchHistory') || [];
      arr.push(keyWord);
      this.searchList = [...new Set(arr)];
      this.$util.setLocalStorage('searchHistory', this.searchList)
    },
    search(keyWord) {
      console.log(keyWord);
      this.saveHistory(keyWord);
      if (keyWord) {
        this.productList = [{
          title: '字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
          img: 'store1.png',
          id: 1
        }, {
          title: '杜兰特成为完全自由球员加盟',
          img: 'store2.png',
          id: 2
        }, {
          title: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
          img: 'store3.png',
          id: 3
        }, {
          title: '杜兰特成为完全自由球员加盟',
          img: 'store2.png',
          id: 4
        }, {
          title: 'NBA正式讨论减少常规赛场次 考虑增设季中冠军杯',
          img: 'store3.png',
          id: 5
        }]
      } else {
        this.productList = []
      }
    },
    clickHistory(keyWord) {
      this.keyWord = keyWord;
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
    this.searchList = this.$util.getLocalStorage('searchHistory') || [];
  }
}
</script>