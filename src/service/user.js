import Vue from "vue";
import router from "@/router"

const vm = new Vue()
/**
 * 获取用户信息
 * @param {String} redirect 未登录情况下，登录后跳转的url
 */
export function getUser(redirect) {
  return new Promise(resolve => {
    if (!vm.USERINFO) {
      let userInfo = vm.$util.getLStorage('userInfo', true);
      if (!userInfo) return redirect ? router.replace('/me/login?redirect=' + redirect) : resolve(false);
      vm.USERINFO = userInfo;
    }
    return resolve(vm.USERINFO);
  })
}
/**
 * 清除用户信息
 */
export async function clearUser() {
  window.localStorage.removeItem('userInfo');
  vm.USERINFO = null;
}
/**
 * 收藏店铺
 * @param {Number} shop_id 店铺id
 * @param {String} redirect 未登录情况下，登录后跳转的url
 */
export async function addShopCollection(shop_id, redirect) {
  let userInfo = await getUser(redirect);
  let param = {
    shop_id: shop_id,
    token: userInfo.token,
    user_id: userInfo.id
  }
  await vm.$api.Store.addShopCollection(param);
  vm.$createToast({
    txt: '收藏成功',
    type: 'txt',
    time: 2000
  }).show();
  return true;
}
/**
 * 取消收藏
 * @param {Number} shop_id 店铺id
 * @param {String} redirect 未登录情况下，登录后跳转的url
 */
export async function cancelShopCollection(shop_id, redirect) {
  let userInfo = await getUser(redirect);
  let param = {
    shop_id: shop_id,
    token: userInfo.token,
    user_id: userInfo.id
  }
  await vm.$api.Store.cancelShopCollection(param);
  vm.$createToast({
    txt: '已取消',
    type: 'txt',
    time: 2000
  }).show()
  return true;
}
/**
 * 已过期的优惠券
 * @param {String} redirect 未登录情况下，登录后跳转的url
 */
export async function overdueCard(redirect) {
  let userInfo = await getUser(redirect);
  let param = {
    token: userInfo.token,
    user_id: userInfo.id
  }
  let res = await vm.$api.Store.overdueCard(param);
  return res.list || [];
}
/**
 * 未使用的优惠券
 * @param {String} redirect 未登录情况下，登录后跳转的url
 */
export async function unusedCard(redirect) {
  let userInfo = await getUser(redirect);
  let param = {
    token: userInfo.token,
    user_id: userInfo.id
  }
  let res = await vm.$api.Store.unusedCard(param);
  return res.list || [];
}
/**
 * 已使用的优惠券
 * @param {String} redirect 未登录情况下，登录后跳转的url
 */
export async function usedCard(redirect) {
  let userInfo = await getUser(redirect);
  let param = {
    token: userInfo.token,
    user_id: userInfo.id
  }
  let res = await vm.$api.Store.usedCard(param);
  return res.list || [];
}

/**
 * 新手注册领取优惠劵
 * @param {String} redirect 未登录情况下，登录后跳转的url
 */
export async function getRegistGiftCard(redirect) {
  let userInfo = await getUser(redirect);
  let param = {
    token: userInfo.token,
    user_id: userInfo.id
  }
  let res = await vm.$api.Store.getRegistGiftCard(param);
  console.log(res);
  return res.list || [];
}