<template>
  <div>
    <SideNav :data="address" />
  </div>
</template>
<script>
import SideNav from '@/components/side-nav';
const address = [
  {
    "label": "北京",
    "items": ['北京']
  },
  {
    "label": "广东省",
    "items": ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮']
  },
  {
    "label": "上海",
    "items": ['上海']
  },
  {
    "label": "天津",
    "items": ['天津']
  },
  {
    "label": "重庆",
    "items": ['重庆']
  }
]
export default {
  components: {
    SideNav
  },
  data() {
    return {
      address: address
    }
  }
}
</script>
