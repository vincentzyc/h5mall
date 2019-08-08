import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: '/home'
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/home")
    },
    {
      path: "/publish",
      name: "publish",
      component: () => import("./views/publish")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("./views/cart")
    },
    {
      path: "/message",
      name: "message",
      component: () => import("./views/message")
    },
    {
      path: "/me",
      name: "me",
      component: () => import("./views/me")
    },
    {
      path: "/me/login",
      name: "login",
      component: () => import("./views/me/login")
    },
    {
      path: "/me/register",
      name: "register",
      component: () => import("./views/me/register")
    },
    {
      path: "/me/forgetpsw",
      name: "forgetpsw",
      component: () => import("./views/me/forget-password")
    },
    {
      path: "/me/likestore",
      name: "likeStore",
      component: () => import("./views/me/like-store")
    },
    {
      path: "/me/setting",
      name: "setting",
      component: () => import("./views/me/setting")
    },
    {
      path: "/me/setting/suggest",
      name: "suggest",
      component: () => import("./views/me/setting/suggest")
    },
    {
      path: "/me/setting/about",
      name: "about",
      component: () => import("./views/me/setting/about")
    },
    {
      path: "/me/setting/changepsw",
      name: "changepsw",
      component: () => import("./views/me/setting/change-password")
    },
    {
      path: "/products/search",
      name: "productsSearch",
      component: () => import("./views/products/search")
    },
    {
      path: "/products/detail",
      name: "productsDetail",
      component: () => import("./views/products/detail")
    },
    {
      path: "/store/detail",
      name: "storeDetail",
      component: () => import("./views/store/detail")
    },
    {
      path: "/home/search",
      name: "homeSearch",
      component: () => import("./views/search")
    },
    {
      path: "/iframe/:url",
      name: "iframe",
      component: () => import("./views/iframe")
    }
  ]
});
