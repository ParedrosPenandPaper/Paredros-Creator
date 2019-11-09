<template>
    <div class="tree-container">
        <dragzone></dragzone>
        <dropzone></dropzone>
    </div>
</template>

<script>
    import Dragzone from './Dragzone.vue'
    import Dropzone from './Dropzone.vue'

    export default {
        components: {
            Dragzone,
            Dropzone
        }
    }
</script>

<style scoped>
    .tree-container{
        display: flex;
        flex-flow: row nowrap;
        justify-content: stretch;
        align-items: center;
        padding-left: 1em;
    }
</style>