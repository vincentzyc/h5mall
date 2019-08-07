<template>
  <base-page>
    <common-header title="设置"></common-header>
    <ul class="lh30 bgfff">
      <li class="flex align-middle pd10 border-beee">
        <div class="icon icon4"></div>
        <span class="flex-auto">建议</span>
        <i class="cubeic-arrow c666"></i>
      </li>
      <li class="flex align-middle pd10 border-beee">
        <div class="icon icon5"></div>
        <span class="flex-auto">关于</span>
        <i class="cubeic-arrow c666"></i>
      </li>
    </ul>
    <ul class="lh30 bgfff mg-t15">
      <li class="flex align-middle pd10 border-beee">
        <div class="icon icon4"></div>
        <span class="flex-auto">修改密码</span>
        <i class="cubeic-arrow c666"></i>
      </li>
      <li class="flex align-middle pd10 border-beee">
        <div class="icon icon5"></div>
        <span class="flex-auto">找回密码</span>
        <i class="cubeic-arrow c666"></i>
      </li>
    </ul>
    <div class="mg20">
      <cube-button :primary="true" class="border-radius10">退出登录</cube-button>
    </div>
  </base-page>
</template>
