<template>
    <div class="modalMask">
        <div class="modal-container">
            <div class="variable-container" v-show="this.$store.state.modal.type instanceof nscType">
                <modal-non-player-character></modal-non-player-character>
            </div>
            <div class="variable-container" v-show="this.$store.state.modal.type instanceof locationType">
                <modal-location></modal-location>
            </div>
            <div class="variable-container" v-show="this.$store.state.content.current">
                <modal-edit-content></modal-edit-content>
            </div>
            <div class="button-container">
                <input class="modal-button" type="submit" @click="declineModal()" value="cancel">
                <input class="modal-button" type="submit" @click="confirmModal()" value="confirm">
            </div>
        </div>
    </div>
</template>

<script>
    import modalNonPlayerCharacter from './modalNonPlayerCharacter.vue'
    import modalLocation from './modalLocation.vue'
    import modalEditContent from "./modalEditContent.vue";

    import * as dataElements from "../../util/DataElements";

    export default {
        name: "modalContainer",
        data() {
            return {
                nscType: dataElements.Character,
                locationType: dataElements.Location
            }
        },
        components: {
            modalNonPlayerCharacter,
            modalLocation,
            modalEditContent
        },
        methods: {
            confirmModal() {
                this.$store.commit('closeModal', true)
            },
            declineModal() {
                this.$store.commit('closeModal', false)
            }
        }
    }
</script>

<style scoped>
    .modal-container {
        position: absolute;
        top: 200px;
        left: 350px;
        padding: 10px;
        z-index: 100;
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
        z-index: 50;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
    }
</style>