import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'; // 类似 element ui 框架

// Swipe SwipeItem 轮播图组件；Lazyload 懒加载;徽标 Badge；Sidebar, SidebarItem 则边导航；
// Collapse, CollapseItem 折叠手风琴；Tab, Tabs 标签页；Card 商品卡片；
import {Card,Tab, Tabs,Swipe, SwipeItem, Lazyload, Badge,Sidebar, SidebarItem,Collapse, CollapseItem} from 'vant';

createApp(App)
    .use(Card).use(Tab).use(Tabs ).use(Swipe).use(SwipeItem).use(Lazyload, {
    loading: require('./assets/images/default.png') // 设置先加载默认图片，请求的图片过来覆盖默认图片
}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem)
    .use(store).use(router).mount('#app')
