<template>
    <div class="item-container" draggable="true" @dragstart="handleDragstart">
        <p class="label-container" draggable="false">
            {{template.label}}
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            template: {
                label: String,
                constructor: function() {}
            }
        },
        methods: {
            handleDragstart(ev) {
                ev.dataTransfer.setData('text', 'phyackJu')
                ev.dataTransfer.dropEffect = 'link'
                ev.dataTransfer.effectAllowed = 'link'
                this.$store.commit('setDragSelection', new this.template.constructor('new story item'))
            }
        }
    }
</script>

<style scoped>
    .item-container{
        width: 50px;
        height: 50px;

        display: flex;
        justify-content: center;

        cursor: move;
        border: 2px solid steelblue;
        border-radius: 25px;
    }

    .label-container{
        line-height: 18px;
    }
</style>