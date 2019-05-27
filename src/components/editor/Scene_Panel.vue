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
        <div class="delete-scene-button">
            <div class="delete-scene-button-image"></div>
        </div>
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
    }

    .scene-root:hover > .delete-scene-button{
        display: inline;
    }

    .delete-scene-button-image{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: rosybrown;
    }
</style>
