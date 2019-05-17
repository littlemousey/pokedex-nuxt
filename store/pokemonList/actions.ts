import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import RootState from '~/store/types'

export interface Actions<S, R> extends ActionTree<S, R> {
  setPokemonData(context: ActionContext<S, R>, list: Array<object>): void
}

const actions: Actions<State, RootState> = {
  setPokemonData(context, list: Array<object>) {
    context.commit('setPokemonData', list)
  }
}

export default actions
