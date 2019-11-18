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
                ev.dataTransfer.setData('text', 'dataTransfer')
                ev.dataTransfer.dropEffect = 'link'
                ev.dataTransfer.effectAllowed = 'link'
                this.$store.commit('setDragSelection', new this.template.constructor())
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
        border: 2px solid #91b6d4;
        border-radius: 50%;
        box-shadow: -4px 4px 3px #bfbfbf;

        font-family: var(--font);
        background-color: lightgrey;
    }

    .label-container{
        line-height: 18px;
    }
</style>