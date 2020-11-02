<template>
    <div id="app">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "./css/button-theme.scss";
    @import "./css/common-style.scss";

    *{
        box-sizing: border-box;
    }

    html,body{
        height: 100%;
    }

    body {
        margin: 0;
    }

    #app {
        font-family:微軟正黑體, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

</style>
