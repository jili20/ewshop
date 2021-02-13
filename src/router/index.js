import {createRouter, createWebHistory} from 'vue-router'
// import Home from '../views/Home.vue' // 不使用这种方式
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Detail = () => import('@/views/detail/Detail')
const Profile = () => import('@/views/profile/Profile')
const ShopCart = () => import('@/views/shopcart/ShopCart')
const Register = () => import('@/views/profile/Register')
const Login = () => import('@/views/profile/Login')

const routes = [
    {
        path: '', // 访问空路由让它加载 Home 主键
        name: 'DefaultHome',
        component: Home,
        meta: {
            title: '图书兄弟'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '图书兄弟'
        }
    },
    {
        path: '/category',
        name: 'category',
        component: Category,
        meta: {
            title: '图书兄弟-书本分类'
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta: {
            title: '图书兄弟-书本详情'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: '图书兄弟-个人中心'
        }
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,
        meta: {
            title: '图书兄弟-购物车'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '图书兄弟-用户注册'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '图书兄弟-用户注册'
        }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 添加路由导航守卫：路由跳转之前
router.beforeEach((to, from, next) => {
    // 如果没有登录，在这里到 login
    next() // 放行
    document.title = to.meta.title
})

export default router
