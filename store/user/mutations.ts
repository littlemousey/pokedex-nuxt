import { MutationTree } from 'vuex'
import { State } from './state'

const mutations: MutationTree<State> = {
  setUsername(state, name: string) {
    state.username = name
  },
  setUserLoggedIn(state) {
    state.loggedIn = true
  }
}

export default mutations
