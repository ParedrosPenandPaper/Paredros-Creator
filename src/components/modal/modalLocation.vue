<template>
    <div>
        <form @submit.prevent class="form-container">
            <p class="title">Create new location</p>
            <div class="input-container">
                <label for="name-location">Name</label>
                <input class="name-input-location" v-model="locationName" type="text" id="name-location">
            </div>
            <div class="input-container">
                <label for="description">Description</label>
                <textarea class="description-input" v-model="locationDescription" type="text" id="description"
                          rows="4" cols="35" wrap="hard">
                </textarea>
            </div>
        </form>
    </div>
</template>

<script>
    import * as dataElements from '../../util/DataElements.js'

    export default {
        name: "modalLocation",
        data() {
            return {
                locationName: "",
                locationDescription: ""
            }
        },
        methods: {
            addNewLocation() {
                let location = new dataElements.Location(this.locationName, this.locationDescription)
                this.$store.commit("addContent", location)
            },
            resetInputs() {
                this.locationName = ""
                this.locationDescription = ""
            }
        },
        created() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "closeModal" && state.modal.confirmed
                    && this.$store.state.modal.type instanceof dataElements.Location) {
                    this.addNewLocation()
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

    .name-input-location {
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
</style>