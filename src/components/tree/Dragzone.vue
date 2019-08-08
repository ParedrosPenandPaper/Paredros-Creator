<template>
    <div class="drag-zone-container">
        <drag-item v-for="(item,index) in dragItems" :key="index" :label="item"></drag-item>
    </div>
</template>

<script>
    import DragItem from './Dragitem.vue'

    export default {
        data: function(){
            return {
                dragItems: [ 'CH', 'SC', 'CHAR', 'LOC', 'ITEM' ]
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