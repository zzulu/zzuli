import { firestoreAction } from 'vuexfire'
import firebase, { db } from '@/firebase'
import validate from 'validate.js'

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

  createUrl: async function ({ state, commit }) {
    const origin = state.url.origin
    const shortened = state.url.shortened
    const messages = {
      'origin': [],
      'shortened': [],
    }
    // Validate
    if (!origin) {
      messages.origin.push('Origin URL can not be blank.')
    } else {
      const v = validate({ origin: origin }, {
        origin: {
          url: {
            message: 'URL is not valid.', // Origin URL is not valid.
          },
        }
      })

      if (v) {
        messages.origin = messages.origin.concat(v.origin)
      }
    }

    if (!shortened) {
      messages.shortened.push('Shortened URL can not be blank.')
    } else {
      const doc = await db.collection('urls').doc(shortened).get()
      if (doc.exists) {
        messages.shortened.push('Shortened URL is already exists.')
      }
    }

    // Create
    if (messages.origin.length > 0 || messages.shortened.length > 0) {
      commit('setValidation', messages)
    } else {
      // Create
      const data = {
        origin: origin,
        created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        owner_uid: state.user.data.uid,
      }

      db.collection('urls').doc(shortened).set(data)
        .then(() => {
          commit('clearValidation')
          commit('clearUrl')
        })
        .catch((err) => {
          console.log(err.code)
          console.log(err.name)
          console.log(err.message)
        })
    }
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
