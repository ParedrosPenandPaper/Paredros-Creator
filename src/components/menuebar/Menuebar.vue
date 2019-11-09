<template>
    <div class="menuebar-container">
        <button class="new" @click="createNewAdventure">new</button>
        <button class="load" @click="loadAdventure">load</button>
        <button class="save" @click="saveAdventure">save</button>
        <button class="import" @click="importAdventure">import</button>
        <input id="fileUpload" type="file" @change="handleUpload"/>
        <button class="export" @click="exportAdventure">export</button>
    </div>
</template>

<script>
    import * as dataElements from "../../util/DataElements";

    export default {
        name: "Menuebar",
        methods: {
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

                // eslint-disable-next-line
                console.log(uploadedFile)

                uploadedFile.text()
                    .then(adventureJson => {
                        const uploadedAdventure = JSON.parse(adventureJson)

                        // eslint-disable-next-line
                        console.log(uploadedAdventure)

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

#fileUpload{
    display: none;
}
</style>