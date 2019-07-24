<template>
  <div v-if="list.length>0">
    <div class="pd10 border-beee" v-for="(item,index) in list" :key="index">
      <div class="flex">
        <img :src="item.user_head_img" alt="用户头像" class="userimg flex-none" />
        <div class="flex-auto mg-l5">
          <div class="flex align-middle">
            <div class="flex-auto">
              <div class="username lh30 fs14">{{item.user_name}}</div>
              <div class="score cyellow fs10">
                <cube-rate v-model="item.appraise_star" disabled></cube-rate>
                {{item.appraise_star}}分
              </div>
            </div>
            <span class="c666">{{item.create_time}}</span>
          </div>
          <div class="mg-t10">
            <p class="lh30">{{item.appraise_content}}</p>
            <img v-for="img in item.appraise_img.split(',')" :key="img" :src="img" alt="评价图片" class="comment-img" />
          </div>
        </div>
      </div>
      <div class="reply">
        <p class="mg-b5 title">商家回复</p>
        <p class="lh20 fs12 c666">{{item.shop_replay}}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="mg20 lh30 text-center">暂无评价</p>
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

