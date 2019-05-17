import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import RootState from '~/store/types'

export interface Actions<S, R> extends ActionTree<S, R> {
  addFavorite(context: ActionContext<S, R>, pokemonName: string): void
  deleteFavorite(context: ActionContext<S, R>, item: number): void
  eraseFavoritePokemonList(
    context: ActionContext<S, R>,
    pokemonName: string
  ): void
}

const actions: Actions<State, RootState> = {
  addFavorite(context, pokemonName: string) {
    context.commit('addFavorite', pokemonName)
  },
  deleteFavorite(context, item: number) {
    context.commit('deleteFavorite', item)
  },
  eraseFavoritePokemonList(context) {
    context.commit('eraseFavoritePokemonList')
  }
}

export default actions
