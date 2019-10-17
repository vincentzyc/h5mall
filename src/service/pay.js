import Vue from "vue";
import router from "@/router"

const vm = new Vue()
let payData = "", payType = ""

export default async function pay(data, type) {
  vm.$loading.open('正在支付...');
  payData = data;
  payType = type;
  let payParam = ""
  switch (type) {
    case 'wx':
      data.browser_type = vm.$util.isWechat() ? '1' : '2';
      console.log("获取微信支付参数", data);
      payParam = await vm.$api.Pay.wxpay(data);
      console.log("开始微信支付", payParam);
      if (vm.$util.isWechat()) {
        let payres = await wxpay(payParam.payOrder);
        payres === true ? queryPay() : vm.$createToast({ type: 'txt', txt: payres });
      } else {
        confirmPay();
        h5wxpay(payParam.payOrder.mweb_url);
      }
      break;
    case 'zfb':
      payParam = await vm.$api.Pay.alipay(data);
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
  console.log("正在查询支付结果",payData);
  res = await vm.$api.Pay[checkApi](payData);
  console.log("返回支付结果",res);
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