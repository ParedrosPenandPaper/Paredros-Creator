<template>
    <div class="modal-container" v-show="this.$store.state.modal.show">
        <div v-if="this.$store.state.modal.type instanceof nscType">
            <modal-n-s-c></modal-n-s-c>
        </div>
        <div v-if="this.$store.state.modal.type instanceof locationType">
            <modal-location></modal-location>
        </div>
        <input type="submit" @click="declineModal()" value="Cancel">
        <input type="submit" @click="confirmModal()" value="Confirm">
    </div>
</template>

<script>
    import modalNSC from './modalNSC.vue'
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
            modalNSC,
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