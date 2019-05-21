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
        border: 1px solid gray;
        padding: 5px;
        margin: 5px;
    }

    .meta-panel-item{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
</style>