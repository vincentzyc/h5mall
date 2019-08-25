// import Vue from "vue";
// import router from "@/router"

// const vm = new Vue()
/**
 * 微信支付
 */
export function wxpay() {
  function onBridgeReady(){
    window.WeixinJSBridge.invoke(
       'getBrandWCPayRequest', {
          "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
          "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
          "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
          "package":"prepay_id=u802345jgfjsdfgsdg888",     
          "signType":"MD5",         //微信签名方式：     
          "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
       },
       function(res){
       if(res.err_msg == "get_brand_wcpay_request:ok" ){
       // 使用以上方式判断前端返回,微信团队郑重提示：
             //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
       } 
    }); 
 }
 if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
 }else{
    onBridgeReady();
 }
  // return new Promise(resolve => {
  //   if (!vm.USERINFO) {
  //     let userInfo = vm.$util.getLStorage('userInfo', true);
  //     if (!userInfo) return redirect ? router.replace('/me/login?redirect=' + redirect) : resolve(false);
  //     vm.USERINFO = userInfo;
  //   }
  //   return resolve(vm.USERINFO);
  // })
}
/**
   * 开始支付
   * @param payType 1-支付宝 2-微信 3-H5发起微信支付
   * @param data 当为支付宝时-支付宝支付字符串 当是微信时-微信支付所需参数
   * @returns {Promise} 支付结果
   */
  export function (payType, data) {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (payType === 1) {
        //支付宝处理
        self.setPaying(true);
        var $body = $("body");
        $body.append(data);
        reject({code: 4, data: "正在发起支付...", msg: "doing"});
      } else if (payType == 3) {//微信APP外部使用微信支付
        var obj = JSON.parse(data);
        window.location.href = obj.MWebUrl;
        // window.location.href = obj.MWebUrl + "&redirect_url=" + encodeURIComponent( window.location.href ) ;
      } else if (window['WeixinJSBridge']) {

        // alert(window.JSON.stringify(data));
        if (typeof data === "string") {
          data = window.JSON.parse(data);
        }
        if (!data['AppId']) {
          reject({code: 1, data: '支付失败！缺少支付参数！', msg: 'fail'});
          return;
        }
        self.setPaying(true);
        //微信处理
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": data.AppId, //公众号名称，由商户传入
            "timeStamp": data.Timestamp, //时间戳，自1970年以来的秒数
            "nonceStr": data.Nonce, //随机串
            "package": data.Package,
            "signType": data.SignType, //微信签名方式：
            "paySign": data.Sign //微信签名
          },
          function (res) {
            self.setPaying(false);
            if (res.err_msg === "get_brand_wcpay_request:cancel") {
              reject({code: 2, data: '您取消了支付', msg: 'fail'});
            } else if (res.err_msg === "get_brand_wcpay_request:ok") {
              resolve({code: 0, data: '支付成功！', msg: 'success'});
            } else {
              reject({code: 1, data: '支付失败！', msg: 'fail'});
            }
          }
        );
      } 
      //reject({code: 3, data: '支付端异常', msg: 'fail'});
    });
  }