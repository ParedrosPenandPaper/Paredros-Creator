<template>
    <div class="drag-zone-container">
        <drag-item v-for="(item,index) in dragItems" :key="index" :template="item"></drag-item>
        <!---<drag-item :template="'CHAR'"></drag-item>
        <drag-item :template="'LOC'"></drag-item>
        <drag-item :template="'ITEM'"></drag-item>--->
    </div>
</template>

<script>
    import DragItem from './Dragitem.vue'
    import * as dataElements from "../../util/DataElements";

    export default {
        data: function(){
            return {
                dragItems: [ {
                    label: dataElements.chapterLabel,
                    constructor: dataElements.Chapter
                },
                {
                    label: dataElements.sceneLabel,
                    constructor: dataElements.Scene
                },
                {
                    label: dataElements.characterLabel,
                    constructor: dataElements.Character
                },
                {
                    label: dataElements.locationLabel,
                    constructor: dataElements.Location
                }]
            }
        },
        components: {
            DragItem
        }
    }
</script>

<style scoped>
    .drag-zone-container{
        height: 100%;
        width: 70px;
        background-color: #c4c4c4;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        align-items: center;

        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>