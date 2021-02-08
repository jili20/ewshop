<template>
 <div>
   <nav-bar>
     <template v-slot:default>购物车</template>
   </nav-bar>
 </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
export default {
name: "ShopCart",
  components: {
    NavBar // 1-2 注册组件
  }
}
</script>

<style scoped>

</style>
