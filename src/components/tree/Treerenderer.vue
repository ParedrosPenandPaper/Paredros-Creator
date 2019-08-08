<template>
    <div class="tree-renderer-container">
        <svg class="canvas" width="100%" height="100%"></svg>
    </div>
</template>

<script>
    //import D3 from 'd3'

    export default {
        computed: {
            adventure() {
                return this.$store.state.adventureObject
            }
        }
    }
</script>

<style scoped>
    .tree-renderer-container{
        width: 100%;
        height: 100%;
    }

    .canvas{

    }
</style>