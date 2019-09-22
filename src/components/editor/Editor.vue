<template>
    <div id="editor-container">
        <editor-panel v-for="(item, index) in storyItems" :key="index" :storyItem="item">

        </editor-panel>
    </div>
</template>

<script>
    import EditorPanel from './Editorpanel.vue'

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
                storyItems.push(scene)
            })
        })
        
        storyItems.push(chapter)

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
