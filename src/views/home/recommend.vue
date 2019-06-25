<template>
  <div class="recommend-wrap">
    <div class="flex lh30 border-beee pd5 pd-l10 pd-r10">
      <h5 class="flex-auto c333">为您推荐</h5>
      <div class="c999 fs12">
        <span>查看全部</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <div class="list">
      <div v-for="(item, index) in tabs" :label="item.label" :key="item.label+index" class="flex item">
        <img :src="require(`@/assets/img/${item.img}`)" alt class="item-img">
        <div class="item-content mg-l10 flex-auto">
          <h4 class="bold txtover">{{item.title}}</h4>
          <p class="fs12 lh24 c999 txtover">{{item.introduce}}</p>
          <div class="tag">
            <span>限时特价</span>
            <span>新品上市</span>
            <span>包邮</span>
          </div>
          <div class="price lh30 ctheme">￥33</div>
          <div class="flex fs12">
            <div class="adress flex-auto">
              <i class="cubeic-location"></i>
              <span class="c666">广东省广州市</span>
            </div>
            <span class="sale">已售：3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [{
        title: '京东自营字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        introduce: '111 1111 111 字母哥力压哈登当选常规赛MVP泪洒颁奖礼',
        img: 'store1.png'
      }, {
        title: '竹海李氏山货',
        introduce: '222 222 22',
        img: 'store2.png'
      }, {
        title: '周氏野货',
        introduce: '333 33 333 3',
        img: 'store3.png'
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
.recommend-wrap {
  background: #fff;
  margin-top: 15px;

  .list {
    .item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .item-img {
      width: 100px;
      height: 100px;
    }

    .item-content {
      overflow: hidden;
    }

    .adress i {
      color: #55b0e0;
      margin-right:2px;
    }

    .sale {
      color: #ff8b1c;
    }
  }
}
</style>

