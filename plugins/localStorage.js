import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'pokedex-nuxt-state',
      paths: []
    })(store)
  })
}
