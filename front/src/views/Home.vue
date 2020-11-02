<template>
    <div class="home-root">
        <div class="bg-img"/>
        <div class="login-wrapper">
            <h1>歡迎來到 `電影街`</h1>
            <input type="text" id="username">
            <input type="text" id="password">
            <button id="login" @click="login">登入</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            login() {
                this.$router.push({name: "List"});
            }
        }
    }
</script>

<style scoped>

    .login-wrapper{

        z-index: 3;

        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;
        height: 350px;
        width: 500px;

        /* offset-x | offset-y | blur-radius | spread-radius | color */
        box-shadow: 0 4px 7px 1px rgba(0, 0, 0, 0.3);
        border-radius: 20px;
    }

    .home-root {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }

    .bg-img{
        position: fixed;
        left: 0;
        top:0;
        height: 100vh;
        width: 100vw;
        background-image: url("../assets/video-wall.jpg");
        opacity: 0.2;
    }
</style>