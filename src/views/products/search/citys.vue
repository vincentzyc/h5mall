<template>
  <div class="heightfull">
    <SideNav>
      <template slot="navSlot">
        <ul v-if="address.length>0">
          <li
            v-for="item in address"
            :key="item.province"
            @click="handleNav(item)"
            class="textover"
            :class="{active:selectNav.province===item.province}"
          >{{item.province}}</li>
        </ul>
      </template>
      <template slot="panelSlot">
        <ul class="pd10" v-if="selectNav">
          <li class="panel-item" v-if="selectNav.province==='全国'">
            <cube-checkbox v-model="checked" position="right" @input="selectAll">全国</cube-checkbox>
          </li>
          <li class="panel-item" @click="selectCity(selectNav.province)" :class="{active:selectItem===selectNav.province}" v-else>全部</li>
          <li
            v-for="item in selectNav.citys"
            :key="item.citys"
            class="textover panel-item"
            @click="selectCity(item)"
            :class="{active:selectItem===item}"
          >{{item.city}}</li>
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
      checked: false,
      address: [],
      selectNav: '',
      selectItem: ''
    }
  },
  methods: {
    selectAll(checked) {
      if (checked) this.$emit('setCitys', { province: this.selectNav.province })
    },
    handleNav(item) {
      this.selectNav = item;
      this.$emit('setCitys', item.province)
    },
    selectCity(item) {
      this.selectItem = item;
      this.$emit('setCitys', { province: this.selectNav.province || '', city: item.city || '' })
    }
  },
  async created() {
    let data = { level: 1 };
    let res = await this.$api.Common.getRegionAll(data);
    this.address = res.region;
    this.address.unshift({
      citys: [],
      province: "全国"
    });
    this.selectNav = this.address[0]
  }
}
</script>


