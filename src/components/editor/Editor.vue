<template>
    <div class="editor-container">
        <meta-panel :meta="data.meta"></meta-panel>
        <adventure-panel :adventure="data.adventure"></adventure-panel>
    </div>
</template>

<script>
    import MetaPanel from './Meta_Panel.vue'
    import AdventurePanel from './Adventure_Panel.vue'
    
    export default {
        props: {
            data: Object
        },
        components:{
            MetaPanel,
            AdventurePanel
        }
    }
</script>

<style>
    .editor-container{
        border: 1px solid black;
        margin: 5px;
        padding: 5px;
    }
</style>