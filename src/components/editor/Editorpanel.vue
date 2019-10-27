<template>
    <div class="editor-panel" :class="{ 'chapter-panel': storyItem.hasOwnProperty('children'), 'scene-panel': !storyItem.hasOwnProperty('children') }">
        <p :class="{ 'chapter-title': storyItem.hasOwnProperty('children'), 'scene-title': !storyItem.hasOwnProperty('children') }" contenteditable="true" @focusout="testEventTitle">{{storyItem.title}}</p>
        <p :class="{ 'chapter-text': storyItem.hasOwnProperty('children'), 'scene-text': !storyItem.hasOwnProperty('children') }" contenteditable="true" @focusout="testEventText">{{storyItem.text}}</p>
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
                let newTitle = focusOutEvent.srcElement.textContent
                if(oldTitle !== newTitle) this.storyItem.title = newTitle
            },
            testEventText: function (focusOutEvent) {
                let oldText = this.storyItem.text
                let newText = focusOutEvent.srcElement.textContent
                if(oldText !== newText) this.storyItem.text = newText
            }
        }
    }
</script>

<style scoped>
    .editor-panel{
        margin: 2em;
        font-family: 'Segoe UI'
    }

    .chapter-panel{
        
    }

    .chapter-title{
        font-size: 1.2em
    }

    .chapter-text{
        font-size: 1.2em
    }

    .scene-panel{
        margin-left: 5em;
    }

    .scene-title{
        font-size: 1.2em
    }

    .scene-text{
        font-size: 1.2em
    }
</style>