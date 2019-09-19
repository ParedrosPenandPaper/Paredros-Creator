<template>
    <div class="editor-panel" :class="{ 'chapter-panel': isChapter, 'scene-panel': isScene }">
        <p contenteditable="true" @focusout="testEventTitle">{{storyItem.title}}</p>
        <p contenteditable="true" @focusout="testEventText">{{storyItem.text}}</p>
    </div>
</template>

<script>
    import * as DataElements from '../../util/DataElements.js'

    export default {
        props: {
            storyItem: Object
        },
        data: function() {
            return {
                isChapter: this.storyItem instanceof DataElements.Chapter,
                isScene: this.storyItem instanceof DataElements.Scene,
                oldStoryItem: {}
            }
        },
        computed: {
            type: function(){ return this.storyItem.type }
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