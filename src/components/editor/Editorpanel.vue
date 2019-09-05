<template>
    <div class="editor-panel" :class="{ 'chapter-panel': isChapter, 'scene-panel': isScene }">
        <p>{{storyItem.title}}</p>
        <p>{{storyItem.text}}</p>
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
                isScene: this.storyItem.type === 'scene'
            }
        },
        computed: {
            type: function(){ return this.storyItem.type }
        },
        methods: {

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