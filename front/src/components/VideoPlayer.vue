<template>
    <div class="video-root" :style="{height,width}">
        <video class="video-part"
               ref="video"
               controls
        />
        <template v-if="advertiseShow">
            <img class="img-part"
                 :src="require('@/assets/little-red-hat.jpg')"
                 alt="小紅帽"
            >
            <div class="resume-playing" @click="playVideo">
                繼續撥放 ▶️
            </div>
        </template>
    </div>
</template>

<script>
    import Hls from 'hls.js';

    export default {
        name: "VideoPlayer",
        props: {
            // 影片連結
            url: {
                type: String,
                default: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            },
            height: {
                type: String,
                default: `${180 * 2}px`
            },
            width: {
                type: String,
                default: `${320 * 2}px`
            },
        },
        data() {

            return {
                advertiseShow: false
            }
        },
        methods: {
            playVideo() {

                const video = this.$refs.video;
                video.play();
            }
        },
        mounted() {

            if (Hls.isSupported()) {

                // video 的預設圖片 = poster
                const video = this.$refs.video;
                const hls = new Hls();
                hls.attachMedia(video);

                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    // console.log("video and hls.js are now bound together !");
                    hls.loadSource(this.url);
                });

                // show the height and width of video
                hls.on(Hls.Events.LEVEL_SWITCHED, (evt, data) => {
                    const level = hls.levels[data.level];
                    if (level) {
                        console.log(`qualityChange ${level.width}x${level.height}`);
                    }
                });

                video.addEventListener("pause", () => {

                    console.log('video pause ✋');
                    this.advertiseShow = true;
                    this.$emit('pause');
                });

                video.addEventListener("play", () => {

                    console.log('video play 🚀');
                    this.advertiseShow = false;
                    this.$emit('play');
                });
            }
        },
    }
</script>

<style scoped lang="scss">

    .video-root {
        position: relative;

        .video-part {
            width: 100%;
            height: 100%;
        }

        .img-part {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        .resume-playing {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #423a3a;
            height: 50px;
            width: 200px;
            bottom: 50px;
            right: 0;
            position: absolute;
            color: #e7e7e7;
            font-size: 30px;
        }
    }

</style>