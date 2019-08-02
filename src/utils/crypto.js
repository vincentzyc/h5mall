/* eslint-disable */

// jsrsasign库通过cdn引入
// https://cdnjs.cloudflare.com/ajax/libs/jsrsasign/8.0.12/jsrsasign-all-min.js
// jsrsasign库中的 CryptoJS.AES 加解密有问题，所以引入 crypto-js 中的 AES

const AES = require("crypto-js/aes");
const UTF8 = CryptoJS.enc.Utf8;
const SHA256 = CryptoJS.SHA256;

const LOCALIV = UTF8.parse("qwertyuiop123456");
const LOCALKEY = "asdfghjkl1234567";

const channelNo = "00000001";
const DEFAULT_AESKEY = "zhangnong!@#                    ";

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
  },
  /**
   * rsa加密
   * @param {String} data 加密字符串
   * @return 加密后转成的 base64字符串
   */
  rsaEncrypt(data) {
    if (typeof data !== 'string') data = data.toString();
    let publickKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzDN5MfZu1naBuSt7+l3cpa7IIspsX+Xebq16JDZPaCa+Nihr5TacNJ2BeM2zGVBwPGe8lwqGLFnaHijsHGIilDSRryS0di96srntChZiMS4D0NTSy3UTK+H6c8GZ/9KQy5wR7EtR3lcs4WOz9ggsqKWYQsgB593MngfvwoyE1TLGUjdUtbmLHCQJlLNIhaPkuz1DIyJFFoTbEQK/L5vsq/NkB+IPnP429zrqWI/F4GM6W6u20KDtt5wc7igVD0vy36lqnmehIWj4eWklRUvOo5WwBV0DIJ9GWCFkKHXspUp1PByZedHs/KgDjEbTcQp0abWj/DlA/SptQp/JuC73sQIDAQAB';
    let pub = KEYUTIL.getKey("-----BEGIN PUBLIC KEY-----" + publickKey + "-----END PUBLIC KEY-----");
    let enc = KJUR.crypto.Cipher.encrypt(data, pub);
    let rsaStr = hextob64u(enc);
    return rsaStr
  },
  /**
   * 接口加密
   * @param {String,Object} data 加密数据
   * @return 加密后转成的 base64字符串
   */
  encrypt(data) {
    let jsonData = JSON.stringify(data);
    let aesKey = SHA256(channelNo + jsonData).toString().slice(7, 39);
    let aesKey_utf8 = UTF8.parse(aesKey);
    let iv = aesKey.toString().slice(0, 16);
    let iv_utf8 = UTF8.parse(iv);
    let aesObj = AES.encrypt(jsonData, aesKey_utf8, {
      iv: iv_utf8
    });
    let aesRes = aesObj.ciphertext.toString();
    let encryptData = hextob64u(aesRes);
    let encryptKey = this.rsaEncrypt(aesKey);
    return {
      iv: iv,
      key: aesKey,
      channelNo: channelNo,
      encryptData: encryptData,
      encryptKey: encryptKey
    }
  },
  /**
   * 接口解密
   * @param {String} data 解密字符串
   * @param {String} key 解密key
   * @param {String} iv 解密iv
   */
  decrypt(data, key, iv) {
    if (typeof data !== 'string') return '';
    if (typeof key !== 'string' || key.length !== 32) return '';
    if (typeof iv !== 'string' || iv.length !== 16) return '';
    let real_key = UTF8.parse(key), real_iv = UTF8.parse(iv), bytes = '';
    try {
      bytes = AES.decrypt(data, real_key, {
        iv: real_iv
      });
    } catch (error1) {
      console.log('----------第一次解密失败---------');
      console.log(error1);
      try {
        bytes = AES.decrypt(data, UTF8.parse(DEFAULT_AESKEY), {
          iv: real_iv
        });
      } catch (error2) {
        console.log('----------第二次解密失败---------');
        console.log(error2);
        return '';
      }
    }
    return bytes.toString(UTF8);
  }
}