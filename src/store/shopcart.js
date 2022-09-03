import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'
//规范:利用vuex存储数据
import { SET_USERID } from '@/utils/USER_ID';
const state ={
    //vuex仓库存储用户临时身份,vuex存储数据确实非持久化的，SET_USERID执行返回结果,可是本地存储获取的！！
    // USER_ID: SET_USERID(),
    cartList: []
};
const mutations ={
    GETCARLIST(state,cartList){
        state.cartList = cartList
    }
};
const actions ={
    // 获取购物车数据
    async  getCarList({commit}){
        let result =  await reqCartList()
        // console.log(result);
        if(result.code == 200){
            commit('GETCARLIST',result.data)
        }
    },   
    // 删除购物车某一个产品
    async deleteCartById({commit},skuId){
       let result = await reqDeleteCartById(skuId)
       if(result.code == 200){
            return'ok'      
       }else{
            return Promise.reject(new Error('faile'))
       }
    },
    // 删除选中商品
    deleteAllCheckedCart({getters,dispatch}){
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartById',item.skuId) : '';
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll);
    },
    // 修改购物车某一商品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code == 200){
            return'ok'      
        }else{
            return Promise.reject(new Error('faile'))
       }
    },
    // 全选
    allUpdateChecked({getters,dispatch},isChecked){
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById',{skuId:item.skuId, isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
  
};
const getters ={
    cartList(state){
        return state.cartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}