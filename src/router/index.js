import {createRouter, createWebHistory} from 'vue-router'
// import Home from '../views/Home.vue' // 不使用这种方式
const Home = () => import('@/views/home/Home')
const Categroy = () => import('@/views/category/Categroy')
const Detail = () => import('@/views/detail/Detail')
const Profile = () => import('@/views/profile/Profile')
const ShopCart = () => import('@/views/shopcart/ShopCart')

const routes = [
    {
        path: '', // 访问空路由让它加载 Home 主键
        name: 'DefaultHome',
        component: Home
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/categroy',
        name: 'Categroy',
        component: Categroy
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
