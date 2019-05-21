<template>
    <div id="app">
        <menuebar id="menuebar"></menuebar>
        <tree id="tree"></tree>
        <editor id="editor" :data="localData"></editor>
    </div>
</template>

<script>
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
        }
    }
</script>

<style scoped>
    #app {
        width: 97vw;
        height: 97vh;
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
