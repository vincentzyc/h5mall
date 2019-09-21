<template>
  <base-page>
    <common-header title="我关注的店铺"></common-header>
    <cube-scroll ref="scroll">
      <div class="mg-t10 bgfff" v-if="items.length>0">
        <ul>
          <li v-for="item in items" :key="item.id" class="flex list-item">
            <img :src="item.img||requrie('@/assets/img/logo.png')" alt="店铺logo" />
            <div class="main flex-auto">
              <h3>{{item.name}}</h3>
              <p class="textover1">{{item.type_name}}</p>
            </div>
            <div class="flex flex-center flex-none" @click="dislike(item.id)">
              <div class="dislike">取消关注</div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="mg20 pd20 text-center">您还没有关注的店铺哦~</div>
    </cube-scroll>
  </base-page>
</template>

<script>
import { getUser, cancelShopCollection } from "@/service/user"
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    dislike(id) {
      this.$createDialog({
        type: 'confirm',
        content: '确定取消关注该店铺？',
        onConfirm: async () => {
          let res = await cancelShopCollection(id);
          if (res) this.collectionList()
        }
      }).show()
    },
    async collectionList() {
      let userInfo = await getUser(this.$route.fullPath);
      let param = {
        token: userInfo.token,
        user_id: userInfo.id
      }
      let res = await this.$api.Store.collectionList(param);
      this.items = res.shops || []
    }
  },
  created() {
    this.collectionList()
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.list-item {
  padding: 15px 10px;
  border-bottom: 1px solid #eee;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .main {
    h3 {
      line-height: 30px;
      font-size: 16px;
    }

    p {
      color: #999;
    }
  }

  .dislike {
    border: 1px solid $color-theme;
    color: $color-theme;
    padding: 10px;
    font-size: 12px;
    border-radius: 10px;

    &:active {
      background: $color-theme-light;
    }
  }
}
</style>
