<template>
    <div>
        <form @submit.prevent class="form-container">
            <p class="title">Create a new non-player character</p>
            <div class="input-container">
                <label for="name-npc">Name</label>
                <input class="name-input" v-model="characterName" type="text" id="name-npc">
            </div>
            <div class="input-container">
                <label for="description">Description</label>
                <textarea class="description-input" v-model="characterDescription" id="description"
                    rows="4" cols="35" wrap="hard">
                </textarea>
            </div>
            <div class="input-container">
                <label for="hitpoints">Hitpoints</label>
                <input class="integer-input" v-model="characterHitPoints" type="number" id="hitpoints">
            </div>
        </form>
    </div>
</template>

<script>
    import * as DataElements from '../../util/DataElements.js'

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
                let nonPlayerCharacter = new DataElements.Character(this.characterName, this.characterDescription,
                    this.characterHitPoints)
                this.$store.commit("addContent", nonPlayerCharacter)
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
                    && this.$store.state.modal.type instanceof DataElements.Character) {
                    this.addNewNonPlayerCharacter()
                }
                this.resetInputs()
            })
        },

    }
</script>

<style scoped>
    .form-container {
        font-family: var(--font);
    }

    .title {
        text-align: center;
    }

    .input-container {
        margin: 0.4em;
        padding: 0.2em;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        align-content: center;
    }

    .name-input {
        padding: 0.4em;

        border-radius: 0.5em;
        outline: none;

        font-family: var(--font);
    }

    .description-input {
        padding: 0.4em;

        border-radius: 0.5em;
        outline: none;

        font-family: var(--font);
    }

    .integer-input {
        padding: 0.4em;

        border-radius: 0.5em;
        outline: none;

        font-family: var(--font);
    }
</style>