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

<style scoped>
    .editor-container {
        background-color: #c4c4c4;
    }
</style>