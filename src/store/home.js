
import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'

// home模块小仓库
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations = {
    CETGORYLIST(state, categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
const actions = {

    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code == 200){
            commit('CETGORYLIST',result.data)
        }
    },

    
   async getBannerList({commit}){
    let result = await reqGetBannerList()
    if(result.code == 200){
        commit('GETBANNERLIST',result.data)
    }
    },
    
   async getFloorList({commit}){
      let result = await reqFloorList();
      if(result.code == 200){
        commit('GETFLOORLIST',result.data)
      }
    }
    
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}