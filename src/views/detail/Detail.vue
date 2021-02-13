<template>
  <!-- 商品详情页面 -->
  <div>
    <!-- 顶部 -->
    <nav-bar>
      <template v-slot:default>商品详情:{{ id }}</template>
    </nav-bar>

    <!-- 图片区域 -->
    <van-image style="margin-top: 50px"
               width="100%"
               lazy-load
               :src="detail.cover_url"
    />
    <!-- 商品卡片 -->
    <van-card style="text-align: left"
              :num="detail.stock"
              :price="detail.price+'.00'"
              :desc="detail.description"
              :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">{{ detail.is_recommend = 1 ? '推荐' : '' }}</van-tag>
      </template>
      <template #footer>
        <van-button type="warning">加入购物车</van-button>
        <van-button type="danger">立即购买</van-button>
      </template>
    </van-card>

    <!-- 标签页 -->
    <van-tabs v-model="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div v-for="item in detail.comments">
          <div>{{ item.reply}}</div>
          <div>{{ item.content}}</div>
          <div>{{ item.pics_url}}</div>
          <div>{{ item.created_at}}</div>
        </div>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import {useRoute} from 'vue-router'; // 注意：这里导入路由，不是路由器
import {ref, onMounted, reactive, toRefs} from 'vue'; // ⚪️ 2-1 onMounted , reactive,toRefs
import {getDetail} from "@/network/detail"; // ⚪️ 2-2
import GoodsList from "@/components/content/goods/GoodsList";

export default {
  name: "Detail",
  components: {
    NavBar, // 1-2 注册组件
    GoodsList
  },
  setup() {
    let active = ref(1) // 标签页 默认激活第 1个
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
      ...toRefs(book), // ⚪️ 2-5 解构对象
      active
    }
  }
}
</script>

<style scoped>

</style>
