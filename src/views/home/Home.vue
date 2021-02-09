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
    <!-- 6、给子组件传数据：以变量的方式 :recommend="recommend"   -->
    <recommend-view :recommends="recommends"/>

    <!-- 3、使用内容选项卡组件, 并定义数组与值传给子组件 -->
    <!--  3 @tabClick 子组件传过来的事件，tabClick 父组件自定义的事件 -->
    <tab-control @tabClick="tabClick" :titles="['畅销','新书','精选']"/>

    <!--  6 输出商品列表数据 -->
    <!-- 8、把当前类型的数据，用属性方式传给子组件，默认是销量 -->
    <goods-list :goods="showGoods"/>

  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import RecommendView from "@/views/home/ChildComps/RecommendView"; // 引入推荐组件
import {getHomeAllData, getHomeGoods} from '@/network/home'; //️ 1、 调用 api方法 getHomeGoods
// ref 空数组； reactive 空对象；
import TabControl from "@/components/content/tabControl/TabControl"; //  1 引入内容选项卡组件
import GoodsList from "@/components/content/goods/GoodsList"; // 4
import {ref, reactive, onMounted, computed} from 'vue'; // 2、引入 reactive 引用代理对象，ref 数组，computed 计算属性、onMounted 生命周期

export default {
  name: "Home",

  setup() {
    // let temid = ref(0) // ❌ 4 声明临时变量
    // ref 空数组 引用
    const recommends = ref([]) // 3、声明数据引用对象为空数组

    // const demo = reactive({}) // reactive 空对象 代理
    // 商品列表数据模型
    const goods = reactive({ // 3
      sales: {page: 0, list: []},
      new: {page: 0, list: []},
      recommend: {page: 0, list: []}
    })

    // 6、当前类型数据
    let currentType = ref('sales')
    const showGoods = computed(() => { // computed 计算属性
      return goods[currentType.value].list
    })

    onMounted(() => {
      getHomeAllData().then(res => {
        recommends.value = res.goods.data // 4、调用api方法，把获取到的数据赋值给定义的空数组
      })
      // 5、按销量查询
      getHomeGoods('sales').then(res => {
        goods.sales.list = res.goods.data
      })
      // 5、按最新查询
      getHomeGoods('new').then(res => {
        goods.new.list = res.goods.data
      })
      // 5、按推荐查询
      getHomeGoods('recommend').then(res => {
        goods.recommend.list = res.goods.data
      })

      // console.log(goods)
    })
    //  5
    const tabClick = (index) => {
      // temid.value = index // ❌ 等于点击选项卡传过来的 索引
      let types = ['sales', 'new', 'recommend']
      currentType.value = types[index]
    }

    return {
      recommends, // 5、 返回数据
      //  temid, // ❌ 6 临时的，现在不用了
      tabClick, //  7
      goods,  // 4
      showGoods // 7
    }
  },

  components: {
    NavBar, // 1-2 注册组件
    RecommendView,
    TabControl, // 2、注册内容选项卡组件
    GoodsList //  5
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
