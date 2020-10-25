import { createStore } from 'vuex'

export default createStore({
  state: {
    test: {
      a: 1
    }
  },
  mutations: {
    setTestA (state, value) {
      state.test.a = value
    }
  },
  actions: {
  },
  modules: {
  }
})
