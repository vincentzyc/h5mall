<template>
  <header class="header-bg">
    <div class="flex header-wrap">
      <div class="address">
        <span>广州市</span>
      </div>
      <div class="search-wrap flex flex-auto flex-center">
        <div class="search-input flex flex-auto">
          <i class="cubeic-search"></i>
          <input type="text" placeholder="搜索" class="flex-auto">
        </div>
      </div>
      <i class="scan cubeic-scan"></i>
    </div>
  </header>
</template>


<style lang="stylus" scoped>
.header-wrap {
  font-size: 14px;
  color: #fff;
}

.address {
  padding: 0 10px 0 15px;
}

.scan {
  padding: 0 10px;
  font-size: 30px;
  font-weight: lighter;
}

.search-input {
  line-height: 30px;
  border-radius: 22px;
  margin: 6px 0;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.3);

  input {
    margin-left 5px
    outline: none;
    background: transparent;

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #fff;
      opacity: 1;
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #fff;
      opacity: 1;
    }

    &:-ms-input-placeholder {
      color: #fff;
      opacity: 1;
    }

    &::-webkit-input-placeholder {
      color: #fff;
      opacity: 1;
    }
  }
}
</style>
