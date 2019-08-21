import Vue from "vue";
import router from "@/router"
import Crypto from "@/utils/crypto.js"
import Common from './common.js';
import Product from './product.js';
import Store from './store.js';
import Order from './order.js';
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
  uploadUrl() {
    return "/appfileupload/img"
  },
  env() {
    if (process.env.NODE_ENV === "development" || window.location.href.includes('192.168')) return "development";
    if (window.location.href.includes('test-mgr')) return 'test';
    return 'production'
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
        let { code, msg, ...result } = backData;
        if (backType === 'allData') return resolve(backData);
        if (code === '1') return resolve(result || '');
        if (code === '-1') {
          return vm.$createDialog({
            content: msg || '登录信息已过期，请重新登录',
            onConfirm: () => {
              clearUser();
              router.replace('/me/login?redirect=' + window.location.hash.replace('#', ''))
            }
          }).show();
        }
        if (backType === 'getError') return resolve({ error: true });
        vm.$createToast({
          txt: msg || "服务器异常，请稍后再试",
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
  }
}

export default Api