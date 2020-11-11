<template>
    <div class="login-root">
        <div class="bg-img"/>
        <div class="login-wrapper">
            <div class="login-title">
                <div class="flex">
                    <div> 🐳</div>
                    <span class="mx-4">註冊帳號</span>
                    <div class="horizon-mirror"> 🐳</div>
                </div>
            </div>
            <div class="login-form">
                <p>帳號：</p>
                <input class="custom-input" type="text" id="username" placeholder="在此輸入帳號" v-model="username">
                <p>密碼：</p>
                <input class="custom-input"
                       type="password"
                       id="password"
                       placeholder="在此輸入密碼"
                       v-model="password"
                >
                <button id="register"
                        class="btn_sample w-full mt-12 mb-6"
                        :class="[!canRegister && 'disabled']"
                        @click="canRegister && register()"
                >
                    註冊
                </button>
                <span class="mb-24 text-red-500 font-900">{{error}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import FirebaseAuth from "@/utils/firebase/firebaseAuth";

    export default {
        name: "Register",
        computed: {
            canRegister() {

                return Boolean(this.username) && Boolean(this.password);
            }
        },
        mounted() {

            this.setTitle('註冊 | 電影街');
        },
        methods: {
            ...mapActions({
                setTitle: '[title] SET_TITLE',
            }),
            register() {

                /*
                let a = {
                    "p": {
                        "code": "auth/invalid-email",
                        "message": "The email address is badly formatted.",
                    },
                    "q": {
                        "code": "auth/weak-password",
                        "message": "Password should be at least 6 characters",
                    }
                };
                 */

                FirebaseAuth.createUserWithEmailAndPassword(this.username, this.password)
                    .then(() => this.$router.push({name: "Star"}))
                    .catch(e => {

                        const errMsg = FirebaseAuth.errorCodeMapper[e.code];
                        if (errMsg) this.error = errMsg;
                        else console.error(e);
                    })
            }
        },
        data() {

            return {
                username: '',
                password: '',
                error: '  ',
            }
        }
    }
</script>

<style scoped lang="scss">

    .custom-input {
        display: block;
        height: 40px;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1;
        width: 100%;
        color: #495057;
        background-color: #fff;
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

        @media (max-width: 500px) {
            width: 90%;
        }
    }

    .login-title {
        font-size: 50px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
    }

    .login-wrapper {

        z-index: 3;

        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;

        /* offset-x | offset-y | blur-radius | spread-radius | color */
        box-shadow: 0 4px 7px 1px rgba(0, 0, 0, 0.3);
        border-radius: 20px;

        height: 450px;
        width: 450px;

        @media (max-width: 500px) {
            width: 90vw;
        }
    }

    .login-root {
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

</style>