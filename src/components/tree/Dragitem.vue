<template>
    <div class="item-container" draggable="true" @dragstart=handleDragstart @mouseenter=showTooltip @mouseleave=hideTooltip>
        <p class="label-container" draggable="false">
            {{template.label}}
        </p>
        <div class="tooltip">{{tooltip}}</div>
    </div>
</template>

<script>
    // import * as DataElements from '../../util/DataElements.js'

    export default {
        props:{
            template: {
                label: String,
                constructor: function() {}
            }
        },
        data: function() {
            return {
                tooltip: ''
            }
        },
        methods: {
            handleDragstart(ev) {
                ev.dataTransfer.setData('text', 'dataTransfer')
                ev.dataTransfer.dropEffect = 'link'
                ev.dataTransfer.effectAllowed = 'link'
                this.$store.commit('setDragSelection', new this.template.constructor())
            },
            showTooltip(mouseenterEvent) {
                const itemContainer = mouseenterEvent.target
                const labelText = itemContainer.firstChild.textContent

                // eslint-disable-next-line
                console.log(itemContainer)
                // eslint-disable-next-line
                console.log(labelText)

                if (labelText.includes('📜')) this.tooltip = 'chapter' 
                else if (labelText.includes('📃')) this.tooltip = 'scene' 
                else if (labelText.includes('💂🏻‍♂')) this.tooltip = 'npc' 
                else if (labelText.includes('🏰')) this.tooltip = 'location' 
                else if (labelText.includes('🔨')) this.tooltip = 'item'
                else this.tooltip = 'tooltip'

                itemContainer.lastChild.style = 'display: block;'
            },
            hideTooltip(mouseleaveEvent) {
                const itemContainer = mouseleaveEvent.target
                itemContainer.lastChild.style = 'display: none;'
            }
        }
    }
</script>

<style scoped>
    .item-container{
        width: 50px;
        height: 50px;

        cursor: move;
        border: 2px solid #91b6d4;
        border-radius: 50%;
        box-shadow: -4px 4px 3px #bfbfbf;

        font-family: var(--font);
        background-color: lightgrey;
    }

    .label-container{
        line-height: 18px;
        text-align: center;
    }

    .tooltip{
        width: 100%;
        padding-top: 5px;

        text-align: center;

        font-size: 0.8em;
    }
</style>