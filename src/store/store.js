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
        },
        addSceneAfter(state, scene) {
            // TODO: Zusammenbau der Szene auslagern
            let newScene = {
                "scene": "neue Szene eingefügt"
            }
            scene.path.splice(scene.index + 1, 0, newScene)
        }
    },
    actions: {

    }
})