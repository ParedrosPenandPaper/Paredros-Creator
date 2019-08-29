import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        adventureObject: {}
    },
    mutations: {
        setAdventureObject(state, response) {
            state.adventureObject = response
        },
        addChapterAfter(state, chapter) {
            // TODO: Zusammenbau des chapters auslagern
            let newChapter = {
                chapter: 'newChapter',
                children: [],
                content: [],
                paths: [],
                text: ""
            }
            chapter.children.push(newChapter)
        }
    },
    actions: {

    }
})