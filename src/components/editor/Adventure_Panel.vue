<template>
    <div class="adventure-panel-container">
        <div v-for="(prop, name) in adventure" :key="name"> <!-- iterator div -->
            <chapter-panel
                    v-if="isChapter(prop)"
                    :chapter="prop"
                    :chapter-id="name"
                    @scene-paragraph-chapter-received="receiveceneParagraph"
                    @chapter-paragraph-chapter-received="receiveChapterParagraph"
            ></chapter-panel> <!-- receives chapter object and deconstructs it into scenes the same way as adventure-panel does with adventure -->
            <editor-paragraph
                    v-if="isParagraph(prop)"
                    :paragraph="prop"
                    :paragraph-id="name"
                    @paragraph-edited="receiveAdventureParagraph"
            ></editor-paragraph> <!-- only contains text and is contenteditable -->
        </div>
    </div>
</template>

<script>
    import ChapterPanel from './Chapter_Panel.vue'
    import EditorParagraph from './Editor_Paragraph.vue'

    export default{
        props:{
            adventure: Object
        },
        components:{
            ChapterPanel,
            EditorParagraph
        },
        methods:{
            isChapter(prop){
                return typeof(prop) === 'object'
            },
            isParagraph(prop){
                return typeof(prop) === 'string'
            },
            receiveSceneParagraph(chapter){
                this.$emit('scene-paragraph-adventure-received', chapter)
            },
            receiveChapterParagraph(chapterParagraph){
                this.$emit('chapter-paragraph-adventure-received', chapterParagraph)
            },
            receiveAdventureParagraph(adventureParagraph){
                this.$emit('adventure-paragraph-received', adventureParagraph)
            }
        }
    }
</script>

<style scoped>
    .adventure-panel-container{
        border: 1px solid black;
        border-radius: 20px;
        margin: 5px;
        padding: 5px;
        background-color: white;
    }
</style>
