import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'; // 类似 element ui 框架

import {Swipe, SwipeItem, Lazyload, Badge} from 'vant'; // Swipe SwipeItem 轮播图组件；Lazyload 懒加载;徽标 Badge；

createApp(App)
    .use(Swipe).use(SwipeItem).use(Lazyload, {
    loading: require('./assets/images/default.png') // 设置先加载默认图片，请求的图片过来覆盖默认图片
}).use(Badge)
    .use(store).use(router).mount('#app')
