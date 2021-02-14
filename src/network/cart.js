import {request} from "./request";

// 添加购物车
export function addCart(data) {
    return request({
        url: '/api/carts',
        method: 'post',
        data
    })
}

// 修改购物车, data = {num:1}
export function modifyCart(id, data) {
    return request({
        url: `/api/carts/${id}`,
        method: 'PUT',
        data
    })
}

// 选择商品的状态 checked, 参数为所有选中的 ID
export function checkedCart(data) {
    return request({
        url: '/api/carts/checked',
        method: 'PATCH',
        data
    })
}

// 获取购物车列表
export function getCart(data = '') {
    return request({
        url: '/api/carts?' + data
    })
}

// 删除购物车
export function deleteCart(id) {
    return request({
        url: `/api/carts/${id}`,
        method: 'DELETE'
    })
}


