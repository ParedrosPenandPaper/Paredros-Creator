<template>
    <div class="scene-panel-container">
        <editor-paragraph
                :paragraph="scene.p"
                paragraph-id="p"
                @paragraph-edited.self="receiveInput"
        ></editor-paragraph>
    </div>
</template>

<script>
    import EditorParagraph from './Editor_Paragraph.vue'

    export default{
        props:{
            sceneId: String,
            scene: Object
        },
        methods: {
            receiveInput(input) {
                this.$emit(
                    'scene-paragraph-received',
                    {
                        sceneId: this.sceneId ,
                        paragraphId: input.paragraphId,
                        paragraph: input.paragraph
                    }
                )
            }
        },
        components:{
            EditorParagraph
        }
    }
</script>

<style scoped>
    .scene-panel-container{
        border: 1px dotted gray;
        border-radius: 20px;
        margin: 5px;
        padding: 5px;
        background-color: #e0e0e0;
    }
</style>
