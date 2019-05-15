import { MutationTree } from 'vuex'
import { State } from './state'

const mutations: MutationTree<State> = {
  setPokemonData(state, list: Array<object>) {
    state.statePokemonDataList = list
  }
}

export default mutations
