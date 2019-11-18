import Vue from 'vue'
import Vuex from 'vuex'
import * as dataElements from '../util/DataElements.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        adventureObject: {},
        currentDragSelection: null,
        currentDropTarget: {
            value: null,
            type: null
        },
        guiState: {
            collapsedLinks:[

            ]
        },
        modal: {
            show: false,
            type: null,
            confirmed: false,
            positionX: null,
            positionY: null
        },
        foundContent : {
            npc: [],
            location: [],
            item: []
        },
        content: {
            show: false,
            current: null
        }
    },
    mutations: {
        setAdventureObject(state, response) {
            state.adventureObject = response
        },
        addChapterAfter(state, chapter) {
            chapter.children.push(this.state.currentDragSelection)
            state.adventureObject = [...state.adventureObject]
        },
        addSceneAfter(state, scene) {
            scene.path.splice(scene.index + 1, 0, this.state.currentDragSelection)
            state.adventureObject = [...state.adventureObject]
        },
        addSceneAfterChapter(state, chapter) {
            let chapterAfter = chapter.children[0]
            chapterAfter.data.paths.push([this.state.currentDragSelection])
            state.adventureObject = [...state.adventureObject]
        },
        // TODO: delete chapters
        deleteChapter(state, chapter) {
            let parent = chapter.parent
            let descendants = chapter.data.children
            // eslint-disable-next-line no-console
            console.log(chapter)
            if (parent.data.children.length === 1) {
                parent.data.children.length = 0
                parent.data.children = descendants
            }
            else {
                // TODO: Logik für mehrere children !!!
            }
            state.adventureObject = [...state.adventureObject]
        },
        setDragSelection(state, selection) {
            state.currentDragSelection = selection
        },
        resetDragSelection(state) {
            state.currentDragSelection = null
        },
        setDropTarget(state, target) {
            if (target.data) {
                state.currentDropTarget.value = target.data
                state.currentDropTarget.type = new dataElements.Chapter
            }
            else {
                let index = target.index
                state.currentDropTarget.type = new dataElements.Scene
                state.currentDropTarget.value = target.path[index]
            }
        },
        setCollapsedLinks(state, mapping){
            let collapsedLinks = state.guiState.collapsedLinks
            let alreadyAddedMapping = collapsedLinks.find(element => element.parent.data === mapping.parent.data && element.child.data === mapping.child.data)
            
            if(alreadyAddedMapping){
                alreadyAddedMapping.collapsed = true
            }
            else{
                collapsedLinks.push(mapping)
            }
        },
        setExpandedLinks(state, mapping){
            let collapsedLinks = state.guiState.collapsedLinks
            let alreadyAddedMapping = collapsedLinks.find(element => element.parent.data === mapping.parent.data && element.child.data === mapping.child.data)
            alreadyAddedMapping.collapsed = false
        },
        showModal(state){
            state.modal.show = true
            state.modal.type = state.currentDragSelection
            state.adventureObject = [...state.adventureObject]
        },
        closeModal(state, confirm){
            state.modal.show = false
            state.modal.confirmed = confirm
            if (!confirm) {
                state.modal.type = null
                state.currentDropTarget.value = null
                state.currentDropTarget.type = null
                state.content.current = null
            }
            
            state.adventureObject = [...state.adventureObject]
        },
        setModalPosition(state, positionObject) {
            state.modal.positionX = Math.round(positionObject.left)
            state.modal.positionY = Math.round(positionObject.top)
        },
        addContent(state, content) {
            if (state.adventureObject.length < 3) {
                let emptyContentObject = {
                    character: [],
                    location: [],
                    item: []
                }
                state.adventureObject.push(emptyContentObject)
            }
            if (content instanceof dataElements.Character) {
                state.adventureObject[2].character.push(content)
            }
            else if (content instanceof dataElements.Location) {
                state.adventureObject[2].location.push(content)
            }
            else if (content instanceof dataElements.Item) {
                state.adventureObject[2].item.push(content)
            }
            // überprüfen ob Content Array vorhanden ist, falls nicht neues erzeugen
            if (state.currentDropTarget.type instanceof dataElements.Scene && !state.currentDropTarget.value.content) {
                    state.currentDropTarget.value.content = []
            }
            state.currentDropTarget.value.content.push(content.objectID)
            state.modal.confirmed = false
            state.modal.type = null
            state.currentDropTarget.value = null
            state.currentDropTarget.type = null
            state.adventureObject = [...state.adventureObject]
        },
        // TODO: REFACTOR
        findContent(state, keyArray) {
            if (state.adventureObject[2] && !state.content.show) {
                if (state.adventureObject[2].character) {
                    for (let i = 0; i < keyArray.length; i++) {
                        let foundCharacter = state.adventureObject[2].character.find(x => x.objectID === keyArray[i])
                        if (foundCharacter) {
                            state.foundContent.npc.push(foundCharacter)
                        }
                    }
                }
                if (state.adventureObject[2].location) {
                    for (let i = 0; i < keyArray.length; i++) {
                        let foundLocation = state.adventureObject[2].location.find(x => x.objectID === keyArray[i])
                        if (foundLocation) {
                            state.foundContent.location.push(foundLocation)
                        }
                    }
                }
                if (state.adventureObject[2].item) {
                    for (let i = 0; i < keyArray.length; i++) {
                        let foundItem = state.adventureObject[2].item.find(x => x.objectID === keyArray[i])
                        if (foundItem) {
                            state.foundContent.item.push(foundItem)
                        }
                    }
                }
            }
        },
        resetFoundContent(state) {
            state.foundContent.npc = []
            state.foundContent.location = []
            state.foundContent.item = []
        },
        showContent(state) {
            if(!state.content.show && (state.foundContent.npc.length > 0 || state.foundContent.location.length > 0 || state.foundContent.item.length > 0)) {
                state.content.show = true;
            }
        },
        hideContent(state) {
            state.content.show = false;
        },
        editContent(state, content) {
            state.content.current = content;
        },
        updateContent(state, content) {
            let foundIndexNPC = state.adventureObject[2].character.findIndex(x => x.objectID === state.content.current.objectID)
            if (foundIndexNPC !== -1) {
                state.adventureObject[2].character[foundIndexNPC].name = content.name
                state.adventureObject[2].character[foundIndexNPC].text = content.text
                state.adventureObject[2].character[foundIndexNPC].hitPoints = content.hitPoints
            }
            let foundIndexLocation = state.adventureObject[2].location.findIndex(x => x.objectID === state.content.current.objectID)
            if (foundIndexLocation !== -1) {
                state.adventureObject[2].location[foundIndexLocation].name = content.name
                state.adventureObject[2].location[foundIndexLocation].text = content.text
            }
            let foundIndexItem = state.adventureObject[2].item.findIndex(x => x.objectID === state.content.current.objectID)
            if (foundIndexItem !== -1) {
                state.adventureObject[2].item[foundIndexItem].name = content.name
                state.adventureObject[2].item[foundIndexItem].text = content.text
            }

            state.content.current = null
        }
    }
})