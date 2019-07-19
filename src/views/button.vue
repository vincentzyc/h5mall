<template>
  <base-page>
    <div>
      <cube-button @click="$router.back()">Back</cube-button>
      <cube-button @click="cryptoTest()">crypto test</cube-button>
      <cube-button :active="true" @click="cryptoTest1()">Active Button</cube-button>
      <cube-button :disabled="true">Disabled Button</cube-button>
      <cube-button icon="cubeic-right">Button With Icon</cube-button>
      <cube-button :light="true">Light Button</cube-button>
      <cube-button :inline="true">Inline Button</cube-button>
      <cube-button :outline="true">Outline Button</cube-button>
      <cube-button :primary="true">Primary Button</cube-button>
      <cube-checkbox label="inline">Inline</cube-checkbox>
      <cube-checkbox label="outline">Outline</cube-checkbox>
      <cube-checkbox label="primary">Primary</cube-checkbox>
      <cube-button :inline="inlineStyle" :outline="outlineStyle" :primary="primaryStyle">Demo Button</cube-button>
    </div>
  </base-page>
</template>

<script type="text/ecmascript-6">
import Crypto from "@/assets/js/crypto";
export default {
  data() {
    return {
      buttonStyle: ["inline", "outline", "primary"]
    };
  },
  computed: {
    inlineStyle() {
      return this.buttonStyle.indexOf("inline") >= 0;
    },
    outlineStyle() {
      return this.buttonStyle.indexOf("outline") >= 0;
    },
    primaryStyle() {
      return this.buttonStyle.indexOf("primary") >= 0;
    }
  },
  methods: {
    cryptoTest() {
      let data = { phone: '18812345678', codeType: '0' };
      let aaa = this.$util.setSStorage('aaa',data,true);
      let bbb = this.$util.getSStorage('aaa',true);
      console.log(bbb);
      // let { key, iv, ...strData } = Crypto.encrypt(data);
      // this.$axios.post('/appUser/verificationCode', strData).then(res => {
      //   let real_res = Crypto.decrypt(res.data, key, iv);
      //   console.log(real_res);
      // }).catch(error => {
      //   console.log(error);
      // });
    },
    async cryptoTest1() {
      let data = { pageNum: 1 };
      let aaa = await this.$api.Product.sysRecommend(data);
      console.log(aaa);
    }
  }
};
</script>
