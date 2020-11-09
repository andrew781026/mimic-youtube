<template>
    <div class="menu-root">
        <span class="menu-item"
              :key="`menu-item-${index}`"
              @click="menu.onclick"
              v-for="(menu,index) in menus">
            {{menu.name}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "FloatMenu",
        data() {

            const goTargetPath = pathName => {

                if (this.$router.currentRoute.name !== pathName) {

                    this.$router.push({name: pathName})
                    this.$emit('hide');
                }
            }

            return {
                menus: [
                    {name: '登出', onclick: () => goTargetPath("Login")},
                    {name: '首頁', onclick: () => goTargetPath("ListVideo")},
                    {name: '收藏頁', onclick: () => goTargetPath("Star")},
                    {name: '列表頁', onclick: () => goTargetPath("ListVideo")},
                    {name: '撥放頁', onclick: () => goTargetPath("Detail")},
                ]
            }
        }
    }
</script>

<style scoped lang="scss">

    .menu-root {

        user-select: none;
        padding: 10px 0;
        position: fixed;
        right: 20px;
        top: 75px;
        z-index: 9000;
        background-color: #fee5e9;
        border-radius: 12px;
        display: flex;
        flex-direction: column;

        .menu-item {

            font-weight: 700;
            font-size: 20px;
            cursor: pointer;
            padding: 10px 30px;

            &:hover {
                color: #e7e7e7;
                background-color: darken(#fa8092, 6%);
            }

            &:active {
                color: #fff;
                background-color: darken(#fa8092, 17%);
            }
        }

        &::before {

            position: fixed;
            right: 50px;
            top: 55px;
            content: "";
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 10px 20px 10px;
            border-color: transparent transparent #fee5e9 transparent;
        }
    }
</style>