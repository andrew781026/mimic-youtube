<template>
    <div class="list-root">
        <template v-for="(video ,index) in videos">
            <div class="card" :key="`video-${index}`" @click="openLink(video.id)">
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
                <div class="star-wrapper" @click.stop="setStar(video,index)">
                    <i id="heart-icon"
                       class="fa fas fa-heart"
                       :class="[video.isFav ? 'is-starred':'not-starred']"/>
                </div>
            </div>
        </template>
        <div>
            <h1 @click="goPrev">上一頁</h1>
            <h1 @click="goNext">下一頁</h1>
        </div>
    </div>
</template>

<script>
    import VideoService from '@/services/videoService';
    import FavoriteService from '@/services/favoriteService';

    export default {
        name: "Stars",
        methods: {
            showVideos(pageToken) {

                VideoService.getVideos(pageToken)
                    .then(({videos, nextPageToken, prevPageToken}) => {

                        this.videos = videos;
                        this.nextPageToken = nextPageToken;
                        this.prevPageToken = prevPageToken;
                    })
                    .catch(console.error);
            },
            goPrev() {

                this.showVideos(this.prevPageToken);
            },
            goNext() {

                this.showVideos(this.nextPageToken);
            },
            setStar(video, index) {

                const newVideo = {...video, isFav: !video.isFav};

                FavoriteService.toggleFavorite(video)
                    .then(() => this.videos.splice(index, 1, newVideo))
                    .catch(console.error);
            },
            openLink(videoId) {

                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            },
        },
        mounted() {

            this.showVideos();
        },
        data() {

            /*
                2. 收藏功能
                3. 影片資訊需有包含：
                    1. 圖片
                    1. 影片長度
                    1. 影片標題
                    1. 影片描述
            */

            return {
                videos: [],
                nextPageToken: undefined,
                prevPageToken: undefined,
            }
        }
    }
</script>

<style scoped lang="scss">

    .list-root {
        display: flex;
        flex-wrap: wrap;
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

    .star-wrapper {
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