import Vue from 'vue'
import Vuex from 'vuex'
import VideoService from "@/services/videoService";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: '',       // user 登入資訊
        starVideos: [],  // user 喜好的影片
        pageNumber: 1,
        numPerPage: 12,
        searchText: 'amoung us 台灣',  // 查詢的字串
    },
    mutations: {
        '[searchText] SET_SEARCH_TEXT': (state, searchText) => state.searchText = searchText,
        '[starVideos] SET_STAR_VIDEOS': (state, starVideos) => state.starVideos = starVideos,
        '[pageNumber] SET_PAGE_NUMBER': (state, pageNumber) => state.pageNumber = pageNumber,
        '[pageNumber] PREV_PAGE': (state) => --state.pageNumber,
        '[pageNumber] NEXT_PAGE': (state) => ++state.pageNumber,
    },
    actions: {
        '[searchText] SET_SEARCH_TEXT': ({commit}, searchText) => commit('[searchText] SET_SEARCH_TEXT', searchText),
        '[searchText] SEARCH': async ({commit}, searchText) => {

            const {videos, nextPageToken, prevPageToken} = await VideoService.getVideos(searchText);

            commit('[searchText] SET_SEARCH_TEXT', searchText);
            commit('[starVideos] SET_STAR_VIDEOS', videos);

            return {videos, nextPageToken, prevPageToken}
        },
        '[starVideos] SET_STAR_VIDEOS': ({commit}, starVideos) => commit('[searchText] SET_STAR_VIDEOS', starVideos),
        '[pageNumber] PREV_PAGE': ({commit}) => commit('[pageNumber] PREV_PAGE'),
        '[pageNumber] NEXT_PAGE': ({commit}) => commit('[pageNumber] NEXT_PAGE'),
    },
    getters: {
        '[searchText] getSearchText': state => state.searchText,
        '[pageNumber] getPageNumber': state => state.pageNumber,
        '[pageNumber] hasPrevPage': state => state.pageNumber > 1,
        '[pageNumber] hasNextPage': state => {

            const pageNumber = state.pageNumber;
            const numPerPage = state.numPerPage;
            const nextPageItems = state.starVideos.slice(numPerPage * pageNumber, numPerPage * (pageNumber + 1));
            return nextPageItems.length > 0;
        },
        '[starVideos] getStarVideos': state => {

            const pageNumber = state.pageNumber;
            const numPerPage = state.numPerPage;
            return state.starVideos.slice(numPerPage * (pageNumber - 1), numPerPage * pageNumber);
        },
    },
    modules: {}
})
