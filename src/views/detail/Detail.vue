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
import {ref, onMounted, reactive,toRefs} from 'vue'; // ⚪️ 2-1 onMounted , reactive,toRefs
import {getDetail} from "@/network/detail"; // ⚪️ 2-2

export default {
  name: "Detail",
  components: {
    NavBar // 1-2 注册组件
  },
  setup() {
    const route = useRoute()
    let id = ref(0)
    let book = reactive({  // ⚪️ 2-3 定义空对象封装数据
      detail: {},
      like_goods: []
    })

    onMounted(() => { // ⚪️ 2-4
      id.value = route.query.id

      getDetail(id.value).then(res => {
        console.log(res)
        book.detail = res.goods
        book.like_goods = res.like_goods
      })
    })

    return {
      id,
      ...toRefs(book) // ⚪️ 2-5 解构对象
    }
  }
}
</script>

<style scoped>

</style>
