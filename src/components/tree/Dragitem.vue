<template>
    <div class="item-container">
        <p class="label-container">
            {{label}}
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            label: String
        }
    }
</script>

<style scoped>
    .item-container{
        width: 50px;
        height: 50px;
        cursor: move;

        border: 1px solid steelblue;
        border-radius: 25px;
    }

    .label-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>