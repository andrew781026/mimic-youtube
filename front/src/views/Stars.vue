<template>
    <div class="list-root">
        <template v-for="(video ,index) in videos">
            <div class="card" :key="`video-${index}`" @click="openLink(video.id)">
                <div class="image-wrapper">
                    <img class="image" :src="video.img" :alt="video.title">
                    <div class="length-wrapper">
                        {{parse(video.length)}}
                    </div>
                </div>
                <div class="text-left p-6">
                    <div class="truncate">標題：{{video.title}}</div>
                    <span class="line-clamp">描述：{{video.description}}</span>
                </div>
                <div class="star-wrapper" @click.stop="setStar(video,index)">
                    <i id="heart-icon"
                       class="fa fas fa-heart"
                       :class="[video.isStar ? 'is-starred':'not-starred']"/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import YoutubeUtils from '@/utils/youtubeUtils';

    export default {
        name: "Stars",
        methods: {
            parse(videoLength) {

                // youtube 給出的時間資訊 PT2H3M8S , 需要轉換格式
                const timeArr = videoLength.replace('PT', '').split(/[HMS]/);

                const padLeft = (arr, index) => {

                    const num = arr[index];

                    if (!num) return '00';
                    else if (num.length === 1) return `0${num}`;
                    else return num;
                }

                if (timeArr.length === 2) return `00:00:${padLeft(timeArr, 0)}`;
                else if (timeArr.length === 3) return `00:${padLeft(timeArr, 0)}:${padLeft(timeArr, 1)}`;
                else if (timeArr.length === 4) return `${padLeft(timeArr, 0)}:${padLeft(timeArr, 1)}:${padLeft(timeArr, 2)}`;
                else return '';
            },
            setStar(video, index) {

                const newVideo = {...video, isStar: !video.isStar};
                this.videos.splice(index, 1, newVideo);
            },
            openLink(videoId) {

                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            }
        },
        mounted() {

            YoutubeUtils.searchVideo({
                maxResults: 12,
                q: 'amoung us',
                part: 'snippet,contentDetails',
                chart: 'mostPopular',
                regionCode: 'TW'
            })
                .then(data => {

                    this.videos = data.items.map(item => {

                        const snippet = item.snippet;
                        const contentDetails = item.contentDetails;

                        return {
                            id: item.id,
                            length: contentDetails.duration,   // PT2H37M38S
                            publishedAt: snippet.publishedAt,
                            title: snippet.title,
                            description: snippet.description,
                            img: snippet.thumbnails.standard.url,
                            isStar: false,
                        }
                    });
                })
                .catch(console.error);
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
                videos: []
            }
        }
    }
</script>

<style scoped lang="scss">

    // 多行 ellipsis : https://css-tricks.com/almanac/properties/l/line-clamp/
    .line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    // 單行 ellipsis : https://css-tricks.com/almanac/properties/l/line-clamp/
    .truncate {
        text-overflow: ellipsis;

        /* Needed to make it work */
        overflow: hidden;
        white-space: nowrap;
    }

    .list-root {
        display: flex;
        flex-wrap: wrap;
        width: 100vw;
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