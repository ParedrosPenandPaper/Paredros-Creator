<template>
    <div class="adventure-panel-container">
        <div v-for="(prop, name) in adventure" :key="name"> <!-- iterator div -->
            <chapter-panel v-if="isChapter(prop)" :chapter="prop"></chapter-panel> <!-- receives chapter object and deconstructs it into scenes the same way as adventure-panel does with adventure -->
            <editor-paragraph v-if="isParagraph(prop)">{{prop}}</editor-paragraph> <!-- only contains text and is contenteditable -->
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
    .adventure-panel-container{
        border: 1px solid black;
        border-radius: 20px;
        margin: 5px;
        padding: 5px;
    }
</style>