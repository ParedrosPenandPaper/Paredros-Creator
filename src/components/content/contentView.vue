<template>
    <div class="content-mask">
        <div class="contentView" v-bind:style="{top: setPosY() + 'px', left: setPosX() + 'px'}">
            <div v-show="this.$store.state.foundContent.characters.length > 0">
                <p class="title">NPCs</p>
                <ul class="unordered-list">
                    <li class="list-item" v-for="item in this.$store.state.foundContent.characters" :key="item.index">
                        <div class="name-container">
                            {{ item.name }}
                        </div>
                        <div class="button-container">
                            <button class="emoji-button" @click="editContent(item)">✏️</button>
                            <button class="emoji-button">❌</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-show="this.$store.state.foundContent.locations.length > 0">
                <p class="title">Locations</p>
                <ul class="unordered-list">
                    <li class="list-item" v-for="item in this.$store.state.foundContent.locations" :key="item.index">
                        <div class="name-container">
                            {{ item.name }}
                        </div>
                        <div class="button-container">
                            <button class="emoji-button" @click="editContent(item)">✏️</button>
                            <button class="emoji-button">❌</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-show="this.$store.state.foundContent.items.length > 0">
                <p class="title">Items</p>
                <ul class="unordered-list">
                    <li class="list-item" v-for="item in this.$store.state.foundContent.items" :key="item.index">
                        <div class="name-container">
                            {{ item.name }}
                        </div>
                        <div class="button-container">
                            <button class="emoji-button" @click="editContent(item)">✏️</button>
                            <button class="emoji-button">❌</button>
                        </div>
                    </li>
                </ul>
            </div>
            <button class="content-button" @click="closeContent">close</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "contentView.vue",
        methods: {
            closeContent() {
                this.$store.commit('hideContent')
                this.$store.commit('resetFoundContent')
            },
            editContent(content) {
                this.$store.commit('showModal')
                this.$store.commit('editContent', content)
            },
            setPosX() {
                return this.$store.state.modal.positionX
            },
            setPosY() {
                return this.$store.state.modal.positionY
            }
        }
    }
</script>

<style scoped>
    .contentView {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: stretch;

        position: absolute;
        left: 200px;
        padding: 10px;
        z-index: 15;
        background-image: radial-gradient(#fff,#d8d8d8);
        border: solid 2px dimgrey;
        border-radius: 1em;

        font-family: var(--font);
    }

    .content-mask {
        position: fixed;
        z-index: 12;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
    }

    .unordered-list {
        padding: 0;
    }

    .list-item {
        width: 100%;
        min-width: 12em;

        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .name-container {
        margin-right: 1em;

        float: left;
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

    .emoji-button {
        width: 2em;
        height: 2em;

        outline-style: none;
        border-style: none;
        background: none;

        cursor: pointer;
    }

    .title {
        text-align: center;
    }

    .content-button {
        width: 5em;
        height: 2em;
        margin: 0.2em;

        outline-style: none;
        border-radius: 0.4em;
        border: 2px solid #d9d9d9;
        background-color: #f2f2f2;
        font-size: 1.3em;
        cursor: pointer;

        align-self: center;

    }

    .content-button:hover{
        border-color: #6c9dc6;
    }
</style>