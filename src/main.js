import Vue from "vue";
import "./cube-ui";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.css";
import "./assets/css/main.styl"
import "./assets/js";
import BaseComponents from "./components/base"; //导入组件库

Vue.use(BaseComponents);

Vue.config.productionTip = false;
Vue.prototype.BASE_URL = process.env.BASE_URL;


new Vue({
	router,
	render: h => h(App)
}).$mount("#app");