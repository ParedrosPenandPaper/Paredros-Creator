<template>
    <div class="meta-panel-container">
        <p class="meta-panel-item" v-for="(prop, name) in meta" :key="name">{{name + ': ' + prop}}</p>
    </div>
</template>

<script>
    export default{
        props:{
            meta: Object
        }
    }
</script>

<style>
    .meta-panel-container{
        border-radius: 20px;
        padding: 5px;
        margin: 5px 5px 10px;
        background-color: white;
    }

    .meta-panel-item{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
        margin-inline-start: 5px;
        margin-inline-end: 5px;
    }
</style>