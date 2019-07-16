<template>
  <div class="heightfull">
    <SideNav :data="address" panelSlot>
      <template v-slot="{selectNav}">
        <ul class="pd10">
          <li class="panel-item">
            <cube-checkbox v-model="checked" position="right">全国</cube-checkbox>
          </li>
          <li class="panel-item" @click="selectItem=selectNav.label" :class="{active:selectItem===selectNav.label}" v-show="selectNav.label!=='全国'">全部</li>
          <li
            v-for="item in selectNav.items"
            :key="item"
            class="textover panel-item"
            @click="selectItem=item"
            :class="{active:selectItem===item}"
          >{{item}}</li>
        </ul>
      </template>
    </SideNav>
  </div>
</template>
<script>
import SideNav from '@/components/side-nav';
const address = [{
  label: "全国",
  items: []
},
{
  label: "北京市",
  items: ['北京城区']
},
{
  label: "广东省",
  items: ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮']
},
{
  label: "上海市",
  items: ['上海城区']
},
{
  label: "天津市",
  items: ['天津城区']
},
{
  label: "重庆市",
  items: ['重庆城区']
}
]
export default {
  components: {
    SideNav
  },
  data() {
    return {
      checked: false,
      address: address,
      selectItem: ''
    }
  },
  methods: {

  }
}
</script>


