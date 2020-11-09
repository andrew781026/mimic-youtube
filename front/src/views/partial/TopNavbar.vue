<template>
    <header class="top-header-root" :style="{height}">
        <div class="top-icon-wrapper">
            <i class="fa fas fa-home icons" style="font-size: 40px"></i>
            <i class="fa fas fa-heart icons" style="font-size: 34px"></i>
            <i class="fa fas fa-film icons" style="font-size: 40px"></i>
            <i class="fab fa-youtube icons" style="font-size: 40px"></i>
        </div>
        <div class="flex-1">
            <h1>{{title}}</h1>
        </div>
        <search-bar class="search-bar"
                    :default-text="searchText"
                    placeholder="請輸入查詢文字"
                    @search="search"
        />
        <img class="avatar" :src="avatar" alt="rufe" @click="toggleMenu">
        <float-menu v-if="menuShow" :show="menuShow"/>
    </header>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import SearchBar from '@/components/SearchBar'
    import FloatMenu from '@/components/FloatMenu'

    export default {
        name: "TopNavbar",
        components: {
            'search-bar': SearchBar,
            'float-menu': FloatMenu,
        },
        props: {
            height: String
        },
        computed: {
            ...mapGetters({
                searchText: '[searchText] getSearchText',
                title: '[title] getTitle',
            }),
        },
        methods: {
            ...mapActions({
                search: '[searchText] SEARCH',
            }),
            toggleMenu() {

                this.menuShow = !this.menuShow
            }
        },
        data() {

            return {
                menuShow: false,
                avatar: require('@/assets/user.png'),
                // avatar: require('@/assets/rufe.png'),
            }
        }
    }
</script>

<style scoped lang="scss">

    .search-bar {

        @media (max-width: 500px) {
            display: none;
        }
    }

    .top-icon-wrapper {

        @media (max-width: 700px) {
            display: none;
        }

        .icons {
            margin-right: 20px;
            cursor: pointer;

            &:hover {
                color: #f50202;
            }

            &:active {
                color: darken(#f50202, 8%);
            }
        }
    }

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

        cursor: pointer;
        padding: 3px;
        object-fit: cover;
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }

</style>