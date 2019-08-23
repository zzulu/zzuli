// commit으로 mutation 실행!

import { firestoreAction } from 'vuexfire'

// firebase binding
const setUrlsRef = firestoreAction((context, ref) => {
    // this will unbind any previously bound ref to 'todos'
    context.bindFirestoreRef('urls.data', ref).then(()=>{
      context.commit('setUrlsLoading', false)
    })
    // you can unbind any ref easily
    // context.unbindFirestoreRef('user')
  }
)

const setUser = function ({ commit }, userData) {
  commit('setUser', userData)
  commit('setUserLoading', false)
}

const clearUser = function ({ commit }) {
  commit('clearUser')
}

const setUserLoading = function ({ commit }, loading) {
  commit('setUserLoading', loading)
}

export default {
  setUrlsRef,
  setUser,
  clearUser,
  setUserLoading,
}
