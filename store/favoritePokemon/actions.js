export default {
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
