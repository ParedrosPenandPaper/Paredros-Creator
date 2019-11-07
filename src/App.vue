<template>
    <div id="app">
        <menuebar id="menuebar"></menuebar>
        <tree id="tree"></tree>
        <editor></editor>
        <modal id="modal-container" v-show="this.$store.state.modal.show"></modal>
        <content-view id="content-view" v-show="this.$store.state.content.show"></content-view>
    </div>
</template>

<script>
    import axios from 'axios'
    import Editor from './components/editor/Editor.vue'
    import Menuebar from './components/menuebar/Menuebar.vue'
    import Tree from './components/tree/Tree.vue'
    import Modal from './components/modal/modalContainer.vue'
    import ContentView from './components/content/contentView.vue'

    //import localDataOne from '../data/example1.json'
    //import localDataTwo from '../data/example2.json'
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
            //this.$store.commit('addChapter', "bitte sei am Ende neu neu")
            
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

        font-family: Avenir;
    }

    #menuebar{
        grid-area: menue;
    }

    #tree{
        grid-area: tree;
    }

    #editor{

    }

    #modal-container {

    }
</style>
