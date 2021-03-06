import Vue from "vue";
import router from "@/router"

const vm = new Vue()
let payData = "", payType = ""

export default async function pay(data, type) {
  vm.$loading.open('正在支付...');
  payData = {
    user_id: data.id.toString(),
    token: data.token,
    order_id: data.order_id
  };
  payType = type;
  let payParam = ""
  switch (type) {
    case 'wx':
      payData.browser_type = vm.$util.isWechat() ? '1' : '2';
      if (payData.browser_type === '1') payData.open_id = data.openId;
      console.log("微信支付参数", payData);
      payParam = await vm.$api.Pay.wxpay(payData);
      console.log("开始微信支付", payParam);
      if (vm.$util.isWechat()) {
        wxpay(payParam.payOrder);
      } else {
        confirmPay();
        h5wxpay(payParam.payOrder.mweb_url);
      }
      break;
    case 'zfb':
      payParam = await vm.$api.Pay.alipay(payData);
      confirmPay();
      alipay(payParam.formStr)
      break;
    default:
      break;
  }
  vm.$loading.close();
}
/**
 * 微信支付
 */
function wxpay(data) {
  if (window['WeixinJSBridge']) {
    //调起微信支付
    window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
      "appId": data.appId, //公众号名称，由商户传入
      "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
      "nonceStr": data.nonceStr, //随机串
      "package": data.package,
      "signType": data.signType, //微信签名方式：
      "paySign": data.paySign //微信签名
    }, res => {
      console.log('微信支付结果',res);
      if (res.err_msg === "get_brand_wcpay_request:ok") {
        // 支付成功
        queryPay()
      } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
        // vm.$createToast({ type: 'txt', txt: '您取消了支付' });
        vm.$createDialog({ content: '您取消了支付' }).show();
        vm.$loading.close();
      } else {
        vm.$createDialog({ content: '支付失败！' }).show();
        vm.$loading.close();
      }
    })
  }
}
/**
 * 微信APP外部使用微信支付
 */
function h5wxpay(MWebUrl) {
  window.location.href = MWebUrl;
  // window.location.href = obj.MWebUrl + "&redirect_url=" + encodeURIComponent(window.location.href);
}
/**
 * 支付宝支付
 */
function alipay(data) {
  //支付宝处理
  let div = document.createElement("div");
  div.innerHTML = data;
  document.body.appendChild(div);
  document.forms[0].submit();
}
/**
 * 确认是否支付完成弹框
 */
function confirmPay() {
  setTimeout(() => {
    vm.$createDialog({
      type: 'confirm',
      content: '请确认支付是否完成',
      confirmBtn: {
        text: '已完成支付',
      },
      cancelBtn: {
        text: '继续支付',
      },
      onConfirm: () => {
        queryPay()
      },
      onCancel: () => {
        pay(payData, payType)
      }
    }).show()
  }, 300);
}
/**
 * 查询支付结果
 */
async function queryPay() {
  vm.$loading.open("正在查询支付结果");
  let res = "", checkApi = payType === 'wx' ? 'wxpayQuery' : 'alipayQuery';
  console.log("正在查询支付结果", payData);
  res = await vm.$api.Pay[checkApi](payData);
  console.log("返回支付结果", res);
  if (res.order_status !== 'SUCCESS' || res.order_status !== 'TRADE_SUCCESS') {
    setTimeout(async () => {
      res = await vm.$api.Pay[checkApi](payData);
      vm.$loading.close();
      getPayState(res.order_status);
    }, 2000);
  } else {
    vm.$loading.close();
    getPayState(res.order_status);
  }
}

function getPayState(res) {
  switch (res) {
    case "SUCCESS":  //支付成功
      return router.push('/order/payresult?res=1');
    case "NOTPAY":  //未支付
      return router.push('/order/payresult?res=0');
    case "CLOSED": //已关闭
      return router.push('/order/payresult?res=0');
    case "REFUND": //转入退款
      return router.push('/order/payresult?res=0');
    case "WAIT_BUYER_PAY": //等待卖家付款
      return router.push('/order/payresult?res=0');
    case "TRADE_CLOSED": //交易超时
      return router.push('/order/payresult?res=0');
    case "TRADE_SUCCESS": //交易成功
      return router.push('/order/payresult?res=1');
    case "TRADE_FINISHED": //交易结束
      return router.push('/order/payresult?res=0');
    default:
      break;
  }
}

/**
 * 用户余额支付
 */
// function balancepay() { }