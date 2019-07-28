<template>
  <base-page>
    <common-header title="我关注的店铺"></common-header>
    <div class="mg-t10 bgfff">
      <ul>
        <li class="flex list-item">
          <img src="@/assets/img/logo.png" alt="店铺logo" />
          <div class="main flex-auto">
            <h3>周氏野货</h3>
            <p class="textover1">主营品类主营品类主营品类</p>
          </div>
          <div class="flex flex-center flex-none">
            <div class="dislike">取消关注</div>
          </div>
        </li>
        <li class="flex list-item">
          <img src="@/assets/img/logo.png" alt="店铺logo" />
          <div class="main flex-auto">
            <h3>周氏野货</h3>
            <p class="textover1">主营品类主营品类主营品类</p>
          </div>
          <div class="flex flex-center flex-none">
            <div class="dislike">取消关注</div>
          </div>
        </li>
      </ul>
    </div>
  </base-page>
</template>

<style lang="stylus" scoped>
@import '~@/assets/css/color.styl';

.list-item {
  padding: 15px 10px;
  border-bottom: 1px solid #eee;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .main {
    h3 {
      line-height: 30px;
      font-size: 16px;
    }

    p {
      color: #999;
    }
  }

  .dislike {
    border: 1px solid $color-theme;
    color: $color-theme;
    padding: 10px;
    font-size: 12px;
    border-radius: 10px;

    &:active {
      background: $color-theme-light;
    }
  }
}
</style>
