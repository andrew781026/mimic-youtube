<template>
    <div class="search-bar-wrapper" title="搜尋檔案">
        <i class="fa fas fa-search search-bar-icon cursor-pointer" @click="doSearch"></i>
        <input type="text"
               :value="defaultText"
               class="search-bar"
               @input="changeText"
               @keyup.enter.stop.prevent="doSearch"
               :placeholder="placeholder">
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        props: {
            placeholder: String,
            defaultText: String,
        },
        methods: {
            changeText(event) {

                this.text = event.target.value;
            },
            doSearch() {

                this.$emit('search', this.text);
            }
        },
        data() {

            return {
                text: ''
            }
        },
    }
</script>

<style scoped lang="scss">

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
            margin: 0 0 0 10px;
            position: relative;
            padding: 23px 35px 23px 18px;
            width: 180px;
            height: 30px;
            background-color: #f1f3f5;
            border: 1px solid transparent;

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