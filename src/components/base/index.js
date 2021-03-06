import BasePage from './base-page'; //页面组件
import Loading from "./loading"; // loading
import InputItem from "./input-item"; // 可格式化输入框组件
import CommonHeader from "./common-header"; // 公共头部组件
import PagePopup from "./page-popup"; // 全屏页面组件

const version = '1.0';
const install = function(Vue) {

	if (install.installed) return;

	Vue.component(BasePage.name, BasePage); //注册组件
	Vue.component(InputItem.name, InputItem); //注册组件
	Vue.component(CommonHeader.name, CommonHeader); //注册组件
	Vue.component(PagePopup.name, PagePopup); //注册组件

	Vue.$loading = Vue.prototype.$loading = Loading; //注册全局方法组件

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	version
};

/**
 * 使用方法：
 * 1：将此文件夹复制到项目中
 * 2：在mainjs里引入 
 *    import BaseComponents from "此文件夹路径";
 *    Vue.use(BaseComponents)
 * 3：各组件使用方法请查看各组件的.vue文件的注释
 */