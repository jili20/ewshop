<template>
  <div>
    <nav-bar>
      <template v-slot:default>购物车(<span style="color: red">{{ $store.state.cartCount }}</span>)</template>
    </nav-bar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup">
          <van-swipe-cell :right-width="50" v-for="(item,index) in list" :key="index">
            <div class="good-item">
              <van-checkbox name=""/>
              <div class="good-img"><img src="@/assets/images/11.png"/></div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.goods.title }}</span>
                  <span>X {{ item.goods.stock }}</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>￥</small>{{ item.goods.price + '.00' }}</div>
                  <van-stepper integer :min="1" :max="item.goods.stock" :model-value="item.num" :name="item.id"
                               async-change
                               @change="onChange"/>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                  square
                  icon="delete"
                  type="danger"
                  class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar class="submit-all" :price="9999" button-text="结算">
        <van-checkbox>全选</van-checkbox>
      </van-submit-bar>

      <div class="empty" v-if="!list.length">
        <img class="empty-cart" src="" alt="空购物车">
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="goTo">前往选购</van-button>
      </div>

    </div>
  </div>
</template>
<script>
import {ref, reactive, toRefs, onMounted, computed} from 'vue';
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'; // ⚪️  引入状态管理
import {Toast} from 'vant';
import {getCart, checkedCart, deleteCart, modifyCart} from '@/network/cart';

export default {
  name: "ShopCart",
  setup() {
    const router = useRouter()
    const store = useStore()

    // 数据模型，状态
    const state = reactive({
      list: []
    })

    // 初始化购物车数据
    const init = () => {
      Toast.loading({message: '加载中...', forbidClick: true})
      getCart('include=goods').then(res => {
        state.list = res.data
        // console.log(res.data)
        Toast.clear()
      })
    }

    onMounted(() => {
      init()
    })

    // 异步改变购物车数量
    const onChange = (value, detail) => {
      Toast.loading({message: '修改中...', forbidClick: true})
      modifyCart(detail.name, {num: value}).then(res => {
        // 将在 onMounted 中的 list 中的 num 也要改
        state.list.forEach(item => {
          if (item.id === detail.name) {
            item.num = value
          }
        })
        Toast.clear()
      })
      // console.log(value)
      // console.log(detail.name)
    }

    // 前往购物
    const goTo = () => {
      router.push({path: '/home'})
    }

    return {
      ...toRefs(state), // 解构
      goTo,
      onChange
    }
  },
  components: {
    NavBar // 1-2 注册组件
  }
}
</script>

<style lang="scss" scoped>
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;

    .goods-item {
      display: flex;

      .good-img {
        width: 100px;
        height: auto;
      }
    }

    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;

      .good-title {
        display: flex;
        justify-content: space-between;
      }

      .good-btn {
        display: flex;
        justify-content: space-between;

        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }

        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }

  .delete-button {
    width: 50px;
    height: 100%;
  }
}

.empty {
  width: 50%;
  margin: 200px auto 0;
  text-align: center;

  .empty-cart {
    width: 150px;
    margin-bottom: 20px;
  }

  .van-icon-smile-o {
    font-size: 50px;
  }

  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
}

.submit-all {
  margin-bottom: 50px;
}

.van-checkbox {
  margin-left: 0px;
}

.van-submit-bar__text {
  margin-right: 10px;
}

.van-submit-bar__button {
  background: red;
}
</style>
