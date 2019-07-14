<template>
  <div class="flex">
    <ul class="flex-none col-4">
      <li v-for="item in data" :key="item.label" @click="selectNav=item" class="lh30 border-bddd">{{item.label}}</li>
    </ul>
    <ul class="flex-auto">
      <li v-for="item in selectNav.items" :key="item" class="lh30 border-bddd">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectNav: null
    }
  }
}
</script>
