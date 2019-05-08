export default {
  setFavoritePokemonList(state, list) {
    state.stateFavoritePokemonList = list
  },
  addFavorite(state, name) {
    state.stateFavoritePokemonList.push(name)
  },
  deleteFavorite(state, item) {
    state.stateFavoritePokemonList.splice(item, 1)
  },
  eraseFavoritePokemonList(state) {
    state.stateFavoritePokemonList = []
  }
}
