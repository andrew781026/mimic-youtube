import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: '',       // user 登入資訊
        starVideos: '',  // user 喜好的影片
        searchText: '',  // 查詢的字串
    },
    mutations: {},
    actions: {},
    modules: {}
})
