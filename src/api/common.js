export default [{
  name: "getRegionAll",
  url: "/znRegion/getRegionAll" //获取省市
}, {
  name: "getCode",
  url: "/appUser/verificationCode"  //统一验证码接口
  // backType: "allData"
}, {
  name: "register",
  url: "/appUser/reg"  //用户注册接口
}, {
  name: "updatePwdByCode",
  url: "/appUser/updatePwdByCode"   // 用户通过验证码修改登录密码接口
}]