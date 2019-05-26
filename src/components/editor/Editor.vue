<template>
    <div class="editor-container">
        <meta-panel
                :meta="data.meta"
        ></meta-panel>
        <adventure-panel
                :adventure="data.adventure"
                @scene-paragraph-adventure-received="receiveSceneChapter"
                @chapter-paragraph-adventure-received="receiveChapterParagraph"
                @adventure-paragraph-received="receiveAdventureParagraph"
        ></adventure-panel>
    </div>
</template>

<script>
    import MetaPanel from './Meta_Panel.vue'
    import AdventurePanel from './Adventure_Panel.vue'

    export default {
        props: {
            data: Object
        },
        components: {
            MetaPanel,
            AdventurePanel
        },
        methods: {
            receiveSceneChapter(chapter){
                this.$emit('scene-paragraph-edited', chapter)
            },
            receiveChapterParagraph(chapterParagraph){
                this.$emit('chapter-paragraph-edited', chapterParagraph)
            },
            receiveAdventureParagraph(adventureParagraph){
                this.$emit('adventure-paragraph-edited', adventureParagraph)
            }
        }
    }
</script>

<style scoped>
    .editor-container {
        background-color: #c4c4c4;
        overflow: scroll;
    }
</style>
