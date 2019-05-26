<template>
    <div class="scene-root">
        <div class="scene-panel" :style="'background-color: ' + color">
            <editor-paragraph
                    :paragraph="scene.p"
                    paragraph-id="p"
                    @set-focus="color='lightblue'"
                    @focus-set="color='#e0e0e0'"
                    @paragraph-edited.self="receiveInput"
            ></editor-paragraph>
        </div>
        <button class="delete-scene-button"></button>
    </div>
</template>

<script>
    import EditorParagraph from './Editor_Paragraph.vue'

    export default{
        data: function(){
            return {
                color: '#e0e0e0'
            }
        },
        props: {
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
    .scene-root{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: stretch;
    }

    .scene-panel{
        border-radius: 20px;
        margin: 5px;
        padding: 5px;
    }

    .delete-scene-button{
        display: none;
        width: 100px;
        margin: 5px 5px 5px 0px;
        border-radius: 5px;
        background-color: red;
    }

    .scene-root:hover > .delete-scene-button{
        display: inline;
    }
</style>
