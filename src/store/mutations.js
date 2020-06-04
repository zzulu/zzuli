import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations,

  setUrls: function (state, urls) {
    state.urls.data = urls
  },

  setUrlsLoading: function (state, loading) {
    state.urls.loading = loading
  },

  clearUrl: function (state) {
    state.url = {
      origin: '',
      shortened: '',
    }
  },

  setValidation: function (state, messages) {
    if (messages.origin.length > 0) {
      state.validation.origin.has_error = true
      state.validation.origin.messages = messages.origin
    } else {
      state.validation.origin.has_error = false
      state.validation.origin.messages = []
    }

    if (messages.shortened.length > 0) {
      state.validation.shortened.has_error = true
      state.validation.shortened.messages = messages.shortened
    } else {
      state.validation.shortened.has_error = false
      state.validation.shortened.messages = []
    }
    state.validation.show = true
  },

  clearValidation: function (state) {
    state.validation = {
      show: false,
      origin: {
        has_error: false,
        message: '',
      },
      shortened: {
        has_error: false,
        message: '',
      },
    }
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

  updateUrlOrigin: function (state, value) {
    state.url.origin = value
  },

  updateUrlShortened: function (state, value) {
    state.url.shortened = value
  },
}
