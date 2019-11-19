<template>
    <div id="app">
        <menuebar id="menuebar"></menuebar>
        <tree id="tree"></tree>
        <editor id="editor"></editor>
        <modal id="modal-container" v-show="this.$store.state.modal.show"></modal>
        <content-view id="content-view" v-show="this.$store.state.content.show"></content-view>
        <div class="tree-mask" v-show="this.$store.state.currentDragSelection !== null"></div>
    </div>
</template>

<script>
    import Editor from './components/editor/Editor.vue'
    import Menuebar from './components/menuebar/Menuebar.vue'
    import Tree from './components/tree/Tree.vue'
    import Modal from './components/modal/modalContainer.vue'
    import ContentView from './components/content/contentView.vue'

    import localDataThree from '../data/example3.json'

    export default {
        name: 'app',
        data: function() {
            return {
                value: false
            }
        },
        components: {
            Editor,
            Menuebar,
            Tree,
            Modal,
            ContentView
        },
        methods: {
            
        },
        mounted() {
            this.$store.commit('setAdventureObject', localDataThree)            
        }
    }
</script>

<style scoped>
    #app {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 40% 60%;
        grid-template-rows: 10% 90%;
        grid-template-areas:
                "menue menue"
                "tree editor";

        background-image: radial-gradient(#fff,#d8d8d8);
    }

    #menuebar{
        grid-area: menue;
    }

    #tree{
        grid-area: tree;
    }

    #editor{
        grid-area: editor;
    }

    #modal-container {

    }

    .tree-mask {
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        display: table;
    }
</style>
