import Vue from "vue";
import "./cube-ui";
import "./plugins/axios";
import VueLazyload from 'vue-lazyload'
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.css";
import "./assets/css/main.styl"
import Api from './api';
import Util from './utils';
import BaseComponents from "./components/base"; //导入组件库

Vue.use(VueLazyload, {
  error: require('./assets/img/error.png')
  // loading: 'dist/loading.gif',
})

Vue.use(BaseComponents);

Vue.prototype.$api = Api;
Vue.prototype.$util = Util;

Vue.prototype.BASE_URL = process.env.BASE_URL;

window.EVENTBUS = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
