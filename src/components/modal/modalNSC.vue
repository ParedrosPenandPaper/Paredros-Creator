<template>
    <div>
        <p>Add a new non-player character</p>
        <form  @submit.prevent>
            <label for="name">Name</label>
            <input v-model="nameInput" type="text" id="name">
            <br><br>
            <label for="description">Description</label>
            <input v-model="descriptionInput" type="text" id="description">
            <br><br>
            <label for="hitpoints">Hitpoints</label>
            <input v-model="hitPointsInput" type="text" id="hitpoints">
            <br><br>
        </form>
    </div>
</template>

<script>
    import * as dataElements from '../../util/DataElements.js'

    export default {
        name: "modalNSC",
        computed: {
            confirmModal() {
                return this.$store.state.modal
            }
        },
        data() {
            return {
                // TODO: Bug, erneutes schreiben der Werte in die Forms aktualisiert diese Werte nicht!!!
                nameInput: null,
                descriptionInput: null,
                hitPointsInput: null
            }
        },
        methods: {
            addNewNPC() {
                let nonPlayerCharacter = new dataElements.Character(this.nameInput, this.descriptionInput,
                    this.hitPointsInput)
                this.$store.commit("addPlayerCharacter", nonPlayerCharacter)
            }
        },
        created() {
            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "closeModal" && state.modal.confirmed) {
                    this.addNewNPC()
                }
            })
        }
    }
</script>

<style scoped>

</style>