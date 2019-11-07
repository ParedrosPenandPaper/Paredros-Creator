import Vue from 'vue'
import Vuex from 'vuex'
import * as dataElements from '../util/DataElements.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        adventureObject: {},
        currentDragSelection: {},
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
            confirmed: false
        },
        // TODO: Highly suspecious
        foundContent : []
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
            // Wenn kein Target.data, dann muss es scene sein
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
            }
            state.adventureObject = [...state.adventureObject]
        },
        addContent(state, content) {
            if (state.adventureObject.length < 3) {
                let emptyContentObject = {
                    character: [],
                    location: []
                }
                state.adventureObject.push(emptyContentObject)
            }
            if (content instanceof dataElements.Character) {
                state.adventureObject[2].character.push(content)
            }
            else if (content instanceof dataElements.Location) {
                state.adventureObject[2].location.push(content)
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
            if (state.adventureObject[2]) {
                if (state.adventureObject[2].character) {
                    for (let i = 0; i < keyArray.length; i++) {
                        let foundCharacter = state.adventureObject[2].character.find(x => x.objectID === keyArray[i])
                        if (foundCharacter) {
                            state.foundContent.push(foundCharacter)
                        }
                    }
                }
                if (state.adventureObject[2].location) {
                    for (let i = 0; i < keyArray.length; i++) {
                        let foundLocation = state.adventureObject[2].location.find(x => x.objectID === keyArray[i])
                        if (foundLocation) {
                            state.foundContent.push(foundLocation)
                        }
                    }
                }
            }
        },
        resetFoundContent(state) {
            state.foundContent = []
        }
    },
    actions: {

    }
})