<template>
  <div class="row flex flex-wrap tabs-wrap">
    <div
      v-for="(item, index) in tabs"
      :label="item.label"
      :key="item.label+index"
      class="tabs-item flex-none"
      @click="$router.push('/products/search?type='+item.label)"
    >
      <img :src="require(`@/assets/img/${item.icon}`)" alt />
      <h5>{{item.label}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [{
        label: '果蔬生鲜',
        icon: 'tab01.png'
      }, {
        label: '肉类',
        icon: 'tab02.png'
      }, {
        label: '干货坚果',
        icon: 'tab03.png'
      }, {
        label: '家乡特产',
        icon: 'tab04.png'
      }, {
        label: '速食',
        icon: 'tab05.png'
      }, {
        label: '中药补品',
        icon: 'tab06.png'
      }, {
        label: '海产',
        icon: 'tab07.png'
      }, {
        label: '花卉苗木',
        icon: 'tab08.png'
      }, {
        label: '粮油米面',
        icon: 'tab09.png'
      }, {
        label: '农作艺品',
        icon: 'tab10.png'
      }, {
        label: '更多',
        icon: 'tab11.png'
      }]
    }
  },
  methods: {
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs-wrap {
  padding: 10px 5px;
  background: #fff;

  .tabs-item {
    width: 20%;
    text-align: center;
    padding: 5px;
    margin-bottom: 5px;
    font-size: 12px;
    color: #666;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>

