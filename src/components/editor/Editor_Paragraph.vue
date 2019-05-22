<template>
    <p class="editor-paragraph-text"
       contenteditable="true"
       spellcheck="false"
       @focusout="sendParagraph"
    >
        {{paragraph}}
    </p>
</template>

<script>
    export default{
        props: {
            paragraphId: String,
            paragraph: String
        },
        methods: {
            sendParagraph() {
                if(this.$el.innerText != this.paragraph)
                this.$emit('paragraph-edited',
                    {
                        paragraphId: this.paragraphId,
                        paragraph: this.$el.innerText
                    }
                )
            }
        }
    }
</script>

<style>
    .editor-paragraph-text{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
        margin-inline-start: 5px;
        margin-inline-end: 5px;
        outline: none;
    }
</style>
