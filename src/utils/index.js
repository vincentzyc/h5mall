import Crypto from "./crypto.js"
import router from "@/router"

export default {
  /**
   * 获取数据类型
   * @param value 需要判断的值
   */
  getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  },
  /**
   * 判断是否为空
   * @param str 需要判断的值
   */
  isNull(str) {
    if (!str || str === "" || str === null || str === undefined) return true;
    return false;
  },
	/**
	 * 设置cookie
	 * @param key  key
	 * @param value 值
	 * @param time  保存时间（天）
	 */
  setCookie(key, value, time) {
    var cur = new Date();
    cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (time ? cur.toGMTString() : '');
  },
  getCookie(key) {
    var data = document.cookie;
    var startIndex = data.indexOf(key + '=');
    if (startIndex > -1) {
      startIndex = startIndex + key.length + 1;
      var endIndex = data.indexOf(';', startIndex);
      endIndex = endIndex < 0 ? data.length : endIndex;
      return decodeURIComponent(data.substring(startIndex, endIndex));
    } else {
      return '';
    }
  },
  delCookie(key) {
    var data = this.getCookie(key);
    if (data !== false) this.setCookie(key, data, -1);
  },
	/**
     *
     * @param key key
     * @param value value
     * @param encode 是否加密存储
     */
  setSStorage(key, value, encode) {
    let str = window.JSON.stringify(value);
    if (encode) {
      str = Crypto.encryptLocal(str);
    }
    window.sessionStorage.setItem(key, str);
  },
  getSStorage(key, decode) {
    var str = "";
    str = window.sessionStorage.getItem(key);
    if (!str) return "";
    if (decode) {
      str = Crypto.decryptLocal(str);
    }
    try {
      return window.JSON.parse(str);
    } catch (error) {
      window.sessionStorage.removeItem(key);
      window.location.reload();
    }
  },
  setLStorage(key, value, encode) {
    let str = window.JSON.stringify(value);
    if (encode) {
      str = Crypto.encryptLocal(str);
    }
    window.localStorage.setItem(key, str);
  },
  getLStorage(key, decode) {
    var str = "";
    str = window.localStorage.getItem(key);
    if (!str) return "";
    try {
      if (decode) str = Crypto.decryptLocal(str);
      return window.JSON.parse(str);
    } catch (error) {
      window.localStorage.removeItem(key);
      window.location.reload();
    }
  },
	/**
	 * 获取url参数值
	 * @param name  name
	 */
  getUrlParam(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&|^#]*)");
    var l = window.location.href;
    var i = l.indexOf("?");
    if (i < 0) return null;
    var str = l.slice(i + 1, l.length);
    if (str) {
      var r = str.match(reg);
      if (r) {
        return decodeURIComponent(r[2]);
      }
    }
    return null;
  },
	/**
	 * 判断Android还是iOS
	 */
  // checkDevice() {
  // 	let u = navigator.userAgent;
  // 	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  // 	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  // 	if (isAndroid) {
  // 		return 'Android';
  // 	} else if (isiOS) {
  // 		return 'iOS';
  // 	} else {
  // 		return 'others';
  // 	}
  // },
  /**
	 * 判断是否Android或者iOS嵌入
	 */
  platform() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('zhangnongnetAndroid') > -1; //Android嵌入
    let isiOS = u.indexOf('zhangnongnetIOS') > -1; //iOS嵌入
    if (isAndroid) {
      return 'android';
    } else if (isiOS) {
      return 'ios';
    } else {
      return 'h5';
    }
  },
	/**
	 * 检查手机号是否合法
	 * @param {String} phone 手机号
	 */
  checkMobile(phone) {
    if ((/^1[0-9]{10}$/.test(phone))) return true;
    return false;
  },
	/**
	 * 倒计时
	 * @param  time  倒计时秒数
	 * @param  tickFunc  每秒执行
	 * @param  done     结束后回调
	 */
  countDown(time, tickFunc, done) {
    let tick = () => {
      setTimeout(() => {
        if (time > 0) {
          time--;
          tickFunc(time);
          tick();
        } else {
          done();
          return;
        }
      }, 1000);
    };
    tick();
  },
	/**
	 * 获取日期时间 默认格式 "yyyy-mm-dd hh:mm:ss"
	 * @param {String} formatType  可选 格式类型
	 * @param {Date} formatDate  可选 指定日期
	 * @return {String} 所需格式的日期
	 */
  getFormatDate(formatType, formatDate) {
    let type = formatType || 'yyyy-mm-dd hh:mm:ss';
    let date = new Date();
    if (this.getType(formatDate) === "Date") date = formatDate;
    if (this.getType(formatDate) === "Number") date = new Date(formatDate);
    let currentdate = '';
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month >= 1 && month <= 9 ? month = "0" + month : '';
    strDate >= 0 && strDate <= 9 ? strDate = "0" + strDate : '';
    minutes >= 0 && minutes <= 9 ? minutes = "0" + minutes : '';
    seconds >= 0 && seconds <= 9 ? seconds = "0" + seconds : '';

    switch (type.toLowerCase()) {
      case 'yyyy-mm-dd hh:mm:ss':
        currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + minutes + ":" + seconds;
        break;
      case 'yyyy-mm-dd':
        currentdate = date.getFullYear() + "-" + month + "-" + strDate;
        break;
      case 'yyyy-mm-dd hh:mm':
        currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + minutes;
        break;
      case 'yyyy-mm-dd hh':
        currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours();
        break;
      case 'yyyy-mm':
        currentdate = date.getFullYear() + "-" + month;
        break;
      case 'yyyy':
        currentdate = date.getFullYear();
        break;
      default:
        currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + minutes + ":" + seconds;
        break;
    }
    return currentdate;
  },
	/**
	 * 滚动条缓冲函数
	 * @param {Object} dom 目标dom
	 * @param {Number} destination 目标位置
	 * @param {Number} rate 缓动率
	 * 示例用法
	  var dom = document.documentElement || document.body;
	  this.$util.easeout(dom, 0, 5);
	 */
  easeout(dom, destination = 0, rate = 3) {
    let position = dom.scrollTop;
    if (position === destination || typeof destination !== 'number' || rate === 0) {
      return false;
    }
    // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (fn) {
        return setTimeout(fn, 17);
      }
    }
    let step = function () {
      position = position + (destination - position) / rate;
      if (Math.abs(destination - position) < 1) { //动画结束
        dom.scrollTop = destination;
        return;
      }
      dom.scrollTop = position;
      requestAnimationFrame(step);
    };
    step();
  },
  /**
   * 文本截取换行
   * @param {String} text 文本字符
   * @param {String} sign 换行标识 
   */
  textBr(text, sign) {
    let brstr = '';
    let arr = text.split(sign);
    arr.forEach(v => {
      brstr += v + "</br>"
    })
    return brstr;
  },
  /**
    * 跳转iframe页面
    * @param {String} url 页面地址
    * @param {String} title 标题 
    */
  goIframe(url, title) {
    router.push(`/iframe/${encodeURIComponent(url)}?title=${title}`)
  }
}