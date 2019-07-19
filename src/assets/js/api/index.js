import Vue from "vue";
import Crypto from "../crypto.js"
import Common from './common.js';
import Product from './product.js';

const vm = new Vue()

const createInterface = arr => {
  let Interface = {};
  arr.forEach(v => {
    Interface[v.name] = param => {
      return new Promise(reslove => {
        Api.axiosPost(v.url, param, v.backData).then(res => reslove(res))
      })
    }
  });
  return Interface
}

const Api = {
  Common: createInterface(Common),
  Product: createInterface(Product),
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
  axiosPost(url, data, backData) {
    let { key, iv, ...encryptData } = Crypto.encrypt(data);
    return new Promise(resolve => {
      vm.$axios.post(url, encryptData).then(res => {
        if (res.status !== 200) {
          console.log('请求失败', res);
          if (backData === 'getError') resolve({ error: true });
          return vm.$createDialog({ content: res.message || '网络繁忙' }).show();
        }
        let decryptData = '';
        try {
          decryptData = JSON.parse(Crypto.decrypt(res.data, key, iv));
        } catch (error) {
          console.log('------------JSON.parse fail------------');
          return vm.$createDialog({ content: '数据异常' }).show();
        }
        let { code, msg, ...result } = decryptData;
        if (backData === 'allData') return resolve(decryptData);
        if (code === '1') return resolve(result || '');
        if (backData === 'getError') resolve({ error: true });
        vm.$createDialog({ content: msg || '服务器异常' }).show();
      }).catch(error => {
        console.log(error);
        if (backData === 'getError') resolve({ error: true });
        vm.$createDialog({ content: '网络异常' }).show();
      });
    })
  }
}

export default Api