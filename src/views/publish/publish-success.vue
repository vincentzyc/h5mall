<template>
  <base-page>
    <common-header title="发布成功" />
    <cube-scroll ref="scroll" class="bgfff">
      <div class="pd20">
        <div class="mg20 text-center">
          <i class="cubeic-right ctheme" style="font-size:100px"></i>
        </div>
        <p class="text-center" style="margin-top:50px">发布采购成功！农户们会发消息联系您</p>
        <div class="pd20" style="margin-top:50px">
          <cube-button :primary="true" @click="$router.back()">继续发布</cube-button>
        </div>
      </div>
    </cube-scroll>
  </base-page>
</template>