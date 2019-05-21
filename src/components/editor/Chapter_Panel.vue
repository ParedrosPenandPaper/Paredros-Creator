<template>
    <div class="chapter-panel-container">
        <div v-for="(prop, name) in chapter" :key="name">
            <scene-panel v-if="isChapter(prop)" :scene="prop"></scene-panel>
            <editor-paragraph v-if="isParagraph(prop)">{{prop}}</editor-paragraph>
        </div>
    </div>
</template>

<script>
    import ScenePanel from './Scene_Panel.vue'
    import EditorParagraph from './Editor_Paragraph.vue'

    export default{
        props:{
            chapter: Object
        },
        components:{
            ScenePanel,
            EditorParagraph
        },
        methods:{
            isChapter: function(prop){
                return typeof(prop) === 'object'
            },
            isParagraph: function(prop){
                return typeof(prop) === 'string'
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
    }
</style>