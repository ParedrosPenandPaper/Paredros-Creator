<template>
    <div class="modalMask">
        <div class="modal-container" v-bind:style="{top: setPosY() + 'px', left: setPosX() + 'px'}">

            <div class="variable-container" v-show="this.$store.state.modal.type instanceof nscType">
                <modal-non-player-character></modal-non-player-character>
            </div>
            <div class="variable-container" v-show="this.$store.state.modal.type instanceof locationType">
                <modal-location></modal-location>
            </div>
            <div class="variable-container" v-show="this.$store.state.modal.type instanceof itemType">
                <modal-item></modal-item>
            </div>

            <div class="variable-container" v-show="this.$store.state.content.current">
                <modal-edit-content></modal-edit-content>
            </div>

            <div class="button-container">
                <button class="modal-button" @click="declineModal" >cancel</button>
                <button class="modal-button" @click="confirmModal" >confirm</button>
            </div>

        </div>
    </div>
</template>

<script>
    import modalNonPlayerCharacter from './modalNonPlayerCharacter.vue'
    import modalLocation from './modalLocation.vue'
    import modalItem from './modalItem.vue'
    import modalEditContent from "./modalEditContent.vue";

    import * as DataElements from "../../util/DataElements";

    export default {
        name: "modalContainer",
        data() {
            return {
                nscType: DataElements.Character,
                locationType: DataElements.Location,
                itemType: DataElements.Item
            }
        },
        components: {
            modalNonPlayerCharacter,
            modalLocation,
            modalItem,
            modalEditContent
        },
        methods: {
            confirmModal() {
                this.$store.commit('closeModal', true)
            },
            declineModal() {
                this.$store.commit('closeModal', false)
            },
            setPosX() {
                return this.$store.state.modal.positionX
            },
            setPosY() {
                return this.$store.state.modal.positionY
            }
        },
        updated() {
            if (this.$store.state.modal.type instanceof this.nscType) {
                document.getElementById("name-npc").focus()
            }
            else if (this.$store.state.modal.type instanceof this.locationType) {
                document.getElementById("name-location").focus()
            }
            else if (this.$store.state.modal.type instanceof this.itemType){
                document.getElementById("name-item").focus()
            }
            else if (this.$store.state.content.current) {
                document.getElementById("name-edit").focus()
            }
        }
    }
</script>

<style scoped>
    .modal-container {
        position: absolute;
        padding: 10px;
        z-index: 50;
        background-image: radial-gradient(#fff,#d8d8d8);
        border: solid 2px dimgrey;
        border-radius: 1em;
    }

    .button-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: flex-end;
    }

    .modal-button {
        width: 5em;
        height: 2em;
        margin: 0.2em;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        align-items: center;

        outline-style: none;
        border-radius: 0.4em 0.4em 0.4em 0.4em;
        border: 2px solid #d9d9d9;
        background-color: #f2f2f2;
        font-size: 1.3em;
        cursor: pointer;

        font-family: var(--font);
    }

    .modal-button:hover{
        border-color: #6c9dc6;
    }

    .variable-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }

    .modalMask {
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
    }
</style>