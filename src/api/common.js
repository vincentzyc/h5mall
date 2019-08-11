export default [{
  name: "getRegionAll",
  url: "/znRegion/getRegionAll" //获取省市
}, {
  name: "getCode",
  url: "/appUser/verificationCode"  //统一验证码接口
}, {
  name: "register",
  url: "/appUser/reg"  //用户注册接口
}, {
  name: "updatePwdByCode",
  url: "/appUser/updatePwdByCode"   // 用户通过验证码修改登录密码接口
}, {
  name: "updatePwd",
  url: "/appUser/updatePwd"  //用户通过原密码修改密码接口
}, {
  name: "loginByCode",
  url: "/appUser/loginByCode"  // 用户通过手机号与验证码登录
}, {
  name: "login",
  url: "/appUser/login"  // 用户登录密码登录接口
}, {
  name: "updatePhoneByCode",
  url: "/appUser/updatePhoneByCode"  //用户通过验证码修改手机号
}, {
  name: "getInfoByUserId",
  url: "/appUser/getInfoByUserId"  //用户通过id查询个人基本信息
}, {
  name: "updateInfoByUserId", 
  url: "/appUser/updateInfoByUserId"  //用户更新个人基本信息
}, {
  name: "logout",
  url: "/appUser/logout" //用户退出登录接口
}, {
  name: "feedback",
  url: "/appFeedback/feedback" //提交反馈
}, {
  name: "myScore",  //我的积分
  url: "/appScore/myScore"
}]