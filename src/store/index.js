import {createStore} from 'vuex'
// 状态管理; 文件拆分； 引入拆分的文件
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const state = {
    user: {
        // isLogin: false
        isLogin: window.localStorage.getItem('token') ? true : false
    },
    cartCount: 0 // 购物车数量
}

export default createStore({
    state,
    mutations,
    actions,
    getters
})
