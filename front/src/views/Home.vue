<template>
    <div class="home-root">
        <top-navbar :height="headerHeight"/>
        <main class="home-main" :style="{marginTop:headerHeight,height:`calc(100vh - ${headerHeight})`}">
            <router-view/>
        </main>
    </div>
</template>

<script>
    import TopNavbar from './partial/TopNavbar'

    export default {
        name: "Home",
        components: {
            'top-navbar': TopNavbar,
        },
        data() {

            return {
                headerHeight: '80px'
            }
        },
    }
</script>

<style scoped lang="scss">

    .home-root {
        flex-direction: column;
        display: flex;
        height: 100vh;
        width: 100vw;
    }

    .home-main{
        padding:20px;
        height: 100vh;
        overflow: auto;
    }

</style>