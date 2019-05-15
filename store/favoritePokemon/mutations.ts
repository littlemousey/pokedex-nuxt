import { MutationTree } from 'vuex'
import { State } from './state'

const mutations: MutationTree<State> = {
  addFavorite(state, name: string) {
    state.stateFavoritePokemonList.push(name)
  },
  deleteFavorite(state, item: number) {
    state.stateFavoritePokemonList.splice(item, 1)
  },
  eraseFavoritePokemonList(state) {
    state.stateFavoritePokemonList = []
  }
}

export default mutations
