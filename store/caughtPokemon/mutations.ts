import { MutationTree } from 'vuex'
import { State } from './state'

const mutations: MutationTree<State> = {
  addCaughtPokemon(state, name: string) {
    state.stateCaughtPokemonList.push(name)
  }
}

export default mutations
