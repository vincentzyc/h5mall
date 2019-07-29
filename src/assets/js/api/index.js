import Vue from "vue";
import Crypto from "../crypto.js"
import Common from './common.js';
import Product from './product.js';
import Store from './store.js';

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
  Store:createInterface(Store),
  env() {
    if (process.env.NODE_ENV === "development" || window.location.href.includes('192.168')) return "development";
    if (window.location.href.includes('test-mgr')) return 'test';
    return 'production'
  },
  baseUrl() {
    if (this.env() === "development") return "http://192.168.xxx.xxx:xxxx/";
    if (this.env() === 'test') return "http://test.xxx.com/";
    return "http://xxx.com/";
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
        let { code, msg, ...result } = backData;
        if (backType === 'allData') return resolve(backData);
        if (code === '1') return resolve(result || '');
        if (backType === 'getError') resolve({ error: true });
        vm.$loading.close();
        vm.$createDialog({ content: msg || '服务器异常' }).show();
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