import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'; // 类似 element ui 框架

import { Swipe, SwipeItem } from 'vant'; // 轮播图组件

createApp(App)
    .use(Swipe).use(SwipeItem) // 轮播图组件
    .use(store).use(router).mount('#app')
