<template>
    <div class="contentView">
        <div v-show="this.$store.state.foundContent.npc.length > 0 && this.$store.state.content.show">
            <p>NPC:</p>
            <ul>
                <li v-for="item in this.$store.state.foundContent.npc" :key="item.index" :contenteditable="true">
                    {{ item.name }}
                    <button @click="editContent(item)">edit</button>
                    <button>delete</button>
                </li>
            </ul>
        </div>
        <div v-show="this.$store.state.foundContent.location.length > 0 && this.$store.state.content.show">
            <p>Location:</p>
            <ul>
                <li v-for="item in this.$store.state.foundContent.location" :key="item.index" :contenteditable="true">
                    {{ item.name }}
                    <button @click="editContent(item)">edit</button>
                    <button>delete</button>
                </li>
            </ul>
        </div>
        <button @click="closeContent">Close</button>
    </div>
</template>

<script>
    export default {
        name: "contentView.vue",
        data() {
            return {

            }
        },
        methods: {
            closeContent() {
                this.$store.commit('hideContent')
                this.$store.commit('resetFoundContent')
            },
            editContent(content) {
                this.$store.commit('showModal')
                this.$store.commit('editContent', content)
            }
        }
    }
</script>

<style scoped>
    .contentView {
        position: absolute;
        bottom: 20px;
        left: 90px;
        padding: 5px;
        z-index: 20;
        background-color: lightgrey;
        border: solid 2px dimgrey;
        border-radius: 10px;
    }
</style>