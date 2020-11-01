<template>
    <div class="list-root">
        <template v-for="(video ,index) in videos">
            <div class="card" :key="`video-${index}`">
                <img :src="video.img" :alt="video.title">
                <div class="star-wrapper">

                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "List",
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
                        img: '',
                        star: true,// 收藏與否
                        length: 574, // 單位 (秒)
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .list-root {
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        width: 100vw;
    }

    .card {
        position: relative;
        height: 150px;
        width: 150px;
        margin: 10px;
    }

    .star-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background-color: #333333;
        color: white;
    }
</style>