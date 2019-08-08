<template>
    <div class="item-container" draggable>
        <p class="label-container" draggable="false">
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

        display: flex;
        justify-content: center;

        cursor: move;
        border: 2px solid steelblue;
        border-radius: 25px;
    }

    .label-container{
        line-height: 18px;
    }
</style>