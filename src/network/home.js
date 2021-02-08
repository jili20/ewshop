import {request} from "@/network/request";

export function getHomeAllData(){
    return request({
        url:'/api/index',
        method:'get' // 如果是 get 方法，可以写，可以不写
    })
}
