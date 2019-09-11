<template>
  <header class="header-bg">
    <div class="flex fs14 cfff">
      <!-- <div class="address pd-l15">
        <span>广州市</span>
      </div> -->
      <div class="search-wrap flex flex-auto flex-center pd-l10 pd-r10">
        <div class="search-input flex flex-auto" @click="$router.push('/home/search')">
          <i class="cubeic-search"></i>
          <input type="text" placeholder="搜索" class="flex-auto" disabled>
        </div>
      </div>
    </div>
  </header>
</template>