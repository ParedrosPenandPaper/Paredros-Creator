<template>
    <div class="modalMask">
        <div class="modalContainer">
            <div v-show="this.$store.state.modal.type instanceof nscType">
                <modal-non-player-character></modal-non-player-character>
            </div>
            <div v-show="this.$store.state.modal.type instanceof locationType">
                <modal-location></modal-location>
            </div>
            <input type="submit" @click="declineModal()" value="Cancel">
            <input type="submit" @click="confirmModal()" value="Confirm">
        </div>
    </div>
</template>

<script>
    import modalNonPlayerCharacter from './modalNonPlayerCharacter.vue'
    import modalLocation from './modalLocation.vue'

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
            modalLocation
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
    .modalContainer {
        position: absolute;
        top: 200px;
        left: 350px;
        padding: 60px;
        z-index: 100;
        background-color: lightgrey;
        border: solid 2px dimgrey;
        border-radius: 10px;
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