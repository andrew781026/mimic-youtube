<template>
    <header class="top-header-root" :style="{height}">
        <div style="flex:1;"></div>
        <div class="search-bar-wrapper" title="搜尋檔案">
            <i class="fa fas fa-search search-bar-icon"></i>
            <input type="text" class="search-bar" placeholder="請輸入查詢文字">
        </div>
        <img class="avatar" :src="require('@/assets/rufe.png')" alt="rufe">
    </header>
</template>

<script>
    export default {
        name: "TopNavbar",
        props: {
            height: String
        }
    }
</script>

<style scoped lang="scss">
    .top-header-root {

        padding: 0 30px 0 30px;

        display: flex;
        z-index: 2000;
        width: 100vw;
        position: fixed;
        align-items: center;
        flex-direction: row;
        top: 0;
        left: 0;

        /* offset-x | offset-y | blur-radius | spread-radius | color */
        box-shadow: 0 5px 7px 4px rgba(0, 0, 0, 0.1);
    }


    .avatar {

        object-fit: cover;
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }

    .search-bar-wrapper {

        position: relative;
        margin-right: 30px;

        .search-bar-icon {
            position: absolute;
            z-index: 2;
            right: 17px;
            top: -2px;
            height: 100%;
            display: flex;
            align-items: center;

            &:hover {
                color: #4dabf7;
            }
        }

        .search-bar {
            font-size: 1rem;
            border-radius: 40px;
            border: 0;
            margin: 0 0 0 10px;
            position: relative;
            padding: 23px 35px 23px 18px;
            width: 180px;
            height: 30px;
            background-color: #f1f3f5;

            &:focus {
                outline: none;
                border: 1px solid #4dabf7;

                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.0125), 0 0 8px rgba(34, 139, 230, 0.5);
            }

            &::placeholder {
                opacity: 0.9;
            }
        }
    }

</style>