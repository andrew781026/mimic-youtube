<template>
    <video ref="video" controls></video>
</template>

<script>
    import Hls from 'hls.js';

    export default {
        name: "VideoPlayer",
        props: {
            // 影片連結
            url: {
                type: String,
                // required: true,
                default: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            }
        },
        mounted() {

            if (Hls.isSupported()) {

                const video = this.$refs.video;
                const hls = new Hls();
                hls.attachMedia(video);

                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    // console.log("video and hls.js are now bound together !");
                    hls.loadSource(this.url);
                });

            }
        }
    }
</script>

<style scoped>

</style>