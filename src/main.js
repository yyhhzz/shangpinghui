import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from './store';
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
import '@/mock/mockServe';
import * as API from '@/api'


// 引入element组件
import {MessageBox,} from 'element-ui'
// 挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入表单验证插件
import '@/plugins/validate'

new Vue({
    render: h => h(App),
    // 配置全局事件总线
    beforeCreate(){
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    //注册路由   
    router,
    //注册仓库
    store
}).$mount('#app')
