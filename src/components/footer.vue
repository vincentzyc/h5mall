<template>
  <footer class="footer-wrap flex flex-center">
    <ul class="flex text-center widthfull">
      <router-link class="flex-auto" to="/home" tag="li" active-class="active">
        <div class="icon home"></div>
        <h5>首页</h5>
      </router-link>
      <router-link class="flex-auto" to="/publish" tag="li" active-class="active">
        <div class="icon publish"></div>
        <h5>发布采购</h5>
      </router-link>
      <router-link class="flex-auto" to="/cart" tag="li" active-class="active">
        <div class="icon cart"></div>
        <h5>购物车</h5>
      </router-link>
      <router-link class="flex-auto" to="/message" tag="li" active-class="active">
        <div class="icon message"></div>
        <h5>消息</h5>
      </router-link>
      <router-link class="flex-auto" to="/me" tag="li" active-class="active">
        <div class="icon me"></div>
        <h5>我的</h5>
      </router-link>
    </ul>
  </footer>
</template>
