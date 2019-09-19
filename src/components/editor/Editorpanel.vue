<template>
    <div class="editor-panel" :class="{ 'chapter-panel': storyItem.hasOwnProperty('children'), 'scene-panel': !storyItem.hasOwnProperty('children') }">
        <p contenteditable="true" @focusout="testEventTitle">{{storyItem.title}}</p>
        <p contenteditable="true" @focusout="testEventText">{{storyItem.text}}</p>
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
        font-family: 'Baskerville'
    }

    .chapter-panel{
        
    }

    .scene-panel{
        margin-left: 5em;
    }
</style>