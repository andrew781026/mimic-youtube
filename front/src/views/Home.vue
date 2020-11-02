<template>
    <div class="home-root">
        <h1>歡迎來到 `影片街`</h1>
        <input type="text" id="username">
        <input type="text" id="password">
        <button id="login" @click="login">登入</button>
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
    .home-root {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }
</style>