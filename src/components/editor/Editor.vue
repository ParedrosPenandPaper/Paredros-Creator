<template>
    <div id="editor-container">

    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        computed: {
            adventure() {
                return this.$store.state.adventureObject[1]
            }
        },
        components: {
        },
        methods: {
            
        },
        mounted() {
            this.$nextTick(() => {
                renderEditorPanelsRecursively (this.adventure)
            })
        }
    }

    function renderEditorPanelsRecursively (chapter) {
        // panel for this chapter
        d3.select('#editor-container')
            .append('div')
            .text(chapter.text)

            // panels for all scenes one after the other

        let children = chapter.children
        if(children && children.length > 0) children.forEach(child => renderEditorPanelsRecursively(child))
    }

</script>

<style scoped>
    #editor-container {
        background-color: #c4c4c4;
        overflow-y: scroll;
    }
</style>
