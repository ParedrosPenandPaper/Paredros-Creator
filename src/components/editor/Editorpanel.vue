<template>
    <div :id="storyItem.title" class="editor-panel" :class="{ 'chapter-panel': storyItem.hasOwnProperty('children'), 'scene-panel': !storyItem.hasOwnProperty('children') }">
        <p :class="{ 'chapter-title': storyItem.hasOwnProperty('children'), 'scene-title': !storyItem.hasOwnProperty('children') }" contenteditable="true" @focusout="testEventTitle" spellcheck="false">{{storyItem.title}}</p>
        <p :class="{ 'chapter-text': storyItem.hasOwnProperty('children'), 'scene-text': !storyItem.hasOwnProperty('children') }" contenteditable="true" @focusout="testEventText" spellcheck="false">{{storyItem.text}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            storyItem: Object
        },
        methods: {
            testEventTitle: function (focusOutEvent) {
                let oldTitle = this.storyItem.title
                let newTitle = focusOutEvent.target.textContent
                if(oldTitle !== newTitle) this.storyItem.title = newTitle
            },
            testEventText: function (focusOutEvent) {
                let oldText = this.storyItem.text
                let newText = focusOutEvent.target.textContent
                if(oldText !== newText) this.storyItem.text = newText
            }
        }
    }
</script>

<style scoped>
    .editor-panel{
        margin: 2em;
        border-radius: 1em;
        padding: 1em;
        border: 1px solid rgba(190, 190, 190, 0.7);
        box-shadow: 3px 3px 4px #bfbfbf;
        font-family: var(--font);
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