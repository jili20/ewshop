<template>
  <!-- ⚪ 2 添加 id="home" -->
  <div id="home">
    <!-- 1-3 引入组件-->
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <!-- ⚪️ 11  上拉页面时，固定顶部 -->
    <tab-control v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销','新书','精选']"/>

    <!-- ⚪️ 1、开发上拉加载更多数据  固定 class="wrapper" class="content" -->
    <div class="wrapper">
      <div class="content">

        <!-- 🔴️ 12 添加外层 div 和 ref  -->
        <div ref="banref">
          <!-- 2-1 轮播图占位 -->
          <div class="banners">
            <img src="@/assets/images/img.png" alt="">
          </div>
          <!-- 加入推荐组件;-->
          <!-- 6、给子组件传数据：以变量的方式 :recommend="recommend"   -->
          <recommend-view :recommends="recommends"/>
        </div>

        <!-- 3、使用内容选项卡组件, 并定义数组与值传给子组件 -->
        <!--  3 @tabClick 子组件传过来的事件，tabClick 父组件自定义的事件 -->
        <tab-control @tabClick="tabClick" :titles="['畅销','新书','精选']"/>
        <!--  6 输出商品列表数据 -->
        <!-- 8、把当前类型的数据，用属性方式传给子组件，默认是销量 -->
        <goods-list :goods="showGoods"/>
      </div>
    </div>

  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import RecommendView from "@/views/home/ChildComps/RecommendView"; // 引入推荐组件
import {getHomeAllData, getHomeGoods} from '@/network/home'; //️ 1、 调用 api方法 getHomeGoods
// ref 空数组； reactive 空对象；
import TabControl from "@/components/content/tabControl/TabControl"; //  1 引入内容选项卡组件
import GoodsList from "@/components/content/goods/GoodsList"; // 4
import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue'; // ⚪️ 8 watchEffect 监听所有数据；nextTick 当 DOM渲染完执行的方法 ; 2、引入 reactive 引用代理对象，ref 数组，computed 计算属性、onMounted 生命周期
import BScroll from 'better-scroll' // ⚪️ 4 引入上拉加载数据插件
export default {
  name: "Home",

  setup() {
    let isTabFixed = ref(false) // 默认不显示
    let banref = ref(null) // 🔴 13

    // let temid = ref(0) // ❌ 4 声明临时变量
    // ref 空数组 引用
    const recommends = ref([]) // 3、声明数据引用对象为空数组

    // const demo = reactive({}) // reactive 空对象 代理
    // 商品列表数据模型
    const goods = reactive({ // 3
      sales: {page: 1, list: []},
      new: {page: 1, list: []},
      recommend: {page: 1, list: []}
    })

    // 6、当前类型数据
    let currentType = ref('sales')

    const showGoods = computed(() => { // computed 计算属性
      return goods[currentType.value].list
    })

    let bscroll = reactive({}) // ⚪️ 5 声明在外层 共用

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

      // ⚪️ 6 创建 BetterScroll 对象
      bscroll = new BScroll(document.querySelector(".wrapper"), { // 获取到最外层元素
        probeType: 3, // 0,1,2,3, 3 只要在运行就触发 scroll 事件
        click: true,  // 是否允许点击
        pullUpLoad: true // 上拉加载更多，默认 false
      })
      // ⚪️ 7 触发滚动事件 - scroll 事件 - 位置 position
      bscroll.on('scroll', (position) => {
        console.log(banref.value.offsetHeight) // 🔴  15 offsetHeight 偏移量的高度
        console.log(-position.y) // 打印滚动的距离
        isTabFixed.value = (-position.y) > banref.value.offsetHeight // 🔴 15
      })

      // ⚪️ 10 上拉加载更多数据，触发 pullingUp
      bscroll.on("pullingUp", () => {
        // console.log('上拉加载更多......')
        // console.log('centerHeight：' + document.querySelector('.center').clientHeight)
        const page = goods[currentType.value].page + 1
        getHomeGoods(currentType.value, page).then(res => {
          goods[currentType.value].list.push(...res.goods.data)
          goods[currentType.value].page += 1
        })
        // 完成上拉，等数据请求完成，要将新数据展示出来
        bscroll.finishPullUp()
        // console.log('当前类型：' + currentType.value + '，当前页：' + page)
        bscroll.refresh() // 刷新 重新计算高度
      })

    })

    const tabClick = (index) => {  //  5
      // temid.value = index // ❌ 等于点击选项卡传过来的 索引
      let types = ['sales', 'new', 'recommend']
      currentType.value = types[index]
    }

    // ⚪️ 9 监听 任何一个变量有变化就会被触发
    watchEffect(() => {
      nextTick(() => { // 当 DOM 渲染完了执行方法
        // 重新计算高度
        bscroll && bscroll.refresh()
      })
    })


    return {
      recommends, // 5、 返回数据
      // temid, // ❌ 6 临时的，现在不用了
      tabClick, //  7
      goods,  // 4
      showGoods, // 7
      isTabFixed,
      banref //  🔴️ 14
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
#home { // ⚪️ 3 这一整块 固定高度
  height: 100vh; // 占领整个屏幕区域高度
  position: relative;

  .wrapper {
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0; // 左右为0 内容可居中
    right: 0;
    overflow: hidden; // 超出部分隐藏
  }
}

// 2-2 轮播图
.banners img {
  width: 100%;
  height: auto;
}

</style>
