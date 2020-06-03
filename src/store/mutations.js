import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations,

  setUrls: function (state, urls) {
    state.urls.data = urls
  },

  setUrlsLoading: function (state, loading) {
    state.urls.loading = loading
  },

  setUser: function (state, userData) {
    state.user.data = {
      ...userData
    }
  },

  clearUser: function (state) {
    state.user.data = {
      uid: '',
      email: '',
      displayName: '',
    }
  },

  setUserLoading: function (state, loading) {
    state.user.loading = loading
  },
}
