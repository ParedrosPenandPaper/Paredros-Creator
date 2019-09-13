<template>
    <div class="editor-panel" :class="{ 'chapter-panel': isChapter, 'scene-panel': isScene }">
        <p contenteditable="true" @focusout="testEventTitle">{{storyItem.title}}</p>
        <p contenteditable="true" @focusout="testEventText">{{storyItem.text}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            storyItem: Object
        },
        data: function() {
            return {
                isChapter: this.storyItem.type === 'chapter',
                isScene: this.storyItem.type === 'scene',
                oldStoryItem: {}
            }
        },
        computed: {
            type: function(){ return this.storyItem.type }
        },
        methods: {
            testEventTitle: function (inputEvent) {
                console.log(inputEvent)
                let message = `old title: ${this.storyItem.title}\n new title: ${inputEvent}`
                alert(message)
            },
            testEventText: function (inputEvent) {
                console.log(inputEvent)
                let message = `old text: ${this.storyItem.text}\n new text: ${inputEvent}`
                alert(message)
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