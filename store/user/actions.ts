import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'

interface RootState {
  favoritePokemon: {}
  pokemonList: {}
  user: {}
}

export interface Actions<S, R> extends ActionTree<S, R> {
  setUsername(context: ActionContext<S, R>, name: string): void
  setUserLoggedIn(context: ActionContext<S, R>): void
}

const actions: Actions<State, RootState> = {
  setUsername(context, name: string) {
    context.commit('setUsername', name)
  },
  setUserLoggedIn(context) {
    context.commit('setUserLoggedIn')
  }
}

export default actions
