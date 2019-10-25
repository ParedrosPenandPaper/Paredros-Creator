<template>
    <div id="app">
        <menuebar id="menuebar" @get-test-adventure="getTestAdventure"></menuebar>
        <tree id="tree"></tree>
        <editor></editor>
        <modal class="modal-container"></modal>
    </div>
</template>

<script>
    import axios from 'axios'
    import Editor from './components/editor/Editor.vue'
    import Menuebar from './components/menuebar/Menuebar.vue'
    import Tree from './components/tree/Tree.vue'
    import Modal from './components/modal/modalContainer.vue'

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
            Modal
        },
        methods: {
            getTestAdventure(){
                axios.get('http://it-projekt19-6.informatik.fh-nuernberg.de/getTestAdventure')
                    .then(response => (this.$store.commit('setAdventureObject', response)))
            }
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
        grid-area: editor;
        border: 1px solid black;
        padding: 5px;
    }

    .modal-container {
        position: absolute;
        top: 100px;
        left: 200px;
        padding: 60px;
        z-index: 100;
        background-color: lightgrey;
        border: solid 2px dimgrey;
    }
</style>
