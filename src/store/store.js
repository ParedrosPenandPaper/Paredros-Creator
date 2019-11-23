import Vue from 'vue'
import Vuex from 'vuex'
import * as DataElements from '../util/DataElements.js'

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
            characters: [],
            locations: [],
            items: []
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
        },
        addSceneAfter(state, scene) {
            scene.path.splice(scene.index + 1, 0, this.state.currentDragSelection)
        },
        addSceneAfterChapter(state, chapter) {
            let chapterAfter = chapter.children[0]
            chapterAfter.data.paths.push([this.state.currentDragSelection])
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
                state.currentDropTarget.type = DataElements.Chapter
            }
            else {
                let index = target.index
                state.currentDropTarget.type = DataElements.Scene
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
        },
        setModalPosition(state, positionObject) {
            state.modal.positionX = Math.round(positionObject.left)
            state.modal.positionY = Math.round(positionObject.top)
        },
        addContent(state, content) {
            if (content instanceof DataElements.Character) {
                state.adventureObject.data.characters.push(content)
            }
            else if (content instanceof DataElements.Location) {
                state.adventureObject.data.locations.push(content)
            }
            else if (content instanceof DataElements.Item) {
                state.adventureObject.data.items.push(content)
            }
            state.currentDropTarget.value.content.push(content._id)
            state.modal.confirmed = false
            state.modal.type = null
            state.currentDropTarget.value = null
            state.currentDropTarget.type = null
        },
        // TODO: REFACTOR
        findContent(state, keyArray) {
            if (!state.content.show) {
                for (let i = 0; i < keyArray.length; i++) {
                    let foundCharacter = state.adventureObject.data.characters.find(x => x._id === keyArray[i])
                    if (foundCharacter) {
                        state.foundContent.characters.push(foundCharacter)
                    }
                }
                for (let i = 0; i < keyArray.length; i++) {
                    let foundLocation = state.adventureObject.data.locations.find(x => x._id === keyArray[i])
                    if (foundLocation) {
                        state.foundContent.locations.push(foundLocation)
                    }
                }
                for (let i = 0; i < keyArray.length; i++) {
                    let foundItem = state.adventureObject.data.items.find(x => x._id === keyArray[i])
                    if (foundItem) {
                        state.foundContent.items.push(foundItem)
                    }
                }
            }
        },
        resetFoundContent(state) {
            state.foundContent.characters = []
            state.foundContent.locations = []
            state.foundContent.items = []
        },
        showContent(state) {
            if(!state.content.show && (state.foundContent.characters.length > 0 || state.foundContent.locations.length > 0 || state.foundContent.items.length > 0)) {
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
            const findObjectById = x => x._id === state.content.current._id
            let foundIndexNPC = state.adventureObject.data.characters.findIndex(findObjectById)
            if (foundIndexNPC !== -1) {
                state.adventureObject.data.characters[foundIndexNPC].name = content.name
                state.adventureObject.data.characters[foundIndexNPC].text = content.text
                state.adventureObject.data.characters[foundIndexNPC].hitPoints = content.hitPoints
            }
            let foundIndexLocation = state.adventureObject.data.locations.findIndex(findObjectById)
            if (foundIndexLocation !== -1) {
                state.adventureObject.data.locations[foundIndexLocation].name = content.name
                state.adventureObject.data.locations[foundIndexLocation].text = content.text
            }
            let foundIndexItem = state.adventureObject.data.items.findIndex(findObjectById)
            if (foundIndexItem !== -1) {
                state.adventureObject.data.items[foundIndexItem].name = content.name
                state.adventureObject.data.items[foundIndexItem].text = content.text
            }

            state.content.current = null
        }
    }
})