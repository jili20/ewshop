<template>
  <!-- 轮播图组件 -->
  <van-swipe v-if="banners.length" class="my-swipe" :autoplay="2000" indicator-color="white">
    <van-swipe-item v-for="(item,index) in banners" :key="index">
      <!-- <img :src="item.img_url" alt="">-->
      <img v-lazy="item.img_url" alt="">
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  name: "HomeSwiper",
  props: { // 接收父组件传过来的数据
    banners: Array,
    default() {
      return []
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: auto !important;
}
</style>
