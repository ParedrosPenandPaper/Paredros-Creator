<template>
    <div class="contentView">
        <div v-show="this.$store.state.foundContent.npc.length > 0 && this.$store.state.content.show">
            <p>NPCs</p>
            <ul>
                <li class="list-item" v-for="item in this.$store.state.foundContent.npc" :key="item.index" :contenteditable="true">
                    <div class="name-container">
                        {{ item.name }}
                    </div>
                    <div class="button-container">
                        <button class="content-button" @click="editContent(item)">edit</button>
                        <button class="content-button">delete</button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="this.$store.state.foundContent.location.length > 0 && this.$store.state.content.show">
            <p>Locations</p>
            <ul>
                <li class="list-item" v-for="item in this.$store.state.foundContent.location" :key="item.index" :contenteditable="true">
                    <div class="name-container">
                        {{ item.name }}
                    </div>
                    <div class="button-container">
                        <button class="content-button" @click="editContent(item)">edit</button>
                        <button class="content-button">delete</button>
                    </div>
                </li>
            </ul>
        </div>
        <button class="content-button" @click="closeContent">close</button>
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
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;

        position: absolute;
        bottom: 200px;
        left: 200px;
        padding: 10px;
        z-index: 100;
        background-image: radial-gradient(#fff,#d8d8d8);
        border: solid 2px dimgrey;
        border-radius: 1em;
    }

    .list-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .name-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    .button-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
    }

    .content-button {
        width: 5em;
        height: 2em;
        margin: 0.2em;

        outline-style: none;
        border-radius: 0.4em 0.4em 0.4em 0.4em;
        border: 2px solid #d9d9d9;
        background-color: #f2f2f2;
        font-size: 1.3em;
        cursor: pointer;

        font-family: var(--font);
    }

    .content-button:hover{
        border-color: #6c9dc6;
    }
</style>