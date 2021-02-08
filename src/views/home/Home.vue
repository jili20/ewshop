<template>
  <div>
    <!-- 1-3 引入组件-->
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <!-- 2-1 轮播图占位 -->
    <div class="banners">
      <img src="@/assets/images/img.png" alt="">
    </div>

    <!-- 加入推荐组件;-->
    <!-- ⚪️ 6、给子组件传数据：以变量的方式 :recommend="recommend"   -->
    <recommend-view :recommends="recommends"/>

  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import RecommendView from "@/views/home/ChildComps/RecommendView"; // 引入推荐组件
import {getHomeAllData} from '@/network/home'; // ⚪️ 1、 调用 api方法
// ref 空数组； reactive 空对象；
import {ref, reactive, onMounted} from 'vue'; // ⚪️ 2、引入引用对象 ref、生命周期方法 onMounted

export default {
  name: "Home",

  setup() {
    // ref 空数组 引用
    const recommends = ref([]) // ⚪️ 3、声明数据引用对象为空数组
    // const demo = reactive({}) // reactive 空对象 代理

    onMounted(() => {
      getHomeAllData().then(res => {
        console.log(res.goods)
        recommends.value = res.goods.data // ⚪️ 4、调用api方法，把获取到的数据赋值给定义的空数组
        console.log(recommends)
      })
    })

    return {
      recommends // ⚪️ 5、 返回数据
    }
  },

  components: {
    NavBar, // 1-2 注册组件
    RecommendView
  }
}
</script>

<style lang="scss" scoped>
// 2-2 轮播图
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
}

</style>
