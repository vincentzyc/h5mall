import Vue from 'vue'

export default new Vue({
  data() {
    return {
      selectAdress: "",
      editAddress: "",
      orderParam: ""
    }
  },
  methods: {
    setSelectAdress(newValue) {
      this.selectAdress = newValue
    },
    setEditAddress(newValue) {
      this.editAddress = newValue
    },
    setOrderParam(newValue) {
      this.orderParam = newValue
    }
  }
});