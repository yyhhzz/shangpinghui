// 二次封装axios
import axios, { Axios } from 'axios';
// 引入进度条
import nProgress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css' // 可以在css文件修改颜色
import store from '@/store';

// create 方法创造一个axios实例
const requests = axios.create({
    // 基础路径
    baseURL:'/api',
    // 代表请求超时的时间为5秒
    timeout:5000
})

// 1.请求拦截器
requests.interceptors.request.use((config)=>{
    nProgress.start(); //进度条开始
    
    // 配置对象里的headers请求头很重要
    if(store.state.detail.uuid_token){
        // 请求头添加字段userTempId，和后端确定
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    
    return config;
})

// 2.响应拦截器
requests.interceptors.response.use((res)=>{

    nProgress.done();// 进度条结束
    // 成功的回调函数：服务器相应的数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'))
})

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;