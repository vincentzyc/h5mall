<template>
  <div class="heightfull">
    <SideNav>
      <template slot="navSlot">
        <ul v-if="categories.length>0">
          <li
            v-for="item in categories"
            :key="item.name"
            @click="handleNav(item)"
            class="textover"
            :class="{active:selectNav.name===item.name}"
          >{{item.name}}</li>
        </ul>
      </template>
      <template slot="panelSlot">
        <ul class="pd10 text-left" v-if="selectNav">
          <li class="panel-item width96" @click="selectItem=selectNav.name" :class="{active:selectItem===selectNav.name}">全部</li>
          <li
            v-for="item in selectNav.classificationTwo"
            :key="item.classifyName"
            class="textover panel-item"
            @click="selectItem=item.classifyName"
            :class="{active:selectItem.classifyName===item.classifyName}"
          >{{item.classifyName}}</li>
        </ul>
      </template>
    </SideNav>
  </div>
</template>
<script>
import SideNav from './side-nav';
export default {
  components: {
    SideNav
  },
  data() {
    return {
      categories: [],
      selectNav: '',
      selectItem: ''
    }
  },
  methods: {
    handleNav(item) {
      this.selectNav = item;
      this.$emit('setCategories', item.name)
    },
    setNav(name) {
      let narr = this.categories.filter(v => v.name === name);
      if (narr.length > 0) this.selectNav = narr[0];
      this.$emit('setCategories', name)
    }
  },
  async created() {
    let res = await this.$api.Product.productClassify('');
    this.categories = res.classify;
    this.categories.unshift({
      classificationTwo: [],
      name: "全部"
    })
    this.selectNav = this.categories[0];
    this.setNav(this.$route.query.type);
  }
}
</script>


