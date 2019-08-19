<template>
  <base-page>
    <common-header title="确认订单"/>
    <div>
      <p>请添加收货地址</p>
      <p>确认订单确认订单确认订单确认订单确认订单确认订单</p>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: 'addorder',
  data() {
    return {
      userInfo: '',
      items: []
    }
  },
  methods: {
    async addressList() {
      let param = {
        user_id: this.userInfo.id,
        token: this.userInfo.token
      }
      this.$loading.open();
      let res = await this.$api.Common.addressList(param);
      this.items = res.list || [];
      this.$loading.close();
    },
    editAddress(item) {
      this.EVENTBUS.editAddress = item;
      this.$router.push('/me/address/view')
    },
    addressDelete(id) {
      this.$createDialog({
        type: 'confirm',
        content: '是否确定删除该地址',
        onConfirm: async () => {
          let param = {
            user_id: this.userInfo.id,
            token: this.userInfo.token,
            id: id
          }
          await this.$api.Common.addressDelete(param);
          this.$createToast({
            txt: '删除成功',
            type: 'txt',
            time: 2000
          }).show();
          this.items = this.items.filter(v => v.id !== id)
        },
        onCancel: () => { }
      }).show()
    }
  },
  async created() {
    this.userInfo = await getUser(this.$route.fullPath);
  }
}
</script>