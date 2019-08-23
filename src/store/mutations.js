// state를 변화 시키기만 함!

import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations, // for 'urls'

  setUrlsLoading (state, loading) {
    state.urls.loading = loading
  },

  setUser (state, userData) {
    const userName = userData.email.split('@')[0]
    state.user.data = { ...userData, userName: userName }
  },

  clearUser (state) {
    state.user.data = { uid: '', email: '', displayName: '', userName: '' }
  },

  setUserLoading (state, loading) {
    state.user.loading = loading
  },

  // - Examples -
  // addTodo (state, todo) {
  //   state.todos.push(todo)
  // },

  // removeTodo (state, todo) {
  //   state.todos.splice(state.todos.indexOf(todo), 1)
  // },

  // editTodo (state, { todo, text = todo.text, done = todo.done }) {
  //   todo.text = text
  //   todo.done = done
  // }
}
