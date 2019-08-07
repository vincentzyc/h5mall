import Vue from "vue";
import router from "@/router"

const vm = new Vue()

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

export async function addShopCollection(shop_id) {
  let userInfo = await getUser();
  let param = {
    shop_id: shop_id,
    token: userInfo.token,
    user_id: userInfo.user.id
  }
  await vm.$api.Store.addShopCollection(param);
  vm.$createToast({
    txt: '关注成功',
    type: 'txt',
    time: 2000
  }).show();
  return true;
}

export async function cancelShopCollection(shop_id) {
  let userInfo = await getUser();
  let param = {
    shop_id: shop_id,
    token: userInfo.token,
    user_id: userInfo.user.id
  }
  await vm.$api.Store.cancelShopCollection(param);
  vm.$createToast({
    txt: '已取消关注',
    type: 'txt',
    time: 2000
  }).show()
  return true;
}