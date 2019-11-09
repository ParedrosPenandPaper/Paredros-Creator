<template>
    <div>
        <form @submit.prevent>
            <div v-for="(value, key) in this.$store.state.content.current" :key="key">
                <div v-if="key!=='objectID'">
                    <div v-if="key==='name'">
                        <label for="name">Name: </label>
                        <input type="text" value="content.name" v-model="content.name" id="name">
                        <br><br>
                    </div>
                    <div v-if="key==='text'">
                        <label for="description">Description: </label>
                        <input type="text" value="content.text" v-model="content.text" id="description">
                        <br><br>
                    </div>
                    <div v-if="key==='hitPoints'">
                        <label for="hitPoints">Hitpoints: </label>
                        <input type="text" value="content.hitPoints" v-model="content.hitPoints" id="hitPoints">
                        <br><br>
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

</style>