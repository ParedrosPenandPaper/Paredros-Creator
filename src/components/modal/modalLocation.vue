<template>
    <div>
        <p>Add a new location</p>
        <form  @submit.prevent>
            <label for="name">Name</label>
            <input v-model="this.nameInput" type="text" id="name">
            <br><br>
            <label for="description">Description</label>
            <input v-model="this.descriptionInput" type="text" id="description">
            <br><br>
        </form>
    </div>
</template>

<script>
    export default {
        name: "modalLocation",
        data() {
            return {
                nameInput: null,
                descriptionInput: null
            }
        }
    }
</script>

<style scoped>

</style>