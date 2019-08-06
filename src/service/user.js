import Vue from "vue";
import router from "@/router"

const vm = new Vue()

export function getUser(redirect) {
  return new Promise(resolve => {
    let userInfo = vm.$util.getLStorage('userInfo', true);
    if (!userInfo) return router.push('/me/login?redirect=' + redirect);
    return resolve(userInfo);
  })
}

// export async function getUser() {
//   let userInfo = vm.$util.getLStorage('userInfo', true);
//   if (!userInfo) vm.$router.push('/me/login?redirect=/me/likestore');
//   let param = {
//     token: userInfo.token,
//     user_id: userInfo.user.id
//   }
//   let res = await vm.$api.Store.collectionList(param);
//   console.log(res);
//   vm.items = res.shops || []
// }