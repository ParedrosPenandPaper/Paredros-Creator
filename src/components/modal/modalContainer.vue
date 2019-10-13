<template>
    <div class="modal-container" v-show="this.$store.state.showModal">
        <p>Add a new non-player character</p>
        <form  @submit.prevent>
            <label for="name">Name</label>
            <input v-model="this.input" type="text" id="name">
            <br><br>
            <input type="submit" @click="declineModal" value="Cancel">
            <input type="submit" @click="confirmModal" value="Confirm">
        </form>

    </div>
</template>

<script>
    export default {
        name: "modalContainer",
        data() {
            return {
                input: null
            }
        },
        methods: {
            confirmModal() {
                // accept all modal inputs
                // save input before deleting it
                this.input = null
                this.$store.commit('hideModal')
            },
            declineModal() {
                // decline all modal inputs
                this.input = null
                this.$store.commit('hideModal')
            }
        }
    }
</script>

<style scoped>

</style>