// 封装通用网络请求
// 安装axios $ npm i axios -s
import axios from "axios";
import {Notify} from 'vant';  // ⚪️ 1-1 消息提示组件

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn/', // 根路径，网关统一入口路径
        timeout: 5000 // 请求超时时间，请求达到5秒，不让请求
    })
    // 请求拦截
    instance.interceptors.request.use(config => {
        // 如果有一个接口需要认证才可以访问，就在这里统一设置

        // 直接放行
        return config;
    }, error => {
        // 什么也不要做
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res) // 这里可以打印所有的数据
        return res.data ? res.data : res; // 封装获取数据 data 路径
    }, err => {
        // 如果有需要授权才可以访问的接口，统一去 login 授权

        // 如果有错误，这里会处理,显示错误信息
        // console.log(err)
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
    })

    return instance(config)
}
