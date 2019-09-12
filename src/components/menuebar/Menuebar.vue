<template>
    <div class="menuebar-container">
        <button class="new" @click="createNewAdventure()">new</button>
        <button class="load" @click="loadAdventure()">load</button>
        <button class="save" @click="saveAdventure()">save</button>
        <button class="import" @click="importAdventure()">import</button>
        <button class="export" @click="exportAdventure()">export</button>
    </div>
</template>

<script>
    import * as dataElements from "../../util/DataElements";

    export default {
        name: "Menuebar",
        methods: {
            createNewAdventure() {
                this.$store.state.adventureObject = dataElements.blankAdventure()
                // TODO: Update rendertree nach änderung
            },
            loadAdventure() {
                alert("Not implemented yet")
            },
            saveAdventure() {
                alert("Not implemented yet")
            },
            importAdventure() {
                alert("Not implemented yet")
            },
            exportAdventure() {
                let element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-u,'
                    +encodeURIComponent(JSON.stringify(this.$store.state.adventureObject)));
                element.setAttribute('download', this.$store.state.adventureObject[0].adventure + ".json");
                element.click()
            }
        }
    }
</script>

<style scoped>
.menuebar-container{
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: center;
}

button{
    height: 100%;
    flex-grow: 1;

    border-style: none;
    outline-style: none;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5em;
    background-color: steelblue;
}

button:hover{
    background-color: #7eaacd;
}

button:active{
    background-color: #396a93;
}
</style>