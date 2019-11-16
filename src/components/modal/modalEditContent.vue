<template>
    <div>
        <form @submit.prevent class="form-container">
            <div v-for="(value, key) in this.$store.state.content.current" :key="key">
                <div v-if="key!=='objectID'">
                    <div v-if="key==='name'">
                        <div class="input-container">
                            <label for="name-edit">Name: </label>
                            <input class="name-input" type="text" value="content.name" v-model="content.name" id="name-edit">
                        </div>
                    </div>
                    <div v-if="key==='text'">
                        <div class="input-container">
                            <label for="description">Description: </label>
                            <textarea class="description-input" type="text" value="content.text"
                                      v-model="content.text" id="description" rows="4" cols="35" wrap="hard">
                            </textarea>
                        </div>
                    </div>
                    <div v-if="key==='hitPoints'">
                        <div class="input-container">
                            <label for="hitPoints">Hitpoints: </label>
                            <input class="integer-input" type="text" value="content.hitPoints" v-model="content.hitPoints" id="hitPoints">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "modalEditContent",
        data() {
            return {
                content: {
                    name: "",
                    text: "",
                    hitPoints: ""
                }
            }
        },
        methods: {
            updateContent() {
                this.$store.commit("updateContent", this.content)
            },
            setContentData() {
                this.content.name = this.$store.state.content.current.name
                this.content.text = this.$store.state.content.current.text
                this.content.hitPoints = this.$store.state.content.current.hitPoints
            }
        },
        created() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === "closeModal" && state.modal.confirmed && this.$store.state.content.show) {
                    this.updateContent()
                }
                if (mutation.type === "editContent") {
                    this.setContentData()
                }
            })
        }
    }
</script>

<style scoped>
    .form-container {
        font-family: var(--font);
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