<template>
        <div class="tree-container" v-bind:style="setBackground()">
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
        },
        methods: {
            setBackground() {
                if (this.$store.state.currentDragSelection !== null) {
                    return "background-image: radial-gradient(#fff,#d8d8d8)"
                }
                return null
            }
        }
    }
</script>

<style scoped>
    .tree-container{
        display: flex;
        flex-flow: row nowrap;
        justify-content: stretch;
        align-items: center;
        z-index: 10;
        border-radius: 5em;
    }
</style>