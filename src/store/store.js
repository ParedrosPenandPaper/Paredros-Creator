import Vue from 'vue'
import Vuex from 'vuex'
import * as dataElements from '../util/DataElements.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        adventureObject: {},
        currentDragSelection: {},
        guiState: {
            collapsedLinks:[

            ]
        },
        modal: {
            show: false,
            type: null,
            confirmed: false
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
            state.modal.confirmed = false
            state.modal.type = null
            state.adventureObject = [...state.adventureObject]
        },
    },
    actions: {

    }
})