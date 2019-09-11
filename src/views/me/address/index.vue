<template>
  <base-page>
    <common-header title="常用地址">
      <span slot="right" @click="$router.push('/me/address/view')">添加</span>
    </common-header>
    <ul v-if="items.length>0">
      <li class="bgfff mg-t10" v-for="item in items" :key="item.id">
        <div class="flex pd15 lh24" @click="selectAdress(item)">
          <h3 class="fs16">{{item.name}}</h3>
          <span class="cccc mg-l10 mg-r10">|</span>
          <p class="c666">{{item.phone}}</p>
        </div>
        <p class="pd15 c333 pd-t10">{{item.address}}</p>
        <div class="flex border-teee pd15">
          <div class="flex-auto cblue">
            <span v-if="item.state===1">默认地址</span>
          </div>
          <div class="corange mg-r20" @click="editAddress(item)">
            <i class="cubeic-edit"></i>
            <span>编辑</span>
          </div>
          <div class="c666" @click="addressDelete(item.id)">
            <i class="cubeic-delete"></i>
            <span>删除</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="pd20 text-center" v-else>
      <p class="pd20">您还没有添加地址哦~</p>
    </div>
  </base-page>
</template>

<script>
import { getUser } from "@/service/user"
export default {
  name: 'viewAddress',
  data() {
    return {
      userInfo: '',
      items: []
    }
  },
  methods: {
    selectAdress(item) {
      if (this.$route.query.type === 'select') {
        this.BUS.setSelectAdress(item);
        this.$router.back()
      }
    },
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
      this.BUS.setEditAddress(item);
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
    this.addressList();
  }
}
</script>