<template>
  <base-page>
    <common-header title="设置"></common-header>
    <ul class="lh30 bgfff">
      <li class="flex align-middle pd10 border-beee" @click="$router.push('/me/setting/suggest')">
        <div class="icon icon4"></div>
        <span class="flex-auto">建议</span>
        <i class="cubeic-arrow c666"></i>
      </li>
      <li class="flex align-middle pd10 border-beee" @click="$router.push('/me/setting/about')">
        <div class="icon icon5"></div>
        <span class="flex-auto">关于</span>
        <i class="cubeic-arrow c666"></i>
      </li>
    </ul>
    <ul class="lh30 bgfff mg-t15">
      <li class="flex align-middle pd10 border-beee" @click="$router.push('/me/setting/changepsw')">
        <div class="icon icon4"></div>
        <span class="flex-auto">修改密码</span>
        <i class="cubeic-arrow c666"></i>
      </li>
      <li class="flex align-middle pd10 border-beee" @click="$router.push('/me/forgetpsw')">
        <div class="icon icon5"></div>
        <span class="flex-auto">找回密码</span>
        <i class="cubeic-arrow c666"></i>
      </li>
    </ul>
    <div class="mg20">
      <cube-button :primary="true" class="border-radius10" @click="logout()">退出登录</cube-button>
    </div>
  </base-page>
</template>

<script>
import { getUser, clearUser } from "@/service/user"
export default {
  data() {
    return {
      userInfo: ""
    }
  },
  methods: {
    logout() {
      this.$createDialog({
        type: "confirm",
        content: '确定退出登录？',
        onConfirm: async () => {
          await this.$api.Common.logout({ user_id: this.userInfo.id });
          clearUser();
          this.$createToast({
            time: 500,
            type: 'txt',
            txt: '您已退出登录',
            onTimeout: () => this.$router.replace('/home')
          }).show()
        }
      }).show()
    }
  },
  async created() {
    this.userInfo = await getUser('/me/setting')
  }
}
</script>

