/* eslint-disable */

// jsrsasign库通过cdn引入
// https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/8.0.12/jsrsasign-all-min.js
// jsrsasign库中的 CryptoJS.AES 加解密有问题，所以引入 crypto-js 中的 AES

const AES = require("crypto-js/aes");
const UTF8 = CryptoJS.enc.Utf8;
const SHA256 = CryptoJS.SHA256;

const LOCALIV = UTF8.parse("qwertyuiop123456");
const LOCALKEY = "asdfghjkl1234567";



export default {
  /**
   * 加密存本地
   * @param {String} data 加密字符串
   * @return 加密后转成的 base64url字符串
   */
  encryptLocal(data) {
    if (typeof data !== "string") {
      data = JSON.stringify(data);
    }
    let real_key = UTF8.parse(SHA256(LOCALKEY).toString().slice(0, 16));
    let bytes = AES.encrypt(data, real_key, {
      iv: LOCALIV,
    });
    let res = bytes.ciphertext.toString();
    return hextob64(res);
  },
  /**
   * 解密存本地
   * @param {String} data 解密字符串（base64url）
   * @return 解密后字符串
   */
  decryptLocal(data) {
    if (!data || typeof data !== "string") return '';
    let real_key = UTF8.parse(SHA256(LOCALKEY).toString().slice(0, 16));
    let bytes = AES.decrypt(data, real_key, {
      iv: LOCALIV
    });
    return bytes.toString(UTF8);
  }
}