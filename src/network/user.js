import {request} from "@/network/request";

// 用户注册
export function register(data) {
    return request({
        url: '/api/auth/register',
        method:'POST',
        data
    })
}
