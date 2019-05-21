<template>
    <div class="scene-panel-container">
        <editor-paragraph>{{scene.p}}</editor-paragraph>
    </div>
</template>

<script>
    import EditorParagraph from './Editor_Paragraph.vue'

    export default{
        props:{
            scene: Object
        },

        components:{
            EditorParagraph
        }
    }
</script>

<style>
    .scene-panel-container{
        border: 1px dotted gray;
        border-radius: 20px;
        margin: 5px;
        padding: 5px;
        background-color: #e0e0e0;
    }
</style>