
import {reqGetSearchList} from '@/api'

// home模块小仓库
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
const actions = {
  async getSearchList({commit},searchParams){
     let result =  await reqGetSearchList(searchParams);
     if(result.code == 200){
        commit('GETSEARCHLIST',result.data)
     }
    }
    
};
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    total(state){
        return state.searchList.total
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}