<template>
    <div class="list-root">
        <div class="card"
             :key="`video-${index}`"
             v-for="(video ,index) in videos"
             @click="goDetail"
        >
            <div class="image-wrapper">
                <img class="image" :src="video.img" :alt="video.title">
                <div class="length-wrapper">{{video.length}}</div>
            </div>
            <div style="text-align: left;padding: 10px">
                <span>標題：{{video.title}}</span>
                <br>
                <span>描述：{{video.description}}</span>
            </div>
            <div class="star-wrapper" @click="setStar(video,index)">
                <i id="heart-icon"
                   class="fa fas fa-heart"
                   :class="[video.isStar ? 'is-starred':'not-starred']"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        methods: {
            setStar(video, index) {

                const newVideo = {...video, isStar: !video.isStar};
                this.videos.splice(index, 1, newVideo);
            },
            goDetail() {

                this.$router.push({name: "Detail"});
            },
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
                videos: [
                    {
                        title: '小紅帽',
                        description: '安徒生童話故事 , 描寫小女孩一個人探訪奶奶的故事',
                        img: require('@/assets/little-red-hat.jpg'),
                        isStar: true,// 收藏與否
                        length: 574, // 單位 (秒)
                    },
                    {
                        title: '三隻小豬',
                        description: '三隻小豬買房且遇到大灰狼的故事',
                        img: require('@/assets/three-pigs.jpg'),
                        isStar: false,// 收藏與否
                        length: 574, // 單位 (秒)
                    },
                    {
                        title: '白雪公主之巫婆的告白',
                        description: '你知道壞後母其實沒有要毒殺白雪公主，這個罪名是被人栽贓的嗎?',
                        img: require('@/assets/witch.jpg'),
                        isStar: false,// 收藏與否
                        length: 574, // 單位 (秒)
                    },
                ]
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
        cursor: pointer;
        position: relative;
        height: 250px;
        width: 250px;
        margin: 10px;
        border: 1px solid #333;
    }

    .image-wrapper {
        height: 150px;
        overflow: hidden;
        position: relative;
        background-color: #423a3a;

        .image {
            object-fit: cover;
            width: 100%;
        }

        .length-wrapper {
            user-select: none;
            position: absolute;
            background-color: #423a3a;
            bottom: 0;
            right: 0;
            width: 100px;
            height: 20px;
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
        background-color: #423a3a;
        padding: 6px 0 0 8px;
        text-align: left;

        &:hover {
            /* offset-x | offset-y | blur-radius | spread-radius | color */
            box-shadow: 0 4px 7px 1px rgba(0, 0, 0, 0.3);
        }

        &:active {
            /* offset-x | offset-y | blur-radius | spread-radius | color */
            box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.4);
        }

        .is-starred {
            color: #f30303;
        }

        .not-starred {
            color: #ffffff;
        }
    }
</style>