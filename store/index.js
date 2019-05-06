const LOCAL_STORAGE_PKM_NAMES = 'favoritePokemonNames'
const LOCAL_STORAGE_USER = 'userLoggedIn'

export const state = () => ({
  statePokemonDataList: [],
  stateFavoritePokemonList: [],
  loggedIn: false
})

export const actions = {
  setUserLoggedIn(context) {
    context.commit('setUserLoggedIn')
  },
  setPokemonData(context, payload) {
    context.commit('setPokemonData', payload)
  },
  setFavoritePokemonList(context, payload) {
    context.commit('setFavoritePokemonList', payload)
  },
  addFavorite(context, payload) {
    context.commit('addFavorite', payload)
  },
  deleteFavorite(context, payload) {
    context.commit('deleteFavorite', payload)
  },
  eraseFavoritePokemonList(context) {
    context.commit('eraseFavoritePokemonList')
  }
}

export const mutations = {
  setUserLoggedIn(state) {
    state.loggedIn = true
    window.localStorage.setItem(
      LOCAL_STORAGE_USER,
      JSON.stringify(state.loggedIn)
    )
  },
  setPokemonData(state, list) {
    state.statePokemonDataList = list
  },
  setFavoritePokemonList(state, list) {
    state.stateFavoritePokemonList = list
  },
  addFavorite(state, name) {
    state.stateFavoritePokemonList.push(name)
    window.localStorage.setItem(
      LOCAL_STORAGE_PKM_NAMES,
      JSON.stringify(state.stateFavoritePokemonList)
    )
  },
  deleteFavorite(state, item) {
    state.stateFavoritePokemonList.splice(item, 1)
    window.localStorage.setItem(
      LOCAL_STORAGE_PKM_NAMES,
      JSON.stringify(state.stateFavoritePokemonList)
    )
  },
  eraseFavoritePokemonList(state) {
    state.stateFavoritePokemonList = []
    window.localStorage.setItem(
      LOCAL_STORAGE_PKM_NAMES,
      JSON.stringify(state.stateFavoritePokemonList)
    )
  }
}
