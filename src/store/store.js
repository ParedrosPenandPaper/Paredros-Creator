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
        }
    },
    mutations: {
        setAdventureObject(state, response) {
            state.adventureObject = response
            updateTreeView = true
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
            // eslint-disable-next-line no-console
            console.log(chapter.children[0].data)
            let chapterAfter = chapter.children[0].data
            if(chapterAfter.paths.length === 0 ) {
                // eslint-disable-next-line no-console
                console.log(chapterAfter)
            }
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
        }
    },
    actions: {

    }
})