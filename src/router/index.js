// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//引入仓库
import store from '@/store'

//使用插件
Vue.use(VueRouter)

// 重写push replace 解决编程式导航连续点击报错的问题
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}


//配置路由
let router =  new VueRouter({
    //配置路由
    routes:[
        {
            path:"/center",
            component:()=>import('@/pages/Center'),
            meta:{show:true},//路由元信息
            // 二级路由
            children:[
                {
                    path:'myorder',
                    component:()=>import('@/pages/Center/MyOrder')
                },
                {
                    path:'grouporder',
                    component:()=>import('@/pages/Center/GoupOrder')
                },
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        }
        ,
        {
            path:"/paysuccess",
            component:()=>import('@/pages/PaySuccess'),
            meta:{show:true},//路由元信息
            name:"paysuccess",
        }
        ,
        {
            path:"/pay",
            component:()=>import('@/pages/Pay'),
            meta:{show:true},//路由元信息
            name:"pay",
            beforeEnter: (to, from, next) => {
                // 只能从tarde前往pay
                if(from.path == '/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        }
        ,
        {
            path:"/trade",
            component:()=>import('@/pages/Trade'),
            meta:{show:true},//路由元信息
            name:"trade",
            // 路由独享守卫，只能从shopcart前往trade
            beforeEnter: (to, from, next) => {
                if(from.path == '/shopcart'){
                    next()
                }else{
                    next(false)
                }
            }
        }
        ,
        {
            path:"/shopcart",
            component:()=>import('@/pages/ShopCart'),
            meta:{show:true},//路由元信息
            name:"shopcart",
        }
        ,
        {
            path:"/addcartsuccess",
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{show:true},//路由元信息
            name:"addcartsuccess",
        }
        ,
        {
            path:"/detail/:skuId?",
            component:()=>import('@/pages/Detail'),
            meta:{show:true}//路由元信息
        }
        ,
        {
            path:"/home",
            component:()=>import('@/pages/Home'),
            meta:{show:true}//路由元信息
        },
        {
            path:"/login",
            component:()=>import('@/pages/Login'),
            meta:{show:false}
        },
        {
            path:"/register",
            component:()=>import('@/pages/Register'),
            meta:{show:false}
        },
        {
            path:"/search/:keyword?",
            component:()=>import('@/pages/Search'),
            meta:{show:true},
            name:"search"
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    // 跳转后滚动到顶部
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }

})
export default router

// 全局前置守卫，路由跳转之前判断
router.beforeEach(async(to,from,next)=>{

    let hasToken = store.state.user.token
    let hasName = store.state.user.name
    if(hasToken){
        if(to.path == '/login' || to.path == "/register") {
            next('/home') //用户登录了，再次访问登录界面，跳转首页
        }else{
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('userLogout');
                    //回到登录页,获取新的token
                    next('/login');
                }
            }
        }
    }else{
        // 用户未登录
        let toPath = to.path
            if(toPath.indexOf('trade')!=-1 || toPath.indexOf('pay')!=-1 || toPath.indexOf('center')!=-1){
                next('/login?redirect='+toPath);
            }else{
                next();
            }
    }
})


 