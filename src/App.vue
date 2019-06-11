<template>
    <div id="app">
        <menuebar id="menuebar"></menuebar>
        <tree id="tree"></tree>
        <editor
                id="editor"
                :data="localData"
                @scene-paragraph-edited="editSceneParagraph"
                @chapter-paragraph-edited="editChapterParagraph"
                @adventure-paragraph-edited="editAdventureParagraph"
                @delete-scene-editor="deleteScene"
        ></editor>
    </div>
</template>

<script>
    import Vue from 'vue'
    import localData from '../data/paredros_data.json'
    import Editor from './components/editor/Editor.vue'
    import Menuebar from './components/menuebar/Menuebar.vue'
    import Tree from './components/tree/Tree.vue'

    export default {
        name: 'app',
        data: function() {
            return{
                localData
            }
        },
        components: {
            Editor,
            Menuebar,
            Tree
        },
        methods: {
            editSceneParagraph(pathObj){
                this.localData.adventure[pathObj.chapterId][pathObj.sceneId][pathObj.paragraphId] = pathObj.paragraph
                alert('scene paragraph successfully edited!')
            },
            editChapterParagraph(pathObj){
                this.localData.adventure[pathObj.chapterId][pathObj.paragraphId] = pathObj.paragraph
                alert('chapter paragraph successfully edited!')
            },
            editAdventureParagraph(pathObj){
                this.localData.adventure[pathObj.paragraphId] = pathObj.paragraph
                alert('adventure paragraph successfully edited!')
            },
            deleteScene(pathObj){
                 Vue.delete(this.localData.adventure[pathObj.chapterId], pathObj.sceneId)
            }
        }
    }
</script>

<style scoped>
    #app {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 33% 67%;
        grid-template-rows: 10% 90%;
        grid-template-areas:
                "menue menue"
                "tree editor";
    }

    #menuebar{
        grid-area: menue;
    }

    #tree{
        grid-area: tree;
    }

    #editor{
        grid-area: editor;
        border: 1px solid black;
        padding: 5px;
    }
</style>
