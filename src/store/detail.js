
import { reqGoodsInfo,reqAddorUpdateShopCart } from "@/api";
import { SET_UERID } from "@/utils/USER_ID"
const state = {
    goodInfo:{},
    uuid_token:SET_UERID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    // 获取商品信息
    async  getGoodInfo({commit},skuId){
      let result = await reqGoodsInfo(skuId)
      if(result.code == 200){
        commit('GETGOODINFO',result.data)
      }
    },
    // 添加购物车
    async addorUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddorUpdateShopCart(skuId,skuNum)
        console.log(result);
        if(result.code == 200){
            return "ok"
        }else{
            // 添加购物车失败，返回失败的Promise
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || {}
    }

};

export default {
    state,mutations,actions,getters
}