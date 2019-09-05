<template>
    <div id="editor-container">
        <p v-for="(panelContent, index) in panelContents" :key="index">
            {{panelContent.formatted()}}
        </p>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        data: function() {
            return {
                panelContents: []
            }
        },
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
                this.panelContents = renderEditorPanelsRecursively (this.adventure, new Array())
            })
        }
    }

    function renderEditorPanelsRecursively (chapter, panelContents) {
        // // panel for this chapter
        // let chapterPanelSelection = d3.select('#editor-container')
        //     .append('div')
        //     .attr('contenteditable', 'true')
        //     .text(chapter.title + '\n' + chapter.text)
        //     .classed('editor-panel', true)

        // // panels for all scenes one after the other
        // chapter.paths.forEach(path => {
        //     path.forEach(scene => {
        //         chapterPanelSelection
        //             .append('div')
        //             .attr('contenteditable', 'true')
        //             .text(scene.title + '\n' + scene.text)
        //             .classed('editor-panel scene-panel', true)
        //     })
        // })
        chapter.paths.forEach(path => {
            path.forEach(scene => 
            {
                let scenePanelContent = new PanelContent('scene', scene.title, scene.text)
                panelContents.push(scenePanelContent)
            })
        })
        
        let chapterPanelContent = new PanelContent('chapter', chapter.title, chapter.text)
        panelContents.push(chapterPanelContent)

        let children = chapter.children
        if(children && children.length > 0) children.forEach(child => renderEditorPanelsRecursively(child, panelContents))

        return panelContents
    }

    function PanelContent(type, title, text){
        this.type = type
        this.title = title
        this.text = text
        this.formatted = () => `${title}: ${text}`
    }

</script>

<style scoped>
    #editor-container {
        background-color: #c4c4c4;
        overflow-y: scroll;
    }
</style>
