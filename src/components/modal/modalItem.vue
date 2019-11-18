<template>
    <div>
        <form @submit.prevent class="form-container">
            <p class="title">Create new item</p>
            <div class="input-container">
                <label for="name-item">Name</label>
                <input class="name-input-item" v-model="itemName" type="text" id="name-item">
            </div>
            <div class="input-container">
                <label for="description">Description</label>
                <textarea class="description-input" v-model="itemDescription" type="text" id="description"
                          rows="4" cols="35" wrap="hard">
                </textarea>
            </div>
        </form>
    </div>
</template>

<script>
    import * as dataElements from '../../util/DataElements.js'

    export default {
        name: "modalItem",
        data() {
            return {
                itemName: "",
                itemDescription: ""
            }
        },
        methods: {
            addNewitem() {
                let item = new dataElements.Item(this.itemName, this.itemDescription)
                this.$store.commit("addContent", item)
            },
            resetInputs() {
                this.itemName = ""
                this.itemDescription = ""
            }
        },
        created() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "closeModal" && state.modal.confirmed
                    && this.$store.state.modal.type instanceof dataElements.Item) {
                    this.addNewitem()
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

    .name-input-item {
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