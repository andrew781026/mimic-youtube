import Vue from 'vue'
import Vuex from 'vuex'
import VideoService from "@/services/videoService";
import FavoriteService from "@/services/favoriteService";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: '首頁',
        login: '',       // user 登入資訊
        videos: [],      // user 查詢的影片
        starVideos: [],  // user 喜好的影片
        pageNumber: 1,
        numPerPage: 12,
        searchText: 'amoung us 台灣',  // 查詢的字串
    },
    mutations: {
        '[title] SET_TITLE': (state, title) => state.title = title,
        '[searchText] SET_SEARCH_TEXT': (state, searchText) => state.searchText = searchText,
        '[starVideos] SET_STAR_VIDEOS': (state, starVideos) => state.starVideos = starVideos,
        '[videos] SET_VIDEOS': (state, videos) => state.videos = videos,
        '[videos] TOGGLE_SINGLE_FAVORITE': (state, newVideo) => {

            const index = state.videos.findIndex(video => video.id === newVideo.id);
            state.videos.splice(index, 1, newVideo);
        },
        '[pageNumber] SET_PAGE_NUMBER': (state, pageNumber) => state.pageNumber = pageNumber,
        '[pageNumber] PREV_PAGE': (state) => --state.pageNumber,
        '[pageNumber] NEXT_PAGE': (state) => ++state.pageNumber,
    },
    actions: {
        '[title] SET_TITLE': ({commit}, title) => {

            document.title = title;
            commit('[title] SET_TITLE', title);
        },
        '[searchText] SET_SEARCH_TEXT': ({commit}, searchText) => commit('[searchText] SET_SEARCH_TEXT', searchText),
        '[searchText] SEARCH': async ({commit}, searchText) => {

            const {videos, nextPageToken, prevPageToken} = await VideoService.getVideos(searchText);

            commit('[searchText] SET_SEARCH_TEXT', searchText);
            commit('[videos] SET_VIDEOS', videos);

            return {videos, nextPageToken, prevPageToken}
        },
        '[starVideos] INIT_STAR_VIDEOS': async ({commit}) => {

            const starVideos = await VideoService.getFavoriteVideos();
            commit('[starVideos] SET_STAR_VIDEOS', starVideos);
            return starVideos
        },
        '[starVideos] SET_STAR_VIDEOS': ({commit}, starVideos) => commit('[starVideos] SET_STAR_VIDEOS', starVideos),
        '[videos] SET_VIDEOS': ({commit}, videos) => commit('[videos] SET_VIDEOS', videos),
        '[videos] TOGGLE_SINGLE_FAVORITE': async ({commit}, orgVideo) => {

            const newVideo = {...orgVideo, isFav: !orgVideo.isFav};
            await FavoriteService.toggleFavorite(orgVideo);
            commit('[videos] TOGGLE_SINGLE_FAVORITE', newVideo);

            return newVideo;
        },
        '[pageNumber] PREV_PAGE': ({commit}) => commit('[pageNumber] PREV_PAGE'),
        '[pageNumber] NEXT_PAGE': ({commit}) => commit('[pageNumber] NEXT_PAGE'),
    },
    getters: {
        '[title] getTitle': state => state.title,
        '[searchText] getSearchText': state => state.searchText,
        '[pageNumber] getPageNumber': state => state.pageNumber,
        '[numPerPage] getNumPerPage': state => state.numPerPage,
        '[pageNumber] hasPrevPage': state => state.pageNumber > 1,
        '[pageNumber] hasNextPage': state => arrayName => {

            const pageNumber = state.pageNumber;
            const numPerPage = state.numPerPage;
            const nextPageItems = state[arrayName].slice(numPerPage * pageNumber, numPerPage * (pageNumber + 1));
            return nextPageItems.length > 0;
        },
        '[starVideos] getStarVideos': state => {

            const pageNumber = state.pageNumber;
            const numPerPage = state.numPerPage;
            return state.starVideos.slice(numPerPage * (pageNumber - 1), numPerPage * pageNumber);
        },
        '[videos] getVideos': state => {

            const pageNumber = state.pageNumber;
            const numPerPage = state.numPerPage;
            return state.videos.slice(numPerPage * (pageNumber - 1), numPerPage * pageNumber);
        },
    },
    modules: {}
})
