// import Vue from "vue";
// import router from "@/router"

// const vm = new Vue()

export default {
	/**
	 * 微信支付
	 */
	wxpay(data) {
		return new Promise(resolve => {
			if (window['WeixinJSBridge']) {
				// alert(window.JSON.stringify(data));
				if (typeof data === "string") data = window.JSON.parse(data);
				if (!data['AppId']) return resolve('支付失败！缺少支付参数！');
				//微信处理
				window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": data.AppId, //公众号名称，由商户传入
					"timeStamp": data.Timestamp, //时间戳，自1970年以来的秒数
					"nonceStr": data.Nonce, //随机串
					"package": data.Package,
					"signType": data.SignType, //微信签名方式：
					"paySign": data.Sign //微信签名
				}, res => {
					if (res.err_msg === "get_brand_wcpay_request:ok") {
						return resolve(true);
					} else if (res.err_msg === "get_brand_wcpay_request:cancel") {
						return resolve('您取消了支付');
					} else {
						return resolve('支付失败！');
					}
				})
			}
		})
	},
	/**
	 * 微信APP外部使用微信支付
	 */
	h5wxpay(data) {
		let obj = JSON.parse(data);
		window.location.href = obj.MWebUrl;
		// window.location.href = obj.MWebUrl + "&redirect_url=" + encodeURIComponent(window.location.href);
	},
	/**
	 * 支付宝支付
	 */
	alipay(data) {
		//支付宝处理
		let div = document.createElement("div");
		div.innerHTML = data;
		document.body.appendChild(div);
		document.forms[0].submit();
	},
	/**
	 * 用户余额支付
	 */
	balancepay() {}
}