import { firestoreAction } from 'vuexfire'
import firebase, { db } from '@/firebase'

export default {
  // Firebase binding with Vuexfire
  bindUrls: firestoreAction((context) => {
      // this will unbind any previously bound ref to 'todos'
      const uid = context.state.user.data.uid
      const ref = db.collection('urls').where('owner_uid', '==', uid).orderBy('created_at', 'desc')
      context.bindFirestoreRef('urls.data', ref).then(() => {
        context.commit('setUrlsLoading', false)
      })
      // you can unbind any ref easily
      // context.unbindFirestoreRef('user')
    }
  ),

  // Use Firebase SDK
  // setUrls: function ({ state, commit }) {
  //   const uid = state.user.data.uid
  //   db.collection('urls').where('owner_uid', '==', uid).orderBy('created_at', 'desc').get()
  //     .then((querySnapshot) => {
  //       const documents = querySnapshot.docs.map(doc => doc.data())
  //       commit('setUrls', documents)
  //       commit('setUrlsLoading', false)
  //     })
  // },

  createUrl: function ({ state }, { shortened, origin }) {
    const data = {
      origin: origin,
      created_at: firebase.firestore.Timestamp.fromDate(new Date()),
      owner_uid: state.user.data.uid,
    }
    
    const urlRef = db.collection('urls').doc(shortened)
    urlRef.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data())
      } else {
        urlRef.set(data)
          .catch((err) => {
            console.log(err.code)
            console.log(err.name)
            console.log(err.message)
          })
      }
    })
  },

  deleteUrl: function (context, urlId) {
    db.collection('urls').doc(urlId).delete()
  },

  setUser: function ({ commit, dispatch }, userData) {
    commit('setUser', userData)
    commit('setUserLoading', false)
    dispatch('bindUrls')
  },

  clearUser: function ({ commit }) {
    commit('clearUser')
    commit('setUserLoading', false)
  },
}
