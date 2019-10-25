<template>
    <div>
        <form @submit.prevent>
            <p>Add a new non-player character</p>
            <label for="name">Name</label>
            <input v-model="characterName" type="text" id="name">
            <br><br>
            <label for="description">Description</label>
            <input v-model="characterDescription" type="text" id="description">
            <br><br>
            <label for="hitpoints">Hitpoints</label>
            <input v-model="characterHitPoints" type="text" id="hitpoints">
            <br><br>
        </form>
    </div>
</template>

<script>
    import * as dataElements from '../../util/DataElements.js'

    export default {
        name: "modalNonPlayerCharacter",
        data() {
            return {
                characterName: "",
                characterDescription: "",
                characterHitPoints: ""
            }
        },
        methods: {
            addNewNonPlayerCharacter() {
                let nonPlayerCharacter = new dataElements.Character(this.characterName, this.characterDescription,
                    this.characterHitPoints)
                this.$store.commit("addContent", nonPlayerCharacter)
                this.resetInputs()
            },
            resetInputs() {
                this.characterName = ""
                this.characterDescription = ""
                this.characterHitPoints = ""
            }
        },
        created() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "closeModal" && state.modal.confirmed
                    && this.$store.state.modal.type instanceof dataElements.Character) {
                    this.addNewNonPlayerCharacter()
                }
            })
        },

    }
</script>

<style scoped>

</style>