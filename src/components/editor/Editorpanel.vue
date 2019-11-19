<template>
    <div :id="storyItem.title" class="editor-panel" :class="{ 'chapter-panel': storyItem.hasOwnProperty('children'), 'scene-panel': !storyItem.hasOwnProperty('children') }">
        <p :class="{ 'chapter-title': storyItem.hasOwnProperty('children'), 'scene-title': !storyItem.hasOwnProperty('children') }" contenteditable="true" @focus="highlightPanel" @focusout="writeTitleDimPanel" spellcheck="false">{{storyItem.title}}</p>
        <p :class="{ 'chapter-text': storyItem.hasOwnProperty('children'), 'scene-text': !storyItem.hasOwnProperty('children') }" contenteditable="true" @focus="highlightPanel" @focusout="writeTextDimPanel" spellcheck="false">{{storyItem.text}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            storyItem: Object
        },
        methods: {
            writeTitleDimPanel: function (focusOutEvent) {
                // remove highlighting
                focusOutEvent.target.parentElement.style = 'box-shadow: 3px 3px 4px #bfbfbf;'

                // process input
                let oldTitle = this.storyItem.title
                let newTitle = focusOutEvent.target.textContent
                if(oldTitle !== newTitle) this.storyItem.title = newTitle
            },
            writeTextDimPanel: function (focusOutEvent) {
                // remove highlighting
                focusOutEvent.target.parentElement.style = 'box-shadow: 3px 3px 4px #bfbfbf;'

                // process input
                let oldText = this.storyItem.text
                let newText = focusOutEvent.target.textContent
                if(oldText !== newText) this.storyItem.text = newText
            },
            highlightPanel: function (focusEvent) {
                focusEvent.target.parentElement.style = 'box-shadow: inset 0 0 3px 3px #91b6d4;'
            }
        }
    }
</script>

<style scoped>
    .editor-panel{
        margin: 2em;
        border-radius: 1em;
        padding: 1em;
        border: 1px solid /*rgba(190, 190, 190, 0.7)*/ #b9b9b9;
        box-shadow: 3px 3px 4px #bfbfbf;
        font-family: var(--font);
    }

    .editor-panel:focus{
        box-shadow: inset 0 0 3px 3px #91b6d4;
    }

    .chapter-panel{
        background-color: rgba(216, 216, 216, 0.6);
    }

    .chapter-title{
        font-size: 1.2em;
        margin-top: 0;
        outline-style: none;
    }

    .chapter-text{
        font-size: 1.2em;
        margin-bottom: 0;
        outline-style: none;
    }

    .scene-panel{
        margin-left: 5em;
        background-color: rgba(216, 216, 216, 0.2);
    }

    .scene-title{
        font-size: 1.2em;
        margin-top: 0;
        outline-style: none;
    }

    .scene-text{
        font-size: 1.2em;
        margin-bottom: 0;
        outline-style: none;
    }
</style>