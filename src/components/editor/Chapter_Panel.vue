<template>
    <div class="chapter-panel-container">
        <div v-for="(prop, name) in chapter" :key="name">
            <scene-panel
                    v-if="isChapter(prop)"
                    :scene="prop"
                    :scene-id="name"
                    @scene-paragraph-received="receiveSceneParagraph"
            ></scene-panel>
            <editor-paragraph
                    v-if="isParagraph(prop)"
                    :paragraph="prop"
                    :paragraph-id="name"
                    @paragraph-edited.self="receiveInput"
            ></editor-paragraph>
        </div>
    </div>
</template>

<script>
    import ScenePanel from './Scene_Panel.vue'
    import EditorParagraph from './Editor_Paragraph.vue'

    export default{
        props:{
            chapterId: String,
            chapter: Object
        },
        components:{
            ScenePanel,
            EditorParagraph
        },
        methods:{
            isChapter(prop){
                return typeof(prop) === 'object'
            },
            isParagraph(prop){
                return typeof(prop) === 'string'
            },
            receiveSceneParagraph(sceneParagraph){
                this.$emit('scene-paragraph-chapter-received',
                    {
                        chapterId: this.chapterId,
                        sceneId: sceneParagraph.sceneId,
                        paragraphId: sceneParagraph.paragraphId,
                        paragraph: sceneParagraph.paragraph
                    }
                )
            },
            receiveInput(input){
                this.$emit('chapter-paragraph-chapter-received',
                    {
                        chapterId: this.chapterId,
                        paragraphId: input.paragraphId,
                        paragraph: input.paragraph
                    }
                )
            }
        }
    }
</script>

<style>
    .chapter-panel-container{
        border: 1px solid black;
        border-radius: 20px;
        margin: 5px;
        padding: 5px;
        background-color: #f0f0f0;
    }
</style>
