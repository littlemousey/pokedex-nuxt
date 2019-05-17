export interface State {
  statePokemonDataList: Array<object>
}

const state = (): State => ({
  statePokemonDataList: []
})

export default state
