// 所有的状态管理必须要经过这里，唯一的路径
const mutations = {
    // 是否登录
    setIsLogin(state, payload) {
        state.user.isLogin = payload
    },
    // 购物车数量
    addCart(state, payload) {
        state.cartCount = payload.count
    }
}

export default mutations
