<template>
    <div class="home-root">
        <div class="bg-img"/>
        <div class="login-wrapper">
            <h1>歡迎來到 `電影街`</h1>
            <div class="login-form">
                <p>帳號：</p>
                <input class="custom-input" type="text" id="username"  placeholder="在此輸入帳號">
                <p>密碼：</p>
                <input class="custom-input" type="password" id="password"  placeholder="在此輸入密碼">
                <button id="login" class="btn_sample w-full mt-12 mb-24" @click="login">登入</button>
            </div>
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

<style scoped lang="scss">

    .custom-input{
        display: block;
        height: 40px;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1;
        width: 100%;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        padding-left: 15px;
        padding-right: 15px;

        &::placeholder {
            opacity: 0.9;
        }
    }

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 55%;
    }

    .login-wrapper {

        z-index: 3;

        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;
        height: 450px;
        width: 450px;

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

    .bg-img {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
        background-image: url("../assets/video-wall.jpg");
        opacity: 0.2;
    }


    /* ----- Button ------ */

    .btn_sample {
        cursor: pointer;
        color: #ffffff;
        background-color: #611BBD;
        border-color: #130269;
        border-radius: 4px;
        line-height: 2rem;

        &:hover,
        &:focus,
        &:active {
            color: #ffffff;
            background-color: #49247A;
            border-color: #130269;
        }

        &:active {
            outline: none;
            transform: translateY(2px);
        }
    }

    /* ----- Button ------ */
</style>