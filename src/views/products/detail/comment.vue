<template>
  <div>
    <div class="pd10 border-beee" v-for="(item,index) in list" :key="index">
      <div class="flex">
        <img src="@/assets/img/logo.png" alt="用户头像" class="userimg flex-none">
        <div class="flex-auto mg-l5">
          <div class="flex align-middle">
            <div class="flex-auto">
              <div class="username lh30 fs14">云云云</div>
              <div class="score corange fs10">
                <cube-rate v-model="item.score" disabled></cube-rate>
                {{item.score}}分
              </div>
            </div>
            <span class="c666">06-06</span>
          </div>
          <div class="mg-t10">
            <p class="lh30">评价内容评价内容</p>
            <img src="@/assets/img/store1.png" alt="评价图片" class="comment-img">
            <img src="@/assets/img/store2.png" alt="评价图片" class="comment-img">
            <img src="@/assets/img/store3.png" alt="评价图片" class="comment-img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      require: true,
      type: Array
    }
  }
}
</script>

