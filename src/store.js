import Vue from 'vue'

export default new Vue({
  data() {
    return {
      selectAdress: "",
      editAddress: "",
      buyList: ""
    }
  },
  methods: {
    setSelectAdress(newValue) {
      this.selectAdress = newValue
    },
    setEditAddress(newValue) {
      this.editAddress = newValue
    },
    setBuyList(newValue) {
      this.buyList = newValue
    }
  }
});