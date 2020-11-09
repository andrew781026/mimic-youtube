<template>
    <div class="detail-root" :style="{height:showHeight,width:showWidth}">
        <video-player :height="showHeight" :width="showWidth"/>
        <h2 class="truncate" :title="title">{{title}}</h2>
        <span>
            第1220部《雖然是精神病但沒關係 / 虽然是精神病但没关系 / 사이코지만 괜찮아》我是谷阿莫的主頻道，影片主要會在這邊更新，若是主頻道出問題，可以去其他頻道觀看。
            <br>
            ｜副 頻 道：https://reurl.cc/6ROXb
            <br>
            ｜休閒頻道：https://bit.ly/2UhcK5y
            <br>
            ｜大家來說故事頻道：https://reurl.cc/Oo36y
            <br>

            想看跟我生活有關的影片，可以訂閱我的新頻道。
            <br>
            ｜谷阿莫Life：https://goo.gl/TYhtGM
            <br>

            －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
            <br>
            我是谷阿莫，very good的阿莫，科科，來這邊只是聽我說一個我喜歡的故事，我不評論原始故事背後的含意或導演拍攝的用意，因為那些東西每個人都有不同的看法，有空還是要自己去看原創故事喔，謝謝。

            <br>
            －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
            <br>
            這些地方也能看到谷阿莫。
            <br>
            谷阿莫臉書：https://www.facebook.com/amogood/
            <br>
            谷阿莫ＩＧ：https://www.instagram.com/imamogood/
            <br>
            聯絡信箱：amoverygood@gmail.com
            <br>
        </span>
    </div>
</template>

<script>
    import VideoPlayer from '@/components/VideoPlayer'
    import {mapActions} from "vuex";

    export default {
        name: "Detail",
        components: {
            'video-player': VideoPlayer,
        },
        mounted() {

            this.setTitle('影片明細');

            window.addEventListener('resize', this.reportWindowSize);
        },
        beforeDestroy() {

            window.removeEventListener('resize', this.reportWindowSize);
        },
        methods: {
            ...mapActions({
                setTitle: '[title] SET_TITLE',
            }),
            reportWindowSize() {

                this.height = window.innerHeight;
                this.width = window.innerWidth;
            },
        },
        computed: {
            showHeight() {

                const width = this.width;
                return `${Math.floor(width / 320) * 180}px`
            },
            showWidth() {

                const width = this.width;
                return `${Math.floor(width / 320) * 320}px`
            },
        },
        data() {

            return {
                title: '【谷阿莫】20分鐘看完20小時 G神不良的帥哥美女電視劇 金秀賢、徐睿知 2020《雖然是精神病但沒關係》',
                width: window.innerWidth,
                height: window.innerHeight,
            }
        },
    }
</script>

<style scoped>

    .detail-root {
        text-align: left;
    }
</style>