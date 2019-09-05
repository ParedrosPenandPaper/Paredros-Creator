<template>
    <div id="editor-container">
        <editor-panel v-for="(item, index) in storyItems" :key="index" :storyItem="item">

        </editor-panel>
    </div>
</template>

<script>
    // import * as d3 from 'd3'
    import EditorPanel from './Editorpanel.vue'

    export default {
        data: function() {
            return {
                storyItems: []
            }
        },
        computed: {
            adventure() {
                return this.$store.state.adventureObject[1]
            }
        },
        components: {
            EditorPanel
        },
        methods: {
            
        },
        mounted() {
            this.$nextTick(() => {
                this.storyItems = flattenAdventureRecursively(this.adventure, new Array())
            })
        }
    }

    function flattenAdventureRecursively(chapter, storyItems) {
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
                let storyItem = new StoryItem('scene', scene.title, scene.text)
                storyItems.push(storyItem)
            })
        })
        
        let storyItem = new StoryItem('chapter', chapter.title, chapter.text)
        storyItems.push(storyItem)

        let children = chapter.children
        if(children && children.length > 0) children.forEach(child => flattenAdventureRecursively(child, storyItems))

        return storyItems
    }

    function StoryItem(type, title, text){
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
