import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        adventureObject: {},
        currentDragSelection: {},
        guiState: {
            collapsedLinks:[

            ]
        },
        showModal: false
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
            state.showModal = true
            state.adventureObject = [...state.adventureObject]
        },
        hideModal(state){
            state.showModal = false
            state.adventureObject = [...state.adventureObject]
        }
    },
    actions: {

    }
})