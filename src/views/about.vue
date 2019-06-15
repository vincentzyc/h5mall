<template>
  <base-page>
    <div>
      <h1>Hello world</h1>
      <cube-button :primary="true" @click="$router.back()">back</cube-button>
      <h1>This is an about page</h1>
      <cube-button :primary="true" @click="$router.push('./button')">button</cube-button>
    </div>
  </base-page>
</template>
