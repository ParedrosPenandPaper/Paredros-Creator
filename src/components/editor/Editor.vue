<template>
    <div class="editor-container">
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
                return this.$store.state.adventureObject.story
            }
        },
        watch: {
            adventure: {
                handler(newValue){
                    this.storyItems = flattenAdventureRecursively(newValue, [])
                },
                deep: true
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
    .editor-container {
        padding-right: 8em;

        overflow-y: scroll;
        scroll-behavior: smooth;
    }
</style>
