<template>
  <footer class="footer-wrap">
    <ul class="flex text-center">
      <router-link class="flex-auto" to="aaa" tag="li" active-class="active">
        <div class="icon home"></div>
        <h5>首页</h5>
      </router-link>
      <router-link class="flex-auto" to="bbb" tag="li" active-class="active">
        <div class="icon publish"></div>
        <h5>发布采购</h5>
      </router-link>
      <router-link class="flex-auto" to="ccc" tag="li" active-class="active">
        <div class="icon cart"></div>
        <h5>购物车</h5>
      </router-link>
      <router-link class="flex-auto" to="ddd" tag="li" active-class="active">
        <div class="icon message"></div>
        <h5>消息</h5>
      </router-link>
      <router-link class="flex-auto" to="eee" tag="li" active-class="active">
        <div class="icon me"></div>
        <h5>我的</h5>
      </router-link>
    </ul>
  </footer>
</template>
