import Vue from "vue";
import router from "@/router"
import Crypto from "@/utils/crypto.js"
import Common from './common.js';
import Product from './product.js';
import Store from './store.js';
import Order from './order.js';
import Message from './message.js';
import Publish from './publish.js';
import Pay from './pay.js';
import { clearUser } from '@/service/user.js'

const vm = new Vue()

const createInterface = arr => {
  let Interface = {};
  arr.forEach(v => {
    Interface[v.name] = param => {
      return new Promise(reslove => {
        Api.axiosPost(v.url, param, v.backType, v.encrypt).then(res => reslove(res))
      })
    }
  });
  return Interface
}

const Api = {
  Common: createInterface(Common),
  Product: createInterface(Product),
  Store: createInterface(Store),
  Order: createInterface(Order),
  Message: createInterface(Message),
  Publish: createInterface(Publish),
  Pay: createInterface(Pay),
  uploadUrl() {
    return "/appfileupload/img"
  },
  env() {
    if (process.env.NODE_ENV === "development" || window.location.href.includes('192.168')) return "development";
    if (window.location.href.includes('test-mgr')) return 'test';
    return 'production'
  },
  getWechatCode(appid,redirect_uri){
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_base#wechat_redirect`
  },
  axiosPost(url, data, backType = 'success', encrypt = true) {
    if (encrypt) {
      var { key, iv, ...encryptData } = Crypto.encrypt(data);
      data = encryptData;
    }
    return new Promise(resolve => {
      vm.$axios.post(url, data).then(res => {
        if (res.status !== 200) {
          console.log('请求失败', res);
          if (backType === 'getError') resolve({ error: true });
          vm.$loading.close();
          return vm.$createDialog({ content: res.message || '网络繁忙' }).show();
        }
        let backData = '';
        if (encrypt) {
          try {
            backData = JSON.parse(Crypto.decrypt(res.data, key, iv));
          } catch (error) {
            console.log('------------JSON.parse fail------------');
            vm.$loading.close();
            return vm.$createDialog({ content: '数据异常' }).show();
          }
        } else {
          backData = res.data;
        }
        // console.log(backData);
        let { code, message, ...result } = backData;
        if (backType === 'allData') return resolve(backData);
        if (code === '0') return resolve(result || '');
        if (code === '-1') {
          return vm.$createDialog({
            content: message || '登录信息已过期，请重新登录',
            onConfirm: () => {
              clearUser();
              if (!window.location.hash.includes('/me/login')) {
                router.push('/me/login?redirect=' + window.location.hash.replace('#', ''))
              }
            }
          }).show();
        }
        if (backType === 'getError') return resolve({ error: true });
        vm.$createToast({
          txt: message || "服务器异常，请稍后再试",
          type: "txt",
          time: 2000
        }).show()
        vm.$loading.close();
      }).catch(error => {
        console.log(error);
        if (backType === 'getError') resolve({ error: true });
        vm.$loading.close();
        vm.$createDialog({ content: '网络异常' }).show();
      });
    })
  },
  async wxConfigInit() {
    let res = await this.Pay.getWxShareInfo({ url: window.location.href.split('#')[0] });
    vm.BUS.setWxConfig(res);
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature,// 必填，签名
      jsApiList: [
        'onMenuShareTimeline', // 分享到朋友圈接口
        'onMenuShareAppMessage', //  分享到朋友接口
        'onMenuShareQQ', // 分享到QQ接口
        'onMenuShareWeibo', // 分享到微博接口
        'updateTimelineShareData',
        'updateAppMessageShareData'
      ] // 必填，需要使用的JS接口列表
    });
    if (vm.BUS.shareData) {
      this.wxShare(vm.BUS.shareData)
      vm.BUS.setShareData('')
    }
  },
  async wxShare(shareData) {
    // 通用分享信息
    if (!shareData) {
      shareData = {
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享显示的缩略图地址
        link: window.location.href,
        desc: '百度一下，你就知道', // 分享描述
        title: '云忆' // 分享标题
      }
    }
    if (vm.BUS.wxConfig) {
      window.wx.ready(function () {
        window.wx.onMenuShareWeibo(shareData)
        window.wx.onMenuShareTimeline(shareData)
        window.wx.onMenuShareQQ(shareData)
        window.wx.onMenuShareAppMessage(shareData)
        window.wx.updateTimelineShareData(shareData)
        window.wx.updateAppMessageShareData(shareData)
      })
    } else {
      vm.BUS.setShareData(shareData)
    }
  }
}

export default Api