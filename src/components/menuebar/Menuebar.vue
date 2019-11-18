<template>
    <div class="menuebar-container">
        <button class="menu-button" @click="goToLandingPage">home</button>
        <button class="menu-button" @click="createNewAdventure">new</button>
        <button class="menu-button" @click="loadAdventure">load</button>
        <button class="menu-button" @click="saveAdventure">save</button>
        <button class="menu-button" @click="importAdventure">import</button>
        <input id="fileUpload" type="file" @change="handleUpload"/>
        <button class="menu-button" @click="exportAdventure">export</button>
    </div>
</template>

<script>
    import * as dataElements from "../../util/DataElements";

    export default {
        name: "Menuebar",
        methods: {
            goToLandingPage() {
                window.location.href = "http://it-projekt19-6.informatik.fh-nuernberg.de:8082/"
            },
            createNewAdventure() {
                this.$store.state.adventureObject = dataElements.blankAdventure()
            },
            loadAdventure() {
                alert("Not implemented yet")
            },
            saveAdventure() {
                alert("Not implemented yet")
            },
            importAdventure(clickEvent) {
                document.querySelector('#fileUpload').click()
                clickEvent.preventDefault()
            },
            handleUpload(changeEvent) {
                const uploadedFile = changeEvent.target.files[0]

                uploadedFile.text()
                    .then(adventureJson => {
                        const uploadedAdventure = JSON.parse(adventureJson)

                        // TODO:    check if uploaded adventure complies with the scheme of an adventure object
                        //          (no clue how to do that but this is neccessary in order to avoid uploading something that is not an adventure)
                    
                        this.$store.commit('setAdventureObject', uploadedAdventure)
                    })      
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
        justify-content: space-evenly;
        align-items:flex-start;
        font-family: var(--font);
    }

    .menu-button {
        width: 8%;
        height: 60%;
        margin: 0;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        outline-style: none;
        border-radius: 0 0 0.6em 0.6em;
        border: 2px solid #d9d9d9;
        border-top: none;
        background-color: #f2f2f2;
        font-size: 1.3em;
        cursor: pointer;

        font-family: var(--font);
    }

    .menu-button:hover{
        border-color: #6c9dc6;
    }

    #fileUpload{
        display: none;
    }
</style>