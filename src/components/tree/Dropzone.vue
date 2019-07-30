<template>
    <div class="drop-zone-container">
        <tree-renderer></tree-renderer>
    </div>
</template>

<script>
    import TreeRenderer from './Treerenderer.vue'

    export default {
        components: {
            TreeRenderer
        }
    }
</script>

<style scoped>
    .drop-zone-container{
        height: 100%;
        width: calc(100% - 60px);
    }
</style>