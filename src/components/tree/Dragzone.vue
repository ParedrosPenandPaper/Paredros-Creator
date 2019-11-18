<template>
    <div class="drag-zone-container">
        <drag-item v-for="(item,index) in dragItems" :key="index" :template="item"></drag-item>
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
                },
                {
                    label: dataElements.itemLabel,
                    constructor: dataElements.Item
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

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        align-items: center;
    }
</style>