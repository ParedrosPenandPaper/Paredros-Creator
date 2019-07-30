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
        }
    },
    actions: {

    }
})