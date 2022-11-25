import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from '@/router/index'
import store from "./store"; // 引入 store 文件

import axios from '@/util/axios';

Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
    store,
    router,
    render: h => h(App),
    beforeDestroy(){
        Vue.prototype.$bus = this
    }
}).$mount('#app')