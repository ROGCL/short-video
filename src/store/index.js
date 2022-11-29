import Vue from "vue";
import Vuex from "vuex";

// 该指令必须在 store 创建之前执行
Vue.use(Vuex);

// State: 用于存储数据
const state = {
    userinfo: {}, //用户信息
    reDrawInfo: {}, // 重置绘画的数据
    combosInfo:{} //套餐信息，提供给作品页使用
};

// Actions(行动): 处理交互行为
const actions = {};

// Mutations(变化): 修改 state 中的数据
const mutations = {
    setUserInfo(playload, data) {
        playload.userinfo = data;
    },
    setreDrawInfo(playload, data) {
        playload.reDrawInfo = data;
    },
};

// 创建并导出 store
export default new Vuex.Store({
    actions,
    mutations,
    state,
});