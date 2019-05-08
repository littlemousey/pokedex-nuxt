import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'pokedex-nuxt',
      paths: [
        'user.loggedIn',
        'pokemonList.stateFavoritePokemonList',
        'favoritePokemon.stateFavoritePokemonList'
      ]
    })(store)
  })
}
