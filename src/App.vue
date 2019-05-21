<template>
  <div>
    <editor id="app" :data="localData">

    </editor>
    <menuebar>

    </menuebar>
    <tree>

    </tree>
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

<style>
#app {
  
}
</style>
