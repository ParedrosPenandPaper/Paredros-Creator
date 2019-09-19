<template>
    <div id="editor-container">
        <editor-panel v-for="(item, index) in storyItems" :key="index" :storyItem="item">

        </editor-panel>
    </div>
</template>

<script>
    // import * as d3 from 'd3'
    import EditorPanel from './Editorpanel.vue'
    import * as DataElements from '../../util/DataElements.js'

    export default {
        components: {
            EditorPanel
        },
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
        watch: {
            adventure(newValue){
                this.storyItems = flattenAdventureRecursively(newValue, new Array())
            }
        }
    }

    function flattenAdventureRecursively(chapter, storyItems) {
        chapter.paths.forEach(path => {
            path.forEach(scene => 
            {
                storyItems.push(new DataElements.Scene(scene.title, scene.text))
            })
        })
        
        storyItems.push(new DataElements.Chapter(chapter.title, chapter.children, chapter.content, chapter.paths, chapter.text))

        let children = chapter.children
        if(children && children.length > 0) children.forEach(child => flattenAdventureRecursively(child, storyItems))

        return storyItems
    }

</script>

<style scoped>
    #editor-container {
        background-color: #c4c4c4;
        overflow-y: scroll;
    }
</style>
