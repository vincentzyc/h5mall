<template>
  <footer class="footer-wrap border-teee flex flex-center">
    <ul class="flex text-center widthfull">
      <router-link class="flex-auto" to="/home" tag="li" active-class="active">
        <div class="icon home"></div>
        <h5 class="title">首页</h5>
      </router-link>
      <!-- <router-link class="flex-auto" to="/publish" tag="li" active-class="active">
        <div class="icon publish"></div>
        <h5 class="title">发布采购</h5>
      </router-link> -->
      <router-link class="flex-auto" to="/cart" tag="li" active-class="active">
        <div class="icon cart"></div>
        <h5 class="title">购物车</h5>
      </router-link>
      <router-link class="flex-auto" to="/message" tag="li" active-class="active">
        <div class="icon message"></div>
        <h5 class="title">消息</h5>
      </router-link>
      <router-link class="flex-auto" to="/me" tag="li" active-class="active">
        <div class="icon me"></div>
        <h5 class="title">我的</h5>
      </router-link>
    </ul>
  </footer>
</template>

<style lang="stylus" scoped>
.footer-wrap {
  li {
    .title {
      font-size: 12px;
      margin-top: 5px;
      color: #999;
    }

    .icon {
      width: 25px;
      height: 25px;
      margin: auto;
    }

    .icon.home {
      background: url('../assets/img/footer.png') no-repeat -5px -5px / 360px auto;
    }

    .icon.publish {
      background: url('../assets/img/footer.png') no-repeat -293px -5px / 360px auto;
    }

    .icon.cart {
      background: url('../assets/img/footer.png') no-repeat -221px -5px / 360px auto;
    }

    .icon.message {
      background: url('../assets/img/footer.png') no-repeat -76px -5px / 360px auto;
    }

    .icon.me {
      background: url('../assets/img/footer.png') no-repeat -148px -5px / 360px auto;
    }

    &.active {
      .title {
        color: #fc4d56;
      }

      .icon.home {
        background: url('../assets/img/footer.png') no-repeat -41px -5px / 360px auto;
      }

      .icon.publish {
        background: url('../assets/img/footer.png') no-repeat -329px -5px / 360px auto;
      }

      .icon.cart {
        background: url('../assets/img/footer.png') no-repeat -257px -5px / 360px auto;
      }

      .icon.message {
        background: url('../assets/img/footer.png') no-repeat -112px -5px / 360px auto;
      }

      .icon.me {
        background: url('../assets/img/footer.png') no-repeat -184px -5px / 360px auto;
      }
    }
  }
}
</style>
