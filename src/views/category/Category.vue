<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
export default {
  name: "Category",
  components: {
    NavBar // 1-2 注册组件
  }
}
</script>

<style scoped>

</style>
