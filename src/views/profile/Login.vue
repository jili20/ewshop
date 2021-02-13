<template>
  <!-- 用户登录 -->
  <div>
    <nav-bar>
      <template v-slot:default>登录</template>
    </nav-bar>

    <div style="margin-top: 50px;">
      <div style="text-align: center;padding-top: 50px;">
        <van-image
            width="10rem"
            height="5rem"
            fit="contain"
            src="https://www.lmonkey.com/_nuxt/img/logo.ca1ae0c.png"
        />
      </div>
    </div>

    <van-form @submit="onSubmit">
      <van-field
          v-model="email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="请输入正确格式的电子邮箱"
          :rules="[{ required: true, message: '请填写电子邮箱' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <div class="link-login" @click="$router.push({path:'/register'})">
          没有账号，立即注册
        </div>
        <van-button round block type="info" color="#44b883" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar"; // 1-1 引入顶部导航组件
import {ref, reactive, toRefs} from 'vue';
import {login} from '@/network/user';
import {Notify, Toast} from 'vant';
import {useRouter} from 'vue-router';

export default {
  name: "Login",
  components: {
    NavBar
  },
  setup() {
    const router = useRouter()

    const userinfo = reactive({
      email: '',
      password: ''
    })

    const onSubmit = () => {
         // 账户： eduha@qq.com    密码：aaaaaa
        login(userinfo).then(res=>{
          // console.log(res.access_token)
          // 将 token 保存在本地，localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
          // window.localStorage.setItem(key,value) \  window.localStorage.getItem(key)
          window.localStorage.setItem('token',res.access_token)

          // 在 vuex  isLogin
          Toast.success('登录成功！')

          userinfo.email=''
          userinfo.password=''

          setTimeout(()=>{
            router.go(-1) // 从哪来回哪儿去
          },500)
        })
    }

    return {
      ...toRefs(userinfo),
      onSubmit
    }
  }
}
</script>

<style scoped>
.link-login{
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  float: right;
}

</style>
