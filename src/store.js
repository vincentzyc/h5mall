import Vue from 'vue'

export default new Vue({
	data() {
		return {
      wxConfig:null,
      shareData:null,
      contactPhone:"18826229916",
			selectAdress: "",
			editAddress: "",
			buyList: ""
		}
	},
	methods: {
    setShareData(newValue){
			this.shareData = newValue
    },
    setWxConfig(newValue){
			this.wxConfig = newValue
    },
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