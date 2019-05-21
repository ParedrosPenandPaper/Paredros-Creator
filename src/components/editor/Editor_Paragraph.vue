<template>
    <p class="editor-paragraph-text" contenteditable="true">
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
    }
</style>