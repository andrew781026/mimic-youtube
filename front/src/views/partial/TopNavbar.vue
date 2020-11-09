<template>
    <header class="top-header-root" :style="{height}">
        <div class="flex-1">
            <h1>列表頁</h1>
        </div>
        <search-bar :default-text="searchText" placeholder="請輸入查詢文字" @search="search"/>
        <img class="avatar" :src="avatar" alt="rufe">
    </header>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import SearchBar from '@/components/SearchBar'

    export default {
        name: "TopNavbar",
        components: {
            'search-bar': SearchBar
        },
        props: {
            height: String
        },
        computed: {
            ...mapGetters({
                searchText: '[searchText] getSearchText',
            }),
        },
        methods: {
            ...mapActions({
                search: '[searchText] SEARCH',
            }),
        },
        data() {


            return {
                avatar: require('@/assets/user.png'),
                // avatar: require('@/assets/rufe.png'),
            }
        }
    }
</script>

<style scoped lang="scss">

    .top-header-root {

        padding: 0 30px 0 30px;

        display: flex;
        z-index: 2000;
        width: 100vw;
        position: fixed;
        align-items: center;
        flex-direction: row;
        top: 0;
        left: 0;

        /* offset-x | offset-y | blur-radius | spread-radius | color */
        box-shadow: 0 5px 7px 4px rgba(0, 0, 0, 0.1);
    }

    .avatar {

        padding: 3px;
        object-fit: cover;
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }

</style>