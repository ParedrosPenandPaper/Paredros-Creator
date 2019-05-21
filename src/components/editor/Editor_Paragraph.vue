<template>
    <p class="editor-paragraph-text" contenteditable="true" spellcheck="false">
        <slot>
            default editor-paragraph text
        </slot>
    </p>
</template>

<script>
    export default{

    }
</script>

<style>
    .editor-paragraph-text{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
        margin-inline-start: 5px;
        margin-inline-end: 5px;
    }
</style>