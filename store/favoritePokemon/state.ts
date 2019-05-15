export interface State {
  stateFavoritePokemonList: Array<string>
}

const state = (): State => ({
  stateFavoritePokemonList: []
})

export default state
