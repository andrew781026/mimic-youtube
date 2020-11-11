<template>
    <div class="star-root">
        <h1 class="text-left">收藏影片</h1>
        <div class="list-root">
            <div v-for="(video ,index) in starVideos"
                 :key="`video-${index}`"
                 class="card"
                 @click="openLink(video.id)"
            >
                <div class="inner-card">
                    <div class="image-wrapper">
                        <img class="image" :src="video.img" :alt="video.title">
                        <div class="length-wrapper">
                            {{video.length}}
                        </div>
                    </div>
                    <div class="text-left p-6">
                        <div class="truncate">標題：{{video.title}}</div>
                        <span class="line-clamp">描述：{{video.description}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-wrapper">
            <h1 @click="hasPrevPage && goPrev()" class="prevPage" :class="[ !hasPrevPage && 'disabled']">
                <i class="fa fas fa-angle-left arrow-icon"></i>
                上一頁
            </h1>
            <h1>|</h1>
            <h1 @click="hasNextPage('starVideos') && goNext()" class="nextPage" :class="[ !hasNextPage('starVideos') && 'disabled']">
                下一頁
                <i class="fa fas fa-angle-right arrow-icon"></i>
            </h1>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Stars",
        computed: {
            ...mapGetters({
                starVideos: '[starVideos] getStarVideos',
                pageNumber: '[pageNumber] getPageNumber',
                hasPrevPage: '[pageNumber] hasPrevPage',
                hasNextPage: '[pageNumber] hasNextPage',
            }),
        },
        methods: {
            ...mapActions({
                setTitle: '[title] SET_TITLE',
                goPrev: '[pageNumber] PREV_PAGE',
                goNext: '[pageNumber] NEXT_PAGE',
                initStarVideos: '[starVideos] INIT_STAR_VIDEOS',
            }),
            showVideos() {

                this.initStarVideos()
                    // .then(console.log)
                    .catch(console.error);
            },
            openLink(videoId) {

                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            },
        },
        mounted() {

            this.showVideos();
            this.setTitle('收藏影片');
        },
        data() {

            return {}
        }
    }
</script>

<style scoped lang="scss">

    .page-wrapper {

        display: flex;
        justify-content: center;

        .prevPage, .nextPage {

            user-select: none;
            cursor: pointer;
            margin-right: 20px;
            margin-left: 20px;
            padding: 0 10px 5px 10px;

            &:not(.disabled):hover {

                background-color: #4dabf7;
            }

            &:not(.disabled):active {

                background-color: darken(#4dabf7, 12%);;
            }
        }

        .arrow-icon {
            font-size: 1.4em;
            font-weight: 900;
            transform: translateY(2px);
            padding: 0 10px;
        }

        .disabled {
            cursor: not-allowed;
            color: #909399;
        }

    }

    .list-root {
        display: flex;
        flex-wrap: wrap;
    }

    .star-root {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .card {
        user-select: none;
        cursor: pointer;
        position: relative;
        height: 250px;
        width: 250px;
        margin: 10px;
        border: 1px solid #333;
    }

    .inner-card {
        height: 100%;
        width: 100%;

        &::before {
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            content: "";
            position: absolute;
            background-color: #333;
            transition: all 0.2s;
            opacity: 0;
        }

        &:hover {

            &::before {
                opacity: 0.4;
            }
        }

        &:active {

            &::before {
                opacity: 0.6;
            }
        }
    }

    .image-wrapper {
        height: 150px;
        overflow: hidden;
        position: relative;
        background-color: #423a3a;

        .image {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }

        .length-wrapper {
            user-select: none;
            position: absolute;
            background-color: #423a3a;
            bottom: 0;
            right: 0;
            width: 100px;
            height: 24px;
            color: #e7e7e7;
        }

    }

    .fav-wrapper {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        height: 40px;
        width: 40px;
        border-radius: 0 0 100% 0;
        background-color: #474040;
        padding: 6px 0 0 8px;
        text-align: left;

        &:hover {
            /* offset-x | offset-y | blur-radius | spread-radius | color */
            box-shadow: 0 4px 7px 1px rgba(0, 0, 0, 0.3);
            background-color: darken(#423a3a, 4%);
        }

        &:active {
            /* offset-x | offset-y | blur-radius | spread-radius | color */
            box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.4);
            background-color: darken(#423a3a, 8%);
        }

        .is-starred {
            color: #f30303;
        }

        .not-starred {
            color: #ffffff;
        }
    }
</style>