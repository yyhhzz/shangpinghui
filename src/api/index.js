// 接口API统一管理
import requests from "./requests";
import mockRequests from "./mockRequests"
console.log();
// 三级分类
export const reqCategoryList = () => {
    //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
    //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
    //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
    return requests({ method: 'get', url: '/product/getBaseCategoryList' });
 }

 // 获取首页banner mock数据
 export const reqGetBannerList = ()=>mockRequests({method:'get', url:'/banner'})

 // 获取floor数据
 export const reqFloorList = ()=>mockRequests({method:'get',url:'/floor'})

// 获取search界面数据
export const reqGetSearchList = (params)=> requests({method:'post',url:'/list',data:params})

// 获取商品详情
export const reqGoodsInfo = (skuId) =>  requests({method:'get',url:`/item/${ skuId }`})

// 添加或更新购物车
export const reqAddorUpdateShopCart = (skuId,skuNum) =>  requests({method:'post',url:`/cart/addToCart/${ skuId }/${ skuNum }`})

// 获取购物车列表
export const reqCartList = () => requests({method:'get',url:'/cart/cartList'})

// 删除购物车产品
export const reqDeleteCartById = (skuId) => requests({method:'delete',url:`/cart/deleteCart/${skuId}`});

// 切换商品选中状态
export const reqUpdateCheckedById = (skuID,isChecked) => requests({method:'get',url:`/cart/checkCart/${skuID}/${isChecked}`})

// 获取验证码
export  const reqGetCode = (phone) => requests({method:'get',url:`/user/passport/sendCode/${phone}`})

// 注册
export const reqUserRegister = (data) => requests({method:'post',url:'/user/passport/register',data})

// 登录
export const reqUserLogin = (data) => requests({method:'post',url:'/user/passport/login',data})

// 获取用户信息
export const reqUserInfo = ()=> requests({method:'get',url:'/user/passport/auth/getUserInfo'})

// 退出登录
export const reqLogout = () => requests({method:'get',url:'/user/passport/logout'})

// 获取用户地址信息
export const reqAddressInfo = ()=> requests({method:'get',url:'/user/userAddress/auth/findUserAddressList'})

// 获取商品清单
export const reqOrderInfo = ()=> requests({method:'get',url:'/order/auth/trade'})

// 提交订单
export const reqSubmitOrder = (tradeNo,data)=> requests({method:'post',url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data})

// 获取支付信息
export const reqPayInfo = (orderId)=> requests({method:'get',url:`/payment/weixin/createNative/${orderId}`})

// 获取支付订单状态
export const reqPayStatus = (orderId)=> requests({method:'get',url:`/payment/weixin/queryPayStatus/${orderId}`})

// 获取个人中心列表
export const reqMyOrderList = (page,limit)=> requests({method:'get',url:`/order/auth/${page}/${limit}`})