<template>
  <!-- 商品详情页面 -->
  <div>
    <nav-bar>
      <template v-slot:default>商品详情:{{ id }}</template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import {useRoute} from 'vue-router'; // 注意：这里导入路由，不是路由器
import {ref} from 'vue';

export default {
  name: "Detail",
  components: {
    NavBar // 1-2 注册组件
  },
  setup() {
    const route = useRoute()
    let id = ref(0)
    id.value = route.query.id

    return {
      id
    }
  }
}
</script>

<style scoped>

</style>
