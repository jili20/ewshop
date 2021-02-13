<template>
  <div>
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>

    <div style="margin: 100px 15px 15px 15px;">
      <van-button round block color="#44BA80" @click="tologout">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import {logout} from "@/network/user";
import {Toast} from 'vant';
import {useRouter} from 'vue-router';

export default {
  name: "Profile",
  components: {
    NavBar // 1-2 注册组件
  },
  setup() {
    const router = useRouter()

    const tologout = () => {
      logout().then(res => {
        if (res.status === 204) {
          Toast.success('退出成功！')
          // 清除 token window.localStorage
          window.localStorage.setItem('token', '')
          // 500毫秒 退出到 登录页面
          setImmediate(()=>{
            router.push({path:'/login'})
          },500)
        }
      })
    }

    return {
      tologout
    }
  }
}
</script>

<style scoped>

</style>
