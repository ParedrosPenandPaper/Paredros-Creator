<template>
    <div class="contentView">
        <div v-show="this.$store.state.foundContent.npc.length > 0">
            <p>NPC:</p>
            <ul>
                <li v-for="item in this.$store.state.foundContent.npc" :key="item.index">
                    {{ item.name}}
                </li>
            </ul>
        </div>
        <div v-show="this.$store.state.foundContent.location.length > 0">
            <p>Location:</p>
            <ul>
                <li v-for="item in this.$store.state.foundContent.location" :key="item.index">
                    {{ item.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "contentView.vue"
    }
</script>

<style scoped>
    .contentView {
        position: absolute;
        top: 500px;
        left: 200px;
        padding: 20px;
        z-index: 20;
        background-color: lightgrey;
        border: solid 2px dimgrey;
        border-radius: 10px;
    }
</style>