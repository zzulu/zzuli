import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urls: {
      loading: true,
      data: [],
    },
    user: {
      loading: true,
      data: {
        uid: '',
        email: '',
        displayName: '',
      }
    },
    url: {
      origin: '',
      shortened: Math.random().toString(36).substring(2, 7),
    },
    validation: {
      show: false,
      origin: {
        has_error: false,
        messages: [],
      },
      shortened: {
        has_error: false,
        messages: [],
      },
    },
  },
  mutations,
  actions,
})
