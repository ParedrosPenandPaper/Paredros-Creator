<template>
    <div>
        <div v-show="this.$store.state.modal.type instanceof nscType">
            <modal-non-player-character></modal-non-player-character>
        </div>
        <div v-show="this.$store.state.modal.type instanceof locationType">
            <modal-location></modal-location>
        </div>
        <input type="submit" @click="declineModal()" value="Cancel">
        <input type="submit" @click="confirmModal()" value="Confirm">
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

</style>