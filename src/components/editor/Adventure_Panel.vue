<template>
    <div class="adventure-panel-container" :style="'background-color: ' + color">
        <div v-for="(prop, name) in adventure" :key="name">
            <chapter-panel
                    v-if="isChapter(prop)"
                    :chapter="prop"
                    :chapter-id="name"
                    @scene-paragraph-chapter-received="receiveSceneParagraph"
                    @chapter-paragraph-chapter-received="receiveChapterParagraph"
            ></chapter-panel>
            <editor-paragraph
                    v-if="isParagraph(prop)"
                    :paragraph="prop"
                    :paragraph-id="name"
                    @set-focus="color='lightblue'"
                    @focus-set="color='white'"
                    @paragraph-edited.self="receiveAdventureParagraph"
            ></editor-paragraph>
        </div>
    </div>
</template>

<script>
    import ChapterPanel from './Chapter_Panel.vue'
    import EditorParagraph from './Editor_Paragraph.vue'

    export default{
        data: function(){
            return {
                color: 'white'
            }
        },
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
