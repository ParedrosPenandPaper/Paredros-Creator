<template>
    <div>
        <form @submit.prevent>
            <p>Add a new location</p>
            <label for="name">Name</label>
            <input v-model="locationName" type="text" id="name">
            <br><br>
            <label for="description">Description</label>
            <input v-model="locationDescription" type="text" id="description">
            <br><br>
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
                this.resetInputs()
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
            })
        },
    }
</script>

<style scoped>

</style>