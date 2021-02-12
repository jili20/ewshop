<template>
  <div>
    <!-- 顶部导航组件 -->
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>

    <div id="main-box">
      <!-- ⚪️ 2-1 排序栏 -->
      <div class="order-tab">
        <!-- @click="tabClick" 默认会传选中项 id -->
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>

      <!-- 侧边导航 ： v-model 绑定当前选中项的索引。 -->
      <van-sidebar class="left-menu" v-model="activeKey">
        <!-- 1-1 手风琴效果 -->
        <van-collapse v-model="activeName" accordion>
          <!-- 一级分类 -->
          <van-collapse-item v-for="(item,index) in categories"
                             :key="item.id"
                             :title="item.name"
                             :name="item.name">
            <!-- 二级分类 -->
            <van-sidebar-item v-for="sub in item.children"
                              :title="sub.name"
                              :key="sub.id"
                              @click="getGoods(sub.id)"/>
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>

      <div class="goods-list">
        <div class="content">
          <!-- 🔴 3-1 商品卡片 -->
          <!--   暂时不 2-18 遍历计算属性值 showGoods  -->
          <van-card
              v-for="item in showGoods" :key="item.id"
              :num="item.comments_count"
              :tag="item.comments_count >= 0 ? '流行' : '标签'"
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
              :lazy-load="true"
          />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import {ref, reactive, onMounted, computed} from 'vue'; // ⚪️ 2-14 computed 计算属性

import {getCategory, getCategoryGoods} from "@/network/category"; // ⚪️ 2-18 引入 api 方法：getCategoryGoods

export default {
  name: "Category",

  setup() {
    let activeKey = ref(0)   // 二级分类默认选中项
    let activeName = ref(1)  // 1-2 手风琴效果 默认值 1
    let active = ref(1)  // ⚪️ 2-2 默认选中项值为 1

    let categories = ref([]) // 分类数据
    let currentOrder = ref('sales') // ⚪️ 2-6 当前的排序条件
    let currentCid = ref(0) // ⚪️ 2-9 当前分类 id

    // ⚪️ 2-13 数据模型
    const goods = reactive({
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments_count: {page: 1, list: []}
    })

    // ⚪️ 2-16 计算属性，返回排序选项
    const showGoods = computed(() => {
      return goods[currentOrder.value].list
    })

    // ⚪️ 2-19 排序类型数据初始化
    // 一调用这个方法的时候就会给数据模型各项赋值
    const init = () => {
      getCategoryGoods('sales', currentCid.value).then(res => {
        goods.sales.list = res.goods.data // 给数据模型 sales 项赋值
      })
      getCategoryGoods('price', currentCid.value).then(res => {
        goods.price.list = res.goods.data // 给数据模型 price 项赋值
      })
      getCategoryGoods('comments_count', currentCid.value).then(res => {
        goods.comments_count.list = res.goods.data // 给数据模型 comments_count 项赋值
      })
    }

    onMounted(() => {
      getCategory().then(res => {
        console.log(res)
        categories.value = res.categories
      })
      // ⚪️ 2-20 初始化默认分类
      getCategoryGoods('sales', currentCid.value).then(res => {
        goods.sales.list = res.goods.data // 给数据模型 sales 项赋值
      })
    })
    // ⚪️ 2-4 排序选项卡:默认 传 id
    const tabClick = (index) => {
      let orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index] // ⚪️ 2-7

      getCategoryGoods(currentOrder.value, currentCid.value).then(res => {
        goods[currentOrder.value].list = res.goods.data // ⚪️ 2-22 给当前排序分类赋值
      })

      console.log("当前分类id:" + currentCid.value)
      console.log("排序的序号:" + currentOrder.value)
    }

    // ⚪️ 2-11 通过分类 get 商品
    const getGoods = (cid) => {
      currentCid.value = cid
      init() // ⚪️ 2-21 点击哪个分类按钮，重新初始化数据
      console.log("当前分类id:" + currentCid.value)
      console.log("排序的序号:" + currentOrder.value)
    }

    return {
      // 定义的方法和变量都要返回
      activeKey,
      categories,
      activeName, // 1-3 手风琴
      active,  // ⚪️ 2-3
      tabClick, // ⚪️ 2-5
      currentOrder, // ⚪️ 2-8 当前排序
      currentCid, // ⚪️ 2-10 当前分类 id
      getGoods, // ⚪️ 2-12 通过分类获取商品
      goods, // ⚪️ 2-15
      showGoods // ⚪️ 2-17
    }
  },
  components: {
    NavBar // 1-2 注册组件
  }
}
</script>

<style lang="scss" scoped>
#main-box {
  margin-top: 45px;
  display: flex;

  .order-tab {
    flex: 1; // 占一份
    float: right;
    height: 50px;
    z-index: 9;
    position: fixed; // 固定定位
    top: 45px;
    right: 0;
    left: 130px;

  }

  .left-menu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
  }

  .goods-list {
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left !important;

    .van-card__content {

    }
  }
  .van-card__thumb{
    width: 68px;
  }
}
</style>
