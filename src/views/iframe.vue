<template>
  <base-page>
    <common-header :title="$route.query.title||''"></common-header>
    <iframe :src="decodeURIComponent($route.params.url)" style="width: 100%;height: 100%;"></iframe>
  </base-page>
</template>