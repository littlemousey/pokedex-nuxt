import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import RootState from '~/store/types'

export interface Actions<S, R> extends ActionTree<S, R> {
  addCaughtPokemon(context: ActionContext<S, R>, pokemonName: string): void
}

const actions: Actions<State, RootState> = {
  addCaughtPokemon(context, pokemonName: string) {
    context.commit('addCaughtPokemon', pokemonName)
  }
}

export default actions
